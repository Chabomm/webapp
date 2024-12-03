import { motion } from 'framer-motion';
export default function Service({ device }: any) {
    return (
        <>
            {device == 'desktop' ? (
                <section className="main_section text-center">
                    <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }} className="tracking-tight text-center">
                        <div className="text-4xl pb-20">
                            지금, <span className="font-bold">복지드림을 도입</span>하면 모두 다 드립니다!
                        </div>
                        <div className="text-2xl text-amber-500">복지드림은 화끈하게 드립니다!</div>
                        <div className="font-bold text-4xl pb-5">구축비 & 연 관리비 무료</div>
                        <div className="text-2xl py-4">우리회사의 복지몰 제작, 이제 부담없이 시작하세요!</div>
                        <div>
                            기업의 평생 1회 부담인 복지몰 구축 비용(150만원)을 무료로 제공합니다. <br />
                            도입혜택 기간 중 가입한 기업에는 연관리비(50만원) 무료혜택을 드립니다.
                        </div>
                        <img alt="img" src={'/resource/welfaredream/images/guide/web/serviceCon01_bg.png'} className="inline-block" />
                    </motion.div>

                    <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }} style={{ background: '#FDFBF4' }}>
                        <div className="text-center pt-24">
                            <div className="text-2xl text-amber-500">복지드림은 완벽하게 드립니다!</div>
                            <div className="font-bold  text-4xl pb-2">웹/앱(모바일) 언제 어디서든 사용가능!</div>
                            <div className="text-2xl pt-2 pb-20">웹 복지몰 뿐만아니라 앱(모바일)까지 드립니다!</div>
                            <img alt="img" src={'/resource/welfaredream/images/guide/web/serviceCon02_bg.png'} className="pt-8 inline-block" />
                        </div>
                    </motion.div>

                    <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }} style={{ background: '#FDFBF4' }}>
                        <div className="text-center pt-24">
                            <div className="text-2xl text-amber-500">복지드림은 똑똑하게 관리합니다!</div>
                            <div className="font-bold  text-4xl pb-2">회원등록 및 포인트 관리 기능</div>
                            <div className="text-2xl pt-2 pb-20">최초 1년에 한해서 호스팅 비용 등 제반비용 없이 무료로 도메인을 제공합니다.</div>
                            <img alt="img" src={'/resource/welfaredream/images/guide/web/serviceCon04_bg.png'} className="pt-8 inline-block" />
                        </div>
                    </motion.div>

                    <div style={{ width: '960px', display: 'inline-block' }} className="pb-16">
                        <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }} className="text-center mt-24">
                            <div className="text-2xl text-amber-500">복지드림은 니즈에 맞춰 드립니다!</div>
                            <div className="font-bold  text-4xl pb-2">커스터마이징 서비스</div>
                            <div className="text-2xl pt-2 pb-20">원하는 디자인과 기능이 있나요? 복지드림에게 주시면 복지몰에 담아드립니다.</div>
                        </motion.div>
                        <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }} className="grid grid-cols-3 py-5 text-center">
                            <div className=" font-bold pb-5 box_border relative">
                                <div className="pb-2">
                                    <img alt="img" src={'/resource/welfaredream/images/guide/web/serviceCon_icon04.jpg'} className="inline-block" />
                                </div>
                                자사 브랜드 전용관
                                <br />
                                개설 가능
                            </div>
                            <div className=" font-bold box_border relative pb-7">
                                <div className="pb-2">
                                    <img alt="img" src={'/resource/welfaredream/images/guide/web/serviceCon_icon05.jpg'} className="inline-block" />
                                </div>
                                포인트 사용
                                <br />
                                카테고리 제한
                                <div className="text-zinc-500 font-normal tracking-tighter">구입 불가능 품목 설정 가능</div>
                            </div>
                            <div className=" font-bold pb-5 relative box_border_bottom">
                                <div className="pb-2">
                                    <img alt="img" src={'/resource/welfaredream/images/guide/web/serviceCon_icon01.jpg'} className="inline-block" />
                                </div>
                                포인트 사용 기한 및<br />
                                권한 설정 가능
                            </div>
                            <div className=" font-bold pt-10 relative box_border_right">
                                <div className="pb-2">
                                    <img alt="img" src={'/resource/welfaredream/images/guide/web/serviceCon_icon03.jpg'} className="inline-block" />
                                </div>
                                사내복지 / 회사 공지사항
                                <br />
                                안내 기능 제공
                            </div>
                            <div className="font-bold pt-10 relative box_border_right">
                                <div className="pb-2">
                                    <img alt="img" src={'/resource/welfaredream/images/guide/web/serviceCon_icon02.jpg'} className="inline-block" />
                                </div>
                                사내 인트라넷
                                <br />
                                연결 가능
                            </div>
                            <div className="font-bold pt-10 relative">
                                <div className="pb-2">
                                    <img alt="img" src={'/resource/welfaredream/images/guide/web/serviceCon_icon06.jpg'} className="inline-block" />
                                </div>
                                특정 결제 방법
                                <br />
                                제한 가능
                            </div>
                        </motion.div>
                    </div>
                </section>
            ) : (
                <section className="py-12">
                    <motion.div
                        className="text-2xl pb-9 leading-snug font-light px-7"
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 2 }}
                        transition={{ duration: 1 }}
                    >
                        지금,<span className="font-bold">복지드림을 도입</span>하면
                        <br />
                        모두 다 드립니다!
                    </motion.div>

                    <motion.div className="text-center" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                        <div className="text-lg font-bold text-amber-500">복지드림은 화끈하게 드립니다!</div>
                        <div className="font-bold text-2xl pb-2">구축비 & 연 관리비 무료</div>
                        <div className="text-lg py-2">
                            우리회사의 복지몰 제작, <br />
                            이제 부담없이 시작하세요!
                        </div>
                        <div className="text-sm">
                            기업의 평생 1회 부담인 <br />
                            복지몰 구축 비용(150만원)을 무료로 제공합니다. <br />
                            도입혜택 기간 중 가입한 기업에는 <br />
                            연관리비(50만원) 무료혜택을 드립니다.
                        </div>
                        <img alt="img" src={'/resource/welfaredream/images/guide/mobile/service_01.png'} className="mx-auto" />
                    </motion.div>

                    <motion.div
                        className="pt-16 text-center"
                        style={{ background: '#FDFBF4' }}
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 2 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="text-lg font-bold text-amber-500">복지드림은 완벽하게 드립니다!</div>
                        <div className="font-bold text-2xl pb-2">
                            웹/앱(모바일) <br />
                            언제 어디서든 사용가능!
                        </div>
                        <div className="text-lg pt-2 pb-10">
                            웹 복지몰 뿐만아니라 <br />
                            앱(모바일)까지 드립니다!
                        </div>
                        <img alt="img" src={'/resource/welfaredream/images/guide/mobile/service_02.png'} className="mx-auto" />
                    </motion.div>

                    <motion.div
                        className="pt-16 text-center"
                        style={{ background: '#FDFBF4' }}
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 2 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="text-lg font-bold text-amber-500">복지드림은 똑똑하게 드립니다!</div>
                        <div className="font-bold text-2xl pb-2">회원등록 및 포인트 관리 기능</div>
                        <div className="text-lg pt-2 pb-10">
                            최초 1년에 한해서 호스팅 비용 등<br />
                            제반비용 없이 무료로 도메인을 제공합니다
                        </div>
                        <img alt="img" src={'/resource/welfaredream/images/guide/mobile/service_04.png'} className="mx-auto" />
                    </motion.div>

                    <motion.div className="text-center" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                        <img alt="img" src={'/resource/welfaredream/images/guide/mobile/service_05_v2.jpg'} className="mx-auto" />
                    </motion.div>
                </section>
            )}
        </>
    );
}
