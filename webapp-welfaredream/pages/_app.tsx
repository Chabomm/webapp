import Head from 'next/head';
import '../styles/globals.css';
import '../public/font/SUIT/SUIT.css';
import type { AppContext, AppProps } from 'next/app';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <link rel="preload" href="/font/SUIT/SUIT-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
                <link rel="preload" href="/font/SUIT/SUIT-ExtraBold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
                <link rel="preload" href="/font/SUIT/SUIT-Heavy.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
                <link rel="preload" href="/font/SUIT/SUIT-Light.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
                <link rel="preload" href="/font/SUIT/SUIT-Medium.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
                <link rel="preload" href="/font/SUIT/SUIT-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
                <link rel="preload" href="/font/SUIT/SUIT-SemiBold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
            </Head>
            <Component {...pageProps} />

            {/* <Script strategy="afterInteractive" src={`https://wcs.naver.net/wcslog.js`} />
            <Script
                id="naver-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        if (!wcs_add) var wcs_add={};
                        wcs_add["wa"] = "s_4abab67dfdea";
                        if (!_nasa) var _nasa={};
                        if(window.wcs){
                            wcs.inflow('www.welfaredream.com');
                            wcs_do(_nasa);
                        }
                    `,
                }}
            /> */}
        </>
    );
}

import { getAgentDevice } from '@/libs/utils';
MyApp.getInitialProps = async (context: AppContext) => {
    const { ctx, Component } = context;

    let pageProps = {};
    let device = getAgentDevice(ctx);
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }

    return {
        pageProps: {
            device: device,
        },
    };
};

export default MyApp;
