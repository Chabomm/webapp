import { motion } from 'framer-motion';

export default function Counsel({ device }: any) {
    return (
        <>
            {device == 'desktop' && (
                <section className="main_section mx-1236">
                    <div className="flex flex-wrap text-white">
                        <div
                            className="p-12 lg:w-1/2 flex-col items-end text-end bg-cover"
                            style={{ backgroundImage: `url(/resource/indendkorea/images/main/bg_blue.jpg)`, height: `370px` }}
                        >
                            <motion.div
                                initial={{ y: -50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="relative overflow-hidden w-full lg:w-full lg:h-full float-right"
                            >
                                <h3 className="sm:text-3xl text-white mt-4 mb-4 font-semibold">복지몰 구축 상담</h3>
                                <div className="leading-relaxed text-xl mb-4">
                                    인디앤드코리아는 복지몰을 무료로 구축해드리고
                                    <br /> 전문인력을 통한 위탁 운영이 가능합니다.
                                </div>
                                <div className="flex justify-end">
                                    <div className="btn_transparent mt-3 h-14">
                                        <div className="right_eff"></div>
                                        <a href='javascript:window.open("https://web.indend.synology.me/dream/counsel", "counsel", "width=1350,height=900")'>상담 신청</a>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        <div
                            className="p-12 lg:w-1/2 flex-col items-end text-start bg-cover"
                            style={{ backgroundImage: `url(/resource/indendkorea/images/main/bg_purple.jpg)`, height: `370px` }}
                        >
                            <motion.div
                                initial={{ y: -50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="relative overflow-hidden w-full lg:w-full lg:h-full float-left"
                            >
                                <h3 className="sm:text-3xl text-white mt-4 mb-4 font-semibold">입점·제휴 상담</h3>
                                <div className="leading-relaxed text-xl mb-4">
                                    (주)인디앤드코리아의 복지쇼핑몰에 입점하시면
                                    <br /> 40만여명의 임직원에게 상품을 홍보할 수 있습니다.
                                </div>
                                <div className="flex">
                                    <div className="btn_transparent mt-3 h-14">
                                        <div className="right_eff"></div>
                                        <a href='javascript:window.open("https://web.indend.synology.me/seller/requestv2/request/indend", "requestv2", "width=1350,height=900")'>
                                            상담 신청
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            )}
            {device == 'mobile' && (
                <section className="py-8">
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
                                <div className="font-bold text-2xl mb-4">CONTACT</div>
                            </motion.div>
                        </div>

                        <div className="p-7 bg-cover w-full" style={{ backgroundImage: `url(/resource/indendkorea/images/main/bg_blue.jpg)`, height: `205px` }}>
                            <div className="text-white text-left">
                                <motion.div
                                    initial={{ y: -50, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 1.0, delay: 0 }}
                                    className="font-bold text-xl mb-4"
                                >
                                    복지몰 구축 상담
                                </motion.div>
                                <div className="mb-3">
                                    인디앤드코리아는 복지몰 무료 구축 및<br />
                                    전문인력을 통한 위탁 운영이 가능합니다.
                                </div>

                                <a
                                    href='javascript:window.open("https://web.indend.synology.me/dream/counsel", "counsel", "width=1350,height=900")'
                                    className="hover:bg-white block text-white text-center font-bold border border-dashed py-3 w-40"
                                >
                                    MORE
                                </a>
                            </div>
                        </div>

                        <div className="p-7 bg-cover w-full" style={{ backgroundImage: `url(/resource/indendkorea/images/main/bg_purple.jpg)`, height: `205px` }}>
                            <div className="text-white text-right">
                                <motion.div
                                    initial={{ y: -50, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 1.0, delay: 0 }}
                                    className="font-bold text-xl mb-4"
                                >
                                    입점·제휴 상담
                                </motion.div>
                                <div className="mb-3">
                                    인디앤드의 복지몰에 입점하시면 <br />
                                    10만여명의 임직원에게 홍보가 가능합니다.
                                </div>
                                <div className="float-right">
                                    <a
                                        className="hover:bg-white block text-white text-center font-bold border border-dashed py-3 w-40"
                                        href='javascript:window.open("https://web.indend.synology.me/seller/requestv2/request/indend", "requestv2", "width=1350,height=900")'
                                    >
                                        MORE
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
