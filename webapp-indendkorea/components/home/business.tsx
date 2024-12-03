import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Business({ device }: any) {
    return (
        <>
            {device == 'desktop' && (
                <section className="main_section" style={{ backgroundColor: `#f7f7f9` }}>
                    <div className="lg:w-1200 mx-auto">
                        <div className="y_bar"></div>
                        <div className="main_title">BUSINESS</div>

                        <div className="container px-5 py-24 mx-auto">
                            <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
                                <Link className="p-4 lg:w-1/3 sm:mb-0 mb-6" href={'/business/mall'}>
                                    <motion.div initial={{ y: -50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
                                        <div
                                            className="relative rounded-lg overflow-hidden bg-no-repeat bg-left-top flex items-end"
                                            style={{ backgroundImage: `url(/resource/indendkorea/images/main/business_img1.jpg)`, height: `470px` }}
                                        >
                                            <div className="p-5 w-72">
                                                <h3 className="text-white text-3xl font-black mb-3">WELFARE</h3>
                                                <div className="text-white text-lg mb-5">임직원과 회원을 위한 복지몰을 무료로 구축해 드립니다.</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>

                                <Link className="p-4 lg:w-1/3 sm:mb-0 mb-6" href={'/business/domastic'}>
                                    <motion.div initial={{ y: -50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
                                        <div
                                            className="relative rounded-lg overflow-hidden bg-no-repeat bg-left-top flex items-end"
                                            style={{ backgroundImage: `url(/resource/indendkorea/images/main/business_img2.jpg)`, height: `470px` }}
                                        >
                                            <div className="p-5 w-72">
                                                <h3 className="text-white text-3xl font-black mb-3">DISTRIBUTION</h3>
                                                <div className="text-white text-lg mb-5">다양한 국내 이커머스 채널을 통해 우수 상품을 전국으로 유통해 드립니다.</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>

                                <Link className="p-4 lg:w-1/3 sm:mb-0 mb-6" href={'/business/foreign'}>
                                    <motion.div initial={{ y: -50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.9 }}>
                                        <div
                                            className="relative rounded-lg overflow-hidden bg-no-repeat bg-left-top flex items-end"
                                            style={{ backgroundImage: `url(/resource/indendkorea/images/main/business_img3.jpg)`, height: `470px` }}
                                        >
                                            <div className="p-5 w-72">
                                                <h3 className="text-white text-3xl font-black mb-3">EXPORT</h3>
                                                <div className="text-white text-lg mb-5">수출 판로 개척을 통한 대량 판매를 진행해 드립니다.</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            {device == 'mobile' && (
                <section className="py-8" style={{ backgroundColor: `#f4f4f4` }}>
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
                                <div className="font-bold text-2xl mb-4">BUSINESS</div>
                            </motion.div>
                        </div>

                        <div className="px-3">
                            <div className="w-full mb-3 relative">
                                <Link className="" href={'/business/mall'}>
                                    <div
                                        style={{ backgroundImage: `url(/resource/indendkorea/images/main/mobile/m_img_business_1.jpg)`, height: `170px` }}
                                        className="m_bis_text bg-no-repeat bg-cover relative"
                                    >
                                        <div className="text-left w-full px-3 text-white absolute" style={{ bottom: '10%' }}>
                                            <motion.div
                                                initial={{ x: -50, opacity: 0 }}
                                                whileInView={{ x: 0, opacity: 1 }}
                                                transition={{ duration: 1.0, delay: 0 }}
                                                className="text-2xl mb-3 font-bold"
                                            >
                                                WELFARE
                                            </motion.div>
                                            <div className="grid grid-cols-3 gap-4 w-full m-0">
                                                <div className="col-span-2 text-zinc-300 text-sm">임직원과 회원을 위한 복지몰을 무료로 구축해 드립니다.</div>
                                                <div className="pt-5">
                                                    <div className="float-right">
                                                        <Image src="/resource/indendkorea/images/main/mobile/m_ic_business_arrow.png" alt="" width={45} height={14} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="w-full mb-3 relative">
                                <Link className="" href={'/business/domastic'}>
                                    <div
                                        style={{ backgroundImage: `url(/resource/indendkorea/images/main/mobile/m_img_business_2.jpg)`, height: `170px` }}
                                        className="m_bis_text bg-no-repeat bg-cover relative"
                                    >
                                        <div className="text-left w-full px-3 text-white absolute" style={{ bottom: '10%' }}>
                                            <motion.div
                                                initial={{ x: -50, opacity: 0 }}
                                                whileInView={{ x: 0, opacity: 1 }}
                                                transition={{ duration: 1.0, delay: 0 }}
                                                className="text-2xl mb-3 font-bold"
                                            >
                                                DISTRIBUTION
                                            </motion.div>
                                            <div className="grid grid-cols-3 gap-4 w-full m-0">
                                                <div className="col-span-2 text-zinc-300 text-sm">다양한 국내 이커머스 채널을 통해 우수 상품을 전국으로 유통해 드립니다.</div>
                                                <div className="pt-5">
                                                    <div className="float-right">
                                                        <Image src="/resource/indendkorea/images/main/mobile/m_ic_business_arrow.png" alt="" width={45} height={14} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="w-full mb-3 relative">
                                <Link className="p-4 lg:w-1/3 sm:mb-0 mb-6" href={'/business/foreign'}>
                                    <div
                                        style={{ backgroundImage: `url(/resource/indendkorea/images/main/mobile/m_img_business_3.jpg)`, height: `170px` }}
                                        className="m_bis_text bg-no-repeat bg-cover relative"
                                    >
                                        <div className="text-left w-full px-3 text-white absolute" style={{ bottom: '10%' }}>
                                            <motion.div
                                                initial={{ x: -50, opacity: 0 }}
                                                whileInView={{ x: 0, opacity: 1 }}
                                                transition={{ duration: 1.0, delay: 0 }}
                                                className="text-2xl mb-3 font-bold"
                                            >
                                                EXPORT
                                            </motion.div>
                                            <div className="grid grid-cols-3 gap-4 w-full m-0">
                                                <div className="col-span-2 text-zinc-300 text-sm">수출 판로 개척을통한 대량 판매를 진행해 드립니다.</div>
                                                <div className="pt-5">
                                                    <div className="float-right">
                                                        <Image src="/resource/indendkorea/images/main/mobile/m_ic_business_arrow.png" alt="" width={45} height={14} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
