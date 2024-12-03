import { api } from '@/libs/axios';
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { checkNumeric, cls } from '@/libs/utils';
import useForm from '@/components/form/useForm';

const AdminUserEdit = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        init,
    }));

    let item: any = {};
    const [filter, setFilter] = useState<any>({ roles: [] });
    function init(v: any, f: any) {
        item = v;
        setFilter(f);
        getDataRead(f);
        setOpen(true);
    }
    const [open, setOpen] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);

    const onToggle = () => {
        setShow(!open);
        setOpen(!open);
    };

    const getDataRead = async f => {
        try {
            const { data } = await api.post(`/be/admin/admin_user_read`, { uid: item.uid });
            s.setValues(data);
        } catch (e: any) {}
    };

    const { s, fn, attrs } = useForm({
        initialValues: {
            roles: [],
        },
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
                alert(data.msg);
            } else {
                alert(data.msg);
            }
        } catch (e: any) {}
    };

    return (
        <>
            {open && (
                <>
                    <form onSubmit={fn.handleSubmit} noValidate className={cls('offcanvas', show ? 'show' : '')}>
                        <div className="offcanvas-header">
                            <div className="">어드민 유저 {item.uid > 0 ? '수정' : '등록'}</div>
                            <i className="fas fa-times btn-close" onClick={onToggle}></i>
                        </div>

                        <div className="offcanvas-body">
                            <div className="grid grid-cols-2 gap-4 px-5 pt-5">
                                <div className="col-span-1">
                                    <label className="form-label">관리자 아이디</label>
                                    <input
                                        type="text"
                                        name="user_id"
                                        {...attrs.is_mand}
                                        value={s.values?.user_id || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['user_id'] ? 'border-danger' : '', 'form-control')}
                                    />
                                    {s.errors['user_id'] && <div className="form-error">{s.errors['user_id']}</div>}
                                </div>
                                <div className="col-span-1">
                                    <label className="form-label">관리자 비밀번호</label>
                                    <input
                                        type="password"
                                        name="user_pw"
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['user_pw'] ? 'border-danger' : '', 'form-control')}
                                    />
                                    {s.errors['user_pw'] && <div className="form-error">{s.errors['user_pw']}</div>}
                                </div>
                                <div className="col-span-1">
                                    <label className="form-label">관리자 이름</label>
                                    <input
                                        type="text"
                                        name="user_name"
                                        {...attrs.is_mand}
                                        value={s.values?.user_name || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
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
                                    <label className="form-label">구분</label>
                                    <input
                                        type="text"
                                        name="role"
                                        value={s.values?.role || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['role'] ? 'border-danger' : '', 'form-control')}
                                    />
                                    {s.errors['role'] && <div className="form-error">{s.errors['role']}</div>}
                                </div>
                                <div className="col-span-1">
                                    <label className="form-label">역할</label>
                                    <div className="grid grid-cols-2 checkbox_filter !m-0 !p-0 !border-t-0">
                                        {filter?.roles.map((v: any, i: number) => (
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
                        </div>

                        <div className="offcanvas-footer grid grid-cols-3 gap-4">
                            <button className="btn-del" type="button" onClick={deleting}>
                                삭제
                            </button>
                            <button className="btn-save col-span-2 hover:bg-blue-600" disabled={s.submitting}>
                                저장
                            </button>
                        </div>
                    </form>
                    <div className="offcanvas-backdrop fade" onClick={onToggle}></div>
                </>
            )}
        </>
    );
});

AdminUserEdit.displayName = 'AdminUserEdit';
export default AdminUserEdit;
