/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    webpackDevMiddleware: config => {
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
        };
        return config;
    },
    async rewrites() {
        return [
            {
                source: '/be/:path*',
                destination: `${process.env.NEXT_PUBLIC_BACKEND}/be/:path*`,
            },
            {
                source: '/healthz',
                destination: '/api/health',
            },
        ];
    },
    async redirects() {
        return [
            {
                source: '/sub/information.php',
                destination: '/intro/information',
                permanent: false,
            },
            {
                source: '/sub/service.php',
                destination: '/guide/service',
                permanent: false,
            },
            {
                source: '/sub/welfare.php',
                destination: '/benefit/welfare',
                permanent: false,
            },
            {
                source: '/sub/consumer.php',
                destination: '/membership/consumer',
                permanent: false,
            },
            {
                source: '/sub/partner.php',
                destination: '/customer/partner',
                permanent: false,
            },
            {
                source: '/bbs/board.php:path*',
                destination: '/bbs/3',
                permanent: false,
            },
        ];
    },
};

module.exports = nextConfig;
