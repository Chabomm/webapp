import Layout from 'components/Layout';
import PageHeader from '../../components/PageHeader';
import Seo from 'components/seo';
import { getAgentDevice, staticReplace } from '@/libs/utils';
import { GetServerSideProps, NextPage } from 'next';
import { api, setContext } from '@/libs/axios';

const Philosophy: NextPage = (props: any) => {
    const nav_id = '/about/philosophy';
    const nav_name = '경영철학';
    const page_header = { nav_id: nav_id, title: nav_name };

    return (
        <Layout title={nav_name} nav_id={nav_id} device={props.device}>
            <Seo title={nav_name} />
            <PageHeader params={page_header} device={props.device} />
            <div dangerouslySetInnerHTML={{ __html: props.response }}></div>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    setContext(ctx);
    const device = getAgentDevice(ctx);
    var request = { path: 'about', name: 'philosophy.html' };

    var response: any = {};
    try {
        const { data } = await api.get(`/resource/indendkorea/html/${request.path}/${request.name}`);
        response = staticReplace(data, ctx);
    } catch (e: any) {
        if (typeof e.redirect !== 'undefined') {
            return { redirect: e.redirect };
        }
    }
    return {
        props: { request, response, device: device },
    };
};

export default Philosophy;
