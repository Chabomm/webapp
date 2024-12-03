import Layout from 'components/Layout';
import Seo from 'components/seo';
import { getAgentDevice } from '@/libs/utils';
import { NextPage, NextPageContext } from 'next';
import Location from '@/components/home/Location';

const LocationPage: NextPage = (props: any) => {
    const nav_id = '/location';
    const nav_name = '오시는 길';
    const page_header = { title: nav_name, sub: '', nav_id: nav_id };
    return (
        <Layout title={nav_name} nav_id={nav_id} device={props.device}>
            <Seo title={nav_name} />
            <Location device={props.device} />
        </Layout>
    );
};

export default LocationPage;
