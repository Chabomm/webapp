import Layout from 'components/Layout';
import PageHeader from '../../components/PageHeader';
import Seo from 'components/seo';
import { getAgentDevice, staticReplace } from '@/libs/utils';
import { GetServerSideProps, NextPage } from 'next';
import { api, setContext } from '@/libs/axios';

const MallPage: NextPage = (props: any) => {
    const nav_id = '/business/mall';
    const nav_name = '복지몰구축';
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
    var request = { path: 'business', name: `mall_${device}.html` };

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

export default MallPage;
