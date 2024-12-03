import Layout from 'components/Layout';
import PageHeader from '../../components/PageHeader';
import Seo from 'components/seo';
import { GetServerSideProps, NextPage, NextPageContext } from 'next';
import BoardPostFaq from './board/faq';
import { getAgentDevice } from '@/libs/utils';

const FrontBoardFaq: NextPage = (props: any) => {
    const nav_id = '/bbs/faq';
    const nav_name = '자주묻는질문';
    const page_header = { title: nav_name, sub: 'Customer Service', nav_id: nav_id };

    return (
        <Layout title={nav_name} nav_id={nav_id} device={props.device}>
            <Seo title={nav_name} />
            <PageHeader params={page_header} device={props.device} />
            <BoardPostFaq board_uid={1} hidden_date={false} device={props.device} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    const device = getAgentDevice(ctx);
    return {
        props: { device: device },
    };
};

export default FrontBoardFaq;
