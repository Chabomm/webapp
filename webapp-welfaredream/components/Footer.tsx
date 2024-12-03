import Link from 'next/link';
import { openSellerRequest, openDreamCounsel, openIndendHomepage } from '@/libs/utils';

export default function Footer({ nav_id, title, device }: any) {
    return (
        <>
            {device == 'desktop' ? (
                <div className="bg-black body-font">
                    <div className="fixed w-full bottom-0 z-50">
                        <div className="absolute bottom-52 right-0 border border-b-0">
                            <a href="http://pf.kakao.com/_XWRexb/chat" target="_blank">
                                <img alt="img" src="/resource/welfaredream/images/quick_kakao.jpg" className="border-b" />
                            </a>
                            <a href="http://pf.kakao.com/_XWRexb" target="_blank">
                                <img alt="img" src="/resource/welfaredream/images/quick_kakaPlus.jpg" className="border-b" />
                            </a>
                            <div className="cursor-pointer" onClick={openSellerRequest}>
                                <img alt="img" src="/resource/welfaredream/images/quick_partner.jpg" className="border-b" />
                            </div>
                            <div className="cursor-pointer" onClick={openDreamCounsel}>
                                <img alt="img" src="/resource/welfaredream/images/quick_cs.jpg" className="border-b" />
                            </div>
                            <Link href="/location">
                                <img alt="img" src="/resource/welfaredream/images/quick_location.jpg" className="border-b" />
                            </Link>
                        </div>
                    </div>
                    <div className="py-24 mx-auto" style={{ width: '1220px' }}>
                        <div className="flex flex-wrap md:text-left tracking-tighter text-sm text-zinc-400">
                            <div className="mr-16">
                                <Link href="/">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="139.359" viewBox="0 0 120 139.359">
                                        <g id="그룹_2784" data-name="그룹 2784" transform="translate(-1168.528 -296.728)">
                                            <g id="그룹_2786" data-name="그룹 2786" transform="translate(1168.528 296.728)">
                                                <g id="그룹_2784-2" data-name="그룹 2784" transform="translate(93.361)">
                                                    <path
                                                        id="패스_1413"
                                                        data-name="패스 1413"
                                                        d="M1251.8,325.146a3.805,3.805,0,0,1-3.076-6.041l.016-.023,4.752-6.546-4.531-1.475a3.805,3.805,0,0,1,2.352-7.238l.011,0,4.52,1.466,0-4.764a3.805,3.805,0,0,1,7.61,0l0,4.764,4.531-1.471a3.805,3.805,0,0,1,2.352,7.238l-4.53,1.475,2.8,3.854a3.8,3.8,0,0,1-6.156,4.474l-.007-.008-2.794-3.844-4.772,6.565A3.8,3.8,0,0,1,1251.8,325.146Z"
                                                        transform="translate(-1246.329 -296.728)"
                                                        fill="#fff"
                                                    ></path>
                                                </g>
                                                <path
                                                    id="패스_1414"
                                                    data-name="패스 1414"
                                                    d="M1217.442,332.876c1.808,0,2.672.864,2.672,2.594v5.9H1171.2c-1.808,0-2.674-.865-2.674-2.594v-5.9h20.134V329.1c-9.594-1.022-13.6-4.009-14.39-10.85a91.541,91.541,0,0,1,.157-16.041h6.92c1.729,0,2.358.787,2.358,2.438-.078.943-.078,2.045-.157,3.224h21.545v-5.663h7c1.808,0,2.674.865,2.674,2.6v21.624a54.3,54.3,0,0,1-14.783,2.83v3.618Zm-2.52,20.049c0,3.932.159,7.393-.313,9.516-.708,3.3-4.01,4.56-9.751,3.853V354.106h-28.542c-1.808,0-2.673-.865-2.673-2.6v-6.054h38.607c1.808,0,2.672.864,2.672,2.594Zm-25.4-32a49.439,49.439,0,0,0,15.569-.551v-4.718h-21.465a1.749,1.749,0,0,1,.078.63C1183.942,319.116,1185.594,320.373,1189.526,320.924Z"
                                                    transform="translate(-1168.528 -295.632)"
                                                    fill="#fff"
                                                ></path>
                                                <g id="그룹_2785" data-name="그룹 2785" transform="translate(51.586 19.137)">
                                                    <path
                                                        id="패스_1415"
                                                        data-name="패스 1415"
                                                        d="M1256.734,347.347V315.27c0-1.729-.865-2.594-2.674-2.594h-7.391V359.3c6.133.629,9.043-.55,9.75-3.852C1256.893,353.323,1256.734,350.886,1256.734,347.347Z"
                                                        transform="translate(-1204.487 -312.676)"
                                                        fill="#fff"
                                                    ></path>
                                                    <path
                                                        id="패스_1416"
                                                        data-name="패스 1416"
                                                        d="M1237.781,333.771c-.047-.086.429-.817.488-.932q.272-.533.53-1.073.522-1.089.98-2.207a42.773,42.773,0,0,0,1.551-4.448c.061-.3.135-.588.188-.884a23.4,23.4,0,0,0,.2-3.643,27,27,0,0,0-.162-4.516,2.419,2.419,0,0,0-.395-1.04,1.8,1.8,0,0,0-.4-.432,2.742,2.742,0,0,0-1.666-.449H1215.11V320.2c0,1.73.864,2.6,2.674,2.6h14.409s.028,0,.037.016c-2.648,9.637-11.011,17.346-20.713,23.412a6.592,6.592,0,0,0,2,4.261,4.436,4.436,0,0,0,1.2.824,8.546,8.546,0,0,0,.824.359,5.922,5.922,0,0,0,2.455.4,7.68,7.68,0,0,0,3.922-1.523,60.6,60.6,0,0,0,8.818-7.453c.222-.23.453-.443.673-.679l.99,1.24,6.695,8.372a8.6,8.6,0,0,0,3.3.037,6.521,6.521,0,0,0,2.125-.8,5.423,5.423,0,0,0,.89-.646,4.279,4.279,0,0,0,.636-.742c1.223-1.776.763-3.757-.168-5.5a14.568,14.568,0,0,0-1.062-1.676Z"
                                                        transform="translate(-1211.517 -312.382)"
                                                        fill="#fff"
                                                    ></path>
                                                </g>
                                            </g>
                                            <g id="그룹_2788" data-name="그룹 2788" transform="translate(1168.528 371.148)">
                                                <g id="그룹_2787" data-name="그룹 2787" transform="translate(0 9.215)">
                                                    <path
                                                        id="패스_1417"
                                                        data-name="패스 1417"
                                                        d="M1171.2,406.854c-1.808,0-2.674-.864-2.674-2.594v-6.054h48.914c1.808,0,2.672.865,2.672,2.594v6.054Z"
                                                        transform="translate(-1168.528 -360.068)"
                                                        fill="#fff"
                                                    ></path>
                                                    <path
                                                        id="패스_1418"
                                                        data-name="패스 1418"
                                                        d="M1173.977,366.424h35.856c1.807,0,2.672.865,2.672,2.359v6.6h-29.564a81.024,81.024,0,0,0-.079,8.728c.314,2.831,2.123,4.4,6.054,4.955,5.977.943,14.784.55,21.466-.079,2.28-.236,3.695.708,3.695,2.831v5.425c-10.377,1.337-19.106,1.73-27.048.865-8.1-.865-12.425-4.168-13.524-8.964C1172.483,384.823,1172.639,375.467,1173.977,366.424Z"
                                                        transform="translate(-1167.665 -366.424)"
                                                        fill="#fff"
                                                    ></path>
                                                </g>
                                                <path
                                                    id="패스_1419"
                                                    data-name="패스 1419"
                                                    d="M1213.755,385.559c-.708-3.617-.314-8.964.394-13.053h18.557v-3.853h-16.591c-1.81,0-2.674-.865-2.674-2.594v-5.111H1239.7c1.573,0,2.437.864,2.437,2.594V379.9h-19.421a12.953,12.953,0,0,0,.078,3.066c.314,1.573,1.651,2.281,5.583,2.6a104.145,104.145,0,0,0,14.231-.236c1.888-.157,2.989.865,2.989,2.6v5.032a84.555,84.555,0,0,1-18.557.786C1218.788,393.264,1214.778,390.748,1213.755,385.559Zm8.334,29.093c-1.179-4.325-.549-11.244.551-16.118h35.384a2.19,2.19,0,0,1,2.516,2.437v17.141c-5.033,4.01-13.525,5.976-22.881,5.5C1228.93,423.065,1223.505,420.077,1222.089,414.651Zm28.937-1.415v-6.684H1230.9c-.55,5.033.865,7.234,5.269,8.178C1240.8,415.6,1247.8,415.045,1251.026,413.237Zm.392-54.492h7.392c1.808,0,2.674.865,2.674,2.594v20.13c0,3.539.157,5.976-.316,8.1-.706,3.3-3.615,4.482-9.75,3.853Z"
                                                    transform="translate(-1159.557 -358.745)"
                                                    fill="#fff"
                                                ></path>
                                            </g>
                                        </g>
                                    </svg>
                                </Link>
                            </div>

                            <div>
                                <div className="font-bold text-white tracking-tighter text-2xl mb-7">Head Office</div>
                                <div className="pb-10">인천 연수구 인천타워대로323 송도센트로드B동 2105호</div>
                                <div className="leading-9">
                                    <div>대표이사 : 오상훈</div>
                                    <div>사업자등록번호 : 511-88-00037</div>
                                    <div>통신판매업신고 : 제 2015-인천연수구-0116</div>
                                    <div>ⓒ 2020. (주)인디앤드코리아 all rights reserved.</div>
                                </div>
                            </div>
                            <div className="px-20">
                                <div className="font-bold text-white tracking-tighter text-2xl mb-7">Contact</div>
                                <div className="leading-9">
                                    <div className="font-bold">복지몰 대표번호</div>
                                    <div>T : 1668-1317 (내선번호 2번)</div>
                                    <div className="">E : info@welfaredream.com</div>
                                    <div className="font-bold">입점 문의</div>
                                    <div className="">T : 032-719-7814</div>
                                    <div className="">E : md@indend.co.kr</div>
                                </div>
                            </div>
                            <div className="">
                                <div className="font-bold text-white tracking-tighter text-2xl mb-7">Download</div>

                                <div className="flex mb-8">
                                    <div className="mr-4">
                                        <img alt="img" src="/resource/welfaredream/images/appqr.jpg" />
                                        <div className="text-sm text-center mt-1">복지드림 앱 QR코드</div>
                                    </div>
                                    <div>
                                        <Link href="https://web.indend.synology.me/home/welfaredreamapp" target="_blank" className="block mb-2">
                                            <div className="rounded-full border border-white text-white px-4 py-2">
                                                <img
                                                    alt="img"
                                                    src="/resource/welfaredream/images/ft-01.svg"
                                                    style={{ width: '14px', display: 'inline-block', marginRight: '3px' }}
                                                />
                                                APP 다운로드
                                            </div>
                                        </Link>
                                        <Link href="/guide/charge_for_using#anchor" className="block mb-2">
                                            <div className="rounded-full border border-white text-white px-4 py-2">
                                                <img
                                                    alt="img"
                                                    src="/resource/welfaredream/images/ft-02.svg"
                                                    style={{ width: '14px', display: 'inline-block', marginRight: '3px' }}
                                                />
                                                서비스 소개서
                                            </div>
                                        </Link>
                                        <div onClick={openIndendHomepage} className="block mb-2">
                                            <div className="rounded-full border border-white text-white px-4 py-2">
                                                <img
                                                    alt="img"
                                                    src="/resource/welfaredream/images/ft-03.svg"
                                                    style={{ width: '14px', display: 'inline-block', marginRight: '3px' }}
                                                />
                                                회사 홈페이지
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="leading-9">카카오톡 @복지드림 친구 추가하고 소식과 혜택을 받아보세요.</div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full bg-black px-5 pt-14 pb-32">
                    <div className="footerArea tracking-tighter text-white px-2 text-start">
                        <div className="mb-4">
                            <Link href="/">
                                <svg xmlns="http://www.w3.org/2000/svg" width="80.371" height="26" viewBox="0 0 80.371 26">
                                    <g id="그룹_3471" data-name="그룹 3471" transform="translate(-570.116 -165.022)">
                                        <g id="그룹_3473" data-name="그룹 3473" transform="translate(570.116 165.022)">
                                            <g id="그룹_3471-2" data-name="그룹 3471" transform="translate(34.099 0)">
                                                <path
                                                    id="패스_4959"
                                                    data-name="패스 4959"
                                                    d="M648.483,175.4a1.389,1.389,0,0,1-1.123-2.206l.005-.008L649.1,170.8l-1.655-.538a1.39,1.39,0,0,1,.859-2.644h0l1.651.536v-1.74a1.39,1.39,0,0,1,2.779,0v1.74l1.655-.537a1.39,1.39,0,0,1,.859,2.644l-1.654.538,1.022,1.408a1.39,1.39,0,0,1-2.248,1.634l0,0-1.021-1.4-1.743,2.4A1.389,1.389,0,0,1,648.483,175.4Z"
                                                    transform="translate(-646.486 -165.022)"
                                                    fill="#fff"
                                                ></path>
                                            </g>
                                            <path
                                                id="패스_4960"
                                                data-name="패스 4960"
                                                d="M587.981,181.6c.661,0,.977.316.977.947v2.154H571.093c-.66,0-.977-.316-.977-.948V181.6h7.353v-1.379c-3.5-.373-4.969-1.465-5.256-3.963a33.4,33.4,0,0,1,.058-5.859H574.8c.632,0,.861.287.861.89-.029.345-.029.747-.058,1.177h7.869V170.4h2.556c.66,0,.977.316.977.948v7.9a19.813,19.813,0,0,1-5.4,1.034V181.6Zm-.92,7.323a20.393,20.393,0,0,1-.115,3.476c-.259,1.206-1.465,1.666-3.561,1.407v-4.452H572.96c-.66,0-.976-.316-.976-.948V186.2h14.1c.66,0,.976.316.976.948Zm-9.276-11.689a18.043,18.043,0,0,0,5.686-.2v-1.723h-7.84a.635.635,0,0,1,.029.23C575.746,176.578,576.349,177.037,577.785,177.238Z"
                                                transform="translate(-570.116 -168)"
                                                fill="#fff"
                                            ></path>
                                            <g id="그룹_3472" data-name="그룹 3472" transform="translate(18.842 6.99)">
                                                <path
                                                    id="패스_4961"
                                                    data-name="패스 4961"
                                                    d="M650.5,193.341V181.624c0-.632-.316-.947-.977-.947h-2.7v17.029c2.24.23,3.3-.2,3.561-1.407A14.943,14.943,0,0,0,650.5,193.341Z"
                                                    transform="translate(-631.413 -180.677)"
                                                    fill="#fff"
                                                ></path>
                                                <path
                                                    id="패스_4962"
                                                    data-name="패스 4962"
                                                    d="M621.907,189.288c-.017-.031.157-.3.179-.34q.1-.195.194-.392.19-.4.358-.806a15.661,15.661,0,0,0,.566-1.624c.022-.108.049-.215.069-.323a8.484,8.484,0,0,0,.072-1.331,9.885,9.885,0,0,0-.059-1.649.886.886,0,0,0-.144-.38.66.66,0,0,0-.147-.158,1,1,0,0,0-.609-.164h-8.758v2.211c0,.632.316.948.977.948h5.263a.024.024,0,0,1,.014.006c-.968,3.52-4.022,6.335-7.566,8.551a2.408,2.408,0,0,0,.731,1.557,1.609,1.609,0,0,0,.439.3,3.109,3.109,0,0,0,.3.131,2.17,2.17,0,0,0,.9.145,2.812,2.812,0,0,0,1.432-.556,22.133,22.133,0,0,0,3.22-2.722c.081-.084.166-.162.246-.248l.362.453,2.445,3.058a3.138,3.138,0,0,0,1.206.014,2.382,2.382,0,0,0,.776-.293,1.989,1.989,0,0,0,.326-.236,1.549,1.549,0,0,0,.232-.271,1.86,1.86,0,0,0-.061-2.01,5.279,5.279,0,0,0-.388-.612Z"
                                                    transform="translate(-612.314 -181.476)"
                                                    fill="#fff"
                                                ></path>
                                            </g>
                                        </g>
                                        <g id="그룹_3475" data-name="그룹 3475" transform="translate(613.25 167.303)">
                                            <g id="그룹_3474" data-name="그룹 3474" transform="translate(0 3.366)">
                                                <path
                                                    id="패스_4963"
                                                    data-name="패스 4963"
                                                    d="M667.7,212.025c-.661,0-.976-.316-.976-.947v-2.212h17.865c.661,0,.976.316.976.948v2.211Z"
                                                    transform="translate(-666.72 -194.937)"
                                                    fill="#fff"
                                                ></path>
                                                <path
                                                    id="패스_4964"
                                                    data-name="패스 4964"
                                                    d="M671.368,177.67h13.1c.66,0,.976.316.976.861v2.412h-10.8a29.373,29.373,0,0,0-.029,3.188c.115,1.034.775,1.608,2.211,1.81a35.832,35.832,0,0,0,7.841-.029c.833-.087,1.349.258,1.349,1.034v1.982a41.97,41.97,0,0,1-9.879.316c-2.958-.316-4.538-1.522-4.94-3.274A27.271,27.271,0,0,1,671.368,177.67Z"
                                                    transform="translate(-669.063 -177.67)"
                                                    fill="#fff"
                                                ></path>
                                            </g>
                                            <path
                                                id="패스_4965"
                                                data-name="패스 4965"
                                                d="M710.885,179.925a14.9,14.9,0,0,1,.143-4.767h6.778V173.75h-6.06c-.661,0-.976-.316-.976-.948v-1.867h9.592c.574,0,.89.316.89.948v5.974h-7.094a4.766,4.766,0,0,0,.029,1.12c.115.574.6.833,2.039.947a37.995,37.995,0,0,0,5.2-.086.9.9,0,0,1,1.091.948v1.838a30.923,30.923,0,0,1-6.778.288C712.723,182.739,711.258,181.82,710.885,179.925Zm3.044,10.626a14.152,14.152,0,0,1,.2-5.888h12.923a.8.8,0,0,1,.919.89v6.261c-1.838,1.465-4.94,2.183-8.357,2.01C716.427,193.624,714.446,192.533,713.929,190.551Zm10.569-.517v-2.441h-7.352c-.2,1.838.316,2.642,1.924,2.987A9.855,9.855,0,0,0,724.5,190.034Zm.144-19.9h2.7c.66,0,.976.316.976.948v7.352a14.936,14.936,0,0,1-.115,2.958c-.258,1.206-1.321,1.637-3.561,1.407Z"
                                                transform="translate(-691.09 -170.131)"
                                                fill="#fff"
                                            ></path>
                                        </g>
                                    </g>
                                </svg>
                            </Link>
                        </div>

                        <div className="text-sm text-neutral-400 py-5 leading-loose">
                            <div className="flex mb-3">
                                <div className="text-neutral-400 mr-2" onClick={openIndendHomepage}>
                                    회사소개
                                </div>
                                |
                                <div className="text-neutral-400 mx-2" onClick={openSellerRequest}>
                                    입점문의
                                </div>
                                |
                                <div className="text-neutral-400 ml-2" onClick={openDreamCounsel}>
                                    복지몰 구축 문의
                                </div>
                            </div>
                            <div className="">(주)인디앤드코리아</div>
                            <div className="">대표이사 : 오상훈</div>
                            <div className="">사업자등록번호 : 511-88-00037</div>
                            <div className="">인천 연수구 인천타워대로323 송도센트로드B동 2105호</div>
                            <div className="">복지몰 대표번호</div>
                            <div className="">입점문의 : 032-719-7814</div>
                            <div className="mb-3">통신판매업신고 : 제 2015-인천연수구-0116</div>
                            <div className="">ⓒ 2020. (주)인디앤드코리아 all rights reserved.</div>
                        </div>

                        <div className="pt-5">
                            <div className="flex justify-evenly mb-7 text-sm">
                                <Link className="text-white" href="https://web.indend.synology.me/home/welfaredreamapp" target="_blank">
                                    <div className="text-center mb-2">
                                        <img alt="img" src="/resource/welfaredream/images/ft-01.svg" style={{ width: '14px', display: 'inline-block', marginRight: '3px' }} />
                                    </div>
                                    <div>APP 다운로드</div>
                                </Link>
                                <Link className="text-white border-l border-r px-3" href="/guide/charge_for_using#anchor">
                                    <div className="text-center mb-2">
                                        <img alt="img" src="/resource/welfaredream/images/ft-02.svg" style={{ width: '14px', display: 'inline-block', marginRight: '3px' }} />
                                    </div>
                                    <div>서비스소개서</div>
                                </Link>
                                <div onClick={openIndendHomepage} className="text-white">
                                    <div className="text-center mb-2">
                                        <img alt="img" src="/resource/welfaredream/images/ft-03.svg" style={{ width: '14px', display: 'inline-block', marginRight: '3px' }} />
                                    </div>
                                    <div>회사 홈페이지</div>
                                </div>
                            </div>
                            <div className="text-sm">
                                카카오톡<span className="font-bold"> @복지드림</span> 친구 추가하고 소식과 혜택을 받아보세요.
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
