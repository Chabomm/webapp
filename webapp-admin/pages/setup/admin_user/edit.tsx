import type { GetServerSideProps, NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { api, setContext } from '@/libs/axios';
import { useRouter } from 'next/router';
import { cls, checkNumeric } from '@/libs/utils';

import useForm from '@/components/form/useForm';
import LayoutPopup from '@/components/LayoutPopup';

const AdminUserEdit: NextPage = (props: any) => {
    const router = useRouter();
    const [filter, setFilter] = useState<any>({ roles: [] });

    useEffect(() => {
        if (props) {
            s.setValues(props.response);
            getFilterContidion();
        }
    }, [props]);

    const getFilterContidion = async () => {
        try {
            const { data } = await api.post(`/be/admin/admin_user_list/filter`);
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
            const { data } = await api.post(`/be/admin/admin_user_edit`, s.values);
            if (data.code == 200) {
                if (s.values.mode == 'REG') {
                    alert(data.msg);
                    router.replace(`/setup/admin_user/edit?uid=${s.values.uid}`);
                } else {
                    alert(data.msg);
                    if (mode == 'MOD') {
                        router.replace(`/setup/admin_user/edit?uid=${data.uid}`);
                    }
                }
            } else {
                alert(data.msg);
            }
        } catch (e: any) {}

        return;
    };

    const getLogList = (uid: any) => {
        window.open(`/setup/log/popup?table_name=MEMBER&uid=${uid}`, '로그정보', 'width=1120,height=800,location=no,status=no,scrollbars=yes,left=400%,top=50%');
    };
    return (
        <>
            <LayoutPopup title={''}>
                <div className="w-full bg-slate-100 mx-auto py-10">
                    <form onSubmit={fn.handleSubmit} noValidate>
                        <div className="px-9">
                            <div className="flex justify-between">
                                <div className="text-2xl font-semibold">어드민 유저 {s.values.uid > 0 ? '수정' : '등록'}</div>
                                <div className="" onClick={() => getLogList(s.values.uid)}>
                                    <button type="button" className="ml-3 px-5 bg-gray-500 rounded-md py-2 text-white text-center">
                                        로그 리스트
                                    </button>
                                </div>
                            </div>
                            <div className="border py-4 px-6 rounded shadow-md bg-white mt-5">
                                <div className="card_area">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-1">
                                            <label className="form-label">관리자</label>
                                            <input
                                                type="text"
                                                name="user_id"
                                                {...attrs.is_mand}
                                                value={s.values?.user_id || ''}
                                                placeholder=""
                                                onChange={fn.handleChange}
                                                readOnly={s.values.uid > 0 && true}
                                                className={cls(s.errors['user_id'] ? 'border-danger' : '', 'form-control')}
                                            />
                                        </div>

                                        {/* <div className="col-span-1">
                                            <label className="form-label">관리자 비밀번호</label>
                                            <input
                                                type="password"
                                                name="user_pw"
                                                placeholder=""
                                                onChange={fn.handleChange}
                                                className={cls(s.errors['user_pw'] ? 'border-danger' : '', 'form-control')}
                                            />
                                            {s.errors['user_pw'] && <div className="form-error">{s.errors['user_pw']}</div>}
                                        </div> */}
                                        <div className="col-span-1">
                                            <label className="form-label">관리자 이름</label>
                                            <input
                                                type="text"
                                                name="user_name"
                                                {...attrs.is_mand}
                                                value={s.values?.user_name || ''}
                                                placeholder=""
                                                onChange={fn.handleChange}
                                                readOnly={s.values.uid > 0 && true}
                                                className={cls(s.errors['user_name'] ? 'border-danger' : '', 'form-control')}
                                            />
                                            {s.errors['user_name'] && <div className="form-error">{s.errors['user_name']}</div>}
                                        </div>
                                        <div className="col-span-1">
                                            <label className="form-label">관리자 부서</label>
                                            <input
                                                type="text"
                                                name="depart"
                                                value={s.values?.depart || ''}
                                                placeholder=""
                                                onChange={fn.handleChange}
                                                readOnly={s.values.uid > 0 && true}
                                                className={cls(s.errors['depart'] ? 'border-danger' : '', 'form-control')}
                                            />
                                            {s.errors['depart'] && <div className="form-error">{s.errors['depart']}</div>}
                                        </div>
                                        <div className="col-span-1">
                                            <label className="form-label">이메일</label>
                                            <input
                                                type="text"
                                                name="email"
                                                {...attrs.is_email}
                                                value={s.values?.email || ''}
                                                placeholder=""
                                                onChange={fn.handleChange}
                                                className={cls(s.errors['email'] ? 'border-danger' : '', 'form-control')}
                                            />
                                            {s.errors['email'] && <div className="form-error">{s.errors['email']}</div>}
                                        </div>
                                        <div className="col-span-1">
                                            <label className="form-label">휴대전화</label>
                                            <input
                                                type="text"
                                                name="mobile"
                                                {...attrs.is_mobile}
                                                value={s.values?.mobile || ''}
                                                placeholder=""
                                                onChange={fn.handleChange}
                                                className={cls(s.errors['mobile'] ? 'border-danger' : '', 'form-control')}
                                            />
                                            {s.errors['mobile'] && <div className="form-error">{s.errors['mobile']}</div>}
                                        </div>
                                        <div className="col-span-1">
                                            <label className="form-label">내선번호</label>
                                            <input
                                                type="text"
                                                name="tel"
                                                {...attrs.is_tel}
                                                value={s.values?.tel || ''}
                                                placeholder=""
                                                onChange={fn.handleChange}
                                                className={cls(s.errors['tel'] ? 'border-danger' : '', 'form-control')}
                                            />
                                            {s.errors['tel'] && <div className="form-error">{s.errors['tel']}</div>}
                                        </div>
                                        <div className="col-span-2">
                                            <label className="form-label">역할</label>
                                            <div className="grid grid-cols-4 checkbox_filter !m-0 !p-0 !border-t-0">
                                                {filter?.roles?.map((v: any, i: number) => (
                                                    <div className="checkboxs_wrap" key={i} style={{ height: 'auto' }}>
                                                        <label>
                                                            <input
                                                                id={`roles-${i}`}
                                                                checked={s.values?.roles.filter(p => p == v.uid) == checkNumeric(v.uid) ? true : false}
                                                                onChange={fn.handleCheckboxGroupForInteger}
                                                                type="checkbox"
                                                                value={v.uid}
                                                                name="roles"
                                                            />
                                                            <span className="ml-3">
                                                                {v.name} ({v.menus.length})
                                                            </span>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
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
        const { data } = await api.post(`/be/admin/admin_user_read`, request);
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

export default AdminUserEdit;
