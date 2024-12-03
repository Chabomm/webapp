import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay } from 'swiper';

const slide_banners = [
    {
        id: 'slide_01',
        w_img: '/resource/indendkorea/images/main/main_swiper_bg_1.jpg',
        m_img: '/resource/indendkorea/images/main/mobile/m_img_main_top_1.jpg',
        title: '인디앤드코리아에서\n선택적 복지서비스를 경험해 보세요.',
        body: '기업과 임직원의 행복을 여는 인디앤드코리아에 답이 있습니다.\n무상 복지몰 구축 서비스를 경험해 보세요.',
    },
    {
        id: 'slide_02',
        w_img: '/resource/indendkorea/images/main/main_swiper_bg_2.jpg',
        m_img: '/resource/indendkorea/images/main/mobile/m_img_main_top_3.jpg',
        title: '유통의 시작과 끝,\n인디앤드코리아와 함께하세요.',
        body: '다각화된  채널을 보유하고 있는 인디앤드의 유통서비스,\n소비자와 연결할 수 있는 다리를 만들어 나갑니다.',
    },
    {
        id: 'slide_03',
        w_img: '/resource/indendkorea/images/main/main_swiper_bg_3.jpg',
        m_img: '/resource/indendkorea/images/main/mobile/m_img_main_top_5.jpg',
        title: '글로벌 시장 개척을 통해\n더 넓은 세상으로 나아갑니다.',
        body: '인디앤드코리아는 더 넓은 세상에서 유통을 고민하고,\n새로운 판로 개척에 몰입합니다.',
    },
];

export default function Mainbanner({ device }: any) {
    const [mainSwiper, setMainSwiper] = useState<any>();
    const [mainSwiperEnd, setMainSwiperEnd] = useState<boolean>(false);
    const [mainSwiperFirst, setMainSwiperFirst] = useState<boolean>(true);

    return (
        <>
            {device == 'desktop' && (
                <div className="relative">
                    <div className="absolute bottom-64 w-full z-10">
                        <button
                            onClick={() => mainSwiper?.slidePrev()}
                            className="swiper_navi swiper_prev"
                            disabled={mainSwiperFirst}
                            style={{ opacity: `${mainSwiperFirst ? '0.3' : '1'}`, right: '30px', borderRadius: '20px' }}
                        ></button>
                        <button
                            onClick={() => mainSwiper?.slideNext()}
                            className="swiper_navi swiper_next"
                            disabled={mainSwiperEnd}
                            style={{ opacity: `${mainSwiperEnd ? '0.3' : '1'}`, borderRadius: '20px' }}
                        ></button>
                    </div>
                    <Swiper
                        loop
                        modules={[Pagination, Autoplay]}
                        centeredSlides={true}
                        speed={1000}
                        onBeforeInit={swipper => setMainSwiper(swipper)}
                        onSlideChange={e => {
                            e.isEnd ? setMainSwiperEnd(true) : setMainSwiperEnd(false);
                            e.isBeginning ? setMainSwiperFirst(true) : setMainSwiperFirst(false);
                        }}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                    >
                        {slide_banners.map((v: any, i: number) => (
                            <SwiperSlide key={i}>
                                <div className="flex absolute w-full bottom-48 items-center justify-center">
                                    <div className="slide_banners_text">
                                        <div className="slide_banners_title">{v.title}</div>
                                        <div className="slide_banners_line"></div>
                                        <div className="slide_banners_body">{v.body}</div>
                                    </div>
                                </div>
                                <div className="slide_banners_item relative" style={{ backgroundImage: `url(${v.w_img})` }}>
                                    <div className="icon-scroll">
                                        <div className="font-bold text-sm" style={{ bottom: `20px`, left: `-13.5px`, position: `relative`, color: `#fff` }}>
                                            SCROLL
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
            {device == 'mobile' && (
                <div className="relative">
                    <div className="absolute bottom-64 w-full z-10">
                        <button
                            onClick={() => mainSwiper?.slidePrev()}
                            className="swiper_navi swiper_navi_mobile swiper_prev"
                            disabled={mainSwiperFirst}
                            style={{ opacity: `${mainSwiperFirst ? '0.3' : '1'}`, right: '30px', borderRadius: '20px' }}
                        ></button>
                        <button
                            onClick={() => mainSwiper?.slideNext()}
                            className="swiper_navi swiper_navi_mobile swiper_next"
                            disabled={mainSwiperEnd}
                            style={{ opacity: `${mainSwiperEnd ? '0.3' : '1'}`, borderRadius: '20px' }}
                        ></button>
                    </div>
                    <Swiper
                        loop
                        modules={[Pagination, Autoplay]}
                        centeredSlides={true}
                        speed={1000}
                        onBeforeInit={swipper => setMainSwiper(swipper)}
                        onSlideChange={e => {
                            e.isEnd ? setMainSwiperEnd(true) : setMainSwiperEnd(false);
                            e.isBeginning ? setMainSwiperFirst(true) : setMainSwiperFirst(false);
                        }}
                        // autoplay={{
                        //     delay: 4000,
                        //     disableOnInteraction: false,
                        // }}
                    >
                        {slide_banners.map((v: any, i: number) => (
                            <SwiperSlide key={i}>
                                <div className="flex absolute w-full bottom-48 items-center justify-center bg-gray-800 bg-opacity-70 z-10">
                                    <div className="slide_banners_text my-5">
                                        <div className="m_slide_banners_title">{v.title}</div>
                                        <div className="m_slide_banners_line"></div>
                                        <div className="m_slide_banners_body">{v.body}</div>
                                    </div>
                                </div>
                                <div className="slide_banners_item relative" style={{ backgroundImage: `url(${v.m_img})` }}>
                                    <div className="icon-scroll">
                                        <div className="font-bold text-sm" style={{ bottom: `20px`, left: `-13.5px`, position: `relative`, color: `#fff` }}>
                                            SCROLL
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </>
    );
}
