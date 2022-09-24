// Copyright (C) 2022 Russell Clarey. All rights reserved. MIT license.

// deno-lint-ignore ban-types
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

export type Params = Record<string, string | undefined>;

export interface ParamsCtx {
  params: Params;
}
