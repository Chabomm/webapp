import Head from 'next/head';

export default function Seo({ title }: any) {
    const getJsonLdSameAs = () => {
        return {
            __html: `
            {
                "@context": "http://schema.org",
                "@type": "Person",
                "name": "복지드림",
                "url": "https://www.welfaredream.com",
                "sameAs": [
                    "https://www.indendkorea.com",
                    "https://blog.naver.com/indend_bokji",
                    "https://www.instagram.com/welfaredream_official/",
                    "https://www.facebook.com/welfaredreamcorp/"
                ]
            }
            `,
        };
    };

    const getJsonLdListItem = () => {
        return {
            __html: `
            {
                '@context': 'http://schema.org',
                '@type': 'ItemList',
                itemListElement: [
                    {
                        '@type': 'ListItem',
                        name: '복지몰',
                        image: 'https://www.welfaredream.com/resource/welfaredream/images/guide/web/aboutType01.jpg',
                        url: 'https://www.welfaredream.com/guide/about_type',
                        position: '1',
                    },
                    {
                        '@type': 'ListItem',
                        name: '협력사몰',
                        image: 'https://www.welfaredream.com/resource/welfaredream/images/guide/web/aboutType02.jpg',
                        url: 'https://www.welfaredream.com/guide/about_type',
                        position: '2',
                    },
                    {
                        '@type': 'ListItem',
                        name: '멤버십몰',
                        image: 'https://www.welfaredream.com/resource/welfaredream/images/guide/web/aboutType03.jpg',
                        url: 'https://www.welfaredream.com/guide/about_type',
                        position: '3',
                    }
                ],
            }
            `,
        };
    };
    return (
        <Head>
            <title>{`${title} | 기업과 임직원의 든든한 복지 파트너! 복지드림`}</title>
            <meta name="description" content="무상 복지몰 구축, 복지 컨설팅, 온·오프라인 통합 복지서비스, 맞춤형 복지 솔루션" />
            <meta
                name="keywords"
                content="복지드림,복지,공무원맞춤형복지포탈,기업복리후생,기업복지몰,기업복지제도,기업복지포인트,대기업복지,대기업복지몰,맞춤형복지비,맞춤형복지포인트"
            />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="복지드림" />
            <meta property="og:title" content="복지드림" />
            <meta property="og:description" content="무상 복지몰 구축, 복지 컨설팅, 온·오프라인 통합 복지서비스, 맞춤형 복지 솔루션" />
            <meta property="og:image" content="https://indend-resource.s3.amazonaws.com/data/notice/202314537388480.jpg" />
            <meta name="naver-site-verification" content="ae5b0edef028e35751e25102b5b3b85cbf9ea1d8" />

            {process.env.NODE_ENV == 'production' && (
                <>
                    <script type="application/ld+json" dangerouslySetInnerHTML={getJsonLdListItem()} key="item-jsonld" />
                </>
            )}
        </Head>
    );
}
