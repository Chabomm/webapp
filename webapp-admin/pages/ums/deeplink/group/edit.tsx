import type { GetServerSideProps, NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { api, setContext } from '@/libs/axios';
import { useRouter } from 'next/router';
import { cls } from '@/libs/utils';

import useForm from '@/components/form/useForm';
import LayoutPopup from '@/components/LayoutPopup';

const DeeplinkGroupEdit: NextPage = (props: any) => {
    const router = useRouter();
    const [filter, setFilter] = useState<any>({});

    useEffect(() => {
        if (props) {
            s.setValues(props.response);
            getFilterContidion();
        }
    }, [props]);

    const getFilterContidion = async () => {
        try {
            const { data } = await api.post(`/be/admin/applink/deeplink/filter`);
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
            const { data } = await api.post(`/be/admin/applink/deeplink/group/edit`, s.values);
            if (data.code == 200) {
                if (s.values.mode == 'REG') {
                    alert(data.msg);
                    router.replace(`/ums/deeplink/group/edit?uid=${data.uid}`);
                } else {
                    alert(data.msg);
                    if (mode == 'MOD') {
                        router.replace(`/ums/deeplink/group/edit?uid=${data.uid}`);
                    } else if (mode == 'DEL') {
                        window.close();
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
                                <div className="text-2xl font-semibold">딥링크 그룹 {s.values.uid > 0 ? '수정' : '등록'}</div>
                            </div>
                            <div className="border py-4 px-6 rounded shadow-md bg-white mt-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="w-full">
                                        <label className="form-label">프로젝트</label>
                                        <select
                                            name="site_id"
                                            value={s.values.site_id || ''}
                                            {...attrs.is_mand}
                                            onChange={fn.handleChange}
                                            className={cls(s.errors['site_id'] ? 'border-danger' : '', 'form-select')}
                                        >
                                            {filter.site_id?.map((v, i) => (
                                                <option key={i} value={v.key}>
                                                    {v.text}
                                                </option>
                                            ))}
                                            {s.errors['site_id'] && <div className="form-error">{s.errors['site_id']}</div>}
                                        </select>
                                    </div>
                                    <div className="w-full">
                                        <label className="form-label">그룹명</label>
                                        <input
                                            type="text"
                                            name="title"
                                            {...attrs.is_mand}
                                            value={s.values.title || ''}
                                            placeholder=""
                                            onChange={fn.handleChange}
                                            className={cls(s.errors['title'] ? 'border-danger' : '', 'form-control')}
                                        />
                                        {s.errors['title'] && <div className="form-error">{s.errors['title']}</div>}
                                    </div>
                                    {/* end grid */}
                                </div>
                                {/* card_area */}
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
        const { data } = await api.post(`/be/admin/applink/deeplink/group/read`, request);
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

export default DeeplinkGroupEdit;
