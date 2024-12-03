import { motion } from 'framer-motion';
import { openSellerRequest, openDreamCounsel } from '@/libs/utils';

export default function Counsel({ device }: any) {
    return (
        <>
            {device == 'desktop' ? (
                <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                    <section className="w-full pt-28">
                        <div className="mx-auto">
                            <div className="tracking-tighter text-center pb-16 relative">
                                <div className="font-bold pb-2" style={{ fontSize: '42px' }}>
                                    복지드림 제휴 신청
                                </div>
                                <div className="text-xl text-center">
                                    복지드림과 함께 비즈니스 제휴를 희망하시나요? <br />
                                    복지드림은 고객사와 파트너사를 최우선으로 생각합니다.
                                </div>
                            </div>

                            <div className="flex text-xl text-white">
                                <div
                                    className="bg-cover relative py-20 px-16 w-full text-end leading-tight"
                                    style={{ backgroundImage: 'url(/resource/welfaredream/images/main/web/main_cs_bg_blue.jpg)' }}
                                >
                                    <div className="font-bold">폐쇄몰 구축 상담</div>
                                    <div className="text-lg py-5">
                                        복지드림은 복지몰을 비롯한 폐쇄몰을 무료로 구축해드리고 <br />
                                        전문인력을 통한 위탁 운영이 가능합니다.
                                    </div>
                                    <div className="inline-block mt-8 font-bold text-xl px-8 py-3 rounded-full bg-amber-400 cursor-pointer">
                                        <div className="text-black" onClick={openDreamCounsel}>
                                            폐쇄몰 구축 상담
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="bg-cover relative py-20 px-16 w-full text-start leading-tight"
                                    style={{ backgroundImage: 'url(/resource/welfaredream/images/main/web/main_cs_bg_bl.jpg)' }}
                                >
                                    <div className="font-bold">입점 · 제휴 상담</div>
                                    <div className="text-lg py-5">
                                        복지드림의 복지쇼핑몰에 입점하시면 <br />
                                        50만 여명의 회원에게 상품을 홍보할 수 있습니다.
                                    </div>
                                    <div className="inline-block mt-8 font-bold text-xl text-black px-8 py-3 rounded-full bg-amber-400 cursor-pointer">
                                        <div onClick={openSellerRequest} className="text-black">
                                            입점 · 제휴 상담
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </motion.div>
            ) : (
                <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                    <section className="pt-16 text-center">
                        <div>
                            <div className="font-bold pb-3 text-3xl">복지드림 제휴 신청</div>
                            <div className="pb-10">
                                복지드림과 함께 비즈니스 제휴를 희망하시나요? <br />
                                복지드림은 고객사와 파트너사를
                                <br />
                                최우선으로 생각합니다.
                            </div>
                        </div>

                        <div className="text-white text-start">
                            <div
                                className="py-11 px-7 w-full flex justify-between items-center bg-cover"
                                style={{ backgroundImage: 'url(/resource/welfaredream/images/main/mobile/mainCon06_bg1.jpg)' }}
                            >
                                <div style={{ width: '80%' }}>
                                    <div className="text-xl font-bold mb-2">폐쇄몰 구축 상담</div>
                                    <div className="text-sm mr-10">복지드림은 복지몰을 비롯한 폐쇄몰을 무료로 구축해드리고 전문인력을 통한 위탁 운영이 가능합니다.</div>
                                </div>
                                <div onClick={openDreamCounsel}>
                                    <img alt="img" src="/resource/welfaredream/images/main/mobile/mainCon06_link.png" className="inline-block" />
                                </div>
                            </div>
                            <div
                                className="py-11 px-7 w-full flex justify-between items-center bg-cover"
                                style={{ backgroundImage: 'url(/resource/welfaredream/images/main/mobile/mainCon06_bg2.jpg)' }}
                            >
                                <div style={{ width: '80%' }}>
                                    <div className="text-xl font-bold mb-2">입점 · 제휴 상담</div>
                                    <div className="text-sm mr-10">복지드림의 복지쇼핑몰에 입점하시면 50만 여명의 회원에게 상품을 홍보할 수 있습니다.</div>
                                </div>
                                <div onClick={openSellerRequest}>
                                    <img alt="img" src="/resource/welfaredream/images/main/mobile/mainCon06_link.png" className="inline-block" />
                                </div>
                            </div>
                        </div>
                    </section>
                </motion.div>
            )}
        </>
    );
}
