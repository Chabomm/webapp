import { motion } from 'framer-motion';

export default function Location({ device }: any) {
    return (
        <>
            {device == 'desktop' ? (
                <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                    <section id="location" className="w-full py-28">
                        <div className="mx-auto">
                            <div className="tracking-tighter text-center pb-16 relative">
                                <div className="font-bold pb-2" style={{ fontSize: '42px' }}>
                                    오시는 길
                                </div>
                                <div className="text-xl text-center">
                                    복지드림은 항상 열려있습니다. <br />
                                    방문, 전화, 메일로 언제든 문의주세요.
                                </div>
                            </div>

                            <div className="text-gray-600 body-font relative" style={{ height: `380px` }}>
                                <div className="absolute inset-0 bg-gray-300">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        title="map"
                                        scrolling="no"
                                        src="https://www.google.com/maps?q=인디앤드코리아&output=embed&iwloc=B&output=embed"
                                    ></iframe>
                                </div>
                            </div>

                            <div className="md:w-1200 mx-auto">
                                <div className="text-gray-600 overflow-hidden">
                                    <div className="px-20 pt-24 mx-auto ">
                                        <div className="text-lg grid gap-y-2">
                                            <div className="flex flex-wrap md:flex-nowrap">
                                                <div className="md:w-60 md:mb-0 mb-6 flex-shrink-0 flex items-center justify-end bg-gray-800 pr-6 py-3">
                                                    <span className="font-semibold text-white text-end self-center">주소</span>
                                                </div>
                                                <div className="md:flex-grow flex flex-wrap md:flex-nowrap pl-9 text-base">
                                                    <div className="md:w-48 md:mb-0 mb-6 flex-shrink-0 flex items-center border-b">
                                                        <span className="text-lg text-gray-700 flex">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth="1.5"
                                                                stroke="currentColor"
                                                                className="mr-3 w-6 h-6"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                                                />
                                                            </svg>
                                                            위치
                                                        </span>
                                                    </div>
                                                    <div className="md:flex-grow border-b flex items-center">
                                                        <div className="text-gray-500 mb-2">인천 연수구 인천타워대로 323 송도 센트로드빌딩 B동 2105호</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap md:flex-nowrap">
                                                <div className="md:w-60 md:mb-0 mb-6 flex-shrink-0 flex items-center justify-end bg-zinc-100 pr-6 py-3">
                                                    <span className="font-semibold text-end self-center">대중교통 이용시</span>
                                                </div>
                                                <div className="md:flex-grow flex flex-wrap md:flex-nowrap pl-9 text-base">
                                                    <div className="md:w-48 md:mb-0 mb-6 flex-shrink-0 flex items-center border-b">
                                                        <span className="text-gray-700 flex">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-3 w-6 h-6">
                                                                <path d="M6.5 3c-1.051 0-2.093.04-3.125.117A1.49 1.49 0 002 4.607V10.5h9V4.606c0-.771-.59-1.43-1.375-1.489A41.568 41.568 0 006.5 3zM2 12v2.5A1.5 1.5 0 003.5 16h.041a3 3 0 015.918 0h.791a.75.75 0 00.75-.75V12H2z" />
                                                                <path d="M6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM13.25 5a.75.75 0 00-.75.75v8.514a3.001 3.001 0 014.893 1.44c.37-.275.61-.719.595-1.227a24.905 24.905 0 00-1.784-8.549A1.486 1.486 0 0014.823 5H13.25zM14.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                                            </svg>
                                                            지하철
                                                        </span>
                                                    </div>
                                                    <div className="md:flex-grow border-b flex items-center">
                                                        <div className="text-gray-500 mb-2">인천지하철 1호선 국제업무지구역 2번 출구와 연결되어 있습니다.</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap md:flex-nowrap">
                                                <div className="md:w-60 md:mb-0 mb-6 flex-shrink-0 flex items-center justify-end bg-zinc-100 pr-6 py-3">
                                                    <span className="font-semibold text-end self-center">연락처</span>
                                                </div>
                                                <div className="md:flex-grow flex flex-wrap md:flex-nowrap pl-9 text-base">
                                                    <div className="md:w-48 md:mb-0 mb-6 flex-shrink-0 flex items-center border-b">
                                                        <span className="text-gray-700 flex">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-3 w-6 h-6">
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                            대표번호
                                                        </span>
                                                    </div>
                                                    <div className="md:flex-grow border-b flex items-center">
                                                        <div className="text-gray-500 mb-2">1668-1317</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap md:flex-nowrap">
                                                <div className="md:w-60 md:mb-0 mb-6 flex-shrink-0 flex items-center justify-end bg-zinc-100 pr-6 py-3">
                                                    <span className="font-semibold text-end self-center">문의</span>
                                                </div>
                                                <div className="md:flex-grow flex flex-wrap md:flex-nowrap pl-9 text-base">
                                                    <div className="md:w-48 md:mb-0 mb-6 flex-shrink-0 flex items-center border-b py-4">
                                                        <span className="text-gray-700 flex">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-3 w-6 h-6">
                                                                <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                                                                <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                                                            </svg>
                                                            이메일
                                                        </span>
                                                    </div>
                                                    <div className="md:flex-grow border-b flex items-center">
                                                        <span className="">상품 입점</span>
                                                        <span className="text-muted text-gray-500  ml-3">md@indend.co.kr</span>
                                                        <span className="mx-3 border-r border-gray-500" style={{ height: '20px' }}></span>
                                                        <span className="">복지몰 구축 제휴</span>
                                                        <span className="text-muted text-gray-500  ml-3">info@welfaredream.com</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </motion.div>
            ) : (
                <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                    <section id="location" className="py-8">
                        <div className="text-center">
                            <div className="font-bold pb-3 pt-11 text-3xl">오시는 길</div>
                            <div className="pb-10">
                                복지드림은 항상 열려있습니다.
                                <br /> 방문, 전화, 메일로 언제든 문의주세요.
                            </div>
                        </div>

                        <div className="mb-12 relative" style={{ height: `350px` }}>
                            <div className="absolute inset-0 bg-gray-300">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    title="map"
                                    scrolling="no"
                                    src="https://www.google.com/maps?q=인디앤드코리아&output=embed&iwloc=B&output=embed"
                                ></iframe>
                            </div>
                        </div>

                        <div className="px-6">
                            <div className="mb-5">
                                <span className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mr-1 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>
                                    <div className="font-bold mb-2">위치</div>
                                </span>

                                <div className="text-zinc-500">
                                    인천 연수구 인천타워대로 323
                                    <br />
                                    송도 센트로드빌딩 B동 2105호
                                </div>
                            </div>
                            <div className="mb-5">
                                <span className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-1 h-6">
                                        <path d="M6.5 3c-1.051 0-2.093.04-3.125.117A1.49 1.49 0 002 4.607V10.5h9V4.606c0-.771-.59-1.43-1.375-1.489A41.568 41.568 0 006.5 3zM2 12v2.5A1.5 1.5 0 003.5 16h.041a3 3 0 015.918 0h.791a.75.75 0 00.75-.75V12H2z" />
                                        <path d="M6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM13.25 5a.75.75 0 00-.75.75v8.514a3.001 3.001 0 014.893 1.44c.37-.275.61-.719.595-1.227a24.905 24.905 0 00-1.784-8.549A1.486 1.486 0 0014.823 5H13.25zM14.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                    </svg>
                                    <div className="font-bold mb-2">지하철</div>
                                </span>

                                <div className="text-zinc-500">
                                    인천지하철 1호선 국제업무지구역
                                    <br />
                                    2번 출구와 연결되어 있습니다.
                                </div>
                            </div>
                            <div className="mb-5">
                                <span className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-1 h-6">
                                        <path
                                            fillRule="evenodd"
                                            d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <div className="font-bold mb-2">대표번호</div>
                                </span>

                                <div className="text-zinc-500 font-bold">1668-1317</div>
                            </div>
                            <div className="mb-5">
                                <span className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-1 h-6">
                                        <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                                        <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                                    </svg>
                                    <div className="font-bold mb-2">이메일</div>
                                </span>

                                <div className="text-zinc-400">
                                    <span className="text-sm">상품 입점</span>
                                    <span className="ml-3 ">md@indend.co.kr</span>
                                </div>
                                <div className="text-zinc-400">
                                    <span className="text-sm">복지몰 구축 제휴</span>
                                    <span className="ml-3 ">info@welfaredream.com</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </motion.div>
            )}
        </>
    );
}
