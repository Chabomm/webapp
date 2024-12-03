import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper';

export default function Welfare({ data, getListBannerData, cuid, device }: any) {
    const pagination = {
        type: 'custom',
        clickable: true,
        renderCustom: function (swiper: any, current: number, total: number) {
            return '<span class="pagination_custom">' + current + '/' + total + '</span>';
        },
    };

    return (
        <>
            {device == 'desktop' ? (
                <section className="main_section text-center">
                    <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1, delay: 0.3 }}>
                        <div className="text-4xl pb-2 text-center pt-12">
                            복지드림의 <span className="font-bold">다양한 복지 혜택을 소개</span>합니다.
                        </div>
                        <div className="p-16 flex justify-center">
                            {data.main_cate_list?.map((v: any, i: number) => (
                                <div key={i} className={`${v.uid === cuid ? 'border-b-2 border-amber-500 text-amber-500 font-bold' : ''} text-lg mx-3`}>
                                    <span
                                        className="cursor-pointer"
                                        onClick={() => {
                                            getListBannerData(v.uid);
                                        }}
                                    >
                                        {v.cate_name}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="tab_con_box md:w-1200 mx-auto">
                            <div className="grid grid-cols-3 gap-7 justify-center">
                                {data.main_banner_list?.map((v: any, i: number) => (
                                    <div key={i} className="mb-5 tab_con">
                                        <img alt="img" src={v.banner_src} className="mb-4 inline-block" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </section>
            ) : (
                <section className="py-14">
                    <motion.div
                        className="text-2xl pb-9 leading-snug font-light px-7"
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 2 }}
                        transition={{ duration: 1 }}
                    >
                        복지드림의 <br />
                        <span className="font-bold">다양한 복지 혜택을 소개</span>합니다.
                    </motion.div>

                    <div className="overflow-x-scroll sticky top-20 z-10 bg-white border-t border-b">
                        <div className="flex p-5" style={{ minWidth: '690px' }}>
                            {data.main_cate_list?.map((v: any, i: number) => (
                                <div key={i} className={`${v.uid === cuid ? 'bg-amber-400 text-white font-bold' : ''} border rounded-full py-1 px-4 text-sm mx-1`}>
                                    <span
                                        className="cursor-pointer"
                                        onClick={() => {
                                            getListBannerData(v.uid);
                                        }}
                                    >
                                        {v.cate_name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <Swiper spaceBetween={30} slidesPerView={'auto'} modules={[Pagination]} className="mySwiper m_welfare_banner" id="">
                            {data.main_banner_list?.map((v: any, i: number) => (
                                <SwiperSlide key={i} style={{ width: '285px' }}>
                                    <img alt="img" src={v.banner_src} className="w-full" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section>
            )}
        </>
    );
}
