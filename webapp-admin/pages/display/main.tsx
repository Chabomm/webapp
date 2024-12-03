import type { GetServerSideProps, NextPage, NextPageContext } from 'next';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import Layout from '@/components/Layout';
import MainEdit from '@/components/display/main/MainEdit';
import { api, setContext } from '@/libs/axios';

const DesignMain: NextPage = (props: any) => {
    const router = useRouter();
    const [posts, setPosts] = useState(props.response.list);
    const [oNav, setONav] = useState({ nav_id: 10, nav_name: '복지드림' });
    useEffect(() => {
        const { site_id } = router.query;
        if (site_id == 'dream') {
            setONav({ nav_id: 10, nav_name: '복지드림' });
        } else if (site_id == 'indend') {
            setONav({ nav_id: 11, nav_name: '인디앤드' });
        }
    }, [router]);

    useEffect(() => {
        if (sessionStorage.getItem(router.asPath) || '{}' !== '{}') {
            setPosts(JSON.parse(sessionStorage.getItem(router.asPath) || '{}').data);
            return () => {
                const scroll = parseInt(JSON.parse(sessionStorage.getItem(router.asPath) || '{}').scroll_y, 10);
                window.scrollTo(0, scroll);
                sessionStorage.removeItem(router.asPath);
            };
        }
    }, [posts, router.asPath]);

    const create_main_json = async itme => {
        try {
            const p = {
                site_id: itme.site_id,
                area: itme.area,
                area_class: itme.area_class,
                display_type: itme.display_type,
                cont_uid: itme.cont_uid,
                cont_type: itme.cont_type,
            };
            const { data } = await api.post(`/be/admin/main/create`, p);
            alert(data.msg);
        } catch (e: any) {}
    };

    const goEditContents = item => {
        if (item.cont_type == 'BOARD') {
            router.push(`/board/posts/list?board_uid=${item.cont_uid}`);
        } else {
            router.push(`/display/banner/list?uid=${item.uid}`);
        }
    };

    const refMainEdit = useRef<any>();
    function openMainEdit(item: any) {
        refMainEdit.current.init(item);
    }

    const getLogList = (uid: any) => {
        window.open(`/setup/log/popup?table_name=MAIN&uid=${uid}`, '로그정보', 'width=1120,height=800,location=no,status=no,scrollbars=yes,left=400%,top=50%');
    };

    return (
        <Layout user={props.user} title="indendkorea admin console" nav_id={oNav.nav_id} crumbs={['디자인 관리', oNav.nav_name]}>
            <div className="border-t py-3 grid grid-cols-2 h-16 items-center mb-2">
                <div className="text-left">총 {posts?.length} 개</div>
                <div className="text-right">
                    <button
                        type="button"
                        className="btn-funcs"
                        onClick={() => {
                            openMainEdit({ uid: 0 });
                        }}
                    >
                        <i className="fas fa-pen me-2"></i> 등록
                    </button>
                </div>
            </div>

            <div className="col-table">
                <div className="col-table-th grid grid-cols-11 sticky top-16 bg-gray-100">
                    <div className="">순서</div>
                    <div className="col-span-2">코드명</div>
                    <div className="col-span-2">영역명</div>
                    <div className="col-span-3">미리보기/배너수정</div>
                    <div className="">기능</div>
                    <div className="">생성</div>
                    <div className="">로그보기</div>
                </div>
                {posts.map((v, i) => (
                    <div key={i} className="col-table-td grid grid-cols-11 bg-white transition duration-300 ease-in-out hover:bg-gray-100">
                        <div className="handle flex-col cursor-pointer">
                            <div className="flex items-center justify-center border p-3 rounded bg-slate-50">
                                <i className="fas fa-sort me-2"></i>
                                <div className="font-semibold">{v.area_sort}</div>
                            </div>
                        </div>
                        <div className="col-span-2">{v.area}</div>
                        <div className="col-span-2">{v.area_name}</div>
                        <div className="col-span-3">
                            <div
                                className="cursor-pointer"
                                onClick={() => {
                                    goEditContents(v);
                                }}
                            >
                                <img src={v.area_thumb} />
                            </div>
                        </div>
                        <div className="flex-col">
                            <div>[{v.is_display == 'T' ? '진열' : '미진열'}]</div>
                            <button
                                type="button"
                                onClick={() => {
                                    openMainEdit(v);
                                }}
                            >
                                수정
                            </button>
                        </div>
                        <div className="">
                            <button
                                onClick={() => {
                                    create_main_json(v);
                                }}
                                className="text-blue-500 underline"
                            >
                                생성
                            </button>
                        </div>
                        <div className="" onClick={() => getLogList(v.uid)}>
                            <button type="button" className="btn-filter">
                                로그 리스트
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <MainEdit ref={refMainEdit} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    setContext(ctx);
    var request: any = {
        site_id: ctx.query.site_id,
        display_type: ctx.query.display_type,
    };
    var response: any = {};
    try {
        const { data } = await api.post(`/be/admin/main/list`, request);
        response = data;
    } catch (e: any) {
        if (typeof e.redirect !== 'undefined') {
            return { redirect: e.redirect };
        }
    }
    return {
        props: { request, response },
    };
};

export default DesignMain;
