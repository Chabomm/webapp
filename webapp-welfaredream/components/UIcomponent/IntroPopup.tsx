import React, { useState, useEffect } from 'react';
import { cls, getCookie, setCookie } from '@/libs/utils';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay, Navigation } from 'swiper';
import BannerForLinkType from './BannerForLinkType';

export default function IntroPopup({ data, pagination, device }: any) {
    const [open, setOpen] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);

    const onToggle = () => {
        setShow(!open);
        setOpen(!open);
    };

    useEffect(() => {
        if (getCookie('MAIN_POPUP') != 'done') {
            if (typeof data.POPUP_LIST === 'undefined' || data.POPUP_LIST?.length == 0) {
                setShow(false);
                setOpen(false);
            } else {
                setShow(true);
                setOpen(true);
            }
        }
    }, []);

    const neverToday = () => {
        setCookie('MAIN_POPUP', 'done', 1);
        setShow(false);
        setOpen(false);
    };

    return (
        <>
            {device == 'desktop' ? (
                <section>
                    {open && (
                        <>
                            <div className={cls('popup', show ? 'show' : '')}>
                                <div className="popup-body">
                                    <Swiper
                                        // loop
                                        autoHeight={true}
                                        modules={[Pagination, Autoplay]}
                                        centeredSlides={true}
                                        // autoplay={{
                                        //     delay: 4000,
                                        //     disableOnInteraction: false,
                                        // }}
                                        // speed={1000}
                                        className=""
                                    >
                                        {data.POPUP_LIST?.map((v: any, i: number) => (
                                            <SwiperSlide key={i}>
                                                <BannerForLinkType item={v} img={<img alt="img" src={v.banner_src} className="w-full" />} />
                                                <Link href={v.link} target="_blank" className="popup-btn">
                                                    바로가기
                                                </Link>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                                <div className="popup-footer">
                                    <button className="btn-del" type="button" onClick={neverToday}>
                                        하루동안 보지 않기
                                    </button>
                                    <button className="btn-del" type="button" onClick={onToggle}>
                                        닫기
                                    </button>
                                </div>
                            </div>
                            <div className="offcanvas-backdrop fade" onClick={onToggle}></div>
                        </>
                    )}
                </section>
            ) : (
                <section>
                    {open && (
                        <>
                            <div className={cls('popup-mobile', show ? 'show' : '')}>
                                <div className="popup-mobile-body">
                                    <Swiper
                                        // loop
                                        autoHeight={true}
                                        navigation={true}
                                        modules={[Pagination, Autoplay, Navigation]}
                                        centeredSlides={true}
                                        // autoplay={{
                                        //     delay: 4000,
                                        //     disableOnInteraction: false,
                                        // }}
                                        // speed={1000}
                                        className=""
                                    >
                                        {data.POPUP_LIST?.map((v: any, i: number) => (
                                            <SwiperSlide key={i}>
                                                <BannerForLinkType item={v} img={<img alt="img" src={v.banner_src} className="w-full" />} />
                                                <Link href={v.link} target="_blank" className="popup-btn">
                                                    바로가기
                                                </Link>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                                <div className="popup-mobile-footer">
                                    <button className="btn-del" type="button" onClick={neverToday}>
                                        하루동안 보지 않기
                                    </button>
                                    <button className="btn-del" type="button" onClick={onToggle}>
                                        닫기
                                    </button>
                                </div>
                            </div>
                            <div className="offcanvas-backdrop fade" onClick={onToggle}></div>
                        </>
                    )}
                </section>
            )}
        </>
    );
}
