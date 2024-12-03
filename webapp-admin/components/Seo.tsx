import Head from 'next/head';

export default function Seo({ title }) {
    return (
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
            <meta name="description" content="indendkorea" />
            <meta name="keywords" content="indendkorea" />
            <title>{`${title} | 인디앤드코리아`}</title>
        </Head>
    );
}
