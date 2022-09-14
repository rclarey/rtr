# rtr

A fast HTTP router and type-safe middleware library for [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) compliant runtimes.

## Usage
These examples below use Deno, but they could be easily adapted for runtimes that support `Request`/`Response`
(many edge runtimes, Bun, etc.)

### Handlers

```typescript
// a handler is a function that takes a request and context, and returns a response
type Handler<T extends object> = (
  request: Request,
  context: T,
) => Response | Promise<Response>;

const greeting: Handler<{ name: string }> = (req, ctx) => {
  return new Response(`Hello ${ctx.name}!`);
}

const asyncHandler: Handler<{ userid: string }> = async (req, ctx) => {
  const user = await findById(ctx.userid);
  return new Response(`Hello ${user.name}!`);
}
```

### Routing
```typescript
import { serve } from "https://deno.land/std/http/server.ts";
import { Handler, Router, ParamsCtx } from "https://deno.land/x/rtr/mod.ts";

const router = new Router();

// you can use parameters in the path
router.get("/user/:userid", async (req: Request, ctx: ParamsCtx) => {
  // access the path parameters with the `params` field of the context
  const user = await findById(ctx.params.userid);
  return new Response(JSON.stringify(user));
});

// of course paths can have multiple parameters
router.delete("/user/:userid/todos/:todoId", async (req: Request, ctx: ParamsCtx) => {
  await deleteTodo(ctx.params.userId, ctx.params.todoId);
  return new Response('OK');
})

// wildcards are supported at the end of a path
router.get("/static/*", (req: Request) => {
  return serveFile(new URL(req.url).pathname);
})

// there are default implementations for 404, 405, and 500 error handling
// but they can be overridden for custom functionality
router.notFound = () => new Response("You must be lost", { status: 404 });
router.methodNotAllowed = () => new Response("That isn't allowed", { status: 405 });
router.internalServerError = () => new Response("Oops I messed up", { status: 500 });

// router.handler is a `Handler<object>` that routes the request to the paths bound above
serve(router.handler);
```

### Middleware
```typescript
// a middleware is a function that takes a handler and returns another handler
type Middleware<
  Requires extends object = object,
  Provides extends object = object,
> = <T extends object>(
  h: Handler<T & Requires & Provides>,
) => Handler<T & Requires>;

// a logging middleware that requires a user object in context
const log: Middleware<{ user: { id: string } }> = (h) => async (r, c) => {
  const id = c.user.id;
  const res = await h(r, c);
  console.log(`${r.method} ${r.url} ${id}`);
  return res;
};

// an authorization middleware that provides a user object in context
const auth: Middleware<{}, { user: { id: string } }> = (h) => async (r, c) => {
  const user = await validate(r.headers.get("Authorization"));
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  return h(r, { ...c, user });
};

// you can compose middleware
const middleware = composeMiddleware(auth, log);
// which is the same as
const middleware = (h) => auth(log(h));

// and then apply the middleware to handlers
router.get('/asdf', middleware((_, ctx) => new Response('asdf: ' + ctx.user.id)));
```
