import { api, setContext } from '@/libs/axios';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';

import Layout from '../components/Layout';
import Seo from '../components/seo';
import IntroPopup from '@/components/UIcomponent/IntroPopup';
import Counting from '@/components/home/Counting';
import Service from '@/components/home/Service';
import Benefit from '@/components/home/Benefit';
import Consumer from '@/components/home/Consumer';
import Mainbanner from '@/components/home/Mainbanner';
import Welfare from '@/components/home/Welfare';
import Review from '@/components/home/Review';
import Blog from '@/components/home/Blog';
import Partner from '@/components/home/Partner';
import Inquiry from '@/components/home/Inquiry';
import Counsel from '@/components/home/Counsel';
import Location from '@/components/home/Location';
import Ddy from '@/components/home/Ddy';
import { GetServerSideProps, NextPage } from 'next';
import { getAgentDevice } from '@/libs/utils';

const Index: NextPage = (props: any) => {
    const nav_id = '/';
    const nav_name = '복지드림';
    const [data, setData] = useState(props.response);

    const service_list: any = [
        {
            id: 'service_01',
            title: '구축비 & 연관리비 무료',
            m_title: '구축비 &\n 연관리비 무료',
            content: '우리 회사의 복지몰 제작, \n이제 부담없이 시작하세요!',
            class: 'm_service_box con_box_1',
        },
        {
            id: 'service_02',
            title: '유지보수 비용 무료',
            m_title: '유지보수\n 비용 무료',
            content: '복지몰  내 다양한 유지보수를 \n무상으로 관리해드립니다.',
            class: 'm_service_box con_box_2',
        },
        {
            id: 'service_03',
            title: '도메인 무상 제공',
            m_title: '도메인\n 무상 제공',
            content: '도메인 및 호스팅 비용을 \n무료로 제공합니다.',
            class: 'm_service_box con_box_3',
        },
        {
            id: 'service_04',
            title: '복지혜택 서비스 제공',
            m_title: '복지혜택\n 서비스 제공',
            content: '최저가쇼핑/여행/숙박/교육 등 \n다양한 복지혜택을 제공합니다.',
            class: 'm_service_box con_box_4',
        },
        {
            id: 'service_05',
            title: '웹, 모바일웹, APP 모두 제공',
            m_title: '웹, 모바일웹, APP\n 모두 제공',
            content: 'PC 버전, 모바일버전 \n모두 지원합니다.',
            class: 'm_service_box con_box_5',
        },
        {
            id: 'service_06',
            title: '커스터마이징 서비스',
            m_title: '커스터마이징\n 서비스',
            content: '원하는 디자인, 기능에 맞춰 \n복지몰을 구축해드립니다.',
            class: 'm_service_box con_box_6',
        },
        {
            id: 'service_07',
            title: '고객사 관리자 시스템 제공',
            m_title: '고객사 관리자\n 시스템 제공',
            content: '회원 등록 및 삭제, 포인트 지급 및 회수 등\n직접 관리할 수 있는 시스템을 제공해드립니다.',
            class: 'm_service_box con_box_7',
        },
        {
            id: 'service_08',
            title: '고객지원서비스무료',
            m_title: '고객지원\n 서비스무료',
            content: '직영상담센터 운영',
            class: 'm_service_box con_box_8',
        },
    ];

    const banner_pagination = {
        clickable: true,
        renderBullet: function (index: number, className: string) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };

    const partner_pagination = {
        pagination: {
            el: '.swiper-pagination',
            type: 'custom',
        },
    };

    const consumer_pagination = {
        pagination: {
            el: '.swiper-pagination',
            type: 'custom',
        },
    };

    const popup_pagination = {
        pagination: {
            el: '.swiper-pagination',
            type: 'custom',
        },
    };

    return (
        <Layout title={nav_name} nav_id={nav_id} device={props.device}>
            <Seo title={nav_name} />
            <IntroPopup data={data} pagination={popup_pagination} device={props.device} />
            <Mainbanner data={data} pagination={banner_pagination} device={props.device} />
            <Ddy data={data} device={props.device} />
            <Counting data={data} device={props.device} />
            <Service service_list={service_list} device={props.device} />
            <Benefit data={data} device={props.device} />
            <Consumer data={data} pagination={consumer_pagination} device={props.device} />
            <Welfare data={data} device={props.device} />
            <Review data={data} device={props.device} />
            <Blog data={data} device={props.device} />
            <Partner data={data} pagination={partner_pagination} device={props.device} />
            <Inquiry data={data} device={props.device} />
            <Counsel device={props.device} />
            <Location device={props.device} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    setContext(ctx);
    const device = getAgentDevice(ctx);
    var request: any = '?' + Math.floor(Date.now() / 1000);
    var response: any = {};
    try {
        const { data } = await api.get(`/resource/welfaredream/main/MAIN.json${request}`);
        response = data;
        for (var key in response) {
            if (response[key].length && typeof response[key] === 'object') {
                var temp: any[] = [];
                response[key]?.map((v: any) => {
                    if (!v.hasOwnProperty('area_class')) {
                        temp.push(v);
                    } else if (device == 'desktop' && (v.area_class == 'A' || v.area_class == 'W')) {
                        temp.push(v);
                    } else if (device == 'mobile' && (v.area_class == 'A' || v.area_class == 'M')) {
                        temp.push(v);
                    }
                });
                response[key] = temp;
            }
        }
    } catch (e: any) {
        if (typeof e.redirect !== 'undefined') {
            return { redirect: e.redirect };
        }
    }
    return {
        props: { request, response, device: device },
    };
};

export default Index;
