import React, { useState, useEffect } from 'react';
import { api } from '@/libs/axios';
import { useRouter } from 'next/router';

import useForm from '@/components/form/useForm';
import Link from 'next/link';

function BoardPostFaq({ board_uid, device }: any) {
    const router = useRouter();
    const [filter, setFilter] = useState<any>({});
    const [params, setParams] = useState<any>({});
    const [posts, setPosts] = useState<any>([]);
    const [board, setBoard] = useState<any>({});
    const [cates, setCates] = useState([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (sessionStorage.getItem(router.asPath) || '{}' !== '{}') {
                const reData = JSON.parse(sessionStorage.getItem(router.asPath) || '{}').data;
                setFilter(reData.filter);
                setParams(reData.params);
                setPosts(reData.posts);
                setBoard(reData.board);
                const scroll = parseInt(JSON.parse(sessionStorage.getItem(router.asPath) || '{}').scroll_y, 10);
                let intervalRef = setInterval(() => {
                    window.scrollTo(0, scroll);
                    sessionStorage.removeItem(router.asPath);
                    clearInterval(intervalRef);
                }, 200);
            } else {
                getPostsInit({ uid: board_uid });
            }
        }
    }, [router.asPath]);

    const getPostsInit = async (p: any) => {
        try {
            const { data } = await api.post(`/be/front/posts/init`, p);
            if (data.code == 200) {
                setBoard(data.board);
                setFilter(data.filter);
                setParams(data.params);
                setParams(data.params);
                setCates(data.cates);
                getPagePost(data.params);
            } else {
                alert(data.msg);
                router.back();
            }
        } catch (e) {}
    };

    const getPagePost = async (p: any) => {
        let newPosts = await getPostsData(p);
        setPosts(newPosts.list);
    };

    const getPostsData = async (p: any) => {
        try {
            const { data } = await api.post(`/be/front/posts/list`, p);
            setParams(data.params);
            return data;
        } catch (e) {}
    };

    const { s, fn, attrs } = useForm({
        initialValues: {
            skeyword_type: '',
            skeyword: '',
        },
        onSubmit: async () => {
            await searching();
        },
    });

    const searching = async () => {
        params.filters = s.values;
        let newPosts = await getPostsData(params);
        setPosts(newPosts.list);
    };

    // 카테고리 선택
    const changeCate = async (cate_uid: number) => {
        const details = document.querySelectorAll('details');
        details.forEach(targetDetail => {
            targetDetail.removeAttribute('open');
        });

        var p: any = { ...params };
        p.page = 1;
        p.cate_uid = cate_uid;
        getPagePost(p);
    };

    return (
        <section className="w-full lg:w-1200 mx-auto pb-20 mt-20">
            {cates.length > 0 && (
                <div className="tab_area pb-16 pt-24 flex justify-center font-bold">
                    <div
                        className="text-lg mx-5"
                        onClick={e => {
                            changeCate(0);
                        }}
                    >
                        <span className={`${params?.cate_uid === 0 ? 'active' : ''} cursor-pointer`}>전체</span>
                    </div>

                    {cates?.map((v: any, i: number) => (
                        <div
                            key={i}
                            className="text-lg mx-5"
                            onClick={e => {
                                changeCate(v.uid);
                            }}
                        >
                            <span className={`${v.uid === params?.cate_uid ? 'active' : ''} cursor-pointer`}>{v.cate_name}</span>
                        </div>
                    ))}
                </div>
            )}

            {device == 'desktop' ? (
                <div className="grid divide-neutral-200 mx-auto mt-8">
                    {posts.map?.((v: any, i: number) => (
                        <div key={i} className="py-5 border-b">
                            <details className="group">
                                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                    <span className="group-open:text-2xl"> {v.title}</span>
                                    <span className="transition group-open:rotate-180">
                                        <i className="fas fa-angle-down"></i>
                                    </span>
                                </summary>

                                <div className="text-neutral-600 mt-3">
                                    <div dangerouslySetInnerHTML={{ __html: v.contents }}></div>
                                </div>
                            </details>
                        </div>
                    ))}
                </div>
            ) : null}
        </section>
    );
}

export default BoardPostFaq;
