import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay } from 'swiper';
import { cls } from '@/libs/utils';

export default function Consumer({ data, pagination, device }: any) {
    const [consumer, setConsumer] = useState([]);
    const [active, setActive] = useState(0);
    const [swiper, setSwiper] = useState<any>();
    const [consumerEnd, setConsumerEnd] = useState<boolean>(false);
    const [consumerFirst, setConsumerFirst] = useState<boolean>(true);

    useEffect(() => {
        if (typeof data.CONSUMER_CATE_LIST !== 'undefined' && data.CONSUMER_CATE_LIST.length > 0) {
            getConsumer(data.CONSUMER_CATE_LIST[0].uid);
        }
    }, [data]);

    const getConsumer = (uid: number) => {
        setActive(uid);
        setConsumer(getListFilter(data.CONSUMER_LIST, 'cate_uid', uid));
        setConsumerEnd(false);
        setConsumerFirst(true);
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
                    <section className="w-full py-24" style={{ backgroundColor: '#f5f9fd' }}>
                        <div className="section_box">
                            <div className="tracking-tighter text-center pb-16 relative">
                                <div className="font-bold pb-2" style={{ fontSize: '42px' }}>
                                    멤버쉽혜택
                                </div>
                                <div className="text-xl text-center">복지몰 구축 기업 대상으로 다양한 멤버쉽 서비스를 제공합니다.</div>
                            </div>
                            <div>
                                <div className="pb-8 flex justify-center">
                                    {data.CONSUMER_CATE_LIST?.map((v: any, i: number) => (
                                        <div key={i} className={`${v.uid == active ? 'bg-blue-700 font-bold text-white' : ' bg-white '} border rounded-full px-4 py-1 mx-3`}>
                                            <span
                                                className="cursor-pointer"
                                                onClick={() => {
                                                    getConsumer(v.uid);
                                                }}
                                            >
                                                {v.cate_name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="SwiperWrapper relative" id="swiper_welfare">
                                    <button
                                        onClick={() => swiper?.slidePrev()}
                                        className={cls(consumerFirst ? 'swiper_slide_fin' : '', 'swiper_navi swiper_prev')}
                                        disabled={consumerFirst}
                                    ></button>
                                    <Swiper
                                        spaceBetween={30}
                                        slidesPerView={1}
                                        modules={[Pagination]}
                                        // id="consumer_swiper"
                                        style={{ width: '1160px', padding: '4rem 1rem' }}
                                        onBeforeInit={swipper => setSwiper(swipper)}
                                        onSlideChange={e => {
                                            e.isEnd ? setConsumerEnd(true) : setConsumerEnd(false);
                                            e.isBeginning ? setConsumerFirst(true) : setConsumerFirst(false);
                                        }}
                                    >
                                        {consumer?.map((v: any, i: number) => (
                                            <SwiperSlide key={i}>
                                                <div className="inline-flex justify-center w-full">
                                                    <div className="text-start pt-3" style={{ width: '560px' }}>
                                                        <div className="text-2xl font-bold text-amber-500" dangerouslySetInnerHTML={{ __html: v.txt1 }}></div>
                                                        <div className="text-2xl font-bold py-8" dangerouslySetInnerHTML={{ __html: v.txt2 }}></div>
                                                        <div className="text-lg content text-zinc-600" dangerouslySetInnerHTML={{ __html: v.txt3 }}></div>
                                                    </div>
                                                    <img alt="img" src={v.banner_src} className="" />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    <button
                                        onClick={() => swiper?.slideNext()}
                                        className={cls(consumerEnd ? 'swiper_slide_fin' : '', 'swiper_navi swiper_next')}
                                        disabled={consumerEnd}
                                    ></button>
                                </div>
                            </div>
                        </div>
                    </section>
                </motion.div>
            ) : (
                <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                    <section className="text-center pt-16" style={{ background: '#f5f9fd' }}>
                        <div>
                            <div className="font-bold pb-3 text-3xl">멤버쉽혜택</div>
                            <div className="pb-4">
                                복지몰 구축 기업 대상으로 기업성장을 위한
                                <br /> 다양한 고객사 혜택을 제공합니다.
                            </div>
                        </div>
                        <div className="overflow-x-scroll">
                            <div className="flex p-7 pt-5" style={{ minWidth: '690px' }}>
                                {data.CONSUMER_CATE_LIST?.map((v: any, i: number) => (
                                    <div key={i} className={`${v.uid === active ? 'bg-blue-600 text-white font-bold' : 'bg-white'} border rounded-full py-1 px-4 text-sm mx-1`}>
                                        <span
                                            className="cursor-pointer"
                                            onClick={() => {
                                                getConsumer(v.uid);
                                            }}
                                        >
                                            {v.cate_name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Swiper modules={[Pagination]} spaceBetween={30} slidesPerView={1} className="mySwiper text-center">
                            {consumer?.map((v: any, i: number) => (
                                <SwiperSlide key={i}>
                                    <div className="mb-14">
                                        <div className="text-2xl font-bold mb-6 text-amber-500" dangerouslySetInnerHTML={{ __html: v.txt1 }}></div>
                                        <div className="image-container">
                                            <img alt="img" src={v.banner_src} className="mx-auto" />
                                        </div>
                                        <div className="text-2xl tracking-tighter font-bold py-4" dangerouslySetInnerHTML={{ __html: v.txt2 }}></div>
                                        <div className="text-zinc-600 content" dangerouslySetInnerHTML={{ __html: v.txt3 }}></div>
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
