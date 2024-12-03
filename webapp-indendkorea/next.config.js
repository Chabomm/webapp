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
                source: '/common/company/company02.php',
                destination: '/about/philosophy',
            },
            {
                source: '/common/img/common/logo.png',
                destination: '/resource/indendkorea/images/main/logo.png',
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
                source: '/common/company/company01.php',
                destination: '/about/philosophy',
                permanent: false,
            },
            {
                source: '/mobile/common/partner/partner01.php',
                destination: '/partner',
                permanent: false,
            },
            {
                source: '/common/company/company03.php',
                destination: '/about/organize',
                permanent: false,
            },
            {
                source: '/common/counsel/counsel02.php',
                destination: 'https://web.indend.synology.me/seller/requestv2/request/indend',
                permanent: false,
            },
        ];
    },
};

module.exports = nextConfig;
