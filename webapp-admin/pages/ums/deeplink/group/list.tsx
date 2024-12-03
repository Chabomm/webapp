import { api, setContext } from '@/libs/axios';
import type { GetServerSideProps, NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Datepicker from 'react-tailwindcss-datepicker';
import Link from 'next/link';

import { cls } from '@/libs/utils';
import Layout from '@/components/Layout';
import useForm from '@/components/form/useForm';
import ListPagenation from '@/components/bbs/ListPagenation';

const DeeplinkGroupList: NextPage = (props: any) => {
    const router = useRouter();
    const [params, setParams] = useState(props.request);
    const [posts, setPosts] = useState(props.response.list);

    useEffect(() => {
        if (sessionStorage.getItem(router.asPath) || '{}' !== '{}') {
            setParams(JSON.parse(sessionStorage.getItem(router.asPath) || '{}').params);
            setPosts(JSON.parse(sessionStorage.getItem(router.asPath) || '{}').data);
            return () => {
                const scroll = parseInt(JSON.parse(sessionStorage.getItem(router.asPath) || '{}').scroll_y, 10);
                window.scrollTo(0, scroll);
                sessionStorage.removeItem(router.asPath);
            };
        }
    }, [posts, router.asPath]);

    const getPagePost = async p => {
        let newPosts = await getPostsData(p);
        setPosts(newPosts.list);
    };

    const getPostsData = async p => {
        try {
            const { data } = await api.post(`/be/admin/applink/deeplink/group/list`, p);
            setParams((param: any) => {
                param.page = data.page;
                param.page_size = data.page_size;
                param.page_view_size = data.page_view_size;
                param.page_total = data.page_total;
                param.page_last = data.page_last;
                return param;
            });
            return data;
        } catch (e: any) {}
    };

    const { s, fn } = useForm({
        initialValues: {
            skeyword: '',
            skeyword_type: '',
            site_id: [],
            create_at: {
                startDate: null,
                endDate: null,
            },
        },
        onSubmit: async () => {
            await searching();
        },
    });

    const [filter, setFilter] = useState<any>({});

    useEffect(() => {
        getFilterContidion();
    }, []);

    const getFilterContidion = async () => {
        try {
            const { data } = await api.post(`/be/admin/applink/deeplink/filter`);
            setFilter(data);
            const copy = { ...s.values };
            copy.site_id = data.site_id.map(row => row.checked && row.key);
            s.setValues(copy);
        } catch (e: any) {}
    };

    const searching = async () => {
        params.filters = s.values;
        let newPosts = await getPostsData(params);
        setPosts(newPosts.list);
    };

    const openDeepLinkEdit = (uid: number) => {
        router.push(`/ums/deeplink/posts/list?uid=${uid}`);
    };

    const openDeepLinkGroupEdit = (uid: number) => {
        window.open(`/ums/deeplink/group/edit?uid=${uid}`, '딥링크 그룹 정보', 'width=1120,height=800,location=no,status=no,scrollbars=yes,left=220%,top=50%');
    };
    const getPostUrl = path => {
        // return {process.env.NODE_ENV != 'development' ? 'https://indendkorea.com/' : 'http://localhost:11000/'} + path
        return 'https://indendkorea.com' + path;
    };

    return (
        <Layout user={props.user} title="indendkorea admin console" nav_id={48} crumbs={['UMS관리', '딥링크']}>
            <form onSubmit={fn.handleSubmit} noValidate className="w-full border py-4 px-6 rounded shadow-md bg-white mt-5 relative">
                <div className="grid grid-cols-4 gap-6">
                    <div className="col-span-1">
                        <div className="col-span-1">
                            <label className="form-label">등록일</label>
                            <Datepicker
                                inputName="create_at"
                                value={s.values.create_at}
                                i18n={'ko'}
                                onChange={fn.handleChangeDateRange}
                                containerClassName="relative w-full text-gray-700 border border-gray-300 rounded"
                            />
                        </div>
                    </div>
                    <div className="col-span-4">
                        <select
                            name="skeyword_type"
                            value={s.values?.skeyword_type || ''}
                            onChange={fn.handleChange}
                            className={cls(s.errors['skeyword_type'] ? 'border-danger' : '', 'form-select mr-3')}
                            style={{ width: 'auto' }}
                        >
                            <option value="">전체</option>
                            {filter.skeyword_type?.map((v: any, i: number) => (
                                <option key={i} value={v.key}>
                                    {v.text}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            name="skeyword"
                            value={s.values?.skeyword || ''}
                            placeholder=""
                            onChange={fn.handleChange}
                            className={cls(s.errors['skeyword'] ? 'border-danger' : '', 'form-control mr-3')}
                            style={{ width: 'auto' }}
                        />
                        <button className="btn-search col-span-2" disabled={s.submitting}>
                            <i className="fas fa-search mr-3" style={{ color: '#ffffff' }}></i> 검색
                        </button>
                        <button type="button" className="btn-filter ml-3">
                            <i className="fas fa-stream"></i> 필터
                        </button>
                    </div>
                </div>

                <div className="checkbox_filter">
                    <div className="grid grid-cols-5 gap-6">
                        <div className="col-span-1">
                            <div className="title">프로젝트</div>
                            <div className="checkboxs_wrap h-24 overflow-y-auto">
                                {filter.site_id?.map((v: any, i: number) => (
                                    <label key={i}>
                                        <input
                                            id={`site_id-${i}`}
                                            onChange={fn.handleCheckboxGroup}
                                            type="checkbox"
                                            value={v.key}
                                            checked={s.values.site_id.includes(v.key)}
                                            name="site_id"
                                        />
                                        <span className="font-bold">{v.text}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <div className="border-t py-3 grid grid-cols-2 h-16 items-center mb-2">
                <div className="text-left">
                    총 {params.page_total} 개 중 {params.page_size}개
                </div>
                <div className="text-right">
                    <button
                        type="button"
                        className="btn-funcs mr-2 !bg-gray-500"
                        onClick={() => {
                            openDeepLinkGroupEdit(0);
                        }}
                    >
                        <i className="fas fa-pen me-2"></i> 그룹 등록
                    </button>
                </div>
            </div>

            <div className="col-table">
                <div className="col-table-th grid grid-cols-7 sticky top-16 bg-gray-100">
                    <div className="">uid</div>
                    <div className="">프로젝트</div>
                    <div className="">그룹명</div>
                    <div className="col-span-2">포스트용 링크</div>
                    <div className="">등록일</div>
                    <div className="">수정</div>
                </div>

                {posts.map((v: any, i: number) => (
                    <div key={i} className="col-table-td grid grid-cols-7 bg-white transition duration-300 ease-in-out hover:bg-gray-100">
                        <div className="">{v.uid}</div>
                        <div className="">{v.site_id}</div>
                        <div className="!justify-start">
                            <button
                                className="text-blue-500 underline"
                                onClick={() => {
                                    openDeepLinkEdit(v.uid);
                                }}
                            >
                                {v.title}
                            </button>
                        </div>
                        <div className="col-span-2 !block">
                            <Link className="underline" href={getPostUrl(`/applink/${v.uid}`)} target="_blank">
                                {getPostUrl(`/applink/${v.uid}`)}
                                <i className="fas fa-external-link-alt ms-2"></i>
                            </Link>
                        </div>
                        <div className="">{v.create_at}</div>
                        <div className="">
                            <button
                                type="button"
                                className="text-blue-500 underline"
                                onClick={() => {
                                    openDeepLinkGroupEdit(v.uid);
                                }}
                            >
                                수정
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <ListPagenation props={params} getPagePost={getPagePost} />
        </Layout>
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
    };
    var response: any = {};
    try {
        const { data } = await api.post(`/be/admin/applink/deeplink/group/list`, request);
        response = data;
        request.page = response.page;
        request.page_size = response.page_size;
        request.page_view_size = response.page_view_size;
        request.page_total = response.page_total;
        request.page_last = response.page_last;
    } catch (e: any) {
        if (typeof e.redirect !== 'undefined') {
            return { redirect: e.redirect };
        }
    }
    return {
        props: { request, response },
    };
};

export default DeeplinkGroupList;
