import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper';

export default function Partner({ data, pagination, device }: any) {
    const [partner, setPartner] = useState([]);

    useEffect(() => {
        if (typeof data.PARTNER_LIST !== 'undefined' && data.PARTNER_LIST.length > 0) {
            getListBannerData(data);
        }
    }, [data]);

    const getListBannerData = async (data: any) => {
        const ori_list = await data;

        let spit_list: any = [];
        let item_block: any = [];
        ori_list.PARTNER_LIST.forEach(function (v: any, i: any) {
            if (i % 15 < 15) {
                item_block.push(v);
            }

            if (i % 15 == 14) {
                spit_list.push(item_block);
                item_block = [];
            }

            if (i == ori_list.PARTNER_LIST.length - 1) {
                spit_list.push(item_block);
                item_block = [];
            }
        });

        setPartner(({ ...values }) => {
            values = spit_list;
            return values;
        });
    };

    return (
        <>
            {device == 'desktop' ? (
                <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                    <section className="main_section">
                        <div className="section_box">
                            <div className="tracking-tighter text-center pb-16 relative">
                                <div className="font-bold pb-2" style={{ fontSize: '42px' }}>
                                    대표 고객사 & 파트너
                                </div>
                                <div className="text-xl text-center">복지드림과 함께 길을 걷고 있는 대표 파트너사입니다.</div>
                            </div>

                            <div id="swiper_partner" style={{ padding: '0 3rem', position: 'relative' }}>
                                <Swiper className="mySwiper" id="partner_swiper" slidesPerView={'auto'} modules={[Navigation]} navigation={true} centeredSlides={true}>
                                    {partner?.map((v: any, i: number) => (
                                        <SwiperSlide key={i}>
                                            <div className="grid grid-cols-5">
                                                {v?.map((vv: any, ii: number) => (
                                                    <div key={ii} className="">
                                                        <div className="border-1 border-neutral-100">
                                                            <img alt="img" src={vv.banner_src} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </section>
                </motion.div>
            ) : (
                <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                    <section className="py-14 text-center">
                        <div>
                            <div className="font-bold pb-3 text-3xl">대표 고객사 & 파트너</div>
                            <div className="pb-4">
                                복지드림과 함께 길을 걷고 있는
                                <br /> 대표 파트너사입니다.
                            </div>
                        </div>
                        <Swiper spaceBetween={30} slidesPerView={'auto'} modules={[Pagination]} className="mySwiper" id="partner_swiper">
                            {partner?.map((v: any, i: number) => (
                                <SwiperSlide key={i}>
                                    <div className="grid grid-cols-3 gap-3">
                                        {v?.map((vv: any, ii: number) => (
                                            <div key={ii} className="border-1 border-neutral-100">
                                                <img alt="img" src={vv.banner_src} className="inline-block" />
                                            </div>
                                        ))}
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </section>
                </motion.div>
            )}
        </>
    );
}
