const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api/server/*", {
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/api/server/brand/all", {
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/api/server/category", {
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/api/server/category/all", {
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("api/server/login", {
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/api/server/brand/all", {
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/api/server/product", {
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/api/server/subcategory/all", {
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/api/server/collection/all", {
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/api/server/user", {
      target: 'http://localhost:4000',
      changeOrigin: true,
      headers: {
        accept: "application/json",
        method: "POST",
      },
    })
  );
  app.use(
    createProxyMiddleware("/api/server/order/all", {
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/api/server/order", {
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
};