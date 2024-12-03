import { api, setContext } from '@/libs/axios';
import type { GetServerSideProps, NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { checkNumeric } from '@/libs/utils';
import Layout from '@/components/Layout';
import { ReactSortable } from 'react-sortablejs';

const DeeplinkPostList: NextPage = (props: any) => {
    const router = useRouter();
    const [posts, setPosts] = useState<any>([]);
    const [sort, setSort] = useState<any>([]);
    const [sortDiff, setSortDiff] = useState<boolean>(false);
    useEffect(() => {
        if (JSON.stringify(props) !== '{}') {
            setPosts(props.response.list);
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

    const openDeepLinkPostsEdit = (uid: number) => {
        window.open(
            `/ums/deeplink/posts/edit?group_uid=${router.query.uid}&uid=${uid}&site_id=${props.response.group.site_id}`,
            '딥링크 게시글 정보',
            'width=1120,height=800,location=no,status=no,scrollbars=yes,left=220%,top=50%'
        );
    };

    const sortableOptions = {
        animation: 150,
        handle: '.handle',
    };

    const sorting = async v => {
        try {
            const p = {
                mode: 'SORT',
                // depth: 1,
                group_id: checkNumeric(props.response.group.uid),
                sort_array: sort,
            };
            const { data } = await api.post(`/be/admin/applink/deeplink/edit`, p);
            if (data.code == 200) {
                alert(data.msg);
                router.reload();
            } else {
                alert(data.msg);
            }
        } catch (e: any) {}
    };

    return (
        <Layout user={props.user} title="indendkorea admin console" nav_id={48} crumbs={['UMS관리', '딥링크']}>
            <div className="w-full border py-4 px-6 rounded shadow-md bg-white mt-5 relative">
                <div className="text-2xl font-bold mb-2">{props.response.group.title}</div>
                {[
                    ['등록일', props.response.group.create_at],
                    ['프로젝트', props.response.group.site_name],
                    ['딥링크', props.response.group.deep_link],
                    ['aos_store', props.response.group.aos_store],
                    ['ios_store', props.response.group.ios_store],
                ].map(([title, body]) => (
                    <div key={title} className="mb-1">
                        <span className="font-bold">{title}</span> : {body}
                    </div>
                ))}
            </div>
            <div className="border-t py-3 grid grid-cols-2 h-16 items-center mb-2">
                <div className="text-left">총 {posts.length}개</div>
                <div className="text-right">
                    <button
                        type="button"
                        className="btn-funcs"
                        onClick={() => {
                            openDeepLinkPostsEdit(0);
                        }}
                    >
                        <i className="fas fa-pen me-2"></i> 등록
                    </button>
                </div>
            </div>

            {sortDiff && (
                <div className="py-5">
                    <button
                        type="button"
                        className="btn-funcs"
                        onClick={() => {
                            sorting(posts);
                        }}
                    >
                        순서 적용하기
                    </button>
                    <div className="text-red-600 font-bold ml-5">순서가 변경되었습니다. 적용하기 버튼을 클릭하여 저장해 주세요</div>
                </div>
            )}

            <div className="col-table">
                <div className="col-table-th grid grid-cols-8 sticky top-16 bg-gray-100">
                    <div className="">순서</div>
                    <div className="">uid</div>
                    <div className="">링크타입</div>
                    <div className="col-span-3">링크</div>
                    <div className="">배너</div>
                    <div className="">수정</div>
                </div>
                <ReactSortable {...sortableOptions} list={posts} setList={setPosts} dragClass="sortableDrag">
                    {posts.map((v: any, i: number) => (
                        <div key={i} className="col-table-td grid grid-cols-8 bg-white transition duration-300 ease-in-out hover:bg-gray-100">
                            <div className="handle flex-col cursor-pointer">
                                <div className="flex items-center justify-center border p-3 rounded bg-slate-50">
                                    <i className="fas fa-sort me-2"></i>
                                    <div className="font-semibold">{v.sort}</div>
                                </div>
                            </div>
                            <div className="">{v.uid}</div>
                            <div className="">{v.dlink_type}</div>
                            <div className="col-span-3 !justify-start">
                                <div className="text-start">
                                    <div className="flex mb-2">
                                        <div className="w-20 shrink-0 font-bold">복지몰경로</div>
                                        <div className="grow">{v.mall_link}</div>
                                    </div>
                                    <div className="flex mb-2">
                                        <div className="w-20 shrink-0 font-bold">딥링크</div>
                                        <div className="grow">{v.app_link}</div>
                                    </div>
                                    <div className="flex mb-2">
                                        <div className="w-20 shrink-0 font-bold">포스트용</div>
                                        <div className="grow">
                                            {/* {process.env.NODE_ENV != 'development' ? 'https://indendkorea.com/' : 'http://localhost:11000/'}applink/{v.group_id}?uid={v.uid} */}
                                            {`https://indendkorea.com/applink/${v.group_id}?uid=${v.uid}`}
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-20 shrink-0 font-bold">단축URL</div>
                                        <div className="grow"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <img src={v.banner} className="w-full" />
                            </div>
                            <div className="">
                                <button
                                    type="button"
                                    className="text-blue-500 underline"
                                    onClick={() => {
                                        openDeepLinkPostsEdit(v.uid);
                                    }}
                                >
                                    수정
                                </button>
                            </div>
                        </div>
                    ))}
                </ReactSortable>
            </div>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    setContext(ctx);
    var request: any = {
        uid: ctx.query.uid,
    };
    var response: any = {};
    try {
        const { data } = await api.post(`/be/admin/applink/deeplink/posts`, request);
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

export default DeeplinkPostList;
