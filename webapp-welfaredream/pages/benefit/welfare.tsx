import Layout from 'components/Layout';
import PageHeader from '../../components/PageHeader';
import Seo from 'components/seo';
import { getAgentDevice } from '@/libs/utils';
import { GetServerSideProps, NextPage, NextPageContext } from 'next';

import { api } from '@/libs/axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Welfare from '@/components/benefit/Welfare';

const WelfarePage: NextPage = (props: any) => {
    const nav_id = '/benefit/welfare';
    const nav_name = '복지혜택';
    const page_header = { title: nav_name, sub: 'Welfare for you', nav_id: nav_id };

    const router = useRouter();

    const [data, setData] = useState({
        main_cate_list: [],
        main_banner_list: [],
    });

    const [cuid, setCuid] = useState(1);

    useEffect(() => {
        getListCateData(cuid);
    }, []);

    const getListCateData = async (uid: number) => {
        setCuid(uid);
        try {
            const { data } = await api.post(`/be/display/main_cate`, {
                cate_uid: uid,
                site_id: 'dream',
                area: 'WELFARE',
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
                area: 'WELFARE',
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
            <Welfare data={data} getListBannerData={getListBannerData} cuid={cuid} device={props.device} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    const device = getAgentDevice(ctx);
    return {
        props: { device: device },
    };
};

export default WelfarePage;
