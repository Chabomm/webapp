import type { GetServerSideProps, NextPage, NextPageContext } from 'next';
import React, { useState, useEffect } from 'react';

import { api, setContext } from '@/libs/axios';
import { getAgentDevice } from '@/libs/utils';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import { useRouter } from 'next/router';
import Seo from 'components/seo';
import Link from 'next/link';

const BBS_view: NextPage = (props: any) => {
    const router = useRouter();
    const { uid } = router.query;

    const [nav_id, setNav_id] = useState<string>('');
    const [nav_name, setNav_name] = useState<string>('');
    const [page_header, setPage_header] = useState<any>({});

    const [posts, setPosts] = useState<any>({});

    useEffect(() => {
        setPosts(props.response);
        find_nav_id();
    }, [props]);

    const find_nav_id = () => {
        if (props.response.board_uid == 1) {
            setNav_id('/bbs/faq');
            setNav_name('자주묻는질문');
            setPage_header({ title: '/bbs/faq', sub: 'Customer Service', nav_id: '자주묻는질문' });
        } else if (props.response.board_uid == 2) {
            setNav_id('/bbs/notice');
            setNav_name('공지사항');
            setPage_header({ title: '공지사항', sub: 'Customer Service', nav_id: '/bbs/notice' });
        } else if (props.response.board_uid == 3) {
            setNav_id('/bbs/news');
            setNav_name('뉴스룸 소식');
            setPage_header({ title: '뉴스룸 소식', sub: 'News room', nav_id: '/bbs/news' });
        } else if (props.response.board_uid == 4) {
            setNav_id('/bbs/media');
            setNav_name('뉴스룸 보도자료');
            setPage_header({ title: '뉴스룸 보도자료', sub: 'News room', nav_id: '/bbs/media' });
        }
    };

    function goBack() {
        router.back();
    }

    const routePosts = (uid: number) => {
        if (uid > 0) {
            router.replace(`/bbs/view/${uid}`);
        }
    };

    const getBoardType = (board_uid: number) => {
        if (board_uid == 3) {
            return '소식';
        } else if (board_uid == 4) {
            return '보도자료';
        } else if (board_uid == 2) {
            return '공지사항';
        }
    };

    return (
        <Layout title={nav_name} nav_id={nav_id} device={props.device}>
            <Seo title={nav_name} />
            <PageHeader params={page_header} device={props.device} />

            <section className="py-32 bbs-contents">
                <div className="mb-6 font-bold text-amber-500">뉴스룸 | {getBoardType(posts.board_uid)}</div>
                <div className="mb-10">
                    <div className="text-2xl font-bold mb-3">{posts.title}</div>
                    <div className="text-zinc-400">{posts.create_at}</div>
                </div>
                <div className="contents-box">
                    {posts.youtube && (
                        <div className="embed-container">
                            <iframe src={`https://www.youtube.com/embed/${posts.youtube}`} frameBorder="0" allowFullScreen></iframe>
                        </div>
                    )}
                    <div dangerouslySetInnerHTML={{ __html: posts.contents }}></div>
                    {props.response.contents.map((v: any, i: number) => (
                        <div key={i}>
                            {v.btype == 'img' ? (
                                v.link != '' ? (
                                    <Link href={v.link} target={v.link_target}>
                                        <img src={v.image_url} className="w-full" />
                                    </Link>
                                ) : (
                                    <img src={v.image_url} className="w-full" />
                                )
                            ) : (
                                <div dangerouslySetInnerHTML={{ __html: v.html }}></div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="border-t border-black bg-white">
                    <div className="flex justify-between py-2 px-10 border-b">
                        <div>
                            <i className="fas fa-chevron-up me-2"></i>이전글
                        </div>
                        <div className="flex-grow px-10">
                            <div
                                onClick={e => {
                                    routePosts(posts?.prev_posts?.uid);
                                }}
                                className="cursor-pointer"
                            >
                                {posts?.prev_posts?.title}
                            </div>
                        </div>
                        <div className="text-gray-500">{posts?.prev_posts?.create_at}</div>
                    </div>
                    <div className="flex justify-between py-2 px-10">
                        <div>
                            <i className="fas fa-chevron-down me-2"></i>다음글
                        </div>
                        <div className="flex-grow px-10">
                            <div
                                onClick={e => {
                                    routePosts(posts?.next_posts?.uid);
                                }}
                                className="cursor-pointer"
                            >
                                {posts?.next_posts?.title}
                            </div>
                        </div>
                        <div className="text-gray-500">{posts?.next_posts?.create_at}</div>
                    </div>
                </div>
                <div className="pt-4 border-t-2 text-xs text-zinc-400 font-semibold">{props.response.tags}</div>
                <div className="text-center">
                    <div
                        onClick={() => {
                            goBack();
                        }}
                        className="bg-amber-200 rounded-full inline-flex font-bold px-6 py-1 cursor-pointer mt-14"
                    >
                        목록으로
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    setContext(ctx);
    const device = getAgentDevice(ctx);
    var request = {
        posts_uid: ctx.query.uid,
    };

    var response: any = {};
    try {
        const { data } = await api.post(`/be/front/posts/read`, request);
        response = data;
    } catch (e: any) {
        if (typeof e.redirect !== 'undefined') {
            return { redirect: e.redirect };
        }
    }
    return {
        props: { request, response, device: device },
    };
};

export default BBS_view;
