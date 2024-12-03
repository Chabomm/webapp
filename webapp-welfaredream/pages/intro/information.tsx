import Layout from 'components/Layout';
import PageHeader from '../../components/PageHeader';
import Seo from 'components/seo';
import { getAgentDevice } from '@/libs/utils';
import { GetServerSideProps, NextPage, NextPageContext } from 'next';

import Information from '@/components/intro/Information';

const InformationPage: NextPage = (props: any) => {
    const nav_id = '/info/infomation';
    const nav_name = '복지드림이란?';
    const page_header = { title: nav_name, sub: 'Information', nav_id: nav_id };

    return (
        <Layout title={nav_name} nav_id={nav_id} device={props.device}>
            <Seo title={nav_name} />
            <PageHeader params={page_header} device={props.device} />
            <Information device={props.device} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    const device = getAgentDevice(ctx);
    return {
        props: { device: device },
    };
};

export default InformationPage;
