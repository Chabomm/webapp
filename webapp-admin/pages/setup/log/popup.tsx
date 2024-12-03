import type { GetServerSideProps, NextPage } from 'next';
import React, { useState } from 'react';
import { api, setContext } from '@/libs/axios';
import 'moment/locale/ko';
import { useRouter } from 'next/router';
import LayoutPopup from '@/components/LayoutPopup';
import ListPagenation from '@/components/bbs/ListPagenation';

const LogListPopup: NextPage = (props: any) => {
    const router = useRouter();
    const [params, setParams] = useState(props.request);
    const [posts, setPosts] = useState(props.response.list);

    const getPagePost = async p => {
        let newPosts = await getPostsData(p);
        setPosts(newPosts.list);
    };

    const getPostsData = async p => {
        try {
            const { data } = await api.post(`/be/admin/log/list`, p);
            setParams((param: any) => {
                param.page = data.page;
                param.page_size = data.page_size;
                param.page_view_size = data.page_view_size;
                param.page_total = data.page_total;
                param.page_last = data.page_last;
                param.table_name = data.table_name;
                param.cl_uid = data.cl_uid;
                return param;
            });
            return data;
        } catch (e: any) {}
    };

    return (
        <LayoutPopup title={''}>
            {posts.length <= 0 ? (
                <div className="border p-24 m-24 text-center">로그 내역이 없습니다.</div>
            ) : (
                <div className="w-full bg-slate-100 mx-auto py-10">
                    <div className="px-9">
                        <div className="flex mb-4 justify-between">
                            <div>
                                <span className="font-bold">로그 내역</span>
                                <span className="ms-3 text-sm text-gray-500">총 {posts.length}개</span>
                            </div>
                        </div>

                        <div className="mb-5 border py-4 px-6 rounded shadow-md bg-white relative">
                            <div className="grid grid-cols-2 gap-4">
                                <div className=" col-span-2 col-table">
                                    <div className="col-table-th grid grid-cols-12 bg-gray-100">
                                        <div className="">UID</div>
                                        <div className="col-span-2">테이블</div>
                                        <div className="">고유번호</div>
                                        <div className=" col-span-2">컬럼명</div>
                                        <div className="">전</div>
                                        <div className="">후</div>
                                        <div className="col-span-2">등록자</div>
                                        <div className="col-span-2">등록일</div>
                                    </div>

                                    {posts.map((v: any, i: number) => (
                                        <div key={i} className="col-table-td grid grid-cols-12 bg-white transition duration-300 ease-in-out hover:bg-gray-100">
                                            <div className="">{v.uid}</div>
                                            <div className="col-span-2">{v.table_name}</div>
                                            <div className="">{v.cl_uid}</div>
                                            <div className="!justify-start col-span-2">{v.column_name}</div>
                                            <div className="break-all">{v.cl_before}</div>
                                            <div className="break-all">{v.cl_after}</div>
                                            <div className="col-span-2">{v.reg_user}</div>
                                            <div className="col-span-2">{v.reg_date}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <ListPagenation props={params} getPagePost={getPagePost} />
                </div>
            )}
        </LayoutPopup>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    setContext(ctx);
    var request: any = {
        page: 1,
        page_size: 0,
        page_view_size: 0,
        page_total: 0,
        page_last: 0,
        table_name: ctx.query.table_name,
        cl_uid: ctx.query.uid,
    };
    var response: any = {};
    try {
        const { data } = await api.post(`/be/admin/log/list`, request);
        response = data;
        request.page = response.page;
        request.page_size = response.page_size;
        request.page_view_size = response.page_view_size;
        request.page_total = response.page_total;
        request.page_last = response.page_last;
        request.table_name = response.table_name;
        request.cl_uid = response.cl_uid;
    } catch (e: any) {
        if (typeof e.redirect !== 'undefined') {
            return { redirect: e.redirect };
        }
    }
    return {
        props: { request, response },
    };
};

export default LogListPopup;
