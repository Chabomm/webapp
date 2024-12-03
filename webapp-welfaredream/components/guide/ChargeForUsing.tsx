import React, { useRef } from 'react';
import IntroDocument from '../UIcomponent/IntroDocument';

export default function Benefit({ device }: any) {
    const refIntroDocument = useRef<any>();
    function openIntroDocument() {
        refIntroDocument.current.init();
    }

    return (
        <>
            {device == 'desktop' ? (
                <section className="main_section text-center tracking-tighter !pt-0">
                    <div className="pt-24 pb-16" style={{ background: '#f4f4f4' }}>
                        <div className="mx-auto grid grid-cols-2 gap-11 text-center" style={{ width: '1040px' }}>
                            <div className="bg-white border-0 shadow-lg">
                                <div className="bg-blue-600 text-white py-5 border-b-0 rounded-t-md">
                                    <span className="text-xl">구축 및 운영 관리비</span>
                                </div>
                                <div className="py-11">
                                    <div className="grid grid-cols-2">
                                        <div className="mb-9">
                                            <img alt="img" src="/resource/welfaredream/images/guide/web/1.svg" className="inline-block" />
                                            <div>
                                                <span className="font-bold">구축비용</span>
                                                <span className="text-zinc-600 text-sm">(Web/Mobile)</span>
                                            </div>
                                            <div>
                                                <span className="font-bold text-blue-600 line-through">1,500,000</span>
                                                <span className="text-sm"> 원</span>
                                                <span className="text-sm text-zinc-600">/1회</span>
                                            </div>
                                        </div>
                                        <div className="mb-9">
                                            <img alt="img" src="/resource/welfaredream/images/guide/web/2.svg" className="inline-block" />
                                            <div>
                                                <span className="font-bold">연 운영비</span>
                                                <span className="text-zinc-600 text-sm">(Web/Mobile)</span>
                                            </div>
                                            <div>
                                                <span className="font-bold text-blue-600 line-through">500,000</span>
                                                <span className="text-sm"> 원</span>
                                                <span className="text-sm text-zinc-600">/1회</span>
                                            </div>
                                        </div>
                                        <div>
                                            <img alt="img" src="/resource/welfaredream/images/guide/web/3.svg" className="inline-block" />
                                            <div>
                                                <span className="font-bold">유지/보수비</span>
                                                <span className="text-zinc-600 text-sm"></span>
                                            </div>
                                            <div>
                                                <span className="font-bold text-blue-600 line-through">200,000</span>
                                                <span className="text-sm"> 원</span>
                                                <span className="text-sm text-zinc-600">/1개월</span>
                                            </div>
                                        </div>
                                        <div>
                                            <img alt="img" src="/resource/welfaredream/images/guide/web/4.svg" className="inline-block" />
                                            <div>
                                                <span className="font-bold">서버 및 도메인 이용료</span>
                                                <span className="text-zinc-600 text-sm"></span>
                                            </div>
                                            <div>
                                                <span className="font-bold text-blue-600 line-through">100,000</span>
                                                <span className="text-sm"> 원</span>
                                                <span className="text-sm text-zinc-600">/1년</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-b-lg p-8 font-bold" style={{ background: '#f9f9f9' }}>
                                    <div className="text-2xl pb-5 text-blue-700">구축･운영･유지보수 비용</div>
                                    <div className="text-4xl">0원</div>
                                </div>
                            </div>

                            <div className="bg-white border-0 shadow-lg">
                                <div className="bg-amber-400 py-5 border-b-0 rounded-t-md">
                                    <span className="text-xl">복지포인트 예치</span>
                                </div>
                                <div className="py-11">
                                    <div className="grid grid-cols-3">
                                        <div className="mb-9">
                                            <img alt="img" src="/resource/welfaredream/images/guide/web/2-1.svg" className="inline-block" />
                                            <div className="font-bold">
                                                최저가
                                                <br />
                                                쇼핑 혜택
                                            </div>
                                        </div>
                                        <div className="mb-9">
                                            <img alt="img" src="/resource/welfaredream/images/guide/web/2-2.svg" className="inline-block" />
                                            <div className="font-bold">
                                                다양한
                                                <br />
                                                복지 혜택
                                            </div>
                                        </div>
                                        <div>
                                            <img alt="img" src="/resource/welfaredream/images/guide/web/2-3.svg" className="inline-block" />
                                            <div className="font-bold">
                                                임직원 전용
                                                <br />
                                                복지 APP 제공
                                            </div>
                                        </div>
                                        <div>
                                            <img alt="img" src="/resource/welfaredream/images/guide/web/2-4.svg" className="inline-block" />
                                            <div className="font-bold">
                                                복지몰 앱/웹
                                                <br />
                                                환경 제공
                                            </div>
                                        </div>
                                        <div>
                                            <img alt="img" src="/resource/welfaredream/images/guide/web/2-5.svg" className="inline-block" />
                                            <div className="font-bold">
                                                복지몰 관리자
                                                <br />
                                                시스템 제공
                                            </div>
                                        </div>
                                        <div>
                                            <img alt="img" src="/resource/welfaredream/images/guide/web/2-6.svg" className="inline-block" />
                                            <div className="font-bold">
                                                B2B 기업
                                                <br />
                                                전용 혜택
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-b-lg p-8 font-bold" style={{ background: '#f9f9f9' }}>
                                    <div className="text-2xl pb-5 text-amber-500">다양한 복지 혜택･최소 충전 포인트</div>
                                    <div className="text-4xl">0원</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img alt="img" src="/resource/welfaredream/images/guide/web/main.png" className="w-full" />

                    <div className="pt-24 pb-16" style={{ background: '#f9f9f9' }}>
                        <div className="mx-auto" style={{ width: '1040px' }}>
                            <div className="">
                                <button
                                    type="button"
                                    style={{ height: 'initial' }}
                                    className="bg-amber-500 w-full px-4 py-3 font-bold text-white rounded-md hover:bg-amber-600 focus:z-10 focus:ring-2"
                                    onClick={() => {
                                        openIntroDocument();
                                    }}
                                >
                                    서비스 소개서 받기 <i className="fas fa-paper-plane"></i>
                                </button>
                            </div>
                            <IntroDocument ref={refIntroDocument} device={device} />
                        </div>
                    </div>
                </section>
            ) : (
                <section>
                    <div className="px-5 py-11 bg-slate-50 tracking-tighter">
                        <div className="bg-white border-0 shadow-lg mb-11">
                            <div className="bg-blue-600 text-white py-5 border-b-0 rounded-t-md px-4">
                                <span className="text-xl">구축 및 운영 관리비</span>
                            </div>
                            <div className="py-11 text-center">
                                <div className="grid grid-cols-2">
                                    <div className="mb-9">
                                        <img alt="img" src="/resource/welfaredream/images/guide/web/1.svg" className="inline-block" />
                                        <div>
                                            <span className="font-bold">구축비용</span>
                                            <span className="text-zinc-600 text-sm">(Web/Mobile)</span>
                                        </div>
                                        <div>
                                            <span className="font-bold text-blue-600 line-through">1,500,000</span>
                                            <span className="text-sm"> 원</span>
                                            <span className="text-sm text-zinc-600">/1회</span>
                                        </div>
                                    </div>
                                    <div className="mb-9">
                                        <img alt="img" src="/resource/welfaredream/images/guide/web/2.svg" className="inline-block" />
                                        <div>
                                            <span className="font-bold">연 운영비</span>
                                            <span className="text-zinc-600 text-sm">(Web/Mobile)</span>
                                        </div>
                                        <div>
                                            <span className="font-bold text-blue-600 line-through">500,000</span>
                                            <span className="text-sm"> 원</span>
                                            <span className="text-sm text-zinc-600">/1회</span>
                                        </div>
                                    </div>
                                    <div>
                                        <img alt="img" src="/resource/welfaredream/images/guide/web/3.svg" className="inline-block" />
                                        <div>
                                            <span className="font-bold">유지/보수비</span>
                                            <span className="text-zinc-600 text-sm"></span>
                                        </div>
                                        <div>
                                            <span className="font-bold text-blue-600 line-through">200,000</span>
                                            <span className="text-sm"> 원</span>
                                            <span className="text-sm text-zinc-600">/1개월</span>
                                        </div>
                                    </div>
                                    <div>
                                        <img alt="img" src="/resource/welfaredream/images/guide/web/4.svg" className="inline-block" />
                                        <div>
                                            <span className="font-bold">서버 및 도메인 이용료</span>
                                            <span className="text-zinc-600 text-sm"></span>
                                        </div>
                                        <div>
                                            <span className="font-bold text-blue-600 line-through">100,000</span>
                                            <span className="text-sm"> 원</span>
                                            <span className="text-sm text-zinc-600">/1년</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-b-lg p-8 font-bold text-center" style={{ background: '#f9f9f9' }}>
                                <div className="text-xl pb-5 text-blue-700">구축･운영･유지보수 비용</div>
                                <div className="text-3xl">0원</div>
                            </div>
                        </div>

                        <div className="bg-white border-0 shadow-lg mb-8">
                            <div className="bg-amber-400 py-5 border-b-0 rounded-t-md px-4">
                                <span className="text-xl">복지포인트 예치</span>
                            </div>
                            <div className="py-11 text-center">
                                <div className="grid grid-cols-3">
                                    <div className="mb-9">
                                        <img alt="img" src="/resource/welfaredream/images/guide/web/2-1.svg" className="inline-block" />
                                        <div className="font-bold">
                                            최저가
                                            <br />
                                            쇼핑 혜택
                                        </div>
                                    </div>
                                    <div className="mb-9">
                                        <img alt="img" src="/resource/welfaredream/images/guide/web/2-2.svg" className="inline-block" />
                                        <div className="font-bold">
                                            다양한
                                            <br />
                                            복지 혜택
                                        </div>
                                    </div>
                                    <div>
                                        <img alt="img" src="/resource/welfaredream/images/guide/web/2-3.svg" className="inline-block" />
                                        <div className="font-bold">
                                            임직원 전용
                                            <br />
                                            복지 APP 제공
                                        </div>
                                    </div>
                                    <div>
                                        <img alt="img" src="/resource/welfaredream/images/guide/web/2-4.svg" className="inline-block" />
                                        <div className="font-bold">
                                            복지몰 앱/웹
                                            <br />
                                            환경 제공
                                        </div>
                                    </div>
                                    <div>
                                        <img alt="img" src="/resource/welfaredream/images/guide/web/2-5.svg" className="inline-block" />
                                        <div className="font-bold">
                                            복지몰 관리자
                                            <br />
                                            시스템 제공
                                        </div>
                                    </div>
                                    <div>
                                        <img alt="img" src="/resource/welfaredream/images/guide/web/2-6.svg" className="inline-block" />
                                        <div className="font-bold">
                                            B2B 기업
                                            <br />
                                            전용 혜택
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="anchor" className="rounded-b-lg p-8 font-bold text-center" style={{ background: '#f9f9f9' }}>
                                <div className="text-xl pb-5 text-amber-500">다양한 복지 혜택･최소 충전 포인트</div>
                                <div className="text-3xl">0원</div>
                            </div>
                        </div>
                        <img alt="img" src="/resource/welfaredream/images/guide/mobile/main_m.png" className="w-full" />

                        <button
                            type="button"
                            style={{ height: 'initial' }}
                            className="bg-amber-500 w-full px-4 py-3 font-bold text-white rounded-md hover:bg-amber-600 focus:z-10 focus:ring-2"
                            onClick={() => {
                                openIntroDocument();
                            }}
                        >
                            서비스 소개서 받기 <i className="fas fa-paper-plane"></i>
                        </button>
                        <IntroDocument ref={refIntroDocument} device={device} />
                    </div>
                </section>
            )}
        </>
    );
}
