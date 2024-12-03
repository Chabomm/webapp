import Layout from 'components/Layout';
import PageHeader from '../../components/PageHeader';
import Seo from 'components/seo';
import { getAgentDevice } from '@/libs/utils';
import { GetServerSideProps, NextPage, NextPageContext } from 'next';

import ChargeForUsing from '@/components/guide/ChargeForUsing';

const ChargeForUsingPage: NextPage = (props: any) => {
    const nav_id = '/guide/charge_for_using';
    const nav_name = '이용요금';
    const page_header = { title: nav_name, sub: 'Charge for using', nav_id: nav_id };

    return (
        <Layout title={nav_name} nav_id={nav_id} device={props.device}>
            <Seo title={nav_name} />
            <PageHeader params={page_header} device={props.device} />
            <ChargeForUsing device={props.device} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    const device = getAgentDevice(ctx);
    return {
        props: { device: device },
    };
};

export default ChargeForUsingPage;
