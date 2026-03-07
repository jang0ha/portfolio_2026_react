const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    // /api로 시작하는 모든 요청을 localhost:8081로 프록시
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://portfolio-2026-backend.vercel.app/',
            changeOrigin: true,
        })
    );
};