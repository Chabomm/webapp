import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { cls } from '@/libs/utils';

export default function Welfare({ data, device }: any) {
    const [welfare, setWelfare] = useState([]);
    const [active, setActive] = useState(0);
    const [swiper, setSwiper] = useState<any>();
    const [reachingEnd, setReachingEnd] = useState<boolean>(false);
    const [reachingFirst, setReachingFirst] = useState<boolean>(true);

    useEffect(() => {
        if (typeof data.WELFARE_CATE_LIST !== 'undefined' && data.WELFARE_CATE_LIST.length > 0) {
            getWelfare(data.WELFARE_CATE_LIST[0].uid);
        }
    }, [data]);

    const getWelfare = (uid: number) => {
        setActive(uid);
        setWelfare(getListFilter(data.WELFARE_LIST, 'cate_uid', uid));
        setReachingEnd(false);
        setReachingFirst(true);
    };

    function getListFilter(data: any, key: any, value: any) {
        return data.filter(function (object: any) {
            return object[key] === value;
        });
    }

    return (
        <>
            {device == 'desktop' ? (
                <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                    <section className="w-full py-28">
                        <div className="section_box">
                            <div className="tracking-tighter text-center pb-16 relative">
                                <div className="font-bold pb-2" style={{ fontSize: '42px' }}>
                                    대표 복지혜택
                                </div>
                                <div className="text-xl text-center">건강, 문화, 교육, 쇼핑 등 다양한 복지혜택을 확인하세요!</div>
                            </div>

                            <div>
                                <div className="pb-16 flex justify-center">
                                    {data.WELFARE_CATE_LIST?.map((v: any, i: number) => (
                                        <div key={i} className={`${v.uid == active ? ' border-b-2 border-amber-500 text-amber-500 font-bold' : ''} text-lg mx-3`}>
                                            <span
                                                className="cursor-pointer"
                                                onClick={() => {
                                                    getWelfare(v.uid);
                                                }}
                                            >
                                                {v.cate_name}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="SwiperWrapper relative">
                                    <button
                                        onClick={() => swiper?.slidePrev()}
                                        className={cls(reachingFirst ? 'swiper_slide_fin' : '', 'swiper_navi swiper_prev')}
                                        disabled={reachingFirst}
                                    ></button>
                                    <Swiper
                                        spaceBetween={30}
                                        slidesPerView={3}
                                        slidesPerGroup={1}
                                        className="tab_con_box"
                                        style={{ width: '1160px', padding: '1rem' }}
                                        onBeforeInit={swipper => setSwiper(swipper)}
                                        onSlideChange={e => {
                                            e.isEnd ? setReachingEnd(true) : setReachingEnd(false);
                                            e.isBeginning ? setReachingFirst(true) : setReachingFirst(false);
                                        }}
                                    >
                                        {welfare?.map((v: any) => (
                                            <SwiperSlide key={v.uid}>
                                                <div className="mb-5 tab_con">
                                                    <img alt="img" src={v.banner_src} className="mb-4 inline-block" />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    <button
                                        onClick={() => swiper?.slideNext()}
                                        className={cls(reachingEnd ? 'swiper_slide_fin' : '', 'swiper_navi swiper_next')}
                                        disabled={reachingEnd}
                                    ></button>
                                </div>
                            </div>
                        </div>
                    </section>
                </motion.div>
            ) : (
                <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                    <section className="text-center py-16">
                        <div>
                            <div className="font-bold pb-3 text-3xl">대표 복지혜택</div>
                            <div className="pb-4">건강,문화,교육,쇼핑 등 다양한 복지혜택을 확인하세요!</div>
                        </div>

                        <div className="overflow-x-scroll">
                            <div className="flex py-6 pl-7" style={{ minWidth: '690px' }}>
                                {data.WELFARE_CATE_LIST?.map((v: any, i: number) => (
                                    <div key={i} className={`${v.uid === active ? 'bg-amber-400 text-white font-bold' : ''} border rounded-full py-1 px-4 text-sm mx-1`}>
                                        <span
                                            className="cursor-pointer"
                                            onClick={() => {
                                                getWelfare(v.uid);
                                            }}
                                        >
                                            {v.cate_name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Swiper spaceBetween={30} slidesPerView={'auto'} className="mySwiper m_welfare_banner">
                            {welfare?.map((v: any) => (
                                <SwiperSlide key={v.uid} style={{ width: '285px' }}>
                                    <img alt="img" src={v.banner_src} className="w-full" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </section>
                </motion.div>
            )}
        </>
    );
}
