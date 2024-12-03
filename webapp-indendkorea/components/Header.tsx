import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Popover } from '@headlessui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import AccordionMenu from '@/components/UIcomponent/AccordionMenu';

const navi_list = [
    {
        id: '01',
        name: '회사소개',
        to: '',
        children: [
            {
                id: '01-01',
                name: '경영철학',
                to: '/about/philosophy',
                tartget: '',
            },
            {
                id: '01-02',
                name: '회사연혁',
                to: '/about/history',
                tartget: '',
            },
            {
                id: '01-03',
                name: '조직도',
                to: '/about/organize',
                tartget: '',
            },
        ],
    },
    {
        id: '02',
        name: '사업분야',
        to: '',
        children: [
            {
                id: '02-01',
                name: '복지몰구축',
                to: '/business/mall',
                tartget: '',
            },
            {
                id: '02-02',
                name: '국내유통',
                to: '/business/domastic',
                tartget: '',
            },
            {
                id: '02-03',
                name: '해외수출',
                to: '/business/foreign',
                tartget: '',
            },
        ],
    },
    {
        id: '03',
        name: '파트너',
        to: '/partner',
        children: [],
    },
    {
        id: '04',
        name: '상담문의',
        to: '',
        children: [
            {
                id: '04-01',
                name: '복지몰구축 상담',
                to: 'javascript:window.open("https://web.indend.synology.me/dream/counsel", "counsel", "width=1350,height=900")',
            },
            {
                id: '04-02',
                name: '입점·제휴 상담',
                to: 'javascript:window.open("https://web.indend.synology.me/seller/requestv2/request/indend", "requestv2", "width=1350,height=900")',
            },
        ],
    },
    {
        id: '05',
        name: '오시는길',
        to: '/#location',
        children: [],
    },
];

import { left } from '@/libs/utils';
function NavLink({ to, children }: any) {
    if (left(to, 4) == 'java') {
        return (
            <a href={to} className="block">
                <span className="hover-underline-animation">{children}</span>
            </a>
        );
    } else {
        return (
            <Link href={to} className="block">
                <span className="hover-underline-animation">{children}</span>
            </Link>
        );
    }
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
            {device == 'desktop' && (
                <nav className="sticky top-0 z-30 w-full bg-white border-b">
                    <div className="w-full mx-auto h-20 flex items-center lg:w-1200">
                        <MobileNav open={open} />
                        <div className="flex self-center lg:w-0 lg:flex-1">
                            <Link href="/">
                                <span className="sr-only">인디앤드코리아</span>
                                <Image className="" width={204} height={30} src="/resource/indendkorea/images/logo_bk.svg" alt="logo" />
                            </Link>
                        </div>
                        <div className="w-9/12 h-full flex justify-end items-center">
                            <div
                                className="z-50 flex relative w-6 h-6 flex-col justify-between items-center lg:hidden"
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

                            <div className="hidden lg:flex h-full flex justify-end items-center">
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
            )}

            {device == 'mobile' && (
                <nav className="sticky top-0 z-30 w-full bg-white">
                    <div className="w-full mx-auto h-20 flex items-center lg:w-1200 px-4">
                        <MobileNav open={open} setOpen={setOpen} />
                        <div className="flex self-center lg:w-0 lg:flex-1">
                            <Link href="/">
                                <span className="sr-only">인디앤드코리아</span>
                                <Image className="" width={204} height={30} src="/resource/indendkorea/images/logo_bk.svg" alt="logo" />
                            </Link>
                        </div>
                        <div className="w-9/12 h-full flex justify-end items-center">
                            <div
                                className="z-50 flex relative w-6 h-6 flex-col justify-between items-center lg:hidden"
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

function MobileNav({ open }: any) {
    return (
        <div
            className={`fixed top-0 left-0 h-screen w-screen bg-white transform 
            ${open ? '-translate-x-0' : '-translate-x-full'} 
            transition-transform duration-300 ease-in-out filter drop-shadow-md pb-20`}
        >
            <div className="flex items-center justify-center filter drop-shadow-md bg-white h-20">
                <div className="flex justify-start lg:w-0 lg:flex-1">
                    <Link href="/">
                        <span className="sr-only">인디앤드코리아</span>
                        <Image className="" width={204} height={30} src="/resource/indendkorea/images/logo_bk.svg" alt="logo" />
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
