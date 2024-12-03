import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay, Navigation } from 'swiper';
import BannerForLinkType from '../UIcomponent/BannerForLinkType';

export default function Mainbanner({ data, pagination, device }: any) {
    return (
        <>
            {device == 'desktop' ? (
                <div className="mx-auto">
                    <div className="arrowAni">
                        <img alt="img" src="/resource/welfaredream/images/main/web/mainArrow.png" />
                    </div>

                    <Swiper
                        loop
                        modules={[Pagination, Autoplay]}
                        centeredSlides={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                            renderBullet: function (index: number, className: string) {
                                return '<span class="' + className + '">' + (index + 1) + '</span>';
                            },
                        }}
                        speed={1000}
                        className="main_banner"
                    >
                        {data.MAIN_BANNER_LIST?.map((v: any, i: number) => (
                            <SwiperSlide key={i}>
                                <BannerForLinkType item={v} img={<img alt="img" src={v.banner_src} className="w-full" />} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ) : (
                <Swiper
                    loop
                    centeredSlides={true}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    modules={[Navigation, Autoplay]}
                    speed={1000}
                    navigation={true}
                    className="main_banner"
                >
                    {data.MAIN_BANNER_LIST?.map((v: any, i: number) => (
                        <SwiperSlide key={i}>
                            <BannerForLinkType item={v} img={<img alt="img" src={v.banner_src} className="w-full bg-cover bg-no-repeat" />} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </>
    );
}
