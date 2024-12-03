import Layout from 'components/Layout';
import PageHeader from '../../components/PageHeader';
import Seo from 'components/seo';
import { GetServerSideProps, NextPage, NextPageContext } from 'next';

import Partner from '@/components/customer/Partner';
import { api } from '@/libs/axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { getAgentDevice } from '@/libs/utils';

const PartnerPage: NextPage = (props: any) => {
    const nav_id = '/customer/partner';
    const nav_name = '파트너';
    const page_header = { title: nav_name, sub: 'With partners', nav_id: nav_id };

    const router = useRouter();

    const [data, setData] = useState({
        main_banner_list: [],
    });

    let params = {
        cate_uid: 0,
        site_id: 'dream',
        area: 'PARTNER',
    };

    useEffect(() => {
        getListBannerData(params);
    }, []);

    const getListBannerData = async (params: object) => {
        try {
            const { data } = await api.post(`/be/display/main_banner`, params);
            const ori_list = data;

            let spit_list: any = [];
            let item_block: any = [];
            ori_list.list.forEach(function (v: any, i: any) {
                if (i % 15 < 15) {
                    item_block.push(v);
                }

                if (i % 15 == 14) {
                    spit_list.push(item_block);
                    item_block = [];
                }

                if (i == ori_list.list.length - 1) {
                    spit_list.push(item_block);
                    item_block = [];
                }
            });

            setData(({ ...values }) => {
                values.main_banner_list = spit_list;
                return values;
            });
        } catch (e) {}
    };

    const pagination = {
        pagination: {
            el: '.swiper-pagination',
            type: 'custom',
        },
    };

    return (
        <Layout title={nav_name} nav_id={nav_id} device={props.device}>
            <Seo title={nav_name} />
            <PageHeader params={page_header} device={props.device} />
            <Partner data={data} device={props.device} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    const device = getAgentDevice(ctx);
    return {
        props: { device: device },
    };
};

export default PartnerPage;
