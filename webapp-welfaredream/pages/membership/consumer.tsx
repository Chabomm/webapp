import Layout from 'components/Layout';
import PageHeader from '../../components/PageHeader';
import Seo from 'components/seo';
import { GetServerSideProps, NextPage } from 'next';

import { api } from '@/libs/axios';
import { useEffect, useState } from 'react';
import Consumer from '@/components/membership/Consumer';
import { getAgentDevice } from '@/libs/utils';

const ConsumerPage: NextPage = (props: any) => {
    const nav_id = '/membership/consumer';
    const nav_name = '멤버쉽 혜택';
    const page_header = { title: nav_name, sub: 'Consumer Benefit', nav_id: nav_id };

    const [data, setData] = useState({
        main_cate_list: [],
        main_banner_list: [],
    });

    const [cuid, setCuid] = useState(0);

    useEffect(() => {
        getListCateData(cuid);
    }, []);

    const getListCateData = async (uid: number) => {
        setCuid(uid);

        try {
            const { data } = await api.post(`/be/display/main_cate`, {
                cate_uid: uid,
                site_id: 'dream',
                area: 'CONSUMER',
            });

            setData(({ ...values }) => {
                values.main_cate_list = data.list;
                return values;
            });

            getListBannerData(data.list[0].uid);
        } catch (e) {}
    };

    const getListBannerData = async (uid: number) => {
        setCuid(uid);
        try {
            const { data } = await api.post(`/be/display/main_banner`, {
                cate_uid: uid,
                site_id: 'dream',
                area: 'CONSUMER',
            });
            setData(({ ...values }) => {
                values.main_banner_list = data.list;
                return values;
            });
        } catch (e) {}
    };

    return (
        <Layout title={nav_name} nav_id={nav_id} device={props.device}>
            <Seo title={nav_name} />
            <PageHeader params={page_header} device={props.device} />
            <Consumer data={data} getListBannerData={getListBannerData} cuid={cuid} device={props.device} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    const device = getAgentDevice(ctx);
    return {
        props: { device: device },
    };
};

export default ConsumerPage;
