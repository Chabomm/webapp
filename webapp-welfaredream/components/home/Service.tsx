import { motion } from 'framer-motion';

export default function Service({ service_list, device }: any) {
    return (
        <>
            {device == 'desktop' ? (
                <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                    <section
                        className="bg-cover bg-fixed bg-no-repeat bg-center py-28 w-full"
                        style={{ backgroundImage: `url('/resource/welfaredream/images/main/web/serviceBg.jpg')` }}
                    >
                        <div className="mx-auto" style={{ width: '1320px' }}>
                            <div className="tracking-tighter text-center pb-16 relative">
                                <div className="font-bold pb-2" style={{ fontSize: '42px' }}>
                                    제공서비스
                                </div>
                                <div className="text-xl text-center">직원들을 위한 복지몰, 구축부터 운영까지 모두 무상으로 관리해드립니다.</div>
                            </div>

                            <div className="grid grid-cols-4">
                                {service_list.map((v: any, i: number) => (
                                    <div id={v.id} key={i} className="text-center main_service_box py-8 mb-7">
                                        <div className="font-bold text-xl mb-3" style={{ paddingBottom: '125px' }}>
                                            {v.title}
                                        </div>
                                        <div className="mb-3 content ">{v.content}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </motion.div>
            ) : (
                <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                    <section
                        className="text-center bg-fixed bg-cover bg-center py-16 px-7"
                        style={{ backgroundImage: `url('/resource/welfaredream/images/main/mobile/mainCon02_bg.jpg')` }}
                    >
                        <div>
                            <div className="font-bold pb-3 text-3xl">제공 서비스</div>
                            <div className="pb-4">
                                직원들을 위한 복지몰, 구축부터 운영까지
                                <br /> 모두 무상으로 관리해드립니다.
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 justify-between justify-items-stretch pt-6">
                            {service_list.map((v: any, i: number) => (
                                <div key={i} className={v.class}>
                                    <div className="mb-3 content">{v.m_title}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                </motion.div>
            )}
        </>
    );
}
