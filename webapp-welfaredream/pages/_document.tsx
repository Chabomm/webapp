import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
    return (
        <Html lang="ko">
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />

                {/* 
                나중에 contents page 를 resource 폴더 껄로 옮길때 풀기
                <link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css" />
                <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
                <Script
                    strategy="lazyOnload"
                    dangerouslySetInnerHTML={{
                        __html: `
                                AOS.init();
                        `,
                    }}
                /> 
                */}
            </Head>
            <body>
                <Main />
                <NextScript />
                <span itemType="http://schema.org/Organization">
                    <link itemProp="url" href="https://www.welfaredream.com" />
                    <a itemProp="sameAs" href="https://www.indendkorea.com"></a>
                    <a itemProp="sameAs" href="https://blog.naver.com/indend_bokji"></a>
                    <a itemProp="sameAs" href="https://www.instagram.com/welfaredream_official"></a>
                    <a itemProp="sameAs" href="https://www.facebook.com/welfaredreamcorp"></a>
                </span>

                <Script strategy="afterInteractive" src={`https://wcs.naver.net/wcslog.js`} />
                {process.env.NODE_ENV == 'production' && (
                    <Script
                        id="naver-init"
                        strategy="lazyOnload"
                        dangerouslySetInnerHTML={{
                            __html: `
                                if(!wcs_add) var wcs_add = {};
                                wcs_add["wa"] = "s_4abab67dfdea";
                                if(window.wcs) {
                                    wcs_do();
                                }
                            `,
                        }}
                    />
                )}
            </body>
        </Html>
    );
}
