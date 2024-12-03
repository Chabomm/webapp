import { api } from '@/libs/axios';
import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { cls } from '@/libs/utils';
import useForm from '@/components/form/useForm';

const AdminMenuEdit = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        init,
    }));

    const [item, setItem] = useState<any>({});
    function init(v: any) {
        if (JSON.stringify(item) !== '{}' && item === v) {
            getDataRead(item.uid);
            setOpen(true);
        } else {
            setItem(v);
            setOpen(true);
        }
    }

    const [open, setOpen] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const [posts, setPosts] = useState<any>([]);

    const onToggle = () => {
        setShow(!open);
        setOpen(!open);
    };

    useEffect(() => {
        if (JSON.stringify(item) !== '{}') {
            getDataRead(item.uid);
        }
    }, [item]);

    const getDataRead = async (uid: number) => {
        try {
            const { data } = await api.post(`/be/admin/setup/menus/read`, { uid: uid });
            if (item.depth == 2) {
                data.depth = item.depth;
                data.parent = item.parent;
            }
            s.setValues(data);
            setShow(true);
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
            const params = { ...s.values };
            if (mode == 'REG' && params.uid > 0) {
                mode = 'MOD';
            }
            params.mode = mode;
            const { data } = await api.post(`/be/admin/setup/menus/edit`, params);
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
                            <div className="">메뉴 {item.uid > 0 ? '수정' : '등록'}</div>
                            <i className="fas fa-times btn-close" onClick={onToggle}></i>
                        </div>

                        <div className="offcanvas-body">
                            <div className="">
                                <div className="grid grid-cols-2 gap-4 px-5 pt-5">
                                    <div className="col-span-1">
                                        <label className="form-label">메뉴명</label>
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
                                    <div className="col-span-1">
                                        <label className="form-label">메뉴아이콘</label>
                                        <input
                                            type="text"
                                            name="icon"
                                            value={s.values?.icon || ''}
                                            placeholder=""
                                            onChange={fn.handleChange}
                                            className={cls(s.errors['icon'] ? 'border-danger' : '', 'form-control')}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="form-label">링크</label>
                                        <input
                                            type="text"
                                            name="to"
                                            value={s.values?.to || ''}
                                            placeholder=""
                                            onChange={fn.handleChange}
                                            className={cls(s.errors['to'] ? 'border-danger' : '', 'form-control')}
                                        />
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

AdminMenuEdit.displayName = 'AdminMenuEdit';
export default AdminMenuEdit;
