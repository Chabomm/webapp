import { api } from '@/libs/axios';
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { cls } from '@/libs/utils';
import useForm from '@/components/form/useForm';

const DeepLinkGroupEdit = forwardRef((props, ref) => {
    const [open, setOpen] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);

    const onToggle = () => {
        setShow(!open);
        setOpen(!open);
    };

    useImperativeHandle(ref, () => ({
        init,
    }));

    let item: any = {};
    const [filter, setFilter] = useState<any>({});
    function init(v: any, f: any) {
        item = v;
        setFilter(f);
        getDataRead();
        setOpen(true);
    }

    const getDataRead = async () => {
        try {
            const { data } = await api.post(`/be/admin/applink/deeplink/group/read`, { uid: item.uid });
            s.setValues(data);
            setShow(true);
        } catch (e: any) {}
    };

    const { s, fn, attrs } = useForm({
        initialValues: {
            platform: '',
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
            const { data } = await api.post(`/be/admin/applink/deeplink/group/edit`, s.values);
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
                            <div className="">딥링크 그룹 {item.uid > 0 ? '수정' : '등록'}</div>
                            <i className="fas fa-times btn-close" onClick={onToggle}></i>
                        </div>

                        <div className="offcanvas-body">
                            {process.env.NODE_ENV == 'development' && (
                                <pre className="">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="font-bold mb-3 text-red-500">filter</div>
                                            {JSON.stringify(filter, null, 4)}
                                        </div>
                                        <div>
                                            <div className="font-bold mb-3 text-red-500">s.values</div>
                                            {JSON.stringify(s.values, null, 4)}
                                        </div>
                                    </div>
                                </pre>
                            )}
                            <div className="grid grid-cols-2 gap-4 px-5 pt-5">
                                <div className="w-full">
                                    <label className="form-label">등록일</label>
                                    <input
                                        readOnly
                                        type="text"
                                        value={s.values?.create_at || ''}
                                        placeholder=""
                                        className={cls(s.errors['create_at'] ? 'border-danger' : '', 'form-control')}
                                    />
                                </div>
                                <div className="w-full">
                                    <div className="form-label">수정일</div>
                                    <input
                                        readOnly
                                        type="text"
                                        value={s.values?.update_at || ''}
                                        placeholder=""
                                        className={cls(s.errors['update_at'] ? 'border-danger' : '', 'form-control')}
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="form-label">프로젝트</label>
                                    <select
                                        name="site_id"
                                        value={s.values?.site_id || ''}
                                        {...attrs.is_mand}
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['site_id'] ? 'border-danger' : '', 'form-select')}
                                    >
                                        <option value="">선택해주세요</option>
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
                                        value={s.values?.title || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['title'] ? 'border-danger' : '', 'form-control')}
                                    />
                                    {s.errors['title'] && <div className="form-error">{s.errors['title']}</div>}
                                </div>
                            </div>
                        </div>

                        <div className="offcanvas-footer grid grid-cols-3 gap-4">
                            <button className="btn-del hidden" type="button" onClick={deleting}>
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

DeepLinkGroupEdit.displayName = 'DeepLinkGroupEdit';
export default DeepLinkGroupEdit;
