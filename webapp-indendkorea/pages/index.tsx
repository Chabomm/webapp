import Script from 'next/script';
import Layout from '../components/Layout';
import Counsel from '../components/home/counsel';
import Seo from '../components/seo';
import Introduce from '../components/home/introduce';
import Business from '../components/home/business';
import Location from '../components/home/location';
import MainBanner from '../components/home/MainBanner';
import { GetServerSideProps, NextPage, NextPageContext } from 'next';
import { getAgentDevice } from '@/libs/utils';

const Home: NextPage = (props: any) => {
    const nav_id = '/';
    const nav_name = '홈';
    return (
        <Layout title={nav_name} nav_id={nav_id} device={props.device}>
            <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-5W67ED5J5Y" />
            <Script id="google-init" strategy="afterInteractive">
                {`window.dataLayer = window.dataLayer || [];
                function gtag() {
                    dataLayer.push(arguments);
                }
                gtag('js', new Date());

                gtag('config', 'G-5W67ED5J5Y');`}
            </Script>
            <Seo title="홈" />
            <MainBanner device={props.device} />
            <Introduce device={props.device} />
            <Business device={props.device} />
            <Counsel device={props.device} />
            <Location device={props.device} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    return {
        props: { device: getAgentDevice(ctx) },
    };
};

export default Home;
