import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { EffectFade, Autoplay } from 'swiper';

export default function Review({ data, device }: any) {
    const [swiper, setSwiper] = useState<any>();
    const [reachingEnd, setReachingEnd] = useState<boolean>(false);
    const [reachingFirst, setReachingFirst] = useState<boolean>(true);
    return (
        <>
            {device == 'desktop' ? (
                <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                    <section className="w-full py-28 bg-no-repeat bg-cover" style={{ backgroundImage: `url('/resource/welfaredream/images/main/web/reviewBg.jpg')` }}>
                        <div className="section_box">
                            <div className="tracking-tighter text-center relative text-white">
                                <div className="font-bold pb-2" style={{ fontSize: '42px' }}>
                                    복지드림 구축 서비스 고객 직접 평가 만족도
                                </div>
                            </div>
                            <div className="py-9">
                                <Swiper
                                    effect={'fade'}
                                    modules={[EffectFade, Autoplay]}
                                    autoplay={{
                                        delay: 5000,
                                        disableOnInteraction: false,
                                    }}
                                    fadeEffect={{
                                        crossFade: true,
                                    }}
                                    speed={1000}
                                >
                                    {data.MAIN_REVIEW_LIST?.map((v: any, i: number) => (
                                        <SwiperSlide key={i} className="text-center text-lg text-white mx-3">
                                            <div className="text-2xl pb-20 text-white flex items-center justify-center">
                                                <span className="text-3xl font-bold counter2">{v.txt5}</span>
                                                <span>
                                                    /<span className="pr-3">5</span>
                                                </span>
                                                <img alt="img" src="/resource/welfaredream/images/main/web/star.png" style={{ width: '148px', paddingBottom: '6px' }} />
                                            </div>
                                            <div className="text-2xl pb-5">{v.txt4}</div>
                                            <div className="text-lg pb-1">[{v.txt2}]</div>
                                            <span className="px-1">{v.txt1}</span>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </section>
                </motion.div>
            ) : (
                <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                    <section className="pt-16 pb-10 bg-no-repeat bg-cover" style={{ backgroundImage: `url('/resource/welfaredream/images/main/mobile/reviewBg.jpg')` }}>
                        <div className="tracking-tighter text-center text-3xl relative text-white">
                            <div className="font-bold">
                                복지드림 구축 서비스 고객
                                <br /> 직접 평가 만족도
                            </div>
                        </div>
                        <div id="swiper_review" className="py-9 relative">
                            <Swiper
                                effect={'fade'}
                                fadeEffect={{
                                    crossFade: true,
                                }}
                                modules={[EffectFade, Autoplay]}
                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: false,
                                }}
                                speed={1000}
                                onBeforeInit={swipper => setSwiper(swipper)}
                                onSlideChange={e => {
                                    e.isEnd ? setReachingEnd(true) : setReachingEnd(false);
                                    e.isBeginning ? setReachingFirst(true) : setReachingFirst(false);
                                }}
                            >
                                {data.MAIN_REVIEW_LIST?.map((v: any, i: number) => (
                                    <SwiperSlide key={i} className="text-center text-lg text-white mx-3">
                                        <div className="text-2xl pb-11 text-white flex items-center justify-center">
                                            <span className="text-3xl tracking-tighter font-bold">{v.txt5}</span>
                                            <span>
                                                /<span className="pr-3">5</span>
                                            </span>
                                            <img alt="img" src="/resource/welfaredream/images/main/web/star.png" style={{ width: '118px', paddingBottom: '6px' }} />
                                        </div>
                                        <div className="px-14">
                                            <div className="pb-5 text-base">{v.txt4}</div>
                                            <div className="text-sm">[{v.txt2}]</div>
                                            <span className="text-sm">{v.txt1}</span>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div className="relative text-center pt-7">
                                <button
                                    onClick={() => swiper?.slidePrev()}
                                    className="swiper_prev"
                                    disabled={reachingFirst}
                                    style={{ opacity: `${reachingFirst ? '0.3' : '1'}` }}
                                ></button>
                                <button
                                    onClick={() => swiper?.slideNext()}
                                    className="swiper_next"
                                    disabled={reachingEnd}
                                    style={{ opacity: `${reachingEnd ? '0.3' : '1'}` }}
                                ></button>
                            </div>
                        </div>
                    </section>
                </motion.div>
            )}
        </>
    );
}
