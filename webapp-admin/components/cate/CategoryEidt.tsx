import { api } from '@/libs/axios';
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { cls } from '@/libs/utils';
import useForm from '@/components/form/useForm';

const CategoryEdit = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        init,
    }));

    let item: any = {};
    function init(v: Object) {
        item = v;
        getDataRead();
        setOpen(true);
    }

    const [open, setOpen] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);

    const onToggle = () => {
        setShow(!open);
        setOpen(!open);
    };

    const getDataRead = async () => {
        try {
            const { data } = await api.post(`/be/admin/cate/read`, { table_name: item.table_name, table_uid: item.table_uid, cuid: item.cuid });
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
            if (mode == 'REG' && s.values.cuid > 0) {
                mode = 'MOD';
            }
            s.values.mode = mode;
            const { data } = await api.post(`/be/admin/cate/edit`, s.values);
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
                            <div className="">게시물 {item.cuid > 0 ? '수정' : '등록'}</div>
                            <i className="fas fa-times btn-close" onClick={onToggle}></i>
                        </div>

                        <div className="offcanvas-body">
                            <div className="grid grid-cols-2 gap-4 px-5 pt-5">
                                <div className="col-span-1">
                                    <label className="form-label">카테고리명</label>
                                    <input
                                        type="text"
                                        name="cate_name"
                                        {...attrs.is_mand}
                                        value={s.values?.cate_name || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['cate_name'] ? 'border-danger' : '', 'form-control')}
                                    />
                                    {s.errors['cate_name'] && <div className="form-error">{s.errors['cate_name']}</div>}
                                </div>
                                <div className="col-span-1">
                                    <label className="form-label">순서</label>
                                    <input
                                        type="text"
                                        name="cate_sort"
                                        value={s.values?.cate_sort || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['cate_sort'] ? 'border-danger' : '', 'form-control')}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="ml-1 font-bold text-xs text-slate-700">카테고리 아이콘</label>

                                    <input
                                        name="cate_icon-file"
                                        type="file"
                                        className={cls(s.errors['cate_icon'] ? 'border-danger' : '', 'form-control')}
                                        accept="image/*"
                                        onChange={e => {
                                            fn.handleImage(e, '/main/');
                                        }}
                                    />
                                    {s.values.cate_icon ? <img src={s.values.cate_icon} className="my-3" alt="cate_icon" /> : ''}
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

CategoryEdit.displayName = 'CategoryEdit';
export default CategoryEdit;
