import Layout from 'components/Layout';
import PageHeader from '../../components/PageHeader';
import Seo from 'components/seo';
import { getAgentDevice } from '@/libs/utils';
import { GetServerSideProps, NextPage, NextPageContext } from 'next';
import BoardPostList from './board/list';

const FrontBoardNotice: NextPage = (props: any) => {
    const nav_id = '/bbs/notice';
    const nav_name = '공지사항';
    const page_header = { title: nav_name, sub: 'Customer Service', nav_id: nav_id };

    return (
        <Layout title={nav_name} nav_id={nav_id} device={props.device}>
            <Seo title={nav_name} />
            <PageHeader params={page_header} device={props.device} />
            <BoardPostList board_uid={2} hidden_date={false} device={props.device} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    const device = getAgentDevice(ctx);
    return {
        props: { device: device },
    };
};

export default FrontBoardNotice;
