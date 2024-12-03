import { useRouter } from 'next/router';
import { openDreamCounsel } from '@/libs/utils';

export default function ButtonTop({ nav_id, title, device }: any) {
    const { pathname } = useRouter();
    return (
        <>
            {device == 'desktop' ? (
                <div className="section_wrap" style={{ borderTop: '1px solid #eee' }}>
                    <div className="text-center py-3 flex">
                        <a href="#" className="w-full block text-black text-lg">
                            맨위로
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 inline-block">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18" />
                            </svg>
                        </a>
                    </div>
                </div>
            ) : (
                <>
                    <div className="section_wrap" style={{ borderTop: '1px solid #eee' }}>
                        <div className="text-center py-2 flex">
                            <a href="#" className="w-full block text-black">
                                맨위로
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 inline-block ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {pathname != '/request/counsel' && (
                        <div className="fixed w-full bottom-0 left-0 z-50">
                            <div className="side_layout absolute" style={{ bottom: '90px', right: '20px' }}>
                                <div className="pb-3">
                                    <a href="http://pf.kakao.com/_XWRexb/chat" target="_blank">
                                        <img alt="img" src={'/resource/welfaredream/images/main/mobile/fix_kakao.png'} style={{ width: '50px' }} />
                                    </a>
                                </div>
                                <div className="pb-2">
                                    <a href="tel:032-719-3366">
                                        <img alt="img" src={'/resource/welfaredream/images/main/mobile/fix_call.png'} style={{ width: '50px' }} />
                                    </a>
                                </div>
                            </div>
                            <div onClick={openDreamCounsel} className="text-black text-center">
                                <div className="float_box bg-amber-300 font-bold w-full p-5 text-xl ">복지몰 구축 문의</div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
}
