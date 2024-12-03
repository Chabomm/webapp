import { api } from '@/libs/axios';
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { checkNumeric, cls } from '@/libs/utils';
import useForm from '@/components/form/useForm';

const AdminRolesEdit = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        init,
    }));

    let item: any = {};
    const [filter, setFilter] = useState<any>({ menus: [] });
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
            const { data } = await api.post(`/be/admin/setup/roles/read`, { uid: item.uid });
            s.setValues(data);
            setShow(true);
        } catch (e: any) {}
    };

    const { s, fn, attrs } = useForm({
        initialValues: {
            menus: [],
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
            const { data } = await api.post(`/be/admin/setup/roles/edit`, s.values);
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
                                <div className="col-span-2">
                                    <label className="form-label">역할명</label>
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
                                    <label className="form-label">메뉴 권한 설정</label>
                                    <div className="grid grid-cols-2 checkbox_filter !m-0 !p-0 !border-t-0">
                                        {filter?.menus.map((v: any, i: number) => (
                                            <div className="checkboxs_wrap" key={i} style={{ height: 'auto' }}>
                                                <label>
                                                    <input
                                                        id={`menus-${i}`}
                                                        checked={s.values?.menus.filter(p => p == v.uid) == checkNumeric(v.uid) ? true : false}
                                                        onChange={fn.handleCheckboxGroupForInteger}
                                                        type="checkbox"
                                                        value={v.uid}
                                                        name="menus"
                                                    />
                                                    <span className="ml-3">
                                                        {v.name} ({v.uid})
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

AdminRolesEdit.displayName = 'AdminRolesEdit';
export default AdminRolesEdit;
