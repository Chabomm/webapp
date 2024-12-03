import { motion } from 'framer-motion';

export default function Information({ device }: any) {
    return (
        <>
            {device == 'desktop' ? (
                <section className="w-full md:w-1200 mx-auto">
                    <div className="px-28 py-20 mx-auto">
                        <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1.5 }} className="text-4xl mb-5 leading-snug">
                            <div className="font-bold">복지드림은</div>
                            <div>
                                {"'"}복지를 꿈꾸다{"'"}에서 착안한 선택형 복지제도의 새로운 이름입니다.
                            </div>
                        </motion.div>

                        <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }} className="py-14">
                            <div className="mb-8 flex justify-between">
                                <img alt="img" src="/resource/welfaredream/images/intro/web/infor_01.jpg" />
                                <img alt="img" src="/resource/welfaredream/images/intro/web/infor_01-2.jpg" />
                            </div>
                        </motion.div>

                        <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }} className="text-lg leading-snug mb-16">
                            <div>
                                <strong>복지드림</strong>은 각 기업·단체에 맞는 맞춤형 복지몰 구축과 체계적인 운영관리, 다양한 복지 할인 혜택까지
                            </div>
                            <div>합리적인 비용으로 복지서비스를 이용할 수 있습니다.</div>
                            <div>복지드림이 제공하는 무상 복지몰 구축 서비스로 임직원의 삶의 질을 향상시키고 기업의 가치를 높여보세요.</div>
                        </motion.div>

                        <div className="pb-32 grid grid-cols-4">
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 2 }}
                                transition={{ duration: 1 }}
                                style={{ background: '#FF7B76' }}
                                className="p-7 py-11 text-white"
                            >
                                <div className="font-bold mb-4 text-2xl">
                                    <img alt="img" src="/resource/welfaredream/images/intro/web/infoDot_w01.png" className="mr-2 inline-block w-1" />
                                    선택적 복지제도
                                </div>
                                <div className="tracking-tighter leading-relaxed mb-4">
                                    임직원이 원하는 항목으로
                                    <br />
                                    선택 가능한 복리후생
                                    <br />
                                    컨설팅을 제공합니다.
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 2 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                style={{ background: '#F4F4F4' }}
                                className="p-7 py-11 text-black"
                            >
                                <div className="font-bold mb-4 text-2xl">
                                    <img alt="img" src="/resource/welfaredream/images/intro/web/infoDot_b01.png" className="mr-2 inline-block h-1" />
                                    복지몰 구축
                                </div>
                                <div className="tracking-tighter leading-relaxed mb-4">
                                    별도 비용 없이 임직원 및
                                    <br />
                                    회원 전용 무상 복지몰 구축
                                    <br />
                                    서비스를 제공합니다.
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 2 }}
                                transition={{ duration: 1, delay: 0.4 }}
                                style={{ background: '#FDB812' }}
                                className="p-7 py-11 text-black"
                            >
                                <div className="font-bold mb-4 text-2xl">
                                    <img alt="img" src="/resource/welfaredream/images/intro/web/infoDot_b02.png" className="mr-2 inline-block w-1" />
                                    기업 복지 지원
                                </div>
                                <div className="tracking-tighter leading-relaxed mb-4">
                                    기업 내 행사 및 복지가 필요한
                                    <br />
                                    명절선물, 건강검진, 기념일,
                                    <br />
                                    장례지원 등이 가능합니다.
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 2 }}
                                transition={{ duration: 1, delay: 0.6 }}
                                style={{ background: '#011A38' }}
                                className="p-7 py-11 text-white"
                            >
                                <div className="font-bold mb-4 text-2xl">
                                    <img alt="img" src="/resource/welfaredream/images/intro/web/infoDot_w01.png" className="mr-2 inline-block w-1" />
                                    복지몰 운영대행
                                </div>
                                <div className="tracking-tighter leading-relaxed mb-4">
                                    복지몰 운영에 필요한
                                    <br />
                                    인력, 유지, 보수 등을 모두 대
                                    <br />
                                    행해 드립니다.
                                </div>
                            </motion.div>
                        </div>

                        <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1.5 }} className="text-4xl mb-11 leading-snug">
                            <div>복지드림의 복지몰 서비스를</div>
                            <strong>무상으로 경험하세요.</strong>
                            <div>선택적 복지제도는 기업의 가치를 높입니다.</div>
                        </motion.div>

                        <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }} className="text-lg leading-snug mb-16">
                            복지드림의 복지몰 구축 서비스를 통해 기업 및 단체의 경쟁력을 높이고 임직원의 기업 만족도 제고 효과를 누릴 수 있습니다. <br />
                            고객이 만족할 때까지! 우리는 기업과 임직원이 만족할 수 있는 차별화된 서비스를 제공하고 있으며, <br />
                            고객사 분석을 통해 1:1 맞춤 컨설팅을 진행해 드립니다. <br />
                            최고의 경험을 위해! 다양한 판매채널의 운영 경험과 전문인력의 풍부한 노하우를 바탕으로 최상의 서비스를 제공하고 있습니다.
                        </motion.div>

                        <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                            <img alt="img" src="/resource/welfaredream/images/intro/web/infor_02.jpg" className="mx-auto" />
                        </motion.div>

                        <div className="grid grid-cols-2 justify-between py-16 border-b-2 border-zinc-100">
                            <motion.div initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 2 }} transition={{ duration: 0.8 }}>
                                <div className="font-bold inline-flex border-t-4 border-yellow-400 text-xl">Point 1</div>
                                <div className="text-4xl leading-tight py-4">
                                    기업·단체를 위한
                                    <br />
                                    <span className="font-bold">맞춤형 복지몰 구축!</span>
                                </div>
                                <div className="py-4 text-lg">
                                    복지몰 구축 서비스 이용 시, 기업 및 단체의 유형에 따라 <br />
                                    임직원용 또는 회원용으로 선택하여 복지몰 구축이 가능합니다.
                                    <br />
                                    <br />
                                    또한 기업의 로고 및 고유도메인 등의 정보를 이용하여 <br />
                                    <span className="font-bold">기업이 원하는 디자인으로 맞춤 제작</span>됩니다.
                                </div>
                            </motion.div>
                            <motion.div initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 2 }} transition={{ duration: 0.8 }}>
                                <img alt="img" src="/resource/welfaredream/images/intro/web/infor_p01.jpg" className="float-right" />
                            </motion.div>
                        </div>

                        <div className="grid grid-cols-2 justify-between py-16 border-b-2 border-zinc-100">
                            <motion.div initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 2 }} transition={{ duration: 0.8 }}>
                                <img alt="img" src="/resource/welfaredream/images/intro/web/infor_p02.jpg" />
                            </motion.div>
                            <motion.div initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 2 }} transition={{ duration: 0.8 }} className="text-right">
                                <div className="font-bold inline-flex border-t-4 border-yellow-400 text-xl">Point 2</div>
                                <div className="text-4xl leading-tight py-4">
                                    유료 서비스는 그만! <br />
                                    <span className="font-bold">구축비와 운영비 ZERO!</span>
                                </div>
                                <div className="py-4 text-lg">
                                    복지드림은 타복지몰에서 발생하는 복지몰 구축비, <br />월 운영비 전혀 없는 말그대로의 <span className="font-bold">무상 구축 서비스</span>를
                                    제공합니다.
                                </div>
                                <img alt="img" src="/resource/welfaredream/images/intro/web/infor_p02_box.jpg" className="float-right" />
                            </motion.div>
                        </div>

                        <div className="grid grid-cols-2 justify-between py-16 border-b-2 border-zinc-100">
                            <motion.div initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 2 }} transition={{ duration: 0.7 }}>
                                <div className="font-bold inline-flex border-t-4 border-yellow-400 text-xl">Point 3</div>
                                <div className="text-4xl leading-tight py-4">
                                    찾는 상품이 없다면?
                                    <br />
                                    <span className="font-bold">카테고리별 MD 소싱서비스 제공!</span>
                                </div>
                                <div className="py-4 text-lg">
                                    복지몰에 검색해도 내가 원하는 상품이 없을 땐 <br />
                                    복지드림에 <span className="font-bold">필요한 상품이나 서비스를 직접 요청</span>하여 <br />
                                    저렴하게 구매할 수 있습니다
                                </div>
                            </motion.div>
                            <motion.div initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 2 }} transition={{ duration: 0.7 }}>
                                <img alt="img" src="/resource/welfaredream/images/intro/web/infor_p03.jpg" className="float-right" />
                            </motion.div>
                        </div>

                        <div className="grid grid-cols-2 justify-between py-16">
                            <motion.div initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 2 }} transition={{ duration: 0.7 }}>
                                <img alt="img" src="/resource/welfaredream/images/intro/web/infor_p04.jpg" />
                            </motion.div>
                            <motion.div initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 2 }} transition={{ duration: 0.7 }} className="text-right">
                                <div className="font-bold inline-flex border-t-4 border-yellow-400 text-xl">Point 4</div>
                                <div className="text-4xl leading-tight py-4">
                                    가격비교 할 필요없이! <br />
                                    <span className="font-bold">소셜커머스보다 저렴한 최저가!</span>
                                </div>
                                <div className="py-4 text-lg">
                                    복잡하게 가격비교하지 않아도 복지드림의 모든 상품은 <br />
                                    <span className="font-bold">소셜커머스 대비 최대 50% 저렴한 최저가</span>로 구매가 가능합니다.
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            ) : (
                <section className="px-7 py-12">
                    <motion.div className="text-2xl pb-9 leading-snug" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                        <div className="font-bold">복지드림은</div>
                        <div className="font-light">
                            {"'"}복지를 꿈꾸다{"'"}에서 착안한 <br />
                            선택형 복지제도의 <br />
                            새로운 이름입니다.
                        </div>
                    </motion.div>

                    <motion.div className="pb-7" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                        <img alt="img" src="/resource/welfaredream/images/intro/mobile/infor_img01.jpg" className="mx-auto" />
                    </motion.div>

                    <motion.div className="pb-14" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                        <img alt="img" src="/resource/welfaredream/images/intro/mobile/infor_img02.jpg" className="mx-auto" />
                    </motion.div>

                    <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                        <span className="font-bold">복지드림</span>은 각 기업·단체에 맞는 <br />
                        맞춤형 복지몰 구축과 체계적인 운영관리, <br />
                        다양한 복지 할인 혜택까지 합리적인 비용으로 <br />
                        복지서비스를 이용할 수 있습니다. <br />
                        복지드림이 제공하는 무상 복지몰 구축 서비스로 <br />
                        임직원의 삶의 질을 향상시키고 <br />
                        기업의 가치를 높여보세요.
                    </motion.div>

                    <motion.div className="pt-10 pb-20" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                        <img alt="img" src="/resource/welfaredream/images/intro/mobile/infor_img03.jpg" className="mx-auto" />
                    </motion.div>

                    <motion.div className="text-2xl pb-9 leading-snug font-light" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                        복지드림의 복지몰 서비스를 <div className="font-bold">무상으로 경험하세요. </div>선택적 복지제도는 <br />
                        기업의 가치를 높입니다.
                    </motion.div>

                    <motion.div className="pb-10" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                        <img alt="img" src="/resource/welfaredream/images/intro/mobile/infor_img04.jpg" className="mx-auto" />
                    </motion.div>

                    <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                        <span className="font-bold">복지드림</span>의 복지몰 구축 서비스를 통해 <br />
                        기업 및 단체의 경쟁력을 높이고 임직원의
                        <br />
                        기업 만족도 제고 효과를 누릴 수 있습니다.
                        <br />
                        고객이 만족할 때까지! <br />
                        우리는 기업과 임직원이 만족할 수 있는 차별화된 <br />
                        서비스를 제공하고 있으며, 고객사 분석을 통해 <br />
                        1:1 맞춤 컨설팅을 진행해 드립니다.
                        <br />
                        최고의 경험을 위해! <br />
                        다양한 판매채널의 운영 경험과 전문인력의 <br />
                        풍부한 노하우를 바탕으로 <br />
                        최상의 서비스를 제공하고 있습니다.
                    </motion.div>

                    <div>
                        <div className="border-b border-1 py-8">
                            <div className="font-bold inline-flex border-b-2 border-amber-400 text-sm">Point 1</div>
                            <motion.div className="text-2xl pt-3 pb-5" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                                기업·단체를 위한
                                <div className="font-bold">맞춤형 복지몰 구축!</div>
                            </motion.div>
                            <div className="leading-relaxed" style={{ fontSize: '15px' }}>
                                복지몰 구축 서비스 이용 시, <br />
                                기업 및 단체의 유형에 따라 임직원용 또는 회원용으로 <br />
                                선택하여 복지몰 구축이 가능합니다. <br />
                                또한 기업의 로고 및 고유도메인 등의 정보를 이용하여 <br />
                                <span className="font-bold">기업이 원하는 디자인으로 맞춤 제작</span>됩니다.
                            </div>
                            <motion.div className="pt-7" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                                <img alt="img" src="/resource/welfaredream/images/intro/mobile/infor_point01.jpg" />
                            </motion.div>
                        </div>

                        <div className="border-b border-1 py-8 text-end">
                            <div className="font-bold inline-flex border-b-2 border-amber-400 text-sm">Point 2</div>
                            <motion.div className="text-2xl pt-3 pb-5" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                                유료 서비스는 그만!
                                <div className="font-bold">구축비와 연회비 ZERO!</div>
                            </motion.div>
                            <div className="leading-relaxed" style={{ fontSize: '15px' }}>
                                복지드림은 타복지몰에서 발생하는 <br />
                                복지몰 구축비, 월 연회비 전혀 없는 <br />
                                말그대로의 <span className="font-bold">무상 구축 서비스</span>를 제공합니다.
                            </div>
                            <motion.div className="pt-5 inline-block" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                                <img alt="img" src="/resource/welfaredream/images/intro/mobile/infor_point02-1.jpg" />
                            </motion.div>
                            <motion.div className="pt-7" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                                <img alt="img" src="/resource/welfaredream/images/intro/mobile/infor_point02.jpg" />
                            </motion.div>
                        </div>

                        <div className="border-b border-1 py-8">
                            <div className="font-bold inline-flex border-b-2 border-amber-400 text-sm">Point 3</div>
                            <motion.div className="text-2xl pt-3 pb-5" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                                찾는 상품이 없다면?
                                <div className="font-bold">카테고리별 MD 소싱서비스 제공!</div>
                            </motion.div>
                            <div className="leading-relaxed" style={{ fontSize: '15px' }}>
                                복지몰에 검색해도 내가 원하는 상품이 없을 땐 <br />
                                복지드림에 <span className="font-bold">필요한 상품이나 서비스를 직접 요청</span>하여 저렴하게 구매할 수 있습니다.
                            </div>
                            <motion.div className="pt-7" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                                <img alt="img" src="/resource/welfaredream/images/intro/mobile/infor_point03.jpg" />
                            </motion.div>
                        </div>

                        <div className="py-8 text-end">
                            <div className="font-bold inline-flex border-b-2 border-amber-400 text-sm">Point 4</div>
                            <motion.div className="text-2xl pt-3 pb-5" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                                가격비교 할 필요없이!
                                <div className="font-bold">소셜커머스보다 저렴한 최저가!</div>
                            </motion.div>
                            <div className="leading-relaxed" style={{ fontSize: '15px' }}>
                                복잡하게 가격비교하지 않아도 <br />
                                복지드림의 모든 상품은 <span className="font-bold">소셜커머스 대비</span>
                                <br />
                                <span className="font-bold">최대 50% 저렴한 최저가</span>로 구매가 가능합니다.
                            </div>
                            <motion.div className="pt-7" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                                <img alt="img" src="/resource/welfaredream/images/intro/mobile/infor_point04.jpg" />
                            </motion.div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
