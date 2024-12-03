import Layout from 'components/Layout';
import PageHeader from '../../components/PageHeader';
import Seo from 'components/seo';
import { getAgentDevice } from '@/libs/utils';
import { GetServerSideProps, NextPage, NextPageContext } from 'next';
import { useEffect, useState, useRef } from 'react';

import AboutGuide from '@/components/guide/AboutGuide';
interface IUseInterval {
    (callback: () => void, interval: number): void;
}

const AboutGuidePage: NextPage = (props: any) => {
    const nav_id = '/guide/about_guide';
    const nav_name = '구축안내';
    const page_header = { title: nav_name, sub: 'About Guide', nav_id: nav_id };

    const useInterval: IUseInterval = (callback, interval) => {
        const savedCallback = useRef<(() => void) | null>(null);

        useEffect(() => {
            savedCallback.current = callback;
        });

        useEffect(() => {
            function tick() {
                if (savedCallback.current) {
                    savedCallback.current();
                }
            }

            let id = setInterval(tick, interval);
            return () => clearInterval(id);
        }, [interval]);
    };

    useInterval(() => interval_animation, 1000);

    // let guide_process_index: number = 1;

    const [isOnState, setIsOnState] = useState(false);
    const [indextState, setIndextState] = useState(1);
    const fontRef = useRef(1);

    // const [fontState, setFontState] = useState(5);
    // const fontRef = useRef(5);

    const guide_process: any = [
        {
            num: 1,
            strong: '복지드림 구축상담',
            desc: '고객이 원하는 복지몰을 만들어 드리기 위해 유선상담 또는 오프라인 미팅을 진행합니다.',
            isOn: false,
            class_name: 'guide_box float-left',
        },
        {
            num: 2,
            strong: '구축결정',
            desc: '전체적인 복지몰 기능과\n 디자인을 결정합니다.',
            isOn: false,
            class_name: 'guide_box float-left mid',
        },
        {
            num: 3,
            strong: '계약서 작성',
            desc: '복지몰 구축에 관련된\n 계약서를 작성합니다.',
            isOn: false,
            class_name: 'guide_box float-left',
        },
        {
            num: 4,
            strong: '개발/디자인',
            desc: '고객사 복지몰 개발과\n 디자인을 진행합니다.',
            isOn: false,
            class_name: 'guide_box float-right pt',
        },
        {
            num: 5,
            strong: '회원등록',
            desc: '복지드림에서 회원등록을 하거나\n 고객사에서 직접 회원등록을 진행합니다.',
            isOn: false,
            class_name: 'guide_box float-right mid pt',
        },
        {
            num: 6,
            strong: '복지몰 오픈',
            desc: '고객사 복지몰을 오픈합니다',
            isOn: false,
            class_name: 'guide_box float-right pt',
        },
    ];

    // 1초마다 on추가되도록
    const interval_animation = () => {
        if (indextState > 6) {
            setIndextState(1);
        }
        guide_process.forEach((v: any, i: any) => {
            if (v.num == indextState) {
                v.isOn = true;
            } else {
                v.isOn = false;
            }
        });

        setIndextState(indextState + 1);
    };

    return (
        <Layout title={nav_name} nav_id={nav_id} device={props.device}>
            <Seo title={nav_name} />
            <PageHeader params={page_header} device={props.device} />
            <AboutGuide guide_process={guide_process} device={props.device} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    const device = getAgentDevice(ctx);
    return {
        props: { device: device },
    };
};

export default AboutGuidePage;
