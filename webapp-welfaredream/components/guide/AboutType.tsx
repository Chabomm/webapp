import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper';

import { openDreamCounsel } from '@/libs/utils';

export default function AboutType({ device }: any) {
    const pagination = {
        pagination: {
            el: '.swiper-pagination',
            type: 'custom',
        },
    };

    return (
        <>
            {device == 'desktop' ? (
                <section className="w-full md:w-1200 mx-auto">
                    <div className="px-32 py-20 mx-auto">
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 2 }}
                            transition={{ duration: 1 }}
                            className="text-4xl mb-11 leading-snug tracking-tighter"
                        >
                            <div>
                                <span className="font-bold">고민</span>하지 마세요!
                            </div>
                            <div>
                                <span className="font-bold">복지드림</span>은
                            </div>
                            <div>
                                우리 회사, 우리 단체만의 <span className="font-bold">전용 Mall을 무료로 구축</span>해드립니다!
                            </div>
                        </motion.div>
                        <div className="flex py-5 tracking-tighter">
                            <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }} className="mx-2 text-center">
                                <img alt="img" src="/resource/welfaredream/images/guide/web/aboutType01.jpg" className="mx-auto" />
                                <div className="inline-block bg-white border relative" style={{ width: '280px', height: '304px', marginTop: '-20px', padding: '0 10px' }}>
                                    <div
                                        className="block text-lg font-bold text-white rounded-full bg-yellow-500"
                                        style={{ width: '30px', height: '30px', margin: '-15px auto 0', borderRadius: '50px' }}
                                    >
                                        A
                                    </div>
                                    <div className="text-lg font-bold py-2 pb-2 text-yellow-500">복지몰</div>
                                    1인 기업부터 대기업까지!
                                    <div className="py-2">
                                        우리 회사 임직원들을 위한 <br />
                                        복지몰을 원하신다면!
                                    </div>
                                    <div className="py-3 text-start text-sm inline-block">
                                        <div>
                                            <span className="font-light pr-2">이용 대상 </span>일반 기업 및 관공서
                                        </div>
                                        <div>
                                            <span className="font-light pr-2">구축 형태 </span>임직원용 복지몰
                                        </div>
                                    </div>
                                    <div>
                                        <span className="mx-2">
                                            <img alt="img" src="/resource/welfaredream/images/guide/web/typeCheck01.jpg" className="mb-2 inline-block" />
                                            구축비 무료!
                                        </span>
                                        <span className="mx-2">
                                            <img alt="img" src="/resource/welfaredream/images/guide/web/typeCheck01.jpg" className="mb-2 inline-block" />
                                            관리비 무료!
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1, delay: 0.2 }} className="mx-2 text-center">
                                <img alt="img" src="/resource/welfaredream/images/guide/web/aboutType02.jpg" className="mx-auto" />
                                <div className="inline-block bg-white border relative" style={{ width: '280px', height: '304px', marginTop: '-20px', padding: '0 10px' }}>
                                    <div
                                        className="block text-lg font-bold text-white rounded-full bg-sky-700"
                                        style={{ width: '30px', height: '30px', margin: '-15px auto 0', borderRadius: '50px' }}
                                    >
                                        B
                                    </div>
                                    <div className="text-lg font-bold py-2 pb-2 text-sky-700">협력사몰</div>
                                    상품∙서비스가 있는 <br />
                                    특별한 기업/단체라면?
                                    <div className="py-2">
                                        회원(사)를 위한 <br />
                                        전용 복지몰 구축에 전용 상품관까지!
                                    </div>
                                    <div className="py-3 text-start text-sm inline-block">
                                        <div>
                                            <span className="font-light pr-2">이용 대상 </span>각종 협회, 프렌차이즈 등
                                        </div>
                                        <div>
                                            <span className="font-light pr-2">구축 형태 </span>회원(사)전용 복지몰 , 전용 상품관
                                        </div>
                                    </div>
                                    <div>
                                        <span className="mx-2">
                                            <img alt="img" src="/resource/welfaredream/images/guide/web/typeCheck02.jpg" className="mb-2 inline-block" />
                                            구축비 무료!
                                        </span>
                                        <span className="mx-2">
                                            <img alt="img" src="/resource/welfaredream/images/guide/web/typeCheck02.jpg" className="mb-2 inline-block" />
                                            관리비 무료!
                                        </span>
                                    </div>
                                    <div>
                                        <span className="mx-2">
                                            <img alt="img" src="/resource/welfaredream/images/guide/web/typeCheck02.jpg" className="mb-2 inline-block" />
                                            전용관 세팅 무료!
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1, delay: 0.4 }} className="mx-2 text-center">
                                <img alt="img" src="/resource/welfaredream/images/guide/web/aboutType03.jpg" className="mx-auto" />

                                <div className="inline-block bg-white border relative" style={{ width: '280px', height: '304px', marginTop: '-20px', padding: '0 10px' }}>
                                    <div
                                        className="block text-lg font-bold text-white rounded-full bg-red-400"
                                        style={{ width: '30px', height: '30px', margin: '-15px auto 0', borderRadius: '50px' }}
                                    >
                                        C
                                    </div>
                                    <div className="text-lg font-bold py-2 pb-2 text-red-400">멤버십몰</div>
                                    우리 단체 회원들의 <br />
                                    소속감을 높이는 가장 좋은 방법은?
                                    <div className="py-2">
                                        단체 전용 복지몰 구축∙단독 프로모션과 <br />
                                        매출 후원 혜택까지!
                                    </div>
                                    <div className="py-3 text-start text-sm inline-block">
                                        <div>
                                            <span className="font-light pr-2">이용 대상 </span>각종 협회, 동문회 등
                                        </div>
                                        <div>
                                            <span className="font-light pr-2">구축 형태 </span>회원 전용 복지몰
                                        </div>
                                    </div>
                                    <div>
                                        <span className="mx-2">
                                            <img alt="img" src="/resource/welfaredream/images/guide/web/typeCheck03.jpg" className="mb-2 inline-block" />
                                            구축비 무료!
                                        </span>
                                        <span className="mx-2">
                                            <img alt="img" src="/resource/welfaredream/images/guide/web/typeCheck03.jpg" className="mb-2 inline-block" />
                                            관리비 무료!
                                        </span>
                                    </div>
                                    <div>
                                        <span className="mx-2">
                                            <img alt="img" src="/resource/welfaredream/images/guide/web/typeCheck03.jpg" className="mb-2 inline-block" />
                                            매출 후원 제도!
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        <div className="pt-24 tracking-tighter">
                            <motion.div
                                initial={{ y: 100, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 2 }}
                                transition={{ duration: 1 }}
                                className="text-4xl font-bold pb-20 text-center"
                            >
                                복지드림 구축 타입
                            </motion.div>
                            <div>
                                <div className="justify-around flex">
                                    <motion.div initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 2 }} transition={{ duration: 0.8 }}>
                                        <div className="font-bold text-3xl mb-6">
                                            <span className="border-b-4 border-yellow-400 pb-1">Type</span> A 복지몰
                                        </div>
                                        <div className="text-2xl py-3 flex">
                                            <div>
                                                <img alt="img" src="/resource/welfaredream/images/guide/web/typeBubble01.gif" className="pb-4" />
                                            </div>
                                            <div className="pl-2">
                                                <span className="font-bold"> 우리 회사 직원들을 위한 </span>
                                                <br />
                                                복지몰이 필요해요!
                                                <img alt="img" src="/resource/welfaredream/images/guide/web/typeBubble02.gif" className="pb-5 inline-block" />
                                            </div>
                                        </div>
                                        <div className="pb-5 text-lg">
                                            요즘 시대에 복지는 필수!
                                            <br />
                                            규모와 상관없이 직원들을 위한 복지 혜택은 기본이죠!
                                        </div>
                                        <div className="text-sm">
                                            <span className="bg-zinc-400 text-white font-bold p-1 px-2 mr-2">추천 업종</span> 소상공인, 중소기업 등
                                        </div>
                                    </motion.div>
                                    <motion.div className="text-center mt-3" initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 2 }} transition={{ duration: 0.8 }}>
                                        <img alt="img" src="/resource/welfaredream/images/guide/web/typeA_img.jpg" className="float-right" />
                                    </motion.div>
                                </div>
                                <motion.div
                                    className="gap-x-14 pt-20 pb-12 flex justify-center text-center"
                                    initial={{ y: 100, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 2 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    <div className="text-center">
                                        <img alt="img" src="/resource/welfaredream/images/guide/web/typeA_img01.jpg" />
                                        <div className="my-3">
                                            일 잘하는 우리 회사 김대리! <br />
                                            뭐 라도 하나 더 챙겨주고 싶다면? <br />
                                            소고기 말고 복지포인트!
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <img alt="img" src="/resource/welfaredream/images/guide/web/typeA_img02.jpg" />
                                        <div className="my-3">
                                            회사 복지 프로그램 짜느라 <br />
                                            머리 아픈 인사과 박 차장님! <br />
                                            저희가 다 준비해 뒀어요 :)
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <img alt="img" src="/resource/welfaredream/images/guide/web/typeA_img03.jpg" />
                                        <div className="my-3">
                                            규모 있는 회사로 <br />
                                            성장하고 싶으신 최대표님! <br />
                                            복지시스템 도입을 고려하세요!!
                                        </div>
                                    </div>
                                </motion.div>
                                <motion.div className="text-center mb-24 mt-2" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 0.8 }}>
                                    <span className="font-bold text-xl text-white px-10 py-2 rounded-full  bg-yellow-400 cursor-pointer" onClick={openDreamCounsel}>
                                        상담신청
                                    </span>
                                </motion.div>
                            </div>
                            <div>
                                <div className="justify-around flex">
                                    <motion.div initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 2 }} transition={{ duration: 0.8 }}>
                                        <div className="font-bold text-3xl mb-6">
                                            <span className="border-b-4 border-sky-700 pb-1">Type</span> B 협력사몰
                                        </div>
                                        <div className="text-2xl py-3 flex">
                                            <div>
                                                <img alt="img" src="/resource/welfaredream/images/guide/web/typeBubble01.gif" className="pb-4" />
                                            </div>
                                            <div className="pl-2">
                                                <span className="font-bold"> 협업사들의 사업 번창을 위한 </span>
                                                <br />
                                                <span className="font-bold">특별한</span> 복지몰이 필요해요!
                                                <img alt="img" src="/resource/welfaredream/images/guide/web/typeBubble02.gif" className="pb-5 inline-block" />
                                            </div>
                                        </div>
                                        <div className="pb-5 text-lg">
                                            소상공인들의 판로 개척과 부실한 복지 증강을 동시에!
                                            <br />
                                            대한민국 자영업자들을 위한 win-win 혜택을 드립니다!
                                        </div>
                                        <div className="text-sm flex">
                                            <div>
                                                <span className="bg-zinc-400 text-white font-bold p-1 px-2 mr-2">추천 업종</span>
                                            </div>
                                            <span className="inline-block">
                                                제조/생산업, 유통업, 서비스업, 프랜차이즈 등 <br />
                                                4대 보험 미가입 대상 영리목적 기업
                                            </span>
                                        </div>
                                    </motion.div>
                                    <motion.div className="text-center mt-3" initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 2 }} transition={{ duration: 0.8 }}>
                                        <img alt="img" src="/resource/welfaredream/images/guide/web/typeB_img.jpg" className="float-right" />
                                    </motion.div>
                                </div>
                                <motion.div
                                    className="py-14 text-center type_box"
                                    initial={{ y: 100, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 2 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <div className="flex justify-center">
                                        <div className="border-r px-6">
                                            <div className="text-xl font-bold block relative mb-10">
                                                OO치킨 <span className="border-b-2 border-sky-700 pb-1">프랜</span>차이즈
                                            </div>
                                            <div className="mb-4">
                                                <img alt="img" src="/resource/welfaredream/images/guide/web/typeB_01.jpg" className="inline-block" />
                                            </div>
                                            <div className="flex justify-center">
                                                <div className="mx-4">
                                                    <strong className="border-b-2 border-sky-700">회원(사) 전용 복지몰</strong>
                                                    <img alt="img" src="/resource/welfaredream/images/guide/web/typeB_img01.jpg" className="py-5" />
                                                    <div className="text-sm">
                                                        프랜차이즈 창업하고, <br />
                                                        문화, 여행,레저 같은 복지는 <br />
                                                        꿈도 못 꿨는데, <br />
                                                        이제 대기업 부럽지 않아요^^ <br />
                                                    </div>
                                                </div>
                                                <div className="mx-4">
                                                    <strong className="border-b-2 border-sky-700">OO치킨 전용 상품관</strong>
                                                    <img alt="img" src="/resource/welfaredream/images/guide/web/typeB_img03.jpg" className="py-5" />
                                                    <div className="text-sm">
                                                        복지드림 내 <br />
                                                        {"'"}OO치킨 전용 상품관을 개설{"'"}하여 <br />
                                                        각 지점별 이벤트 진행 및 <br />
                                                        쿠폰 발행 등을 도와드립니다! <br />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-6">
                                            <div className="text-xl font-bold block relative mb-10">
                                                {"'"}OO 가구<span className="border-b-2 border-sky-700 pb-1">공단</span>
                                                {"'"} 상인회
                                            </div>
                                            <div className="mb-4">
                                                <img alt="img" src="/resource/welfaredream/images/guide/web/typeB_02.jpg" className="inline-block" />
                                            </div>
                                            <div className="flex justify-center">
                                                <div className="mx-4">
                                                    <strong className="border-b-2 border-sky-700">회원(사) 전용 복지몰</strong>
                                                    <img alt="img" src="/resource/welfaredream/images/guide/web/typeB_img02.jpg" className="py-5" />
                                                    <div className="text-sm">
                                                        평생 장사만 하느라, <br />
                                                        건강검진, 노후준비 같은 복지는 <br />
                                                        꿈도 못 꿨는데, <br />
                                                        이제 신바람이 납니다!!
                                                    </div>
                                                </div>
                                                <div className="mx-4">
                                                    <strong className="border-b-2 border-sky-700">OO가구공단 전용 상품관</strong>
                                                    <img alt="img" src="/resource/welfaredream/images/guide/web/typeB_img03.jpg" className="py-5" />
                                                    <div className="text-sm">
                                                        복지드림 내 <br />
                                                        OO가구공단 전용 상품관을 <br />
                                                        개설하여 신상품 홍보 및 <br />
                                                        쿠폰 발행 등을 도와드립니다!
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                                <motion.div className="text-center mb-24 mt-2" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 0.8 }}>
                                    <span className="font-bold text-xl text-white px-10 py-2 rounded-full  bg-sky-700 cursor-pointer" onClick={openDreamCounsel}>
                                        상담신청
                                    </span>
                                </motion.div>
                            </div>
                            <div>
                                <div className="justify-around flex">
                                    <motion.div initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 2 }} transition={{ duration: 0.8 }}>
                                        <div className="font-bold text-3xl mb-6">
                                            <span className="border-b-4 border-red-400 pb-1">Type</span> C 멤버십몰
                                        </div>
                                        <div className="text-2xl py-3 flex">
                                            <div>
                                                <img alt="img" src="/resource/welfaredream/images/guide/web/typeBubble01.gif" className="pb-4" />
                                            </div>
                                            <div className="pl-2">
                                                <span className="font-bold"> 우리 단체, 회원들을 위한 </span>
                                                <br />
                                                <span className="font-bold">알찬</span> 복지몰이 필요해요!
                                                <img alt="img" src="/resource/welfaredream/images/guide/web/typeBubble02.gif" className="pb-5 inline-block" />
                                            </div>
                                        </div>
                                        <div className="pb-5 text-lg">
                                            우리 단체 회원들 간의 멤버십 강화는 기본!
                                            <br />
                                            단체의 성격에 따라, 사회적 환원도 가능합니다!
                                        </div>
                                        <div className="text-sm">
                                            <span className="bg-zinc-400 text-white font-bold p-1 px-2 mr-2">추천 업종</span> 동문회, 부녀회, 지역 카페, 취미 소모임 등 비영리단체
                                        </div>
                                    </motion.div>
                                    <motion.div className="text-center mt-3" initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 2 }} transition={{ duration: 0.8 }}>
                                        <img alt="img" src="/resource/welfaredream/images/guide/web/typeC_img.jpg" className="float-right" />
                                    </motion.div>
                                </div>
                                <motion.div
                                    className="py-14 text-center type_box"
                                    initial={{ y: 100, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 2 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <div className="flex justify-center">
                                        <div className="border-r px-6">
                                            <div className="text-xl font-bold block relative mb-5">
                                                {"'"}OOO 대<span className="border-b-2 border-red-400 pb-1">학교</span>
                                                {"'"} 동문회
                                            </div>

                                            <div className="flex justify-center">
                                                <div className="mx-4">
                                                    <img alt="img" src="/resource/welfaredream/images/guide/web/typeC_img01.jpg" className="py-5" />
                                                    <div className="text-sm">
                                                        동문회 전용 복지몰을 <br />
                                                        구축하고 회원들의 <br />
                                                        이벤트를 공유해보세요! <br />
                                                        선물 보내기, 축하 메시지 보내기 등 <br />
                                                        다양한 편의 기능이 있습니다!
                                                    </div>
                                                </div>
                                                <div className="mx-4">
                                                    <img alt="img" src="/resource/welfaredream/images/guide/web/typeC_img02.jpg" className="py-5" />
                                                    <div className="text-sm">
                                                        복지몰에서 발생한 <br />
                                                        매출의 일부를 <br />
                                                        후원할 수도 있습니다! <br />
                                                        후배들을 위한 선배들의 <br />
                                                        장학금으로 사용해 보세요!
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-6">
                                            <div className="text-xl font-bold block relative mb-5">
                                                {"'"}OO 가구<span className="border-b-2 border-red-400 pb-1">공단</span>
                                                {"'"} 상인회
                                            </div>
                                            <div className="flex justify-center">
                                                <div className="mx-4">
                                                    <img alt="img" src="/resource/welfaredream/images/guide/web/typeC_img03.jpg" className="py-5" />
                                                    <div className="text-sm">
                                                        아파트 부녀회 주최, <br />
                                                        커뮤니티 복지몰을 구축하고 <br />
                                                        신선한 지역 먹거리, <br />
                                                        저렴한 생활 용품을 <br />
                                                        특가로 구매해 보세요!
                                                    </div>
                                                </div>
                                                <div className="mx-4">
                                                    <img alt="img" src="/resource/welfaredream/images/guide/web/typeC_img04.jpg" className="py-5" />
                                                    <div className="text-sm">
                                                        복지몰에서 발생한 매출의 <br />
                                                        일부를 후원할 수도 있습니다! <br />
                                                        아파트 발전을 위한 기금, <br />
                                                        지역사회를 위한 <br />
                                                        기부금으로 사용해 보세요!
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                                <motion.div className="text-center mt-2" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 0.8 }}>
                                    <span className="font-bold text-xl text-white px-10 py-2 rounded-full bg-red-400 cursor-pointer" onClick={openDreamCounsel}>
                                        상담신청
                                    </span>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <section className="px-7 py-12">
                    <motion.div className="text-2xl pb-9 leading-snug font-light" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                        <span className="font-bold">고민</span>하지 마세요! <br />
                        <span className="font-bold">복지드림</span>은 <br />
                        우리 회사, 우리 단체만의 <span className="font-bold">전용</span>
                        <span className="font-bold">Mall을 무료로 구축</span>해드립니다!
                    </motion.div>
                    <motion.div
                        className="flex py-5 tracking-tighter"
                        style={{ overflowX: 'scroll' }}
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 2 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="mx-2 text-center">
                            <img alt="img" src="/resource/welfaredream/images/guide/web/aboutType01.jpg" className="mx-auto" />
                            <div className="inline-block bg-white border relative" style={{ width: '280px', height: '304px', marginTop: '-20px', padding: '0 10px' }}>
                                <div
                                    className="block text-lg font-bold text-white rounded-full bg-yellow-500"
                                    style={{ width: '30px', height: '30px', margin: '-15px auto 0', borderRadius: '50px' }}
                                >
                                    A
                                </div>
                                <div className="text-lg font-bold py-2 pb-2 text-yellow-500">복지몰</div>
                                1인 기업부터 대기업까지!
                                <div className="py-2">
                                    우리 회사 임직원들을 위한 <br />
                                    복지몰을 원하신다면!
                                </div>
                                <div className="py-3 text-start text-sm inline-block">
                                    <div>
                                        <span className="font-light pr-2">이용 대상 </span>일반 기업 및 관공서
                                    </div>
                                    <div>
                                        <span className="font-light pr-2">구축 형태 </span>임직원용 복지몰
                                    </div>
                                </div>
                                <div>
                                    <span className="mx-2">
                                        <img alt="img" src="/resource/welfaredream/images/guide/web/typeCheck01.jpg" className="mb-2 inline-block" />
                                        구축비 무료!
                                    </span>
                                    <span className="mx-2">
                                        <img alt="img" src="/resource/welfaredream/images/guide/web/typeCheck01.jpg" className="mb-2 inline-block" />
                                        관리비 무료!
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="mx-2 text-center">
                            <img alt="img" src="/resource/welfaredream/images/guide/web/aboutType02.jpg" className="mx-auto" />
                            <div className="inline-block bg-white border relative" style={{ width: '280px', height: '304px', marginTop: '-20px', padding: '0 10px' }}>
                                <div
                                    className="block text-lg font-bold text-white rounded-full bg-sky-700"
                                    style={{ width: '30px', height: '30px', margin: '-15px auto 0', borderRadius: '50px' }}
                                >
                                    B
                                </div>
                                <div className="text-lg font-bold py-2 pb-2 text-sky-700">협력사몰</div>
                                상품∙서비스가 있는 <br />
                                특별한 기업/단체라면?
                                <div className="py-2">
                                    회원(사)를 위한 <br />
                                    전용 복지몰 구축에 전용 상품관까지!
                                </div>
                                <div className="py-3 text-start text-sm inline-block">
                                    <div>
                                        <span className="font-light pr-2">이용 대상 </span>각종 협회, 프렌차이즈 등
                                    </div>
                                    <div>
                                        <span className="font-light pr-2">구축 형태 </span>회원(사)전용 복지몰 , 전용 상품관
                                    </div>
                                </div>
                                <div>
                                    <span className="mx-2">
                                        <img alt="img" src="/resource/welfaredream/images/guide/web/typeCheck02.jpg" className="mb-2 inline-block" />
                                        구축비 무료!
                                    </span>
                                    <span className="mx-2">
                                        <img alt="img" src="/resource/welfaredream/images/guide/web/typeCheck02.jpg" className="mb-2 inline-block" />
                                        관리비 무료!
                                    </span>
                                </div>
                                <div>
                                    <span className="mx-2">
                                        <img alt="img" src="/resource/welfaredream/images/guide/web/typeCheck02.jpg" className="mb-2 inline-block" />
                                        전용관 세팅 무료!
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="mx-2 text-center">
                            <img alt="img" src="/resource/welfaredream/images/guide/web/aboutType03.jpg" className="mx-auto" />
                            <div className="inline-block bg-white border relative" style={{ width: '280px', height: '304px', marginTop: '-20px', padding: '0 10px' }}>
                                <div
                                    className="block text-lg font-bold text-white rounded-full bg-red-400"
                                    style={{ width: '30px', height: '30px', margin: '-15px auto 0', borderRadius: '50px' }}
                                >
                                    C
                                </div>
                                <div className="text-lg font-bold py-2 pb-2 text-red-400">멤버십몰</div>
                                우리 단체 회원들의 <br />
                                소속감을 높이는 가장 좋은 방법은?
                                <div className="py-2">
                                    단체 전용 복지몰 구축∙단독 프로모션과 <br />
                                    매출 후원 혜택까지!
                                </div>
                                <div className="py-3 text-start text-sm inline-block">
                                    <div>
                                        <span className="font-light pr-2">이용 대상 </span>각종 협회, 동문회 등
                                    </div>
                                    <div>
                                        <span className="font-light pr-2">구축 형태 </span>회원 전용 복지몰
                                    </div>
                                </div>
                                <div>
                                    <span className="mx-2">
                                        <img alt="img" src="/resource/welfaredream/images/guide/web/typeCheck03.jpg" className="mb-2 inline-block" />
                                        구축비 무료!
                                    </span>
                                    <span className="mx-2">
                                        <img alt="img" src="/resource/welfaredream/images/guide/web/typeCheck03.jpg" className="mb-2 inline-block" />
                                        관리비 무료!
                                    </span>
                                </div>
                                <div>
                                    <span className="mx-2">
                                        <img alt="img" src="/resource/welfaredream/images/guide/web/typeCheck03.jpg" className="mb-2 inline-block" />
                                        매출 후원 제도!
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div className="text-center text-2xl font-bold pt-20" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                        <div>복지드림 구축 타입</div>
                    </motion.div>
                    <div className="border-b border-zinc-100 py-14">
                        <div>
                            <motion.div
                                className="font-bold mb-5 border-b border-amber-400 inline-block"
                                initial={{ y: 100, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 2 }}
                                transition={{ duration: 1 }}
                            >
                                <span className="bg-amber-400 pb-1 text-white p-1 mr-2">Type A</span> 복지몰
                            </motion.div>
                            <motion.div
                                className="text-2xl flex justify-center pb-5"
                                initial={{ y: 100, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 2 }}
                                transition={{ duration: 1 }}
                            >
                                <div>
                                    <img alt="img" src="/resource/welfaredream/images/guide/web/typeBubble01.gif" className="pb-4" />
                                </div>
                                <div className="pl-2 text-center">
                                    <span className="font-bold"> 우리 회사 직원들을 위한 </span>
                                    <br />
                                    복지몰이 필요해요!
                                    <img alt="img" src="/resource/welfaredream/images/guide/web/typeBubble02.gif" className="pb-5 inline-block" />
                                </div>
                            </motion.div>
                            <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                                <img alt="img" src="/resource/welfaredream/images/guide/mobile/type01.jpg" className="mx-auto" />
                            </motion.div>
                            <motion.div
                                className="pb-5 pt-4"
                                style={{ fontSize: '15px' }}
                                initial={{ y: 100, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 2 }}
                                transition={{ duration: 1 }}
                            >
                                요즘 시대에 <span className="font-bold">복지는 필수!</span>
                                <br />
                                규모와 상관없이 직원들을 위한 복지 혜택은 기본이죠!
                            </motion.div>
                            <motion.div className="text-sm" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                                <span className="text-white bg-zinc-400 font-bold p-1">추천 업종</span>
                                <div className="pt-2">소상공인, 중소기업 등</div>
                            </motion.div>
                        </div>
                        <div className="py-7" style={{ fontSize: '13px' }}>
                            <motion.div
                                className="flex items-center justify-center"
                                initial={{ y: 100, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 2 }}
                                transition={{ duration: 1 }}
                            >
                                <img alt="img" src="/resource/welfaredream/images/guide/mobile/typeA_img01.jpg" className="mr-4" />
                                <div>
                                    일 잘하는 우리 회사 김대리! <br />뭐 라도 하나 더 챙겨주고 싶다면? <br />
                                    소고기 말고 복지포인트!
                                </div>
                            </motion.div>
                            <motion.div
                                className="flex justify-center items-center py-5"
                                initial={{ y: 100, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 2 }}
                                transition={{ duration: 1 }}
                            >
                                <div className="text-end">
                                    회사 복지 프로그램 짜느라 <br />
                                    머리 아픈 인사과 박 차장님! <br />
                                    저희가 다 준비해 뒀어요 :)
                                </div>
                                <img alt="img" src="/resource/welfaredream/images/guide/mobile/typeA_img02.jpg" className="ml-4" />
                            </motion.div>
                            <motion.div
                                className="flex items-center justify-center"
                                initial={{ y: 100, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 2 }}
                                transition={{ duration: 1 }}
                            >
                                <img alt="img" src="/resource/welfaredream/images/guide/mobile/typeA_img03.jpg" className="mr-4" />
                                <div>
                                    규모 있는 회사로 <br />
                                    성장하고 싶으신 최대표님! <br />
                                    복지시스템 도입을 고려하세요!!
                                </div>
                            </motion.div>
                        </div>
                        <motion.div className="text-center mt-2" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 0.8 }}>
                            <span className="font-bold text-white px-8 py-2 rounded-full bg-amber-400 cursor-pointer" onClick={openDreamCounsel}>
                                상담신청
                            </span>
                        </motion.div>
                    </div>
                    <div className="border-b border-zinc-100 py-14">
                        <div className="pb-10">
                            <motion.div
                                className="font-bold mb-5 border-b border-blue-700 inline-block"
                                initial={{ y: 100, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 2 }}
                                transition={{ duration: 1 }}
                            >
                                <span className="bg-blue-700 pb-1 text-white p-1 mr-2">Type B</span> 협업사몰(B2B)
                            </motion.div>
                            <motion.div
                                className="text-2xl flex justify-center pb-5"
                                initial={{ y: 100, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 2 }}
                                transition={{ duration: 1 }}
                            >
                                <div>
                                    <img alt="img" src="/resource/welfaredream/images/guide/web/typeBubble01.gif" className="pb-4" />
                                </div>
                                <div className="pl-2 text-center">
                                    <span className="font-bold"> 협업사들의 사업 번창을 위한 </span>
                                    <br />
                                    <span className="font-bold">특별한 </span>복지몰이 필요해요!
                                    <img alt="img" src="/resource/welfaredream/images/guide/web/typeBubble02.gif" className="pb-5 inline-block" />
                                </div>
                            </motion.div>
                            <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                                <img alt="img" src="/resource/welfaredream/images/guide/mobile/type02.jpg" className="mx-auto" />
                            </motion.div>
                            <motion.div
                                className="pb-5 pt-4"
                                style={{ fontSize: '15px ' }}
                                initial={{ y: 100, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 2 }}
                                transition={{ duration: 1 }}
                            >
                                소상공인들의 <span className="font-bold">판로 개척</span>과 부실한 <span className="font-bold">복지 증강</span>을 동시에! <br />
                                대한민국 자영업자들을 위한 win-win 혜택을 <br />
                                드립니다!
                            </motion.div>
                            <motion.div className="text-sm" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                                <span className="text-white bg-zinc-400 font-bold p-1">추천 업종</span>
                                <div className="pt-2">
                                    제조/생산업, 유통업, 서비스업, 프랜차이즈 등 <br />
                                    4대 보험 미가입 대상 영리목적 기업
                                </div>
                            </motion.div>
                        </div>

                        <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 0.8 }}>
                            <Swiper spaceBetween={30} slidesPerView={1} modules={[Pagination]} className="about_type-swiper">
                                <SwiperSlide>
                                    <div className="text-center text-xl font-bold block relative mb-7">
                                        OO치킨 <span className="border-b-2 border-sky-700 pb-1">프</span>랜차이즈
                                    </div>
                                    <div>
                                        <img alt="img" src="/resource/welfaredream/images/guide/mobile/typeB_01.jpg" className="mx-auto" />
                                    </div>

                                    <div className="pt-3 pb-8">
                                        <div className="flex justify-between text-left items-center py-3">
                                            <img alt="img" src="/resource/welfaredream/images/guide/mobile/typeB_img01.jpg" className="w-24 mr-5" />

                                            <div>
                                                <strong className="border-b-2 border-sky-700">회원(사) 전용 복지몰</strong>
                                                <div className="text-sm pt-2">프랜차이즈 창업하고,문화, 여행,레저 같은 복지는 꿈도 못 꿨는데, 이제 대기업 부럽지 않아요^^</div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between text-left items-center py-3">
                                            <img alt="img" src="/resource/welfaredream/images/guide/mobile/typeB_img03.jpg" className="w-24 mr-5" />
                                            <div>
                                                <strong className="border-b-2 border-sky-700">OO치킨 전용 상품관</strong>
                                                <div className="text-sm pt-2">
                                                    복지드림 내 {"'"}OO치킨 전용 상품관을 개설{"'"}하여 각 지점별 이벤트 진행 및 쿠폰 발행 등을 도와드립니다!
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="text-center text-xl font-bold block relative mb-7">
                                        {"'"}OO가구 <span className="border-b-2 border-sky-700 pb-1">공단</span>
                                        {"'"} 상인회
                                    </div>
                                    <div>
                                        <img alt="img" src="/resource/welfaredream/images/guide/mobile/typeB_02.jpg" className="mx-auto" />
                                    </div>

                                    <div className="pt-3 pb-8">
                                        <div className="flex justify-between text-left items-center py-3">
                                            <img alt="img" src="/resource/welfaredream/images/guide/mobile/typeB_img02.jpg" className="w-24 mr-5" />

                                            <div>
                                                <strong className="border-b-2 border-sky-700">회원(사) 전용 복지몰</strong>
                                                <div className="text-sm pt-2">평생 장사만 하느라, 건강검진, 노후준비 같은 복지는 꿈도 못 꿨는데, 이제 신바람이 납니다!! </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between text-left items-center py-3">
                                            <img alt="img" src="/resource/welfaredream/images/guide/mobile/typeB_img03.jpg" className="w-24 mr-5" />
                                            <div>
                                                <strong className="border-b-2 border-sky-700">OO가구공단 전용 상품관</strong>
                                                <div className="text-sm pt-2">복지드림 내 OO가구공단 전용 상품관을 개설하여 신상품 홍보 및 쿠폰 발행 등을 도와드립니다!</div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </motion.div>
                        <motion.div className="text-center mt-8" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 0.8 }}>
                            <span className="font-bold text-white px-8 py-2 rounded-full bg-sky-700 cursor-pointer" onClick={openDreamCounsel}>
                                상담신청
                            </span>
                        </motion.div>
                    </div>
                    <div className="border-b border-zinc-100 py-14">
                        <div className="pb-10">
                            <motion.div
                                className="font-bold mb-5 border-b border-red-400 inline-block"
                                initial={{ y: 100, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 2 }}
                                transition={{ duration: 1 }}
                            >
                                <span className="bg-red-400 pb-1 text-white p-1 mr-2">Type C</span> 멤버십몰
                            </motion.div>
                            <motion.div
                                className="text-2xl flex justify-center pb-5"
                                initial={{ y: 100, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 2 }}
                                transition={{ duration: 1 }}
                            >
                                <div>
                                    <img alt="img" src="/resource/welfaredream/images/guide/web/typeBubble01.gif" className="pb-4" />
                                </div>
                                <div className="pl-2 text-center">
                                    <span className="font-bold"> 우리 단체, 회원들을 위한 </span>
                                    <br />
                                    <span className="font-bold">알찬 </span>복지몰이 필요해요!
                                    <img alt="img" src="/resource/welfaredream/images/guide/web/typeBubble02.gif" className="pb-5 inline-block" />
                                </div>
                            </motion.div>
                            <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                                <img alt="img" src="/resource/welfaredream/images/guide/mobile/type03.jpg" className="mx-auto" />
                            </motion.div>
                            <motion.div
                                className="pb-5 pt-4"
                                style={{ fontSize: '15px ' }}
                                initial={{ y: 100, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 2 }}
                                transition={{ duration: 1 }}
                            >
                                우리 단체 회원들 간의 멤버십 강화는 기본! <br />
                                단체의 성격에 따라, 사회적 환원도 가능합니다!
                            </motion.div>
                            <motion.div className="text-sm" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                                <span className="text-white bg-zinc-400 font-bold p-1">추천 업종</span>
                                <div className="pt-2">동문회, 부녀회, 지역 카페, 취미 소모임 등 비영리단체</div>
                            </motion.div>
                        </div>

                        <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 0.8 }}>
                            <Swiper spaceBetween={30} slidesPerView={1} modules={[Pagination]} className="about_type-swiper">
                                <SwiperSlide>
                                    <div>
                                        <div className="text-center text-xl font-bold block relative mb-7">
                                            {"'"}OOO 대<span className="border-b-2 border-red-400 pb-1">학</span>교{"'"} 동문회
                                        </div>
                                        <div className="pt-3 pb-8">
                                            <div className="flex justify-between text-left py-3 items-center">
                                                <div className="w-full mr-3">
                                                    <img alt="img" src="/resource/welfaredream/images/guide/web/typeC_img01.jpg" className="w-24" />
                                                </div>
                                                <div className="text-sm pt-2">
                                                    동문회 전용 복지몰을 구축하고 회원들의 이벤트를 공유해보세요! 선물 보내기, 축하 메시지 보내기 등 다양한 편의 기능이 있습니다!
                                                </div>
                                            </div>
                                            <div className="flex justify-between text-left py-3 items-center">
                                                <div className="w-full mr-3">
                                                    <img alt="img" src="/resource/welfaredream/images/guide/web/typeC_img02.jpg" className="w-24" />
                                                </div>
                                                <div className="text-sm pt-2">
                                                    복지몰에서 발생한 매출의 일부를 후원할 수도 있습니다! 후배들을 위한 선배들의 장학금으로 사용해 보세요!
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div>
                                        <div className="text-center text-xl font-bold block relative mb-7">
                                            {"'"}OO 아<span className="border-b-2 border-red-400 pb-1">파트</span>
                                            {"'"} 부녀회
                                        </div>
                                        <div className="pt-3 pb-8">
                                            <div className="flex justify-between text-left py-3 items-center">
                                                <div className="w-full mr-3">
                                                    <img alt="img" src="/resource/welfaredream/images/guide/web/typeC_img03.jpg" className="w-24" />
                                                </div>
                                                <div className="text-sm pt-2">
                                                    아파트 부녀회 주최, 커뮤니티 복지몰을 구축하고 신선한 지역 먹거리, 저렴한 생활 용품을 특가로 구매해 보세요!
                                                </div>
                                            </div>
                                            <div className="flex justify-between text-left py-3 items-center">
                                                <div className="w-full mr-3">
                                                    <img alt="img" src="/resource/welfaredream/images/guide/web/typeC_img04.jpg" className="w-24" />
                                                </div>
                                                <div className="text-sm pt-2">
                                                    복지몰에서 발생한 매출의 일부를 후원할 수도 있습니다! 후배들을 위한 선배들의 장학금으로 사용해 보세요!
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </motion.div>
                        <motion.div className="text-center mt-8" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 0.8 }}>
                            <span className="font-bold text-white px-8 py-2 rounded-full bg-red-400 cursor-pointer" onClick={openDreamCounsel}>
                                상담신청
                            </span>
                        </motion.div>
                    </div>
                </section>
            )}
        </>
    );
}
