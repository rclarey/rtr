// Copyright (C) 2022 Russell Clarey. All rights reserved. MIT license.

// // deno-lint-ignore ban-types
export type Ctx = object;

export type Handler<T extends Ctx = Ctx> = (
  request: Request,
  context: T,
) => Response | Promise<Response>;

export type Middleware<
  Requires extends Ctx = Ctx,
  Provides extends Ctx = Ctx,
> = <T extends Ctx>(
  h: Handler<T & Requires & Provides>,
) => Handler<T & Requires>;

type RemoveIntersection<R, P> = Pick<
  R,
  {
    [Key in keyof R]: Key extends keyof P ? P[Key] extends R[Key] ? never : Key
      : Key;
  }[keyof R]
>;

// deno-lint-ignore no-explicit-any
type Compose<T extends any[]> = T extends [] ? never
  : ((...t: T) => void) extends
    ((a: Middleware<infer R1, infer P1>, ...b: infer U) => void)
    ? Compose<U> extends Middleware<infer R2, infer P2>
      ? Middleware<R1 & RemoveIntersection<R2, P1>, P1 & P2>
    : never
  : never;

export function composeMiddleware<
  T extends ((
    // deno-lint-ignore no-explicit-any
    h: Handler<any>,
    // deno-lint-ignore no-explicit-any
  ) => (r: Request, c: any) => Response | Promise<Response>)[],
>(
  ...middleware: T
): Compose<T> {
  // @ts-ignore-error
  return <U extends Ctx>(handler: Handler<U>) => {
    let f = handler;
    for (let i = middleware.length - 1; i >= 0; i -= 1) {
      const m = middleware[i]!;
      f = m(f);
    }
    // deno-lint-ignore no-explicit-any
    return f as any;
  };
}

export type HttpMethod =
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "CONNECT"
  | "OPTIONS"
  | "TRACE"
  | "PATCH";

const HTTP_METHODS: HttpMethod[] = [
  "GET",
  "HEAD",
  "POST",
  "PUT",
  "DELETE",
  "CONNECT",
  "OPTIONS",
  "TRACE",
  "PATCH",
];

export type Params = Record<string, string | undefined>;

export interface ParamsCtx {
  params: Params;
}

interface Leaf {
  path: string;
  handler: Handler<ParamsCtx>;
  paramList: [string, number][];
}

type Node = Record<HttpMethod, Leaf | undefined> & {
  statics: Record<string, Node | undefined>;
  param?: Node;
  wildcard?: Node;
};

interface Candidate {
  part: number;
  node: Node;
}

function newNode(): Node {
  return { statics: {} } as Node;
}

function trimAndSplit(path: string) {
  const trimmed = path.replace(/^\/|\/$/g, "");
  return {
    trimmed,
    parts: trimmed.split("/"),
  };
}

export class Router {
  #statics: Record<string, Node | undefined> = {};
  #tree = newNode();

  get(pathname: string, handler: Handler<ParamsCtx>) {
    this.#addRoute("GET", pathname, handler);
  }

  head(pathname: string, handler: Handler<ParamsCtx>) {
    this.#addRoute("HEAD", pathname, handler);
  }

  post(pathname: string, handler: Handler<ParamsCtx>) {
    this.#addRoute("POST", pathname, handler);
  }

  put(pathname: string, handler: Handler<ParamsCtx>) {
    this.#addRoute("PUT", pathname, handler);
  }

  delete(pathname: string, handler: Handler<ParamsCtx>) {
    this.#addRoute("DELETE", pathname, handler);
  }

  connect(pathname: string, handler: Handler<ParamsCtx>) {
    this.#addRoute("CONNECT", pathname, handler);
  }

  options(pathname: string, handler: Handler<ParamsCtx>) {
    this.#addRoute("OPTIONS", pathname, handler);
  }

  trace(pathname: string, handler: Handler<ParamsCtx>) {
    this.#addRoute("TRACE", pathname, handler);
  }

  patch(pathname: string, handler: Handler<ParamsCtx>) {
    this.#addRoute("PATCH", pathname, handler);
  }

  get handler() {
    return this.#handlerFunc.bind(this);
  }

  notFound: Handler<Ctx> = () => new Response("Not Found", { status: 404 });

  methodNotAllowed: Handler<{ allowedMethods: HttpMethod[] }> = (
    _,
    { allowedMethods },
  ) =>
    new Response("Method Not Allowed", {
      status: 405,
      headers: {
        "Allow": allowedMethods.join(", "),
      },
    });

  internalServerError: Handler<{ error: unknown }> = (_, { error }) => {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  };

  #find = (path: string) => {
    const { parts, trimmed } = trimAndSplit(path);
    const params: Candidate[] = [];
    let wildcard: Node | null = null;
    let checking = this.#tree;

    const staticFound = this.#statics[trimmed];
    if (staticFound) {
      return { node: staticFound, parts };
    }

    let i = 0;
    while (true) {
      if (i === parts.length) {
        return {
          node: checking,
          parts,
        };
      }

      if (checking.wildcard) {
        wildcard = checking.wildcard;
      }

      if (checking.param) {
        params.push({
          part: i + 1,
          node: checking.param,
        });
      }

      // static paths are highest priority
      const next = checking.statics[parts[i]];
      if (next) {
        checking = next;
        i += 1;
        continue;
      }

      // paths with params are second priority
      const lastParam = params.pop();
      if (lastParam) {
        checking = lastParam.node;
        i = lastParam.part;
        continue;
      }

      // last priority is wildcards
      return { node: wildcard, parts };
    }
  };

  #handlerFunc = (request: Request, ctx: Ctx = {}) => {
    try {
      const path = new URL(request.url).pathname;
      const method = request.method.toUpperCase() as HttpMethod;
      const { node, parts } = this.#find(path);
      if (!node) {
        return this.notFound(request, ctx);
      }

      const leaf = node[method];
      if (!leaf) {
        return this.methodNotAllowed(request, {
          allowedMethods: HTTP_METHODS.filter((m) => !!node[m]),
        });
      }

      const params: Record<string, string> = {};
      for (let i = 0; i < leaf.paramList.length; i++) {
        const [key, ind] = leaf.paramList[i];
        params[key] = parts[ind];
      }
      return leaf.handler(request, { ...ctx, params });
    } catch (error: unknown) {
      return this.internalServerError(request, { ...ctx, error });
    }
  };

  #addRoute = (
    method: HttpMethod,
    path: string,
    handler: Handler<ParamsCtx>,
  ) => {
    const { trimmed, parts } = trimAndSplit(path);

    let node = this.#tree;
    const paramList: [string, number][] = [];
    if (!/[:*]/.test(trimmed)) {
      node = this.#statics[trimmed] ??= newNode();
    } else {
      parts.forEach((part, ind) => {
        if (
          part === "" || part.indexOf(":") > 0 || part.indexOf("*") > 0 ||
          (part === "*" && ind !== parts.length - 1)
        ) {
          throw new Error(`error: "${path}" is not a valid path`);
        }

        if (part[0] === ":") {
          node = node.param ??= newNode();
          paramList.push([part.slice(1), ind]);
        } else if (part[0] === "*") {
          node = node.wildcard ??= newNode();
        } else {
          node = node.statics[part] ??= newNode();
        }
      });
    }

    if (node[method]) {
      throw new Error(
        `error: existing path "${
          node[method]!.path
        }" conflicts with the path "${path}" being added`,
      );
    }
    node[method] = {
      path,
      handler,
      paramList,
    };
  };
}
