import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Partner({ data, pagination, device }: any) {
    return (
        <>
            {device == 'desktop' ? (
                <section className="main_section mx-auto" style={{ width: '940px' }}>
                    <motion.div className="text-4xl pb-11 leading-snug" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                        복지드림은 다양한 고객사의 취향에 맞춰 <br />
                        회사와 임직원이 모두 행복할 수 있는 <br />
                        <span className="font-bold">새로운 복지 트렌드</span>를 만들어 나가고 있습니다.
                    </motion.div>

                    <motion.div className="text-lg" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1, delay: 0.3 }}>
                        복지드림은 현재 약 100개의 고객사와 40만 회원의 복지를 책임지고 있습니다.
                    </motion.div>

                    <div className="text-center">
                        <motion.div className="pt-20 pb-14" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                            <div className="font-bold text-4xl">
                                대표 고객사 & 파트너
                                <Image src="/resource/welfaredream/images/customer/web/partner_dot.png" width={6} height={6} alt="" className="inline-block" />
                            </div>
                            <div className="text-xl pt-3">복지드림과 함께 성장하고 있는 기업들과 브랜드를 소개합니다.</div>
                        </motion.div>

                        <motion.div className="text-start" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                            {data.main_banner_list?.map((v: any, i: number) => (
                                <div key={i} className="grid grid-cols-5 gap-3">
                                    {v?.map((vv: any, ii: number) => (
                                        <div key={ii} className="shadow-md p-1">
                                            <div className="border-1 border-neutral-100">
                                                <img alt="img" src={vv.banner_src} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            ) : (
                <section className="py-14 px-7">
                    <motion.div className="text-2xl pb-5 leading-snug font-light" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
                        복지드림은 다양한 고객사의 <br />
                        취향에 맞춰 회사와 임직원이 <br />
                        모두 행복할 수 있는 <br />
                        <span className="font-bold">새로운 복지 트렌드</span>를<br />
                        만들어 나가고 있습니다.
                    </motion.div>

                    <motion.div className="" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
                        <span className="font-bold">복지드림</span>은 현재 약 100개의 고객사와
                        <br />
                        40만 회원의 복지를 책임지고 있습니다.
                    </motion.div>

                    <motion.div className="text-center py-11 tracking-tighter" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
                        <div className="text-2xl font-bold">
                            대표 고객사 & 파트너
                            <Image className="ml-1 inline-block" src="/resource/welfaredream/images/customer/web/partner_dot.png" alt="" width={6} height={6} />
                        </div>
                        <div className="pt-3 text-lg">
                            복지드림과 함께 성장하고 있는 <br />
                            기업들과 브랜드를 소개합니다.
                        </div>
                    </motion.div>
                    <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
                        {data.main_banner_list?.map((v: any, i: number) => (
                            <div key={i} className="grid grid-cols-3 gap-3">
                                {v?.map((vv: any, ii: number) => (
                                    <div key={ii} className="shadow-md p-1">
                                        <div className="border-1 border-neutral-100">
                                            <img alt="img" src={vv.banner_src} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </motion.div>
                </section>
            )}
        </>
    );
}
