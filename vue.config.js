module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: 9527,
        proxy: {
            '/api': {
                ws: false,
                target: 'http://localhost:7070',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
    }
}