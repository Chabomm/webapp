import type { GetServerSideProps, NextPage } from 'next';
import React, { useState, useEffect } from 'react';

import Layout from '@/components/Layout';
import { api, setContext } from '@/libs/axios';

const RolesList: NextPage = (props: any) => {
    const [posts, setPosts] = useState<any>([]);

    useEffect(() => {
        if (JSON.stringify(props) !== '{}') {
            setPosts(props.response.list);
        }
    }, [props]);

    const [filter, setFilter] = useState<any>({});

    useEffect(() => {
        getFilterContidion();
    }, []);

    const getFilterContidion = async () => {
        try {
            const { data } = await api.post(`/be/admin/setup/roles/filter`);
            setFilter(data);
        } catch (e: any) {}
    };

    const openAdminRolesEdit = (uid: number) => {
        window.open(`/setup/roles/edit?uid=${uid}`, '역할정보', 'width=1120,height=800,location=no,status=no,scrollbars=yes,left=400%,top=50%');
    };

    return (
        <Layout user={props.user} title="indendkorea admin console" nav_id={21} crumbs={['환경설정', '역할관리']}>
            <div className="border-t py-3 grid grid-cols-2 h-16 items-center mb-2">
                <div className="text-left">총 {posts?.length} 개</div>
                <div className="text-right">
                    <button
                        type="button"
                        className="btn-funcs"
                        onClick={() => {
                            openAdminRolesEdit(0);
                        }}
                    >
                        <i className="fas fa-pen me-2"></i> 등록
                    </button>
                </div>
            </div>

            <div className="col-table">
                <div className="col-table-th grid grid-cols-5 sticky top-16 bg-gray-100">
                    {/* col-span-2 */}
                    <div className="">uid</div>
                    <div className="">역할명</div>
                    <div className="col-span-2">배정된 메뉴 uid</div>
                    <div className="">수정하기</div>
                </div>

                {posts?.map((v: any, i: number) => (
                    <div key={i} className="col-table-td grid grid-cols-5 bg-white transition duration-300 ease-in-out hover:bg-gray-100">
                        <div className="">{v.uid}</div>
                        <div className="">{v.name}</div>
                        {/* <div className="col-span-2">{JSON.stringify(v.menus)}</div> */}
                        <div className="col-span-2">{v.roles_txt}</div>
                        <div className="">
                            <button
                                type="button"
                                className="text-blue-500 underline"
                                onClick={() => {
                                    openAdminRolesEdit(v.uid);
                                }}
                            >
                                수정
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    setContext(ctx);
    var request: any = {};
    var response: any = {};
    try {
        const { data } = await api.post(`/be/admin/setup/roles`, request);
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

export default RolesList;
