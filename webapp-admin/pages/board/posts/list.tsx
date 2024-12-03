import type { GetServerSideProps, NextPage, NextPageContext } from 'next';
import React, { useState, useEffect } from 'react';
import { api, setContext } from '@/libs/axios';
import Datepicker from 'react-tailwindcss-datepicker';
import { useRouter } from 'next/router';
import { checkNumeric, cls } from '@/libs/utils';

import Layout from '@/components/Layout';
import useForm from '@/components/form/useForm';
import ListPagenation from '@/components/bbs/ListPagenation';

const BoardPostsList: NextPage = (props: any) => {
    const router = useRouter();
    const { board_uid } = router.query;
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
            const { data } = await api.post(`/be/admin/posts/list`, p);
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
            site_id: '',
            cate_uid: '',
            board_uid: '',
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
            const { data } = await api.post(`/be/admin/posts/filter`);
            if (checkNumeric(board_uid) > 0) {
                s.values.board_uid = board_uid;
                searching();
            }
            setFilter(data);
        } catch (e: any) {}
    };

    const searching = async () => {
        params.filters = s.values;
        let newPosts = await getPostsData(params);
        setPosts(newPosts.list);
    };

    const goEdit = (item: any) => {
        window.open(`/board/posts/edit?uid=${item.uid}`, '게시물 상세', 'width=1120,height=800,location=no,status=no,scrollbars=yes');
    };

    return (
        <Layout user={props.user} title="indendkorea admin console" nav_id={9} crumbs={['게시판 관리', '게시물 리스트']}>
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
                        <label className="form-label">게시판</label>
                        <select
                            name="board_uid"
                            value={s.values?.board_uid || ''}
                            onChange={fn.handleChange}
                            className={cls(s.errors['board_uid'] ? 'border-danger' : '', 'form-select')}
                        >
                            <option value="">전체</option>
                            {filter.board_uid?.map((v, i) => (
                                <option key={i} value={v.key}>
                                    {v.value}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-1">
                        <label className="form-label">카테고리</label>
                        <select
                            name="cate_uid"
                            value={s.values?.cate_uid || ''}
                            onChange={fn.handleChange}
                            className={cls(s.errors['cate_uid'] ? 'border-danger' : '', 'form-select')}
                        >
                            <option value="">전체</option>
                            {filter.cate_uid?.map((v, i) => (
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
                            goEdit({ uid: 0 });
                        }}
                    >
                        <i className="fas fa-pen me-2"></i> 게시물 등록
                    </button>
                </div>
            </div>

            <div className="col-table">
                <div className="col-table-th grid grid-cols-12 sticky top-16 bg-gray-100">
                    {/* col-span-2 */}
                    <div className="">번호</div>
                    <div className="">프로젝트</div>
                    <div className="">게시판 유형</div>
                    <div className="">게시판 이름</div>
                    <div className="col-span-4">게시물 제목</div>
                    <div className="">카테고리</div>
                    <div className="">등록일</div>
                    <div className="">진열</div>
                    <div className="">상세보기</div>
                </div>

                {posts.map((v: any, i: number) => (
                    <div key={i} className="col-table-td grid grid-cols-12 bg-white transition duration-300 ease-in-out hover:bg-gray-100">
                        <div className="">{v.uid}</div>
                        <div className="">{v.site_id}</div>
                        <div className="">{v.board_type}</div>
                        <div className="">{v.board_name}</div>
                        <div className="col-span-4 !justify-start text-left truncate">
                            {v.thumb == '' || v.thumb == null ? '' : <i className="far fa-image mr-3 text-blue-400"></i>}
                            {v.title}
                        </div>
                        <div className="">{v.cate_name}</div>
                        <div className="">
                            <div dangerouslySetInnerHTML={{ __html: v.create_at }}></div>
                        </div>
                        <div className="">{v.is_display == 'T' ? '진열' : '미진열'}</div>
                        <div className="">
                            <button
                                type="button"
                                className="text-blue-500 underline"
                                onClick={() => {
                                    goEdit(v);
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
        uid: checkNumeric(ctx.query.config_uid),
    };
    var response: any = {};
    try {
        const { data } = await api.post(`/be/admin/posts/list`, request);
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

export default BoardPostsList;
