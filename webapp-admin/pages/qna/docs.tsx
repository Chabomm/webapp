import type { GetServerSideProps, NextPage, NextPageContext } from 'next';
import React, { useState, useEffect, useRef } from 'react';
import { api, setContext } from '@/libs/axios';
import 'moment/locale/ko';
import Datepicker from 'react-tailwindcss-datepicker';
import { useRouter } from 'next/router';
import { cls, Unix_timestampConv, checkNumeric } from '@/libs/utils';

import Layout from '@/components/Layout';
import useForm from '@/components/form/useForm';
import ListPagenation from '@/components/bbs/ListPagenation';

import * as XLSX from 'xlsx-js-style';
import { sheet_from_array_of_arrays_common } from '@/libs/excel_style';

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
            const { data } = await api.post(`/be/admin/qna/docs`, p);
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
            const { data } = await api.post(`/be/admin/qna/docs/filter`);
            setFilter(data);
        } catch (e: any) {}
    };

    const searching = async () => {
        params.filters = s.values;
        let newPosts = await getPostsData(params);
        setPosts(newPosts.list);
    };

    const excelDown = async () => {
        const excel_data = new Array();
        let excel_row = new Array();

        excel_row.push('UID');
        excel_row.push('DOC_TYPE');
        excel_row.push('기업명');
        excel_row.push('담당자명');
        excel_row.push('연락처');
        excel_row.push('이메일');
        excel_row.push('CLIENT_IP');
        excel_row.push('REG_DATE');
        excel_row.push('RESULT');
        excel_data.push(excel_row);

        posts.forEach(function (v, i, a) {
            var excel_row = new Array();
            excel_row.push(v.UID);
            excel_row.push(v.DOC_TYPE);
            excel_row.push(v.COMPANY);
            excel_row.push(v.STAFF);
            excel_row.push(v.MOBILE);
            excel_row.push(v.TO_EMAIL);
            excel_row.push(v.CLIENT_IP);
            excel_row.push(v.REG_DATE);
            excel_row.push(v.RESULT);
            excel_data.push(excel_row);
        });

        const wb: any = XLSX.utils.book_new();
        const ws = sheet_from_array_of_arrays_common(excel_data);
        const file_name = '소개서다운이력'; // export 될 파일의 이름 and SheetName
        XLSX.utils.book_append_sheet(wb, ws, file_name);
        XLSX.writeFile(wb, `${file_name}_${Unix_timestampConv()}.xlsx`);
    };

    const handlePageChange = async (e: any) => {
        const copy = { ...params };
        copy.page_view_size = checkNumeric(e.target.value);
        setParams(copy);
        getPagePost(copy);
    };

    return (
        <Layout user={props.user} title="indendkorea admin console" nav_id={14} crumbs={['문의내역', '소개서다운이력']}>
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
                    <div className="col-span-4 flex justify-between">
                        <div>
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
                        <div className="">
                            <select name="page_view_size" value={params.page_view_size || ''} onChange={handlePageChange} className="form-select">
                                <option value="30">30개씩 보기</option>
                                <option value="50">50개씩 보기</option>
                                <option value="100">100개씩 보기</option>
                                <option value="200">200개씩 보기</option>
                            </select>
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
                        className="btn-funcs !bg-green-700"
                        onClick={() => {
                            excelDown();
                        }}
                    >
                        <i className="far fa-file-excel me-2"></i> 엑셀 다운로드
                    </button>
                </div>
            </div>

            <div className="col-table">
                <div className="col-table-th grid grid-cols-12 sticky top-16 bg-gray-100">
                    {/* col-span-2 */}
                    <div className="">UID</div>
                    <div className="">DOC_TYPE</div>
                    <div className="col-span-2">기업명</div>
                    <div className="">담당자명</div>
                    <div className="">연락처</div>
                    <div className="col-span-2">이메일</div>
                    <div className="">CLIENT_IP</div>
                    <div className="">REG_DATE</div>
                    <div className="col-span-2">RESULT</div>
                </div>

                {posts.map((v: any, i: number) => (
                    <div key={i} className="col-table-td grid grid-cols-12 bg-white transition duration-300 ease-in-out hover:bg-gray-100">
                        <div className="">{v.UID}</div>
                        <div className="">{v.DOC_TYPE}</div>
                        <div className="col-span-2">{v.COMPANY}</div>
                        <div className="">{v.STAFF}</div>
                        <div className="">{v.MOBILE}</div>
                        <div className="col-span-2">{v.TO_EMAIL}</div>
                        <div className="">{v.CLIENT_IP}</div>
                        <div className="">{v.REG_DATE}</div>
                        <div className="col-span-2">{v.RESULT}</div>
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
        const { data } = await api.post(`/be/admin/qna/docs`, request);
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
