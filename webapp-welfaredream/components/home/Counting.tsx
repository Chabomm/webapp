'use client';

import { motion } from 'framer-motion';

import dynamic from 'next/dynamic';
const CountUp = dynamic(() => import('react-countup'), { ssr: false });
import VisibilitySensor from 'react-visibility-sensor';

export default function Counting({ data, device }: any) {
    return (
        <>
            {device == 'desktop' ? (
                <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                    <section className="main_section">
                        <div className="mx-auto" style={{ width: '1320px' }}>
                            {data.MAIN_COUNT_LIST?.map((v: any, i: number) => (
                                <div key={i} className="inline-block">
                                    <div className="text-start float-left pl-8 border-r" style={{ width: '330px' }}>
                                        <span className="text-3xl">고객사 수</span>
                                        <div className="num text-4xl py-8">
                                            <span className="counter tracking-tighter font-bold text-blue-600 pr-2" style={{ fontSize: '42px' }}>
                                                <CountUp end={v.txt1.replace(/,/g, '')} redraw={true}>
                                                    {({ countUpRef, start }) => (
                                                        <VisibilitySensor onChange={start} delayedCall>
                                                            <span ref={countUpRef} />
                                                        </VisibilitySensor>
                                                    )}
                                                </CountUp>
                                            </span>
                                            개사+
                                        </div>
                                        <div className="text-zinc-600">
                                            많은 기업이 <br />
                                            복지드림을 구축하고 있습니다.
                                        </div>
                                    </div>
                                    <div className="text-start float-left pl-8 border-r" style={{ width: '330px' }}>
                                        <span className="text-3xl">파트너사</span>
                                        <div className="num text-4xl py-8">
                                            <span className="counter tracking-tighter font-bold text-blue-600 pr-2" style={{ fontSize: '42px' }}>
                                                <CountUp end={v.txt2.replace(/,/g, '')} redraw={true}>
                                                    {({ countUpRef, start }) => (
                                                        <VisibilitySensor onChange={start} delayedCall>
                                                            <span ref={countUpRef} />
                                                        </VisibilitySensor>
                                                    )}
                                                </CountUp>
                                            </span>
                                            개+
                                        </div>
                                        <div className="text-zinc-600">
                                            다수의 파트너사와 함께 <br />
                                            다양한 복지서비스를 제공하고 있습니다.
                                        </div>
                                    </div>
                                    <div className="text-start float-left pl-8 border-r" style={{ width: '330px' }}>
                                        <span className="text-3xl">입점 상품</span>
                                        <div className="num text-4xl py-8">
                                            <span className="counter tracking-tighter font-bold text-blue-600 pr-2" style={{ fontSize: '42px' }}>
                                                <CountUp end={v.txt3.replace(/,/g, '')} redraw={true}>
                                                    {({ countUpRef, start }) => (
                                                        <VisibilitySensor onChange={start} delayedCall>
                                                            <span ref={countUpRef} />
                                                        </VisibilitySensor>
                                                    )}
                                                </CountUp>
                                            </span>
                                            개+
                                        </div>
                                        <div className="text-zinc-600">
                                            약 7만여개의 상품을 <br />
                                            복지드림에서 제공하고 있습니다.
                                        </div>
                                    </div>
                                    <div className="text-start float-left pl-8 border-r" style={{ width: '330px' }}>
                                        <span className="text-3xl">복지드림 회원</span>
                                        <div className="num text-4xl py-8">
                                            <span className="counter tracking-tighter font-bold text-blue-600 pr-2" style={{ fontSize: '42px' }}>
                                                <CountUp end={v.txt4.replace(/,/g, '')} redraw={true}>
                                                    {({ countUpRef, start }) => (
                                                        <VisibilitySensor onChange={start} delayedCall>
                                                            <span ref={countUpRef} />
                                                        </VisibilitySensor>
                                                    )}
                                                </CountUp>
                                            </span>
                                            명+
                                        </div>
                                        <div className="text-zinc-600">
                                            복지드림을 통해 많은 <br /> 임직원, 회원이 복지혜택을 받고 있습니다.
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </motion.div>
            ) : (
                <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                    <section className="text-center py-3 px-5 w-full">
                        {data.MAIN_COUNT_LIST?.map((v: any, i: number) => (
                            <div key={i}>
                                <div className="text-start flex py-6 px-2 border-b">
                                    <div className="text-lg font-bold">고객사 수</div>
                                    <div className="grow pl-7">
                                        <div className="num text-2xl mb-2">
                                            <span className="font-bold text-blue-600 text-3xl pr-1">
                                                <CountUp end={v.txt1.replace(/,/g, '')} redraw={true}>
                                                    {({ countUpRef, start }) => (
                                                        <VisibilitySensor onChange={start} delayedCall>
                                                            <span ref={countUpRef} />
                                                        </VisibilitySensor>
                                                    )}
                                                </CountUp>
                                            </span>
                                            개사+
                                        </div>
                                        <div className="text-zinc-500">
                                            많은 기업이 <br />
                                            복지드림을 구축하고 있습니다.
                                        </div>
                                    </div>
                                </div>
                                <div className="text-start flex py-6 px-2 border-b">
                                    <div className="text-lg font-bold">파트너사</div>
                                    <div className="grow pl-7">
                                        <div className="num text-2xl mb-2">
                                            <span className="font-bold text-blue-600 text-3xl pr-1">
                                                <CountUp end={v.txt2.replace(/,/g, '')} redraw={true}>
                                                    {({ countUpRef, start }) => (
                                                        <VisibilitySensor onChange={start} delayedCall>
                                                            <span ref={countUpRef} />
                                                        </VisibilitySensor>
                                                    )}
                                                </CountUp>
                                            </span>
                                            개사+
                                        </div>
                                        <div className="text-zinc-500">
                                            다수의 파트너사와 함께 다양한 <br />
                                            복지서비스를 제공하고 있습니다.
                                        </div>
                                    </div>
                                </div>
                                <div className="text-start flex py-6 px-2 border-b">
                                    <div className="text-lg font-bold">입점 상품</div>
                                    <div className="grow pl-7">
                                        <div className="num text-2xl mb-2">
                                            <span className="font-bold text-blue-600 text-3xl pr-1">
                                                <CountUp end={v.txt3.replace(/,/g, '')} redraw={true}>
                                                    {({ countUpRef, start }) => (
                                                        <VisibilitySensor onChange={start} delayedCall>
                                                            <span ref={countUpRef} />
                                                        </VisibilitySensor>
                                                    )}
                                                </CountUp>
                                            </span>
                                            개사+
                                        </div>
                                        <div className="text-zinc-500">
                                            약 7만여개의 상품을 <br />
                                            복지드림에서 제공하고 있습니다.
                                        </div>
                                    </div>
                                </div>
                                <div className="text-start flex py-6 px-2 border-b">
                                    <div className="text-lg font-bold">
                                        복지드림 <br />
                                        회원
                                    </div>
                                    <div className="grow pl-7">
                                        <div className="num text-2xl mb-2">
                                            <span className="font-bold text-blue-600 text-3xl pr-1">
                                                <CountUp end={v.txt4.replace(/,/g, '')} redraw={true}>
                                                    {({ countUpRef, start }) => (
                                                        <VisibilitySensor onChange={start} delayedCall>
                                                            <span ref={countUpRef} />
                                                        </VisibilitySensor>
                                                    )}
                                                </CountUp>
                                            </span>
                                            명+
                                        </div>
                                        <div className="text-zinc-500">
                                            복지드림을 통해 많은 임직원,
                                            <br /> 회원이 복지혜택을 받고 있습니다.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>
                </motion.div>
            )}
        </>
    );
}
