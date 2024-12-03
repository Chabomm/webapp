import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { cls } from '@/libs/utils';
interface Props {
    guide_process?: any;
    device?: any;
}

export default function AboutGuide({ guide_process, device }: Props) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            if (count > 6) {
                setCount(1);
            } else {
                setCount(count + 1);
            }
        }, 1000);
        return () => clearInterval(id);
    }, [count]);

    return (
        <>
            {device == 'desktop' ? (
                <section className="main_section text-center">
                    <div style={{ width: '860px' }} className="inline-block">
                        <motion.div className="text-center pt-14" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1, delay: 0.2 }}>
                            <div className="text-2xl text-amber-500">미리 확인해주세요!</div>
                            <div className="font-bold  text-4xl pb-2">복지드림 구축 사전 체크 포인트!</div>
                            <div className="text-2xl pt-2 pb-20">구축상담 이 전에 미리 파악하면 더 빨리 상담이 가능해요!</div>
                        </motion.div>
                        <motion.div className="grid grid-cols-2 pb-24" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1, delay: 0.4 }}>
                            <div id="guide_1" className="flex items-center relative pb-10">
                                <div className="mr-4">
                                    <img alt="img" src="/resource/welfaredream/images/guide/web/guide01_icon01.jpg" />
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-2xl">복지드림 구축 타입</div>
                                    <div className="text-zinc-600">
                                        {'"'}어떤 복지드림 구축 타입이
                                        <br />
                                        우리 회사에 필요할까?{'"'}
                                    </div>
                                    <Link className="text-sm detail_link" style={{ color: '#F39800' }} href="/guide/about_type">
                                        자세히 보기
                                        <img alt="img" src="/resource/welfaredream/images/guide/web/guige_arrow.jpg" className="inline-block" />
                                    </Link>
                                </div>
                            </div>
                            <div id="guide_2" className="flex items-center relative pl-10 pb-10">
                                <div className="mr-4">
                                    <img alt="img" src="/resource/welfaredream/images/guide/web/guide01_icon02.jpg" />
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-2xl">예상 연간 복지 예산</div>
                                    <div className="text-zinc-600">
                                        {'"'}우리 회사 올해 복지 예산이
                                        <br />
                                        얼마정도 가능하지?{'"'}
                                    </div>
                                </div>
                                <div>　</div>
                            </div>
                            <div id="guide_3" className="flex items-center relative pt-10">
                                <div className="mr-4">
                                    <img alt="img" src="/resource/welfaredream/images/guide/web/guide01_icon03.jpg" />
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-2xl">복지몰 가입 인원</div>
                                    <div>
                                        {'"'}우리 회사 복지 헤택을
                                        <br />
                                        받을 임직원은 약 25명이에요!{'"'}
                                    </div>
                                    <div className="text-zinc-600">　</div>
                                </div>
                            </div>
                            <div id="guide_4" className="flex items-center relative pl-10 pt-10">
                                <div className="mr-4">
                                    <img alt="img" src="/resource/welfaredream/images/guide/web/guide01_icon04.jpg" />
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-2xl">연간 정기 복지 플랜</div>
                                    <div className="text-zinc-600">
                                        {'"'}올해 정기적으로 지급될
                                        <br />
                                        예상 복지 플랜은 이렇게 될 것 같아요!{'"'}
                                        <br />
                                        (ex. 명절, 생일, 결혼, 출산, 진급 등)
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="pt-24 pb-16" style={{ background: '#f9f9f9' }}>
                        <motion.div className="font-bold  text-4xl pb-2" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                            구축 과정
                        </motion.div>
                        <motion.div className="text-2xl pt-2 pb-20" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1, delay: 0.2 }}>
                            어떤 과정으로 복지몰이 구축되나요?
                        </motion.div>

                        <motion.div
                            className="guide_02 inline-block bg-no-repeat"
                            // style={{ backgroundImage: 'url(/resource/welfaredream/images/guide/web/guide_process.png)', width: '1007px' }}
                            initial={{ y: 100, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 2 }}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            {guide_process?.map((v: any, i: number) => (
                                <div key={i} className={v.class_name}>
                                    <div className={`${v.num == count ? 'on' : ''} text-3xl num flex font-bold justify-center items-center rounded-full border relative`}>
                                        {v.num}
                                    </div>
                                    <div className="font-bold text-2xl my-3">{v.strong}</div>
                                    <div className="content">{v.desc}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            ) : (
                <section>
                    <motion.div
                        className="pt-16 text-center"
                        style={{ background: '#FDFBF4' }}
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 2 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="text-lg font-bold text-amber-500">미리 확인해주세요!</div>
                        <div className="font-bold text-2xl pb-2">
                            복지드림 구축
                            <br /> 사전 체크 포인트!
                        </div>
                        <div className="text-lg pt-2 pb-3">
                            구축상담 이 전에 미리 파악하면
                            <br />
                            빨리 상담이 가능해요!
                        </div>
                    </motion.div>

                    <div className="px-8 pb-8">
                        <motion.div className="flex items-center py-7 border-b" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                            <div className="mr-3">
                                <img alt="img" src="/resource/welfaredream/images/guide/mobile/guide_img01-1.jpg" />
                            </div>
                            <div>
                                <div className="font-bold text-lg">복지드림 구축 타입</div>
                                <div className="text-secondary text-sm pb-1">
                                    {'"'}어떤 복지드림 구축 타입이
                                    <br />
                                    우리 회사에 필요할까?{'"'}
                                </div>
                                <Link className="text-sm text-warning" style={{ color: '#F39800' }} href="/guide/about_type">
                                    자세히 보기
                                    <img alt="img" src="/resource/welfaredream/images/guide/web/guige_arrow.jpg" className="inline-block" />
                                </Link>
                            </div>
                        </motion.div>
                        <motion.div className="flex items-center py-7 border-b" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                            <div className="mr-3">
                                <img alt="img" src="/resource/welfaredream/images/guide/mobile/guide_img01-2.jpg" />
                            </div>
                            <div>
                                <div className="font-bold text-lg">예상 연간 복지 예산</div>
                                <div className="text-secondary text-sm pb-1">
                                    {'"'}우리 회사 올해 복지 예산이
                                    <br />
                                    얼마정도 가능하지?{'"'}
                                </div>
                            </div>
                        </motion.div>
                        <motion.div className="flex items-center py-7 border-b" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                            <div className="mr-3">
                                <img alt="img" src="/resource/welfaredream/images/guide/mobile/guide_img01-3.jpg" />
                            </div>
                            <div>
                                <div className="font-bold text-lg">복지몰 가입 인원</div>
                                <div className="text-secondary text-sm pb-1">
                                    {'"'}우리 회사 복지 혜택을
                                    <br />
                                    받을 임직원은 약 25명이에요!{'"'}
                                </div>
                            </div>
                        </motion.div>
                        <motion.div className="flex items-center py-7" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                            <div className="mr-3">
                                <img alt="img" src="/resource/welfaredream/images/guide/mobile/guide_img01-4.jpg" />
                            </div>
                            <div>
                                <div className="font-bold text-lg">연간 정기 복지 플랜</div>
                                <div className="text-secondary text-sm pb-1">
                                    {'"'}올해 정기적으로 지급될
                                    <br />
                                    예상 복지 플랜은 이렇게 될 것 같아요!{'"'}
                                    <br />
                                    (ex. 명절, 생일, 결혼, 출산, 진급 등)
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="px-8 py-14 text-center" style={{ background: '#f9f9f9' }}>
                        <motion.div className="font-bold text-2xl pb-2" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                            구축 과정
                        </motion.div>
                        <motion.div className="text-lg pt-2 pb-3" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1, delay: 0.2 }}>
                            어떤 과정으로 복지몰이 구축되나요?
                        </motion.div>

                        <div className="pt-6">
                            {guide_process?.map((v: any, i: number) => (
                                <div key={i} className={cls('flex items-center justify-between text-start m_guide_box', guide_process.length - 1 == i ? '' : 'arrow')}>
                                    <div className={`${v.num == count ? 'on' : ''} text-2xl num relative flex font-bold justify-center items-center rounded-full border`}>
                                        {v.num}
                                    </div>
                                    <div className="text_area">
                                        <div className="font-bold text-lg mb-1">{v.strong}</div>
                                        <div className="text-sm">{v.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
