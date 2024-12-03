import { api } from '@/libs/axios';
import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { cls } from '@/libs/utils';
import useForm from '@/components/form/useForm';

const MainEdit = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        init,
    }));

    let item: any = {};
    function init(v: any) {
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
            const { data } = await api.post(`/be/admin/main/read`, { uid: item.uid });
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
            if (mode == 'REG' && s.values.uid > 0) {
                mode = 'MOD';
            }
            s.values.mode = mode;
            const { data } = await api.post(`/be/admin/main/edit`, s.values);
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
                            <div className="">메인영역 {item.uid > 0 ? '수정' : '등록'}</div>
                            <i className="fas fa-times btn-close" onClick={onToggle}></i>
                        </div>

                        <div className="offcanvas-body">
                            <div className="grid grid-cols-2 gap-4 px-5 pt-5">
                                <div className="col-span-2">
                                    <label className="form-label">프로젝트ID</label>
                                    <input
                                        type="text"
                                        name="site_id"
                                        {...attrs.is_mand}
                                        value={s.values?.site_id || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['site_id'] ? 'border-danger' : '', 'form-control')}
                                    />
                                    {s.errors['site_id'] && <div className="form-error">{s.errors['site_id']}</div>}
                                </div>
                                <div className="col-span-2">
                                    <label className="ml-1 font-bold text-xs text-slate-700">영역썸네일</label>
                                    <input
                                        name="area_thumb-file"
                                        type="file"
                                        className={cls(s.errors['area_thumb'] ? 'border-danger' : '', 'form-control')}
                                        accept="image/*"
                                        onChange={e => {
                                            fn.handleImage(e, '/main/');
                                        }}
                                    />
                                    {s.values.area_thumb ? <img src={s.values.area_thumb} className="my-3" alt="area_thumb" /> : ''}
                                </div>
                                <div className="col-span-1">
                                    <label className="form-label">영역명</label>
                                    <input
                                        type="text"
                                        name="area_name"
                                        {...attrs.is_mand}
                                        value={s.values?.area_name || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['area_name'] ? 'border-danger' : '', 'form-control')}
                                    />
                                    {s.errors['area_name'] && <div className="form-error">{s.errors['area_name']}</div>}
                                </div>
                                <div className="col-span-1">
                                    <label className="form-label">영역코드</label>
                                    <input
                                        type="text"
                                        name="area"
                                        value={s.values?.area || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['area'] ? 'border-danger' : '', 'form-control')}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="form-label">영역플랫폼</label>
                                    <input
                                        type="text"
                                        name="area_class"
                                        value={s.values?.area_class || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['area_class'] ? 'border-danger' : '', 'form-control')}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="form-label">영역순서</label>
                                    <input
                                        type="text"
                                        name="area_sort"
                                        value={s.values?.area_sort || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['area_sort'] ? 'border-danger' : '', 'form-control')}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="form-label">진열여부</label>
                                    <input
                                        type="text"
                                        name="is_display"
                                        value={s.values?.is_display || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['is_display'] ? 'border-danger' : '', 'form-control')}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="form-label">쓰기권한</label>
                                    <input
                                        type="text"
                                        name="per_write"
                                        value={s.values?.per_write || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['per_write'] ? 'border-danger' : '', 'form-control')}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="form-label">노출타입</label>
                                    <input
                                        type="text"
                                        name="display_type"
                                        {...attrs.is_mand}
                                        value={s.values?.display_type || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['display_type'] ? 'border-danger' : '', 'form-control')}
                                    />
                                    {s.errors['display_type'] && <div className="form-error">{s.errors['display_type']}</div>}
                                </div>
                                <div className="col-span-1">
                                    <label className="form-label">컨텐츠 번호</label>
                                    <input
                                        type="text"
                                        name="cont_uid"
                                        value={s.values?.cont_uid || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['cont_uid'] ? 'border-danger' : '', 'form-control')}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="form-label">컨텐츠타입</label>
                                    <input
                                        type="text"
                                        name="cont_type"
                                        {...attrs.is_mand}
                                        value={s.values?.cont_type || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['cont_type'] ? 'border-danger' : '', 'form-control')}
                                    />
                                    {s.errors['cont_type'] && <div className="form-error">{s.errors['cont_type']}</div>}
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

MainEdit.displayName = 'MainEdit';
export default MainEdit;
