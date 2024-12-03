import Head from 'next/head';
import Script from 'next/script';

export default function Seo({ title }: any) {
    return (
        <Head>
            <title>{`${title} | 인디앤드코리아`}</title>
            <meta name="description" content="임직원과 고객을 생각하며 함께 가치를 창조하는 인디앤드코리아입니다." />
            <meta name="keywords" content="인디앤드,indend,indtheend,복지" />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="인디앤드코리아" />
            <meta property="og:title" content="인디앤드코리아" />
            <meta property="og:description" content="임직원과 고객을 생각하며 함께 가치를 창조하는 인디앤드코리아입니다." />
            <meta property="og:image" content="https://indend-resource.s3.amazonaws.com/data/notice/202314537172642.jpg" />
            <meta name="naver-site-verification" content="50ecf9fbeb0646a77df5b5400a112421c6c1e9cf" />
        </Head>
    );
}
