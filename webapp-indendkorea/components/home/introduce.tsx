import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Introduce({ device }: any) {
    return (
        <>
            {device == 'desktop' && (
                <section className="main_section" style={{ backgroundImage: `url('/resource/indendkorea/images/main/bg_pattern1.png')` }}>
                    <div className="lg:w-1200 mx-auto">
                        <div className="y_bar"></div>
                        <div className="main_title">INTRODUCE</div>
                        <motion.div
                            initial={{ y: -50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="relative overflow-hidden w-full lg:w-full lg:h-full"
                        >
                            <div className={'image-container'}>
                                <Image src="/resource/indendkorea/images/main/introduce.png" fill sizes={'image'} alt="" className={'image'} />
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}
            {device == 'mobile' && (
                <section className="py-8" style={{ backgroundImage: `url('/resource/indendkorea/images/main/bg_pattern1.png')` }}>
                    <div className="text-center">
                        <div className="mb-3" style={{ height: '25px' }}>
                            <span className="border-r border-black inline-block h-full"></span>
                        </div>
                        <div className="w-full mb-4">
                            <motion.div
                                initial={{ y: -50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1.5, delay: 0 }}
                                className="relative overflow-hidden w-full lg:w-full lg:h-full"
                            >
                                <div className="font-bold text-2xl mb-4">INTRODUCE</div>
                            </motion.div>
                            <div className="">복지몰 구축 &#124; 국내 유통 &#124; 해외 수출</div>
                        </div>
                        <div className="text-zinc-500 leading-6">
                            (주)인디앤드코리아는 임직원 복지와 회원 복지를
                            <br />
                            고민하고 계시는 기업 및 단체를 위해
                            <br />
                            무료 복지몰 구축 서비스를 제공하고 있습니다.
                            <br />
                            일과 삶의 균형을 찾아 삶의 가치를
                            <br />
                            높여드리겠습니다.
                            <br />
                            지금 바로 최고의 복지서비스를 경험해 보세요.
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
