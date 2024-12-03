import { api } from '@/libs/axios';
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { cls, checkNumeric } from '@/libs/utils';
import useForm from '@/components/form/useForm';

const DeepLinkEdit = forwardRef((props, ref) => {
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
            const { data } = await api.post(`/be/admin/applink/deeplink/read`, { uid: item.uid });
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
            const params = { ...s.values };

            if (mode == 'REG' && params.uid > 0) {
                mode = 'MOD';
            }
            params.mode = mode;
            params.app_link = 'incheonercard://applink?12_' + params.mall_link;
            params.group_id = checkNumeric(params.group_id);
            const { data } = await api.post(`/be/admin/applink/deeplink/edit`, params);
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
                            <div className="">딥링크 {item.uid > 0 ? '수정' : '등록'}</div>
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
                                    <label className="form-label">그룹</label>
                                    <select
                                        name="group_id"
                                        value={s.values?.group_id || ''}
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['group_list'] ? 'border-danger' : '', 'form-select')}
                                    >
                                        <option value="">선택해주세요</option>
                                        {filter.group_list?.map((v, i) => (
                                            <option key={i} value={v.key}>
                                                {v.value}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="w-full">
                                    <label className="form-label">타입</label>
                                    <select
                                        name="dlink_type"
                                        value={s.values?.dlink_type || ''}
                                        {...attrs.is_mand}
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['dlink_type'] ? 'border-danger' : '', 'form-select')}
                                    >
                                        <option value="">선택해주세요</option>
                                        {filter.dlink_type?.map((v, i) => (
                                            <option key={i} value={v.key}>
                                                {v.text}
                                            </option>
                                        ))}
                                        {s.errors['dlink_type'] && <div className="form-error">{s.errors['dlink_type']}</div>}
                                    </select>
                                </div>
                                <div className="w-full">
                                    <label className="form-label">타입uid</label>
                                    <input
                                        type="text"
                                        name="dlink_uid"
                                        {...attrs.is_mand}
                                        value={s.values?.dlink_uid || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['dlink_uid'] ? 'border-danger' : '', 'form-control')}
                                    />
                                    {s.errors['dlink_uid'] && <div className="form-error">{s.errors['dlink_uid']}</div>}
                                </div>
                                <div className="col-span-2">
                                    <label className="form-label">mall링크</label>
                                    <input
                                        type="text"
                                        name="mall_link"
                                        {...attrs.is_mand}
                                        value={s.values?.mall_link || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['mall_link'] ? 'border-danger' : '', 'form-control')}
                                    />
                                    {s.errors['mall_link'] && <div className="form-error">{s.errors['mall_link']}</div>}
                                </div>
                                <div className="col-span-2">
                                    <label className="form-label">app링크</label>
                                    <input
                                        readOnly
                                        type="text"
                                        value={s.values?.app_link || ''}
                                        placeholder=""
                                        className={cls(s.errors['app_link'] ? 'border-danger' : '', 'form-control')}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="form-label">배너</label>
                                    <input
                                        name="banner-file"
                                        type="file"
                                        className={cls(s.errors['banner'] ? 'border-danger' : '', 'form-control')}
                                        accept="image/*"
                                        onChange={e => {
                                            fn.handleImage(e, '/ums/deeplink/');
                                        }}
                                    />
                                    {s.values.banner ? <img src={s.values.banner} className="my-3" alt="img" /> : ''}
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

DeepLinkEdit.displayName = 'DeepLinkEdit';
export default DeepLinkEdit;
