import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
    const getJsonLdSameAs = () => {
        return {
            __html: `
            {
                "@context": "http://schema.org",
                "@type": "Person",
                "name": "인디앤드코리아",
                "url": "https://www.indendkorea.com",
                "sameAs": [
                    "https://www.welfaredream.com"
                ]
            }
            `,
        };
    };

    return (
        <Html lang="ko">
            <Head>
                <meta name="google-site-verification" content="" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
                <script type="application/ld+json" dangerouslySetInnerHTML={getJsonLdSameAs()} key="item-jsonld" />
                {process.env.NODE_ENV == 'production' && (
                    <Script
                        id="naver-init"
                        strategy="lazyOnload"
                        dangerouslySetInnerHTML={{
                            __html: `
                                if(!wcs_add) var wcs_add = {};
                                wcs_add["wa"] = "1c67367463cf37";
                                if(window.wcs) {
                                    wcs_do();
                                }
                            `,
                        }}
                    />
                )}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
