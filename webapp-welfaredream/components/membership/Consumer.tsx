import { motion } from 'framer-motion';

export default function Consumer({ data, getListBannerData, cuid, device }: any) {
    return (
        <>
            {device == 'desktop' ? (
                <section className="main_section md:w-1200 mx-auto text-center">
                    <motion.div className="pt-14" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                        <div className="text-4xl pb-2">
                            모든 대표님들이 원하는 복지, 바로 기업 성장! <br />
                            기업 성장을 위한 고객사 혜택을 소개합니다.
                        </div>
                    </motion.div>
                    <div className="px-20">
                        <motion.div className="p-16 flex justify-center" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                            {data.main_cate_list?.map((v: any, i: number) => (
                                <div key={i} className={`${v.uid === cuid ? 'border-b-2 border-amber-500 text-amber-500 font-bold' : ''} text-lg mx-3`}>
                                    <span
                                        className="cursor-pointer"
                                        onClick={() => {
                                            getListBannerData(v.uid);
                                        }}
                                    >
                                        {v.cate_name}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                        <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1, delay: 0.3 }}>
                            {data.main_banner_list?.map((v: any, i: number) => (
                                <div key={i} className="inline-flex justify-between py-10 border-b w-full">
                                    <div className="text-start pt-3" style={{ width: '510px' }}>
                                        <div className="text-2xl font-bold text-amber-500" dangerouslySetInnerHTML={{ __html: v.txt1 }}></div>
                                        <div className="text-2xl font-bold py-8" dangerouslySetInnerHTML={{ __html: v.txt2 }}></div>
                                        <div className="text-lg content text-zinc-600" dangerouslySetInnerHTML={{ __html: v.txt3 }}></div>
                                    </div>
                                    <img alt="img" src={v.banner_src} className="" />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            ) : (
                <section className="py-14">
                    <motion.div
                        className="text-2xl pb-9 leading-snug font-light px-7"
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        모든 대표님들이 원하는 복지, 바로 기업 성장! <br />
                        기업 성장을 위한 고객사 혜택을 소개합니다.
                    </motion.div>

                    <div className="overflow-x-scroll sticky top-20 z-10 bg-white border-t border-b">
                        <div className="flex p-5" style={{ minWidth: '690px' }}>
                            {data.main_cate_list?.map((v: any, i: number) => (
                                <div key={i} className={`${v.uid === cuid ? 'bg-amber-400 text-white font-bold' : ''} border rounded-full py-1 px-4 text-sm mx-1`}>
                                    <span
                                        className="cursor-pointer"
                                        onClick={() => {
                                            getListBannerData(v.uid);
                                        }}
                                    >
                                        {v.cate_name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center mt-5">
                        {data.main_banner_list?.map((v: any, i: number) => (
                            <div key={i} className="mb-14 px-7">
                                <div className="text-2xl font-bold mb-6 text-amber-500" dangerouslySetInnerHTML={{ __html: v.txt1 }}></div>
                                <div className="image-container">
                                    <img alt="img" src={v.banner_src} className="mx-auto" />
                                </div>
                                <div className="text-xl font-bold py-4" dangerouslySetInnerHTML={{ __html: v.txt2 }}></div>
                                <div className="text-zinc-600 content" dangerouslySetInnerHTML={{ __html: v.txt3 }}></div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </>
    );
}
