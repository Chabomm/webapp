import Layout from 'components/Layout';
import PageHeader from '../../components/PageHeader';
import Seo from 'components/seo';
import { getAgentDevice, staticReplace } from '@/libs/utils';
import { GetServerSideProps, NextPage } from 'next';
import { api, setContext } from '@/libs/axios';
import HistoryItem from '@/components/about/HitstoryItem';

const HistoryPage: NextPage = (props: any) => {
    const nav_id = '/about/history';
    const nav_name = '회사연혁';
    const page_header = { nav_id: nav_id, title: nav_name };
    return (
        <Layout title={nav_name} nav_id={nav_id} device={props.device}>
            <Seo title={nav_name} />
            <PageHeader params={page_header} device={props.device} />
            <div className="mb-10">
                {props?.response?.map((v: any, i: number) => (
                    <div className="" key={i}>
                        <HistoryItem device={props.device} position={v.position} params={{ year: v.year, list: v.list }} />
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    setContext(ctx);
    const device = getAgentDevice(ctx);
    var request = { path: 'about', name: 'history.json' };

    var response: any = {};
    try {
        const { data } = await api.get(`/resource/indendkorea/html/${request.path}/${request.name}`);
        response = data;
    } catch (e: any) {
        if (typeof e.redirect !== 'undefined') {
            return { redirect: e.redirect };
        }
    }
    return {
        props: { request, response, device: device },
    };
};

export default HistoryPage;
