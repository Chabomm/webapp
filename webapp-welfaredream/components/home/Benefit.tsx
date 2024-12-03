import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Benefit({ data, device }: any) {
    return (
        <>
            {device == 'desktop' ? (
                <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                    <section className="w-full py-28">
                        <div className="section_box">
                            <div className="tracking-tighter text-center pb-16 relative">
                                <div className="font-bold pb-2" style={{ fontSize: '42px' }}>
                                    고객사 도입혜택
                                </div>
                                <div className="text-xl text-center">복지드림이 준비한 특별한 도입혜택을 놓치지 마세요!</div>
                            </div>
                            <div>
                                <Swiper slidesPerView={4} className="benefit_swiper py-9">
                                    {data.MAIN_BENEFIT_LIST?.map((v: any, i: number) => (
                                        <SwiperSlide key={i} className="tracking-tighter card_box text-start p-7 pb-0" style={{ backgroundImage: `url(${v.banner_src})` }}>
                                            <div className="inline-block  bg-black text-white font-semibold p-1 px-2 mb-2">{v.banner_name}</div>
                                            <div className="py-5 text-3xl font-bold">{v.txt1}</div>
                                            <div className="text-lg text-zinc-600 content">{v.txt2}</div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </section>
                </motion.div>
            ) : (
                <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                    <section className="py-16 text-center">
                        <div>
                            <div className="font-bold pb-3 text-3xl">고객사 도입혜택</div>
                            <div className="pb-4">
                                복지드림이 준비한
                                <br /> 특별한 도입혜택을 놓치지 마세요!
                            </div>
                        </div>
                        <div>
                            <Swiper className="m_benefit_swiper mySwiper">
                                {data.MAIN_BENEFIT_LIST?.map((v: any, i: number) => (
                                    <SwiperSlide key={i} className="tracking-tighter card_box text-start p-5 pb-0" style={{ backgroundImage: `url(${v.banner_src})` }}>
                                        <div className="inline-block  bg-black text-white text-sm px-2 py-1 mb-2">{v.banner_name}</div>
                                        <div className="py-2 text-xl font-bold">{v.txt1}</div>
                                        <div className="text-zinc-600 content">{v.txt2}</div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </section>
                </motion.div>
            )}
        </>
    );
}
