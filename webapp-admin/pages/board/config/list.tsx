import type { GetServerSideProps, NextPage } from 'next';
import React, { useState, useEffect, useRef } from 'react';
import { api, setContext } from '@/libs/axios';
import 'moment/locale/ko';
import Datepicker from 'react-tailwindcss-datepicker';
import { useRouter } from 'next/router';
import { cls } from '@/libs/utils';

import Layout from '@/components/Layout';
import useForm from '@/components/form/useForm';
import ListPagenation from '@/components/bbs/ListPagenation';
import BoardEdit from '@/components/board/BoardEdit';

const BoardConfigList: NextPage = (props: any) => {
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
            const { data } = await api.post(`/be/admin/board/list`, p);
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

    const refBoardEdit = useRef<any>();
    function openBoardEdit(item: any) {
        refBoardEdit.current.init(item);
    }

    const { s, fn } = useForm({
        initialValues: {
            skeyword: '',
            skeyword_type: '',
            site_id: '',
            board_type: '',
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
            const { data } = await api.post(`/be/admin/board/filter`);
            setFilter(data);
        } catch (e: any) {}
    };

    const searching = async () => {
        params.filters = s.values;
        let newPosts = await getPostsData(params);
        setPosts(newPosts.list);
    };

    const openBoardPosts = v => {
        router.push('/board/posts/list?board_uid=' + v.uid);
    };

    const openBoardFront = v => {
        if (v.site_id == 'dream') {
            window.open('https://bokjidream.com' + v.front_url);
        }
    };

    return (
        <Layout user={props.user} title="indendkorea admin console" nav_id={8} crumbs={['게시판 관리', '게시판 리스트']}>
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
                    <div className="col-span-1">
                        <label className="form-label">프로젝트</label>
                        <select
                            name="site_id"
                            value={s.values?.site_id || ''}
                            onChange={fn.handleChange}
                            className={cls(s.errors['site_id'] ? 'border-danger' : '', 'form-select')}
                        >
                            <option value="">전체</option>
                            {filter.site_id?.map((v, i) => (
                                <option key={i} value={v.key}>
                                    {v.value}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-1">
                        <label className="form-label">게시판 유형</label>
                        <select
                            name="board_type"
                            value={s.values?.board_type || ''}
                            onChange={fn.handleChange}
                            className={cls(s.errors['board_type'] ? 'border-danger' : '', 'form-select')}
                        >
                            <option value="">전체</option>
                            {filter.board_type?.map((v, i) => (
                                <option key={i} value={v.key}>
                                    {v.value}
                                </option>
                            ))}
                        </select>
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
            </form>

            <div className="border-t py-3 grid grid-cols-2 h-16 items-center mb-2">
                <div className="text-left">
                    총 {params.page_total} 개 중 {params.page_size}개
                </div>
                <div className="text-right">
                    <button
                        type="button"
                        className="btn-funcs"
                        onClick={() => {
                            openBoardEdit({ uid: 0 });
                        }}
                    >
                        <i className="fas fa-pen me-2"></i> 게시판등록
                    </button>
                </div>
            </div>

            <div className="col-table">
                <div className="col-table-th grid grid-cols-10 sticky top-16 bg-gray-100">
                    {/* col-span-2 */}
                    <div className="">UID</div>
                    <div className="">프로젝트</div>
                    <div className="">게시판 유형</div>
                    <div className="col-span-2">게시판 제목</div>
                    <div className="">게시물개수</div>
                    <div className="">댓글여부</div>
                    <div className="">표시여부</div>
                    <div className="col-span-2">게시물관리</div>
                </div>

                {posts.map((v: any, i: number) => (
                    <div key={i} className="col-table-td grid grid-cols-10 bg-white transition duration-300 ease-in-out hover:bg-gray-100">
                        <div className="">{v.uid}</div>
                        <div className="">{v.site_id}</div>
                        <div className="">{v.board_type}</div>
                        <div className="col-span-2">{v.board_name}</div>
                        <div className="">{v.count}</div>
                        <div className="">{v.is_comment == 'T' ? '사용' : '미사용'}</div>
                        <div className="">{v.is_display == 'T' ? '진열' : '미진열'}</div>
                        <div className="col-span-2">
                            <div className="flex">
                                <div>
                                    <button
                                        type="button"
                                        className="text-blue-500 underline"
                                        onClick={() => {
                                            openBoardEdit(v);
                                        }}
                                    >
                                        수정
                                    </button>
                                </div>
                                <div className="px-2">|</div>
                                <div>
                                    <button
                                        type="button"
                                        className="text-blue-500 underline"
                                        onClick={() => {
                                            openBoardPosts(v);
                                        }}
                                    >
                                        게시물보기
                                    </button>
                                </div>
                                <div className="px-2">|</div>
                                <div>
                                    <button
                                        type="button"
                                        className="text-blue-500 underline"
                                        onClick={() => {
                                            openBoardFront(v);
                                        }}
                                    >
                                        프론트보기
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <ListPagenation props={params} getPagePost={getPagePost} />
            <BoardEdit ref={refBoardEdit} />
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
        const { data } = await api.post(`/be/admin/board/list`, request);
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

export default BoardConfigList;
