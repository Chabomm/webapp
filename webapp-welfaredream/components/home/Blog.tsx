import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import BannerForLinkType from '../UIcomponent/BannerForLinkType';

export default function Blog({ data, device }: any) {
    const [blogswiper, setBlogSwiper] = useState<any>();
    const [blogEnd, setBlogEnd] = useState<boolean>(false);
    const [blogFirst, setBlogFirst] = useState<boolean>(true);

    const [newsswiper, setNewsSwiper] = useState<any>();
    const [newsEnd, setNewsEnd] = useState<boolean>(false);
    const [newsFirst, setNewsFirst] = useState<boolean>(true);

    const [mediaswiper, setMediaSwiper] = useState<any>();
    const [mediaEnd, setMediaEnd] = useState<boolean>(false);
    const [mediaFirst, setMediaFirst] = useState<boolean>(true);

    return (
        <>
            {device == 'desktop' ? (
                <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                    <section className="w-full pt-28 pb-12">
                        <div className="section_box">
                            <div className="tracking-tighter text-center pb-16 relative">
                                <div className="font-bold pb-2" style={{ fontSize: '42px' }}>
                                    커뮤니티
                                </div>
                                <div className="text-xl text-center">사내복지, 어디까지 챙겨봤니?</div>
                            </div>

                            <div className="swiper_community grid grid-cols-2 text-start border overflow-hidden" style={{ height: '32rem' }}>
                                {/* <!-- 블로그 --> */}
                                <div className="p-7 relative border-r flex flex-col">
                                    <div className="text-3xl mb-10 font-bold relative">
                                        <img alt="img" src="/resource/welfaredream/images/main/web/commu_img_01.png" className="inline-block" />
                                        <span className="mx-2">블로그</span>
                                        <span className="text-2xl text-zinc-400">Blog</span>
                                        <button
                                            onClick={() => blogswiper?.slidePrev()}
                                            className="swiper_navi swiper_prev"
                                            disabled={blogFirst}
                                            style={{ opacity: `${blogFirst ? '0.3' : '1'}`, right: '45px' }}
                                        ></button>
                                        <button
                                            onClick={() => blogswiper?.slideNext()}
                                            className="swiper_navi swiper_next"
                                            disabled={blogEnd}
                                            style={{ opacity: `${blogEnd ? '0.3' : '1'}` }}
                                        ></button>
                                    </div>
                                    <div id="swiper_blog" className="flex h-full">
                                        <Swiper
                                            slidesPerView={1}
                                            onBeforeInit={swipper => setBlogSwiper(swipper)}
                                            onSlideChange={e => {
                                                e.isEnd ? setBlogEnd(true) : setBlogEnd(false);
                                                e.isBeginning ? setBlogFirst(true) : setBlogFirst(false);
                                            }}
                                        >
                                            {data.BLOG_LIST?.map((v: any, i: number) => (
                                                <SwiperSlide key={i}>
                                                    <div className="text-xl font-bold pb-4 text-black text-center">{v.banner_name}</div>
                                                    <div className="pt-3">
                                                        <BannerForLinkType item={v} img={<img alt="img" src={v.banner_src} className="mx-auto" />} />
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                </div>
                                {/* 새소식 / 보도자료 */}
                                <div>
                                    <div className="p-7 relative border-b h-64">
                                        <div className="text-3xl pb-6 font-bold relative">
                                            <img alt="img" src="/resource/welfaredream/images/main/web/commu_img_02.png" className="inline-block" />
                                            <span className="mx-2">새소식</span>
                                            <span className="text-2xl text-zinc-400">News</span>
                                            <button
                                                onClick={() => newsswiper?.slidePrev()}
                                                className="swiper_navi swiper_prev"
                                                disabled={newsFirst}
                                                style={{ opacity: `${newsFirst ? '0.3' : '1'}`, right: '45px' }}
                                            ></button>
                                            <button
                                                onClick={() => newsswiper?.slideNext()}
                                                className="swiper_navi swiper_next"
                                                disabled={newsEnd}
                                                style={{ opacity: `${newsEnd ? '0.3' : '1'}` }}
                                            ></button>
                                        </div>
                                        <div id="swiper_news">
                                            <Swiper
                                                slidesPerView={1}
                                                onBeforeInit={swipper => setNewsSwiper(swipper)}
                                                onSlideChange={e => {
                                                    e.isEnd ? setNewsEnd(true) : setNewsEnd(false);
                                                    e.isBeginning ? setNewsFirst(true) : setNewsFirst(false);
                                                }}
                                            >
                                                {data.NEWS_LIST?.map((v: any, i: number) => (
                                                    <SwiperSlide key={i}>
                                                        <div className="flex">
                                                            <Link style={{ width: '200px' }} href={`/bbs/view/${v.uid}`}>
                                                                <img alt="img" src={v.thumb} className="w-full" />
                                                            </Link>
                                                            <div className="grow pl-4">
                                                                <Link href={`/bbs/view/${v.uid}`} className="text-black text-lg font-bold">
                                                                    {v.title}
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>
                                                ))}
                                            </Swiper>
                                        </div>
                                    </div>
                                    <div className="p-7 relative h-64">
                                        <div className="text-3xl pb-6 font-bold relative">
                                            <img alt="img" src="/resource/welfaredream/images/main/web/commu_img_03.png" className="inline-block" />
                                            <span className="mx-2">보도자료</span>
                                            <span className="text-2xl text-zinc-400">Media</span>
                                            <button
                                                onClick={() => mediaswiper?.slidePrev()}
                                                className="swiper_navi swiper_prev"
                                                disabled={mediaFirst}
                                                style={{ opacity: `${mediaFirst ? '0.3' : '1'}`, right: '45px' }}
                                            ></button>
                                            <button
                                                onClick={() => mediaswiper?.slideNext()}
                                                className="swiper_navi swiper_next"
                                                disabled={mediaEnd}
                                                style={{ opacity: `${mediaEnd ? '0.3' : '1'}` }}
                                            ></button>
                                        </div>
                                        <div id="swiper_media">
                                            <Swiper
                                                slidesPerView={1}
                                                onBeforeInit={swipper => setMediaSwiper(swipper)}
                                                onSlideChange={e => {
                                                    e.isEnd ? setMediaEnd(true) : setMediaEnd(false);
                                                    e.isBeginning ? setMediaFirst(true) : setMediaFirst(false);
                                                }}
                                            >
                                                {data.MEDIA_LIST?.map((v: any, i: number) => (
                                                    <SwiperSlide key={i}>
                                                        <div className="flex">
                                                            <Link style={{ width: '200px' }} href={`/bbs/view/${v.uid}`}>
                                                                <img alt="img" src={v.thumb} className="w-full" />
                                                            </Link>
                                                            <div className="grow pl-4">
                                                                <Link href={`/bbs/view/${v.uid}`} className="text-black text-lg font-bold">
                                                                    {v.title}
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>
                                                ))}
                                            </Swiper>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <img alt="img" src="/resource/welfaredream/images/main/web/wide_bnner.jpg" className="w-full" />
                    </section>
                </motion.div>
            ) : (
                <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                    <section className="pt-16 text-center">
                        <div>
                            <div className="font-bold pb-3 text-3xl">커뮤니티</div>
                            <div className="pb-4">사내복지, 어디까지 챙겨봤니?</div>
                        </div>

                        <div className="p-7">
                            <div className="swiper_community text-start">
                                {/* 블로그 */}
                                <div className="border py-8 px-5 relative">
                                    <div className="text-2xl pb-4 font-bold relative">
                                        <img alt="img" src="/resource/welfaredream/images/main/web/commu_img_01.png" className="inline-block pr-2" />
                                        <span>블로그</span>
                                        <span className="text-lg pl-2 text-zinc-400">Blog</span>
                                        <button
                                            onClick={() => blogswiper?.slidePrev()}
                                            className="m_swiper_navi swiper_prev"
                                            disabled={blogFirst}
                                            style={{ opacity: `${blogFirst ? '0.3' : '1'}`, right: '30px', borderRadius: '20px' }}
                                        ></button>
                                        <button
                                            onClick={() => blogswiper?.slideNext()}
                                            className="m_swiper_navi swiper_next"
                                            disabled={blogEnd}
                                            style={{ opacity: `${blogEnd ? '0.3' : '1'}`, borderRadius: '20px' }}
                                        ></button>
                                    </div>

                                    <div id="swiper_blog" className="text-lg">
                                        <Swiper
                                            slidesPerView={1}
                                            onBeforeInit={swipper => setBlogSwiper(swipper)}
                                            onSlideChange={e => {
                                                e.isEnd ? setBlogEnd(true) : setBlogEnd(false);
                                                e.isBeginning ? setBlogFirst(true) : setBlogFirst(false);
                                            }}
                                        >
                                            {data.BLOG_LIST?.map((v: any, i: number) => (
                                                <SwiperSlide key={i}>
                                                    <Link href={v.txt1} className="font-bold text-black">
                                                        {v.banner_name}
                                                    </Link>
                                                    <div className="pt-3">
                                                        <BannerForLinkType item={v} img={<img alt="img" src={v.banner_src} className="mx-auto" />} />
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                </div>

                                {/* 새소식 */}
                                <div className="border border-t-0 py-8 px-5 relative">
                                    <div className="text-2xl pb-3 font-bold relative">
                                        <img alt="img" src="/resource/welfaredream/images/main/web/commu_img_02.png" className="inline-block" />
                                        <span className="mx-2">새소식</span>
                                        <span className="text-lg text-zinc-400">News</span>
                                        <button
                                            onClick={() => newsswiper?.slidePrev()}
                                            className="m_swiper_navi swiper_prev"
                                            disabled={newsFirst}
                                            style={{ opacity: `${newsFirst ? '0.3' : '1'}`, right: '30px', borderRadius: '20px' }}
                                        ></button>
                                        <button
                                            onClick={() => newsswiper?.slideNext()}
                                            className="m_swiper_navi swiper_next"
                                            disabled={newsEnd}
                                            style={{ opacity: `${newsEnd ? '0.3' : '1'}`, borderRadius: '20px' }}
                                        ></button>
                                    </div>
                                    <div id="swiper_news">
                                        <Swiper
                                            slidesPerView={1}
                                            onBeforeInit={swipper => setNewsSwiper(swipper)}
                                            onSlideChange={e => {
                                                e.isEnd ? setNewsEnd(true) : setNewsEnd(false);
                                                e.isBeginning ? setNewsFirst(true) : setNewsFirst(false);
                                            }}
                                        >
                                            {data.NEWS_LIST?.map((v: any, i: number) => (
                                                <SwiperSlide key={i}>
                                                    <div className="flex">
                                                        <Link style={{ width: '45%' }} href={`/bbs/view/${v.uid}`}>
                                                            <img alt="img" src={v.thumb} className="w-full" />
                                                        </Link>
                                                        <div className="grow pl-4">
                                                            <Link href={`/bbs/view/${v.uid}`} className="text-black font-bold">
                                                                {v.title}
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                </div>
                                <div className="border border-t-0 py-8 px-5 relative">
                                    <div className="text-2xl pb-3 font-bold relative">
                                        <img alt="img" src="/resource/welfaredream/images/main/web/commu_img_02.png" className="inline-block" />
                                        <span className="mx-2">보도자료</span>
                                        <span className="text-lg text-zinc-400">Media</span>
                                        <button
                                            onClick={() => mediaswiper?.slidePrev()}
                                            className="m_swiper_navi swiper_prev"
                                            disabled={mediaFirst}
                                            style={{ opacity: `${mediaFirst ? '0.3' : '1'}`, right: '30px', borderRadius: '20px' }}
                                        ></button>
                                        <button
                                            onClick={() => mediaswiper?.slideNext()}
                                            className="m_swiper_navi swiper_next"
                                            disabled={mediaEnd}
                                            style={{ opacity: `${mediaEnd ? '0.3' : '1'}`, borderRadius: '20px' }}
                                        ></button>
                                    </div>

                                    <div id="swiper_media">
                                        <Swiper
                                            slidesPerView={1}
                                            onBeforeInit={swipper => setMediaSwiper(swipper)}
                                            onSlideChange={e => {
                                                e.isEnd ? setMediaEnd(true) : setMediaEnd(false);
                                                e.isBeginning ? setMediaFirst(true) : setMediaFirst(false);
                                            }}
                                        >
                                            {data.MEDIA_LIST?.map((v: any, i: number) => (
                                                <SwiperSlide key={i}>
                                                    <div className="flex">
                                                        <Link style={{ width: '45%' }} href={`/bbs/view/${v.uid}`}>
                                                            <img alt="img" src={v.thumb} className="w-full" />
                                                        </Link>
                                                        <div className="grow pl-4">
                                                            <Link href={`/bbs/view/${v.uid}`} className="text-black font-bold">
                                                                {v.title}
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <img alt="img" src="/resource/welfaredream/images/main/mobile/wide_bnner.png" className="w-full pt-5" />
                    </section>
                </motion.div>
            )}
        </>
    );
}
