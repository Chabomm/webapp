import Link from 'next/link';
import Image from 'next/image';

export default function Footer({ nav_id, title, device }: any) {
    return (
        <>
            {device == 'desktop' && (
                <footer className="bg-black body-font">
                    <div className="container px-3 py-24 mx-auto">
                        <div className="flex flex-wrap lg:text-left tracking-tighter text-sm text-zinc-400">
                            <div className="lg:w-1/4 lg:w-1/2 flex">
                                <div className={'image-container'} style={{ width: '200px', margin: 'auto auto' }}>
                                    <Image src="/resource/indendkorea/images/main/footer.png" fill sizes={'image'} alt="" className={'image'} />
                                </div>
                            </div>
                            <div className="lg:w-1/4 lg:w-1/2 w-full px-4">
                                <div className="font-medium text-white text-2xl mb-3">Head Office</div>
                                <div className="border-b border-neutral-600 pb-4">인천 연수구 인천타워대로323 송도센트로드B동 2105호</div>
                                <div className="pt-4 leading-loose">
                                    <div>대표이사 : 오상훈</div>
                                    <div className="leading-6">사업자등록번호 : 511-88-00037</div>
                                    <div className="">통신판매업신고 : 제 2015-인천연수구-0116</div>
                                    <div className="">ⓒ 2023. (주)인디앤드코리아 all rights reserved.</div>
                                </div>
                            </div>
                            <div className="lg:w-1/4 lg:w-1/2 w-full px-5">
                                <div className="font-medium text-white text-2xl mb-3">Contact</div>
                                <div className="leading-loose">
                                    <div className="font-bold">입점 문의</div>
                                    <div className="">T : 032-719-7814</div>
                                    <div className="">E : md@indend.co.kr</div>
                                    <div className="font-bold">복지몰 구축 문의</div>
                                    <div className="">T : 1668-1317</div>
                                    <div className="">E : info@welfaredream.com</div>
                                </div>
                            </div>
                            <div className="lg:w-1/4 lg:w-1/2 w-full px-4">
                                <div className="font-medium text-white text-2xl mb-3">Welfare</div>
                                <div className="leading-loose">
                                    <div>(주)인디앤드코리아는 임직원과 회사의 행복을 위한 무상 복지몰 </div>
                                    <div>구축 서비스를 제공하고 있습니다. 지금 바로 &lsquo;복지드림&rsquo;에서 선택</div>
                                    <div>적 복지제도를 확인하세요.</div>
                                </div>
                                <div className="flex justify-start pt-5 text-base">
                                    <Link
                                        href="https://kr.object.ncloudstorage.com/indend-etc/%EC%9D%B8%EB%94%94%EC%95%A4%EB%93%9C%EC%BD%94%EB%A6%AC%EC%95%84%20%ED%9A%8C%EC%82%AC%EC%86%8C%EA%B0%9C%EC%84%9C.pdf"
                                        target="_blank"
                                        className="font-bold"
                                    >
                                        <button className="inline-flex text-white border border-white py-3 px-2 focus:outline-none">회사소개서 다운받기</button>
                                    </Link>
                                    <Link href="http://www.welfaredream.com/" target="_blank">
                                        <button className="ml-4 inline-flex text-white border border-white py-3 px-2 focus:outline-none font-bold">복지드림 바로가기</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            )}

            {device == 'mobile' && (
                <div className="relative w-full float-left px-5 py-12" style={{ backgroundImage: `url(/resource/indendkorea/images/main/mobile/bg_title.png)` }}>
                    <div className="text-white text-left">
                        <div className="mb-4" style={{ width: '160px' }}>
                            <Image src="/resource/indendkorea/images/main/mobile/m_footer_logo_white.png" width={160} height={23} alt="" />
                        </div>

                        <div className="text-sm text-zinc-400 leading-relaxed pt-3">
                            <div className="mb-4">
                                <div className="font-bold text-base text-white">Head Office</div>
                                <div>
                                    인천 연수구 인천타워대로323 송도센트로드B동 2105호
                                    <br />
                                    대표이사 : 오상훈
                                    <br />
                                    사업자등록번호 : 511-88-00037
                                    <br />
                                    통신판매업신고 : 제 2015-인천연수구-0116
                                    <br />
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="font-bold text-base text-white">Contact</div>
                                <div>
                                    <div className="flex">
                                        <div className="mr-3">입점문의</div>
                                        <div>
                                            T: 032-719-7814
                                            <br />
                                            E: md@indend.co.kr
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="mr-3">복지몰 구축 문의</div>
                                        <div>
                                            T: 1668-1317
                                            <br />
                                            E: info@welfaredream.com
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="link_href text-base">
                                <div className="mb-4">
                                    <Link
                                        href="https://kr.object.ncloudstorage.com/indend-etc/%EC%9D%B8%EB%94%94%EC%95%A4%EB%93%9C%EC%BD%94%EB%A6%AC%EC%95%84%20%ED%9A%8C%EC%82%AC%EC%86%8C%EA%B0%9C%EC%84%9C.pdf"
                                        target="_blank"
                                        className="font-bold"
                                    >
                                        <button className="text-white">회사소개서 다운로드 &gt;</button>
                                    </Link>
                                </div>
                                <div className="mb-4">
                                    <Link href="http://www.welfaredream.com/" target="_blank" className="font-bold">
                                        <button className="mb-3 text-white">복지드림 바로가기 &gt;</button>
                                    </Link>
                                </div>
                            </div>

                            <div>ⓒ 2023. (주)인디앤드코리아 all rights reserved.</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
