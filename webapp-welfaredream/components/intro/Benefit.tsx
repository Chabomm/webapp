import Link from 'next/link';
import { motion } from 'framer-motion';
import { openDreamCounsel } from '@/libs/utils';

export default function Benefit({ device }: any) {
    return (
        <>
            {device == 'desktop' ? (
                <section className="w-full md:w-1200 mx-auto">
                    <div className="px-32 py-20 mx-auto">
                        <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }} className="text-4xl mb-11 leading-snug">
                            <div>선택적 복지제도는 임직원이 직접</div>
                            <div className="font-bold">복지항목을 설계할 수 있어</div>
                            <div>효과적으로 복지혜택을 누릴 수 있습니다.</div>
                        </motion.div>
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.7, delay: 0.5 }}
                            className="text-lg leading-snug mb-16"
                        >
                            <div>
                                기존 복지제도는 전사적으로 선택해야 하는 일방적 복지서비스였다면 <br />
                                선택적 복지제도는 개인니즈에 맞춰서 설계할 수 있어 기업과 임직원이 모두 만족할 수 있는 새로운 복지제도입니다.
                            </div>
                        </motion.div>
                        <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.5 }} className="py-10">
                            <img alt="img" src={'/resource/welfaredream/images/intro/web/benefit_01.jpg'} />
                        </motion.div>
                        <div className="py-14 mx-11 border-b-2 border-zinc-100">
                            <div className="font-bold inline-flex border-b-4 border-yellow-400 text-xl">Point 1</div>
                            <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} className="text-4xl py-4 pb-11 font-bold">
                                기존 복지제도와의 비교
                            </motion.div>
                            <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.5 }}>
                                <img alt="img" src={'/resource/welfaredream/images/intro/web/benefit_p01_bg.jpg'} />
                            </motion.div>
                        </div>
                        <div className="py-14 mx-11">
                            <div className="font-bold inline-flex border-b-4 border-yellow-400 text-xl">Point 2</div>
                            <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }} className="text-4xl py-4 pb-11 font-bold">
                                선택적 복지제도의 필요성
                            </motion.div>
                            <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.5 }}>
                                <img alt="img" src={'/resource/welfaredream/images/intro/web/benefit_p02.jpg'} />
                            </motion.div>
                        </div>
                        <div className="text-center mt-11">
                            <img alt="img" src={'/resource/welfaredream/images/intro/web/benefit_textBg.jpg'} className="mx-auto" />
                            <motion.div className="mb-14 inline-block text-left" initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
                                <div className="flex items-center">
                                    <img alt="img" src={'/resource/welfaredream/images/intro/web/benefit_dot.jpg'} />
                                    <span className="font-bold text-lg ml-2">사내근로복지기금이란?</span>
                                </div>
                                <div className="px-4 py-2">
                                    임금 등 근로조건에 부가하여, 기업이익의 일부를 출연하여 <br />
                                    근로자의 복지증진 사업에 활용함으로써 근로자의 복리후생 혜택을 보장하는 제도입니다.
                                </div>
                                <div className="flex items-center">
                                    <img alt="img" src={'/resource/welfaredream/images/intro/web/benefit_dot.jpg'} />
                                    <span className="font-bold text-lg ml-2">도입효과!</span>
                                </div>
                                <div className="px-4 py-2">
                                    회사에서 시행되는 복지제도는 회사의 경영환경과 손익상황에 따라 가감될 수 있지만, <br />
                                    사내근로복지기금은 <span className="font-bold">기업경영환경에 영향을 받지 않고 안정적으로 직원의 복지증진을 위한 사업</span>이 가능합니다.
                                </div>
                            </motion.div>
                            <motion.div className="font-bold text-4xl mb-11" initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
                                사내근로복지기금의 장점
                            </motion.div>
                            <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
                                <img alt="img" src={'/resource/welfaredream/images/intro/web/benefit_lastImg.jpg'} className="mx-auto" />
                            </motion.div>
                            <motion.div className="p-6 pb-11 text-xl" initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
                                <div>
                                    기업의 <span className="font-bold">선택적 복지제도!</span>
                                </div>
                                <div>
                                    <span className="font-bold">사내근로복지기금</span>과 연계하고
                                </div>
                                <div>
                                    임직원의 <span className="font-bold">소득세 감면 혜택</span>과 법인의 <span className="font-bold">법인세 부담</span>을 줄여보세요!
                                </div>
                            </motion.div>
                            <motion.div className="p-5" initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
                                <div className="btn_link_orange change_color_btn border-0 mr-20 text-black" onClick={openDreamCounsel}>
                                    <div>복지드림</div>
                                    <div>상담신청하기</div>
                                </div>
                                <Link href="/" className="change_color_btn btn_link_navy">
                                    <div>사내근로복지기금</div>
                                    <div>더 알아보기</div>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </section>
            ) : (
                <section className="px-7 py-12">
                    <motion.div className="text-2xl pb-9 leading-snug font-light" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
                        선택적 복지제도는 <br />
                        임직원이 직접 <br />
                        <div className="font-bold">복지항목을 설계할 수 있어</div>
                        효과적으로 복지혜택을 <br />
                        누릴 수 있습니다.
                    </motion.div>
                    <motion.div className="pb-10" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
                        <img alt="img" src={'/resource/welfaredream/images/intro/mobile/benefit_01.jpg'} className="mx-auto" />
                    </motion.div>
                    <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
                        기존 복지제도는 전사적으로 선택해야 하는 일방적 복지서비스였다면 선택적 복지제도는 개인니즈에 맞춰서 설계할 수 있어 기업과 임직원이 모두 만족할 수 있는
                        새로운 복지제도입니다.
                    </motion.div>
                    <div>
                        <div className="border-b border-1 py-11">
                            <div className="font-bold inline-flex border-b-2 border-amber-400 text-sm">Point 1</div>
                            <motion.div className="text-2xl pt-3 pb-5 font-bold" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
                                기존 복지제도와의 비교
                            </motion.div>
                            <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
                                <img alt="img" src={'/resource/welfaredream/images/intro/mobile/benefit_02.jpg'} className="mx-auto" />
                            </motion.div>
                        </div>
                        <div className="border-b border-1 py-11">
                            <div className="font-bold inline-flex border-b-2 border-amber-400 text-sm">Point 2</div>
                            <motion.div className="text-2xl pt-3 pb-5 font-bold" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
                                선택적 복지제도의 필요성
                            </motion.div>
                            <motion.div className="pt-7" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
                                <img alt="img" src={'/resource/welfaredream/images/intro/mobile/benefit_03.jpg'} className="mx-auto" />
                            </motion.div>
                        </div>
                    </div>
                    <motion.div className="pt-11" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
                        <img alt="img" src={'/resource/welfaredream/images/intro/mobile/benefit_04.jpg'} className="mx-auto" />
                    </motion.div>
                    <motion.div className="py-10" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
                        <div className="flex items-center">
                            <img alt="img" src={'/resource/welfaredream/images/intro/mobile/benefit_dot.jpg'} />
                            <span className="pl-2 font-bold">사내근로복지기금이란?</span>
                        </div>
                        <div className="pl-5 py-1 text-sm font-semibold">
                            임금 등 근로조건에 부가하여, 기업이익의 일부를 출연하여 근로자의 복지증진 사업에 활용함으로써 근로자의 복리후생 혜택을 보장하는 제도입니다.
                        </div>
                        <div className="flex items-center pt-4">
                            <img alt="img" src={'/resource/welfaredream/images/intro/mobile/benefit_dot.jpg'} />
                            <span className="pl-2 font-bold">도입효과!</span>
                        </div>
                        <div className="pl-5 py-1 text-sm font-semibold">
                            회사에서 시행되는 복지제도는 회사의 경영환경과 손익상황에 따라 가감될 수 있지만, <br />
                            사내근로복지기금은 기업경영환경에 영향을 받지 않고 안정적으로 직원의 복지증진을 위한 사업이 가능합니다.
                        </div>
                    </motion.div>
                    <motion.div className="text-2xl font-bold text-center pb-4" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
                        사내근로복지기금의 장점
                    </motion.div>
                    <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
                        <img alt="img" src={'/resource/welfaredream/images/intro/mobile/benefit_05.jpg'} className="mx-auto" />
                    </motion.div>
                    <motion.div className="text-center pt-4 pb-8" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
                        기업의 <span className="font-bold">선택적 복지제도!</span>
                        <br />
                        <span className="font-bold">사내근로복지기금</span>과 연계하고 <br />
                        임직원의 <span className="font-bold">소득세 감면 혜택</span>과 <br />
                        법인의 <span className="font-bold">법인세 부담</span>을 줄여보세요!
                    </motion.div>
                    <div className="text-center pb-8">
                        <div onClick={openDreamCounsel} className="bg-amber-400 inline-block rounded-full font-bold border-0 mr-5 text-black px-6 py-1">
                            <div>복지드림</div>
                            <div>상담신청하기</div>
                        </div>
                        <Link href="/" className="bg-slate-900 text-white inline-block rounded-full font-bold border-0 px-6 py-1">
                            <div>사내근로복지기금</div>
                            <div>더 알아보기</div>
                        </Link>
                    </div>
                </section>
            )}
        </>
    );
}
