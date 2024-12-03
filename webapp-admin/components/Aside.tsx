import Link from 'next/link';
import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '@/pages/_app';
import { cls } from '@/libs/utils';
import { useRouter } from 'next/router';

export default function Aside(props: any) {
    const { aside } = useContext(GlobalContext);
    const { navi_list, user } = props;
    const [navis, setNavis] = useState<any[]>(navi_list);
    useEffect(() => {
        setNavis(navi_list);
    }, [props]);

    const router = useRouter();
    const goNavPage = to => {
        router.push(to);
        // router.push(to, undefined, { shallow: true });
    };

    const logOut = () => {
        router.replace('/logout');
    };

    return (
        <div className={cls('h-full transition-width duration-75 bg-white overflow-y-auto border-r', aside ? 'w-64' : 'w-0')}>
            <div className="flex items-center justify-center h-16 border-b">
                <Link href="/" className={`flex items-center text-xl font-bold`}>
                    <img src="/images/indend_ci.png" className="h-6 mr-2" alt="indend Logo" />
                    <span className="self-center whitespace-nowrap">인디앤드</span>
                </Link>
            </div>
            <div className="border-b text-center py-3 text-sm">
                <div className="">[{user?.depart}]</div>
                {user?.user_name}
                <button className="underline" onClick={logOut}>
                    [로그아웃]
                </button>
            </div>
            <div className="px-5 bg-white">
                <div className="grid divide-y divide-neutral-200">
                    {navis?.map((v: any, i: number) => (
                        <div key={i} className="py-5">
                            <details className="group" open={v.open}>
                                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                    <span className="mr-2">
                                        <i className={`${v.icon}`}></i>
                                    </span>
                                    <span className="flex-grow">{v.name}</span>
                                    <span className="transition group-open:rotate-180">
                                        <i className="fas fa-angle-down"></i>
                                    </span>
                                </summary>
                                <div className="text-neutral-600 group-open:animate-fadeIn mt-6">
                                    {v.children.map((vv: any, ii: number) => (
                                        <div key={ii} className="ml-6 mt-3">
                                            <div
                                                onClick={() => {
                                                    goNavPage(vv.to);
                                                }}
                                                className={cls('cursor-pointer', vv.active ? 'text-rose-600' : 'text-neutral-600')}
                                            >
                                                {vv.name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </details>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
