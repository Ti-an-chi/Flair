import {} from "controller";

export class router {
  constructor(
    getRoutes = {},
    postRoutes = {},
    putRoutes = {},
    deleteRoutes = {},
  ) {
    this.getRoutes = getRoutes;
    this.postRoutes = postRoutes;
    this.putRoutes = putRoutes;
    this.deleteRoutes = deleteRoutes;
  }

  get(route, options = {}) {
    const controller = this.getRoutes[route];
    if (!controller) throw new Error(`GET route not found: ${route}`);

    const req = {
      params: options.params || null,
      body: options.body || null,
    };

    return controller(req);
  }

  post(route, options = {}) {
    const controller = this.postRoutes[route];
    if (!controller) throw new Error(`POST route not found: ${route}`);

    const req = {
      params: options.params || null,
      body: options.body || null,
    };

    return controller(req);
  }

  put(route, options = {}) {
    const controller = this.putRoutes[route];
    if (!controller) throw new Error(`PUT route not found: ${route}`);

    const req = {
      params: options.params || null,
      body: options.body || null,
    };

    return controller(req);
  }

  delete(route, options = {}) {
    const controller = this.deleteRoutes[route];
    if (!controller) throw new Error(`DELETE route not found: ${route}`);

    const req = {
      params: options.params || null,
      body: options.body || null,
    };

    return controller(req);
  }
}
