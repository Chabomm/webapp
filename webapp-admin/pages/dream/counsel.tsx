import type { GetServerSideProps, NextPage } from 'next';
import React, { useState, useEffect, useRef } from 'react';
import { api, setContext } from '@/libs/axios';
import 'moment/locale/ko';
import Datepicker from 'react-tailwindcss-datepicker';
import { useRouter } from 'next/router';

import Layout from '@/components/Layout';
import useForm from '@/components/form/useForm';
import ListPagenation from '@/components/bbs/ListPagenation';
import { cls } from '@/libs/utils';
import DreamCounselEdit from '@/components/dream/DreamCounselEdit';

const QnaDocsList: NextPage = (props: any) => {
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
            const { data } = await api.post(`/be/admin/dream/counsel/list`, p);
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

    const refDreamCounselEdit = useRef<any>();
    function openDreamCounselEdit(item: any) {
        refDreamCounselEdit.current.init(item, filter);
    }

    const { s, fn } = useForm({
        initialValues: {
            skeyword: '',
            skeyword_type: '',
            state: [],
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
            const { data } = await api.post(`/be/admin/dream/counsel/filter`);
            setFilter(data);
            const copy = { ...s.values };
            copy.state = data.state.map(row => row.checked && row.key);
            s.setValues(copy);
        } catch (e: any) {}
    };

    const searching = async () => {
        params.filters = s.values;
        let newPosts = await getPostsData(params);
        setPosts(newPosts.list);
    };

    const getStateName = state => {
        if (state == '100') {
            return '상담문의';
        } else if (state == '200') {
            return '상담중';
        } else if (state == '300') {
            return '도입보류';
        } else if (state == '501') {
            return '도입대기';
        } else if (state == '502') {
            return '도입신청완료';
        }
    };

    return (
        <Layout user={props.user} title="indendkorea admin console" nav_id={15} crumbs={['문의내역', '구축신청내역']}>
            <form onSubmit={fn.handleSubmit} noValidate className="w-full border py-4 px-6 rounded shadow-md bg-white mt-5">
                <div className="grid grid-cols-4 gap-6">
                    <div className="col-span-1">
                        <label className="form-label">등록일 조회</label>
                        <Datepicker
                            containerClassName="relative w-full text-gray-700 border border-gray-300 rounded"
                            inputName="create_at"
                            value={s.values.create_at}
                            i18n={'ko'}
                            onChange={fn.handleChangeDateRange}
                            primaryColor={'blue'}
                        />
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
                            {filter.skeyword_type?.map((v, i) => (
                                <option key={i} value={v.key}>
                                    {v.value}
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
                    </div>
                </div>

                <div className="checkbox_filter">
                    <div className="grid grid-cols-5 gap-6">
                        <div className="col-span-1">
                            <div className="title">진행상태</div>
                            <div className="checkboxs_wrap h-24 overflow-y-auto">
                                {filter.state?.map((v: any, i: number) => (
                                    <label key={i}>
                                        <input
                                            id={`state-${i}`}
                                            onChange={fn.handleCheckboxGroup}
                                            type="checkbox"
                                            value={v.key}
                                            checked={s.values.state.includes(v.key)}
                                            name="state"
                                        />
                                        <span className="font-bold">{v.text}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <section className="w-full md:w-1200 mx-auto my-7">
                <div className="flex flex-col">
                    <div className="border-t py-3 grid grid-cols-2 h-16 items-center">
                        <div className="text-left">
                            총 {params.page_total} 개 중 {params.page_size}개
                        </div>
                    </div>

                    <div className="col-table">
                        <div className="col-table-th grid grid-cols-12 sticky top-16 bg-gray-100">
                            <div className="">uid</div>
                            <div className="col-span-2">기업명</div>
                            <div className="">구축희망일</div>
                            <div className="col-span-3">담당자명</div>
                            <div className="">상태</div>
                            <div className="">등록일</div>
                            <div className="">상세보기</div>
                        </div>

                        {posts.map((v: any, i: number) => (
                            <div key={i} className="col-table-td grid grid-cols-12 bg-white transition duration-300 ease-in-out hover:bg-gray-100">
                                <div className="">{v.uid}</div>
                                <div className="col-span-2">{v.company_name}</div>
                                <div className="">{v.wish_build_at}</div>
                                <div className="col-span-3">{v.staff}</div>
                                <div className="">{getStateName(v.state)}</div>
                                <div className="">{v.create_at}</div>
                                <div className="">
                                    <button
                                        type="button"
                                        className="text-blue-500 underline"
                                        onClick={() => {
                                            openDreamCounselEdit(v);
                                        }}
                                    >
                                        수정
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <ListPagenation props={params} getPagePost={getPagePost} />
            </section>
            <DreamCounselEdit ref={refDreamCounselEdit} />
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
        const { data } = await api.post(`/be/admin/dream/counsel/list`, request);
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

export default QnaDocsList;
