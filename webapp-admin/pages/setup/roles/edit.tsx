import type { GetServerSideProps, NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { api, setContext } from '@/libs/axios';
import { useRouter } from 'next/router';
import { cls, checkNumeric } from '@/libs/utils';

import useForm from '@/components/form/useForm';
import LayoutPopup from '@/components/LayoutPopup';

const RolesEdit: NextPage = (props: any) => {
    const router = useRouter();
    const [filter, setFilter] = useState<any>({ menus: [] });

    useEffect(() => {
        if (props) {
            s.setValues(props.response);
            getFilterContidion();
        }
    }, [props]);

    const getFilterContidion = async () => {
        try {
            const { data } = await api.post(`/be/admin/setup/roles/filter`);
            setFilter(data);
        } catch (e: any) {}
    };

    const { s, fn, attrs } = useForm({
        initialValues: {},
        onSubmit: async () => {
            await editing('REG');
        },
    });

    const deleting = () => editing('DEL');

    const editing = async mode => {
        try {
            if (mode == 'REG' && s.values.uid > 0) {
                mode = 'MOD';
            }
            s.values.mode = mode;
            const { data } = await api.post(`/be/admin/setup/roles/edit`, s.values);
            if (data.code == 200) {
                if (s.values.mode == 'REG') {
                    alert(data.msg);
                    router.replace(`/setup/roles/edit?uid=${s.values.uid}`);
                } else {
                    alert(data.msg);
                    if (mode == 'MOD') {
                        router.replace(`/setup/roles/edit?uid=${data.uid}`);
                    }
                }
            } else {
                alert(data.msg);
            }
        } catch (e: any) {}

        return;
    };

    return (
        <>
            <LayoutPopup title={''}>
                <div className="w-full bg-slate-100 mx-auto py-10">
                    <form onSubmit={fn.handleSubmit} noValidate>
                        <div className="px-9">
                            <div className="flex justify-between">
                                <div className="text-2xl font-semibold">역할 {s.values.uid > 0 ? '수정' : '등록'}</div>
                            </div>
                            <div className="border py-4 px-6 rounded shadow-md bg-white mt-5">
                                <div className="grid grid-cols-2 gap-4 px-5 pt-5">
                                    <div className="col-span-2">
                                        <label className="form-label !text-xl">역할명</label>
                                        <input
                                            type="text"
                                            name="name"
                                            {...attrs.is_mand}
                                            value={s.values?.name || ''}
                                            placeholder=""
                                            onChange={fn.handleChange}
                                            className={cls(s.errors['name'] ? 'border-danger' : '', 'form-control')}
                                        />
                                        {s.errors['name'] && <div className="form-error">{s.errors['name']}</div>}
                                    </div>

                                    <div className="col-span-2">
                                        <label className="form-label !text-xl">메뉴 권한 설정</label>
                                        <div className="grid grid-cols-3 checkbox_filter">
                                            {filter?.menus?.depth1?.map((v: any, i: number) => (
                                                <div key={'dpeth1-' + i} className="h-min w-full">
                                                    <div className="font-bold mt-4 mb-2">{v.name}</div>
                                                    {filter?.menus?.depth2
                                                        ?.filter(p => p.parent == v.uid)
                                                        .map((vv: any, ii: number) => (
                                                            <div className="checkboxs_wrap" key={'dpeth2-' + ii} style={{ height: 'auto' }}>
                                                                <label>
                                                                    <input
                                                                        id={`menus-${ii}`}
                                                                        checked={s.values?.menus.filter(p => p == vv.uid) == checkNumeric(vv.uid) ? true : false}
                                                                        onChange={fn.handleCheckboxGroupForInteger}
                                                                        type="checkbox"
                                                                        value={vv.uid}
                                                                        name="menus"
                                                                    />
                                                                    <span className="ml-3">
                                                                        {vv.name} ({vv.uid})
                                                                    </span>
                                                                </label>
                                                            </div>
                                                        ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {/* end grid */}
                            </div>
                            <div className="mt-5 w-full text-center">
                                <button className="mr-3 px-5 bg-blue-500 rounded-md py-2 text-white text-center" disabled={s.submitting}>
                                    저장
                                </button>
                                {s.values.uid > 0 && (
                                    <button type="button" className="px-5 bg-red-500 rounded-md py-2 text-white text-center" onClick={deleting}>
                                        삭제
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </LayoutPopup>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    setContext(ctx);
    var request: any = {
        uid: ctx.query.uid,
    };
    var response: any = {};
    try {
        const { data } = await api.post(`/be/admin/setup/roles/read`, request);
        response = data;
    } catch (e: any) {
        if (typeof e.redirect !== 'undefined') {
            return { redirect: e.redirect };
        }
    }
    return {
        props: { request, response },
    };
};

export default RolesEdit;
