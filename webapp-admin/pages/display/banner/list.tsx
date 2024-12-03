import type { GetServerSideProps, NextPage, NextPageContext } from 'next';
import React, { useState, useEffect, useRef } from 'react';
import { api, setContext } from '@/libs/axios';
import 'moment/locale/ko';
import { useRouter } from 'next/router';
import { checkNumeric } from '@/libs/utils';
import { ReactSortable } from 'react-sortablejs';

import Layout from '@/components/Layout';
import BannerEdit from '@/components/display/main/BannerEdit';
import CategoryMag from '@/components/cate/CategoryMag';

const MainBannerList: NextPage = (props: any) => {
    const router = useRouter();
    const { siteid } = router.query;
    const [posts, setPosts] = useState<any>([]);
    const [main, setMain] = useState<any>({});
    const [sort, setSort] = useState<any>([]);
    const [sortDiff, setSortDiff] = useState<boolean>(false);

    useEffect(() => {
        if (JSON.stringify(props) !== '{}') {
            setPosts(props.response.list);
            setMain(props.response.main);
            openCategoryMag(props);
        }
    }, [props]);

    useEffect(() => {
        if (sort.length == 0) {
            posts.map((v: any) => {
                setSort(current => [...current, v.uid]);
            });
        } else {
            var sort_diff = false;
            posts.map((v: any, i: number) => {
                if (v.uid != sort[i]) {
                    sort_diff = true;
                }
            });
            if (sort_diff) {
                setSort([]);
                posts.map((v: any) => {
                    setSort(current => [...current, v.uid]);
                });
                setSortDiff(sort_diff);
            }
        }
    }, [posts]);

    var oNav = { nav_id: 10, nav_name: '복지드림' };
    if (siteid == 'dream') {
        oNav = { nav_id: 10, nav_name: '복지드림' };
    } else if (siteid == 'indend') {
        oNav = { nav_id: 11, nav_name: '인디앤드' };
    }

    const create_main_json = async itme => {
        const p = {
            site_id: itme.site_id,
            area: itme.area,
            area_class: itme.area_class,
            display_type: itme.display_type,
            cont_uid: itme.cont_uid,
            cont_type: itme.cont_type,
        };
        try {
            const { data } = await api.post(`/be/admin/main/create`, p);
            alert(data.msg);
        } catch (e: any) {}
    };

    const refBannerEdit = useRef<any>();
    function openBannerEdit(item: any) {
        item.cate_list = refCategoryMag.current.get_cate_posts().list;
        refBannerEdit.current.init(item, main);
    }

    const refCategoryMag = useRef<any>();
    function openCategoryMag(item: any) {
        refCategoryMag.current.init({
            table_name: 'T_MAIN',
            table_uid: item.request.uid,
        });
    }

    const sortableOptions = {
        animation: 150,
        handle: '.handle',
    };

    const sorting = async itme => {
        const p = {
            mode: 'SORT',
            main_uid: itme.uid,
            sort_array: sort,
        };

        try {
            const { data } = await api.post(`/be/admin/main/banner/edit`, p);
            if (data.code == 200) {
                alert(data.msg);
            } else {
                alert(data.msg);
            }
        } catch (e: any) {}
    };

    const getAreaClassName = area_class => {
        if (area_class == 'A') {
            return '웹&모바일';
        } else if (area_class == 'W') {
            return '웹(PC)';
        } else if (area_class == 'M') {
            return '모바일';
        }
    };

    return (
        <Layout user={props.user} title="indendkorea admin console" nav_id={oNav.nav_id} crumbs={['디자인 관리', oNav.nav_name]}>
            <div className="col-table mb-10">
                <div className="col-table-th grid grid-cols-4 sticky top-16 bg-gray-100">
                    <div className="">영역코드</div>
                    <div className="">영역명</div>
                    <div className="">메인생성</div>
                    <div className="">웹(PC) 영역 변경</div>
                </div>

                <div className="col-table-td grid grid-cols-4 bg-white transition duration-300 ease-in-out hover:bg-gray-100">
                    <div className="">{main?.area}</div>
                    <div className="">{main?.area_name}</div>
                    <div className="">
                        <button
                            onClick={() => {
                                create_main_json(main);
                            }}
                            className="text-blue-500 underline"
                        >
                            생성
                        </button>
                    </div>
                    <div className="">
                        <button className="text-blue-500 underline"></button>
                    </div>
                </div>
            </div>

            <CategoryMag ref={refCategoryMag} />

            {sortDiff && (
                <div className="py-5">
                    <button
                        type="button"
                        className="btn-funcs"
                        onClick={() => {
                            sorting(main);
                        }}
                    >
                        배너 순서 적용하기
                    </button>
                    <div className="text-red-600 font-bold ml-5">순서가 변경되었습니다. 적용하기 버튼을 클릭하여 저장해 주세요</div>
                </div>
            )}

            <div className="border-t py-3 grid grid-cols-2 h-16 items-center mb-2">
                <div className="text-left">총 {posts.list?.length} 개</div>
                <div className="text-right">
                    <button
                        type="button"
                        className="btn-funcs"
                        onClick={() => {
                            openBannerEdit({ uid: 0 });
                        }}
                    >
                        <i className="fas fa-pen me-2"></i> 등록
                    </button>
                </div>
            </div>
            <div className="col-table">
                <div className="col-table-th grid grid-cols-12 sticky top-16 bg-gray-100">
                    <div className="">순서</div>
                    <div className="col-span-1">고유번호</div>
                    <div className="col-span-1">카테고리</div>
                    <div className="col-span-2">배너명</div>
                    <div className="col-span-1">플랫폼</div>
                    <div className="col-span-3">미리보기/배너수정</div>
                    <div className="col-span-1">노출상태</div>
                    <div className="col-span-1">기능</div>
                </div>

                <ReactSortable {...sortableOptions} list={posts} setList={setPosts} dragClass="sortableDrag">
                    {posts?.map((v: any, i: number) => (
                        <div key={i} className="col-table-td grid grid-cols-12 bg-white transition duration-300 ease-in-out hover:bg-gray-100">
                            <div className="handle flex-col cursor-pointer">
                                <div className="flex items-center justify-center border p-3 rounded bg-slate-50">
                                    <i className="fas fa-sort me-2"></i>
                                    <div className="font-semibold">{v.sort}</div>
                                </div>
                            </div>
                            <div className="col-span-1">{v.uid}</div>
                            <div className="col-span-1">{v.cate_name}</div>
                            <div className="col-span-2">{v.banner_name}</div>
                            <div className="col-span-1">{getAreaClassName(v.area_class)}</div>
                            <div className="col-span-3">
                                <div className="">
                                    <img src={v.banner_src} style={{ maxWidth: '100%', maxHeight: '100px' }} />
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div>[{v.is_display == 'T' ? '진열' : '미진열'}]</div>
                            </div>
                            <div className="col-span-1">
                                <button
                                    type="button"
                                    onClick={() => {
                                        openBannerEdit(v);
                                    }}
                                >
                                    수정
                                </button>
                            </div>
                        </div>
                    ))}
                </ReactSortable>
            </div>
            <BannerEdit ref={refBannerEdit} />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    setContext(ctx);
    var request: any = { uid: checkNumeric(ctx.query.uid) };
    var response: any = {};
    try {
        const { data } = await api.post(`/be/admin/main/banner/list`, request);
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

export default MainBannerList;
