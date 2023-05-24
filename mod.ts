// Copyright (C) 2022 - 2023 Russell Clarey. All rights reserved. MIT license.

import type { Ctx, Handler, HttpMethod, ParamsCtx } from "./types.ts";
export * from "./types.ts";
export { composeMiddleware } from "./compose.ts";

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

interface Leaf {
  path: string;
  handler: Handler<ParamsCtx>;
  paramList: [string, number][];
}

type Node = Record<HttpMethod, Leaf | undefined> & {
  hasLeaf: boolean;
  statics: Record<string, Node | undefined>;
  param?: { maxDepth: number; node: Node };
  wildcard?: Node;
};

interface Candidate {
  part: number;
  node: Node;
}

function newNode(): Node {
  return { statics: {}, hasLeaf: false } as Node;
}

function trimAndSplit(path: string) {
  const start = path[0] === "/";
  const end = path[path.length - 1] === "/";
  const trimmed = path.slice(start ? 1 : 0, path.length - (end ? 1 : 0));
  return {
    trimmed,
    parts: trimmed.split("/"),
  };
}

function getPathFromUrl(url: string) {
  const queryIndex = url.indexOf("?", 8);
  const result = url.substring(
    url.indexOf("/", 8),
    queryIndex === -1 ? url.length : queryIndex,
  );

  return result;
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

      if (checking.param && checking.param.maxDepth >= parts.length - i - 1) {
        params.push({
          part: i + 1,
          node: checking.param.node,
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
      const path = getPathFromUrl(request.url);
      const method = request.method.toUpperCase() as HttpMethod;
      const { node, parts } = this.#find(path);
      if (!node || !node.hasLeaf) {
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
        if (key === "*") {
          params[key] = parts.slice(ind).join("/");
        } else {
          params[key] = parts[ind];
        }
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
          const param = node.param ??= { maxDepth: 0, node: newNode() };
          param.maxDepth = Math.max(param.maxDepth, parts.length - ind - 1);
          node = param.node;
          paramList.push([part.slice(1), ind]);
        } else if (part[0] === "*") {
          node = node.wildcard ??= newNode();
          paramList.push(["*", ind]);
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
    node.hasLeaf = true;
    node[method] = {
      path,
      handler,
      paramList,
    };
  };
}
