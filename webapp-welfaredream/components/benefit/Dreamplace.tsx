import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper';

export default function Dreamplace({ device }: any) {
    const pagination = {
        pagination: {
            el: '.swiper-pagination',
            type: 'custom',
        },
    };

    return (
        <>
            {device == 'desktop' ? (
                <section className="main_section text-center tracking-tighter !pt-0">
                    <div className="py-24" style={{ background: '#F9F9F9' }}>
                        <div className="font-bold text-xl text-orange-400">복지드림 회원이라면</div>
                        <div className="font-bold text-3xl">오프라인에서도 복지 혜택을 받을 수 있습니다.</div>
                        <div className="flex justify-center text-xl">
                            <div className="text-start pt-4 pb-5">
                                <div className="p-5">
                                    <img alt="img" src={'/resource/welfaredream/images/benefit/web/dreamplace_bi.png'} className="w-8 inline-block" />
                                    <span className="font-bold text-orange-400 mx-2">POINT 01, </span> 별도 로그인 필요 없이
                                    <span className="font-bold">복지드림 앱에서 바로</span>
                                </div>

                                <div className="p-5">
                                    <img alt="img" src={'/resource/welfaredream/images/benefit/web/dreamplace_bi.png'} className="w-8 inline-block" />
                                    <span className="font-bold text-orange-400 mx-2">POINT 02, </span>
                                    <span className="font-bold"> 식당,카페,놀거리 등 4,000여 개 </span>제휴 매장 중
                                </div>

                                <div className="p-5">
                                    <img alt="img" src={'/resource/welfaredream/images/benefit/web/dreamplace_bi.png'} className="w-8 inline-block" />
                                    <span className="font-bold text-orange-400 mx-2">POINT 03, </span>내 주변 매장을 골라
                                    <span className="font-bold">최대 20% 할인 혜택을 즉시!</span>
                                </div>
                            </div>
                        </div>

                        <div className="inline-flex">
                            <div className="border rounded-full bg-white mx-3 py-2 px-11">
                                <img alt="img" src={'/resource/welfaredream/images/benefit/web/point_01.svg'} className="mx-auto" />
                                <div className="font-bold py-1">식당</div>
                                <div className="text-xs text-zinc-500 font-semibold">
                                    맛집할인 or
                                    <br />
                                    서비스 제공
                                </div>
                            </div>
                            <div className="border rounded-full bg-white mx-3 py-2 px-11">
                                <img alt="img" src={'/resource/welfaredream/images/benefit/web/point_02.svg'} className="mx-auto" />
                                <div className="font-bold py-1">카페</div>
                                <div className="text-xs text-zinc-500 font-semibold">
                                    음료, 디저트
                                    <br />
                                    할인 등
                                </div>
                            </div>
                            <div className="border rounded-full bg-white mx-3 py-2 px-10">
                                <img alt="img" src={'/resource/welfaredream/images/benefit/web/point_03.svg'} className="mx-auto" />
                                <div className="font-bold py-1">놀거리</div>
                                <div className="text-xs text-zinc-500 font-semibold">
                                    입장권 할인 or
                                    <br />
                                    체험권 제공 등
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-24">
                        <div className="text-center mt-11">
                            <div>
                                <div className="font-bold text-xl text-orange-400">드림플레이스 이용 방법!</div>
                                <div className="font-bold text-3xl">복지드림 APP만 설치하면 쉽고 간편합니다.</div>
                            </div>
                            <div className="inline-flex items-center py-10">
                                <div className="p-7">
                                    <div className="p-1 px-2 inline-block font-extrabold text-xs bg-amber-400 rounded-full">STEP 01</div>
                                    <div className="text-xl font-bold pt-2 pb-3">복지드림 APP 실행</div>
                                    <img alt="img" src={'/resource/welfaredream/images/benefit/web/step_01.png'} className="mx-auto w-40" />
                                    <div className="mt-2 text-sm text-zinc-500">
                                        복지드림 APP 내<br />
                                        드림플레이스 버튼 클릭
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="triangle"></div>
                                </div>
                                <div className="p-7">
                                    <div className="p-1 px-2 inline-block font-extrabold text-xs bg-amber-400 rounded-full">STEP 02</div>
                                    <div className="text-xl font-bold pt-2 pb-3">드림플레이스 진입</div>
                                    <img alt="img" src={'/resource/welfaredream/images/benefit/web/step_02.png'} className="mx-auto w-40" />
                                    <div className="mt-2 text-sm text-zinc-500">
                                        복지드림에서
                                        <br />
                                        드림플레이스로 이동
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="triangle"></div>
                                </div>
                                <div className="p-4">
                                    <div className="p-1 px-2 inline-block font-extrabold text-xs bg-amber-400 rounded-full">STEP 03</div>
                                    <div className="text-xl font-bold pt-2 pb-3">제휴 매장 상세페이지 확인</div>
                                    <img alt="img" src={'/resource/welfaredream/images/benefit/web/step_03.png'} className="inline-block w-40" />
                                    <div className="mt-2 text-sm text-zinc-500">
                                        원하는 제휴 매장 상세페이지
                                        <br />
                                        진입 후 할인 혜택 확인
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="triangle"></div>
                                </div>
                                <div className="p-4">
                                    <div className="p-1 px-2 inline-block font-extrabold text-xs bg-amber-400 rounded-full">STEP 04</div>
                                    <div className="text-xl font-bold pt-2 pb-3">드림플레이스 사용</div>
                                    <img alt="img" src={'/resource/welfaredream/images/benefit/web/step_04.png'} className="inline-block w-40" />
                                    <div className="mt-2 text-sm text-zinc-500">
                                        결제 시,드림플레이스 쿠폰 화면을
                                        <br />
                                        직원에게 보여주면 사용 완료
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="bg-amber-400 rounded-full inline-flex font-bold px-10 py-2">
                                    <Link href="https://web.indend.synology.me/home/welfaredreamapp" className="text-white" target="_blank">
                                        복지드림 APP 설치하기
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img alt="img" src={'/resource/welfaredream/images/benefit/web/dreamplace_main_w.png'} className="mt-20 w-full" />
                </section>
            ) : (
                <section>
                    <div className="px-5 py-10 bg-slate-50">
                        <div className="text-center">
                            <div className="text-lg font-bold text-amber-500">복지드림 회원이라면</div>
                            <div className="font-bold text-2xl pb-2">
                                오프라인에서도
                                <br /> 복지 혜택을 받을 수 있습니다.
                            </div>
                        </div>
                        <div className="p-3 tracking-tighter text-start">
                            <div className="py-3">
                                <img alt="img" src={'/resource/welfaredream/images/benefit/mobile/dream_bi.png'} className="inline-block w-6" />
                                <span className="text-sm font-bold text-amber-500">POINT 01 </span>
                                <div>
                                    별도 로그인 필요 없이 <span className="font-bold">복지드림 앱에서 바로</span>
                                </div>
                            </div>
                            <div className="py-3">
                                <img alt="img" src={'/resource/welfaredream/images/benefit/mobile/dream_bi.png'} className="inline-block w-6" />
                                <span className="text-sm font-bold text-amber-500">POINT 02</span>
                                <div>
                                    <span className="font-bold"> 식당,카페,놀거리 등 4,000여 개</span> 제휴 매장 중
                                </div>
                            </div>
                            <div className="py-3">
                                <img alt="img" src={'/resource/welfaredream/images/benefit/mobile/dream_bi.png'} className="inline-block w-6" />
                                <span className="text-sm font-bold text-amber-500">POINT 03</span>
                                <div>
                                    내 주변 매장을 골라 <span className="font-bold">최대 20% 할인 혜택을 즉시!</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-center rounded-2xl flex border bg-white px-3 mt-4">
                            <div className="p-3 border-r flex-1">
                                <img alt="img" src={'/resource/welfaredream/images/benefit/mobile/point_01.svg'} className="inline-block w-9" />
                                <div className="font-bold text-sm">식당</div>
                                <div className="text-xs">
                                    맛집할인 or
                                    <br />
                                    서비스 제공
                                </div>
                            </div>
                            <div className="py-3 px-4 border-r flex-1">
                                <img alt="img" src={'/resource/welfaredream/images/benefit/mobile/point_02.svg'} className="inline-block w-9" />
                                <div className="font-bold text-sm">카페</div>
                                <div className="text-xs">
                                    음료, 디저트
                                    <br />
                                    할인 등
                                </div>
                            </div>
                            <div className="p-3 flex-1">
                                <img alt="img" src={'/resource/welfaredream/images/benefit/mobile/point_03.svg'} className="inline-block w-9" />
                                <div className="font-bold text-sm">놀거리</div>
                                <div className="text-xs">
                                    입장권 할인 or
                                    <br />
                                    체험권 제공 등
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-5 py-10 text-center">
                        <div>
                            <div className="text-lg font-bold text-amber-500">드림플레이스 이용 방법!</div>
                            <div className="font-bold text-2xl pb-5">
                                복지드림 APP만 설치하면
                                <br /> 쉽고 간편합니다.
                            </div>
                        </div>
                        <Swiper spaceBetween={30} slidesPerView={1} modules={[Pagination]}>
                            <SwiperSlide>
                                <div className="pb-11 tracking-tighter">
                                    <div className="bg-amber-400 rounded-full inline-block text-xs font-bold px-2">STEP 01</div>
                                    <div className="font-extrabold py-1 pb-4">복지드림 APP 실행</div>
                                    <img alt="img" src="/resource/welfaredream/images/benefit/web/step_01.png" style={{ width: '205px', display: 'inline-block' }} />
                                    <div className="mt-2 text-sm">
                                        복지드림 APP 내<br />
                                        드림플레이스 버튼 클릭
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="pb-11 tracking-tighter">
                                    <div className="bg-amber-400 rounded-full inline-block text-xs font-bold px-2">STEP 02</div>
                                    <div className="font-extrabold py-1 pb-4">드림플레이스 진입</div>
                                    <img alt="img" src="/resource/welfaredream/images/benefit/web/step_02.png" style={{ width: '205px', display: 'inline-block' }} />
                                    <div className="mt-2 text-sm">
                                        복지드림에서
                                        <br />
                                        드림플레이스로 이동
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="pb-11 tracking-tighter">
                                    <div className="bg-amber-400 rounded-full inline-block text-xs font-bold px-2">STEP 03</div>
                                    <div className="font-extrabold py-1 pb-4">제휴 매장 상세페이지 확인</div>
                                    <img alt="img" src="/resource/welfaredream/images/benefit/web/step_03.png" style={{ width: '205px', display: 'inline-block' }} />
                                    <div className="mt-2 text-sm">
                                        원하는 제휴 매장 상세페이지
                                        <br />
                                        진입 후 할인 혜택 확인
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="pb-11 tracking-tighter">
                                    <div className="bg-amber-400 rounded-full inline-block text-xs font-bold px-2">STEP 04</div>
                                    <div className="font-extrabold py-1 pb-4">드림플레이스 사용</div>
                                    <img alt="img" src="/resource/welfaredream/images/benefit/web/step_04.png" style={{ width: '205px', display: 'inline-block' }} />
                                    <div className="mt-2 text-sm">
                                        결제 시, 드림플레이스 쿠폰 화면을
                                        <br />
                                        직원에게 보여주면 사용 완료
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                        <div className="pt-3">
                            <div className="text-sm rounded-full inline-block font-bold px-11 py-2 bg-amber-400">
                                <Link href="https://web.indend.synology.me/home/welfaredreamapp" className="text-white" target="_blank">
                                    복지드림 APP 설치하기
                                </Link>
                            </div>
                        </div>
                    </div>
                    <img alt="img" src={'/resource/welfaredream/images/benefit/mobile/dream_main_m.png'} />
                </section>
            )}
        </>
    );
}
