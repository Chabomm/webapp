import Layout from 'components/Layout';
import PageHeader from '../../components/PageHeader';
import Seo from 'components/seo';
import { getAgentDevice } from '@/libs/utils';
import { GetServerSideProps, NextPage, NextPageContext } from 'next';
import BoardPostGallery from './board/gallery';

const FrontBoardMedia: NextPage = (props: any) => {
    const nav_id = '/bbs/media';
    const nav_name = '뉴스룸 보도자료';
    const page_header = { title: nav_name, sub: 'News room', nav_id: nav_id };

    return (
        <Layout title={nav_name} nav_id={nav_id} device={props.device}>
            <Seo title={nav_name} />
            <PageHeader params={page_header} device={props.device} />
            <BoardPostGallery board_uid={4} hidden_date={false} device={props.device} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    const device = getAgentDevice(ctx);
    return {
        props: { device: device },
    };
};

export default FrontBoardMedia;
