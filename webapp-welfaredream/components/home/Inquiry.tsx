import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper';

export default function Inquiry({ data, device }: any) {
    const [swiper, setSwiper] = useState<any>();
    const [reachingEnd, setReachingEnd] = useState<boolean>(false);
    const [reachingFirst, setReachingFirst] = useState<boolean>(true);

    return (
        <>
            {device == 'desktop' ? (
                <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                    <section className="w-full py-28" style={{ background: '#FAFAFA' }}>
                        <div className="section_box">
                            <div className="tracking-tighter text-center pb-16 relative">
                                <div className="font-bold pb-2" style={{ fontSize: '42px' }}>
                                    온라인 상담
                                </div>
                                <div className="text-xl text-center">궁금한 문의사항을 접수해주시면 빠른 답변 도와드립니다.</div>
                            </div>

                            <div className="swiper_INQUIRY" style={{ padding: '0 6rem', position: 'relative' }}>
                                <div style={{ height: '450px', position: 'relative' }}>
                                    <Swiper
                                        mousewheel={true}
                                        spaceBetween={30}
                                        slidesPerView={6}
                                        direction={'vertical'}
                                        loop={true}
                                        modules={[Navigation, Autoplay]}
                                        autoplay={{
                                            delay: 2000,
                                            disableOnInteraction: false,
                                        }}
                                        speed={1000}
                                        onBeforeInit={swipper => setSwiper(swipper)}
                                        onSlideChange={e => {
                                            e.isEnd ? setReachingEnd(true) : setReachingEnd(false);
                                            e.isBeginning ? setReachingFirst(true) : setReachingFirst(false);
                                        }}
                                        className="h-full text-center"
                                    >
                                        {data.INQUIRY_DREAM_LIST?.map((v: any, i: number) => (
                                            <SwiperSlide key={i}>
                                                <div className="text-lg grid grid-cols-7 items-center border rounded-full py-3 pl-24 bg-white">
                                                    <div>
                                                        <div style={{ color: '#444' }} className="bg-amber-400 p-1 px-4 rounded-full mr-5 font-bold inline-block">
                                                            구축문의
                                                        </div>
                                                    </div>

                                                    <div className="col-span-2">{v.banner_name}</div>
                                                    <div>{v.txt1}</div>
                                                    <div>{v.txt2}명</div>
                                                    <div>{v.txt3}</div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    <button
                                        onClick={() => swiper?.slidePrev()}
                                        className="swiper_navi swiper_prev"
                                        disabled={reachingFirst}
                                        style={{ opacity: `${reachingFirst ? '0.3' : '1'}` }}
                                    ></button>
                                    <button
                                        onClick={() => swiper?.slideNext()}
                                        className="swiper_navi swiper_next"
                                        disabled={reachingEnd}
                                        style={{ opacity: `${reachingEnd ? '0.3' : '1'}` }}
                                    ></button>
                                </div>
                            </div>
                        </div>
                    </section>
                </motion.div>
            ) : (
                <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                    <section className="py-16 px-7 text-center" style={{ background: '#FAFAFA' }}>
                        <div>
                            <div className="font-bold pb-3 text-3xl">온라인 상담</div>
                            <div className="pb-10">
                                복지드림과 함께 길을 걷고 있는
                                <br /> 대표 파트너사입니다.
                            </div>
                        </div>

                        <div className="swiper_INQUIRY text-sm" style={{ position: 'relative' }}>
                            <div style={{ height: '330px', position: 'relative' }}>
                                <Swiper
                                    mousewheel={true}
                                    spaceBetween={10}
                                    slidesPerView={5}
                                    direction={'vertical'}
                                    loop={true}
                                    modules={[Navigation, Autoplay]}
                                    autoplay={{
                                        delay: 2000,
                                        disableOnInteraction: false,
                                    }}
                                    speed={1000}
                                    onBeforeInit={swipper => setSwiper(swipper)}
                                    onSlideChange={e => {
                                        e.isEnd ? setReachingEnd(true) : setReachingEnd(false);
                                        e.isBeginning ? setReachingFirst(true) : setReachingFirst(false);
                                    }}
                                    className="h-full text-center"
                                >
                                    {data.INQUIRY_DREAM_LIST?.map((v: any, i: number) => (
                                        <SwiperSlide key={i}>
                                            <div className="flex items-center border rounded-full py-2 px-3 bg-white">
                                                <div>
                                                    <div style={{ color: '#444' }} className="bg-amber-400 p-1 px-2 rounded-full mr-3 font-bold inline-block">
                                                        구축문의
                                                    </div>
                                                </div>

                                                <div className="grow text-start">{v.banner_name}</div>
                                                <div className="pl-2">{v.txt1}</div>
                                                <div className="pl-2">{v.txt2}명</div>
                                                <div className="pl-2">{v.txt3}</div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <div className="relative text-center pt-3">
                                    <button
                                        onClick={() => swiper?.slidePrev()}
                                        className="swiper_prev"
                                        disabled={reachingFirst}
                                        style={{ opacity: `${reachingFirst ? '0.3' : '1'}`, width: '24px', height: '24px', margin: '0 4px' }}
                                    ></button>
                                    <button
                                        onClick={() => swiper?.slideNext()}
                                        className="swiper_next"
                                        disabled={reachingEnd}
                                        style={{ opacity: `${reachingEnd ? '0.3' : '1'}`, width: '24px', height: '24px', margin: '0 4px' }}
                                    ></button>
                                </div>
                            </div>
                        </div>
                    </section>
                </motion.div>
            )}
        </>
    );
}
