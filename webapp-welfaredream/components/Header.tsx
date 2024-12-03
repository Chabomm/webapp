import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Popover } from '@headlessui/react';
import { useRouter } from 'next/router';
import AccordionMenu from '@/components/UIcomponent/AccordionMenu';

const navi_list = [
    {
        id: '01',
        name: '복지드림 소개',
        to: '',
        children: [
            {
                id: '01-01',
                name: '복지드림이란?',
                to: '/intro/information',
                tartget: '',
            },
            {
                id: '01-02',
                name: '선택적 복지제도란?',
                to: '/intro/benefit',
                tartget: '',
            },
        ],
    },
    {
        id: '02',
        name: '서비스 이용 안내',
        to: '',
        children: [
            {
                id: '02-01',
                name: '구축타입',
                to: '/guide/about_type',
                tartget: '',
            },
            {
                id: '02-02',
                name: '제공서비스',
                to: '/guide/service',
                tartget: '',
            },
            {
                id: '02-03',
                name: '이용요금',
                to: '/guide/charge_for_using',
                tartget: '',
            },
            {
                id: '02-03',
                name: '구축 안내',
                to: '/guide/about_guide',
                tartget: '',
            },
        ],
    },
    {
        id: '03',
        name: '복지 혜택',
        to: '',
        children: [
            {
                id: '03-01',
                name: '복지서비스',
                to: '/benefit/welfare',
            },
            {
                id: '03-02',
                name: '드림플레이스',
                to: '/benefit/dreamplace',
            },
        ],
    },
    {
        id: '04',
        name: '멤버쉽 혜택',
        to: '',
        children: [
            {
                id: '04-01',
                name: '고객사 혜택',
                to: '/membership/consumer',
            },
        ],
    },
    {
        id: '05',
        name: '파트너',
        to: '',
        children: [
            {
                id: '05-01',
                name: '파트너',
                to: '/customer/partner',
            },
        ],
    },
    {
        id: '06',
        name: '뉴스룸',
        to: '',
        children: [
            {
                id: '06-01',
                name: '소식',
                to: '/bbs/news',
            },
            {
                id: '06-02',
                name: '보도자료',
                to: '/bbs/media',
            },
        ],
    },
    {
        id: '06',
        name: '고객센터',
        to: '',
        children: [
            {
                id: '05-01',
                name: '공지사항',
                to: '/bbs/notice',
                tartget: '',
            },
            {
                id: '05-02',
                name: '자주 묻는 질문',
                to: '/bbs/faq',
                tartget: '',
            },
            {
                id: '05-03',
                name: '오시는 길',
                to: '/location',
                tartget: '',
            },
        ],
    },
];

function NavLink({ to, children }: any) {
    return (
        <Link href={to} className="block">
            <span className="hover-underline-animation">{children}</span>
        </Link>
    );
}

// https://codesandbox.io/s/d8llw?file=/src/App.js

export default function Navbar({ nav_id, title, device }: any) {
    const [open, setOpen] = useState(false);

    const router = useRouter();
    useEffect(() => {
        // document.querySelector('body').classList.remove('overflow-hidden');
        const document_body = window.document.querySelector('body');
        if (document_body !== null) {
            document_body.classList.remove('overflow-hidden');
        }
        setOpen(false);
    }, [router]);

    return (
        <>
            {device == 'desktop' ? (
                <nav className="sticky top-0 z-10 w-full bg-white border-b">
                    <div className="w-full mx-auto h-20 flex items-center md:w-1200">
                        <MobileNav open={open} setOpen={setOpen} />
                        <div className="flex self-center lg:w-0 lg:flex-1">
                            <Link href="/">
                                <span className="sr-only">복지드림</span>
                                <img alt="img" src={'/resource/welfaredream/images/logo.svg'} />
                            </Link>
                        </div>
                        <div className="w-9/12 h-full flex justify-end items-center">
                            <div
                                className="z-50 flex relative w-6 h-6 flex-col justify-between items-center md:hidden"
                                onClick={() => {
                                    setOpen(!open);
                                    if (!open) {
                                        // document.querySelector('body').classList.add('overflow-hidden');
                                        const document_body = window.document.querySelector('body');
                                        if (document_body !== null) {
                                            document_body.classList.add('overflow-hidden');
                                        }
                                    } else {
                                        // document.querySelector('body').classList.remove('overflow-hidden');
                                        const document_body = window.document.querySelector('body');
                                        if (document_body !== null) {
                                            document_body.classList.remove('overflow-hidden');
                                        }
                                    }
                                }}
                            >
                                <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? 'rotate-45 translate-y-2.5' : ''}`} />
                                <span className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${open ? 'hidden' : 'w-full'}`} />
                                <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? '-rotate-45 -translate-y-2.5' : ''}`} />
                            </div>

                            <div className="hidden md:flex h-full flex justify-end items-center">
                                {navi_list.map((v, i) => (
                                    <Popover key={i} className="relative h-full items-center">
                                        {v.children.length > 0 ? (
                                            <Popover.Button className="px-3 focus:outline-none nav-stretch hover-underline-animation text-slate-900">{v.name}</Popover.Button>
                                        ) : (
                                            <div className="px-3 nav-stretch hover-underline-animation text-slate-900">
                                                <Link href={v.to}>{v.name}</Link>
                                            </div>
                                        )}

                                        <Popover.Panel className="absolute z-10 w-40 bg-white border border-gray-200 rounded-b-lg p-4">
                                            <div className="bg-white">
                                                {v.children.map((vv, ii) => (
                                                    <div className="mb-3" key={ii}>
                                                        <NavLink to={vv.to}>{vv.name}</NavLink>
                                                    </div>
                                                ))}
                                            </div>
                                        </Popover.Panel>
                                    </Popover>
                                ))}
                            </div>
                        </div>
                    </div>
                </nav>
            ) : (
                <nav className="sticky top-0 z-30 w-full bg-white">
                    <div className="w-full mx-auto h-20 flex items-center md:w-1200 px-4">
                        <MobileNav open={open} setOpen={setOpen} />
                        <div className="flex self-center lg:w-0 lg:flex-1">
                            <Link href="/">
                                <span className="sr-only">복지드림</span>

                                <img alt="img" src={'/resource/welfaredream/images/logo.svg'} className="w-20" />
                            </Link>
                        </div>
                        <div className="w-9/12 h-full flex justify-end items-center">
                            <div
                                className="z-50 flex relative w-6 h-6 flex-col justify-between items-center md:hidden"
                                onClick={() => {
                                    setOpen(!open);
                                    if (!open) {
                                        // document.querySelector('body').classList.add('overflow-hidden');
                                        const document_body = window.document.querySelector('body');
                                        if (document_body !== null) {
                                            document_body.classList.add('overflow-hidden');
                                        }
                                    } else {
                                        // document.querySelector('body').classList.remove('overflow-hidden');
                                        const document_body = window.document.querySelector('body');
                                        if (document_body !== null) {
                                            document_body.classList.remove('overflow-hidden');
                                        }
                                    }
                                }}
                            >
                                <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? 'rotate-45 translate-y-2.5' : ''}`} />
                                <span className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${open ? 'hidden' : 'w-full'}`} />
                                <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? '-rotate-45 -translate-y-2.5' : ''}`} />
                            </div>
                        </div>
                    </div>
                </nav>
            )}
        </>
    );
}

function MobileNav({ open, setOpen }: any) {
    return (
        <div
            className={`fixed top-0 left-0 h-screen w-screen bg-white transform 
            ${open ? '-translate-x-0' : '-translate-x-full'} 
            transition-transform duration-300 ease-in-out filter drop-shadow-md pb-20`}
        >
            <div className="flex items-center justify-center filter drop-shadow-md bg-white h-20">
                <div className="flex justify-start lg:w-0 lg:flex-1">
                    <Link href="/">
                        <span className="sr-only">복지드림</span>
                        <img alt="img" src={'/resource/welfaredream/images/logo.svg'} className="w-20" />
                    </Link>
                </div>
            </div>
            <div className="overflow-y-auto h-screen pb-20">
                <div className="flex flex-col justify-center items-center p-10">
                    {navi_list.map((v, i) => {
                        return <AccordionMenu key={i} menu={v} NavLink={NavLink}></AccordionMenu>;
                    })}
                </div>
            </div>
        </div>
    );
}
