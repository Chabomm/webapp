import { api } from '@/libs/axios';
import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { cls } from '@/libs/utils';
import useForm from '@/components/form/useForm';

import dynamic from 'next/dynamic';
const ToastEditor = dynamic(() => import('@/components/editor/ToastEditor'), { ssr: false });

const UmsEdit = forwardRef((props, ref) => {
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
            const { data } = await api.post(`/be/admin/ums/template/read`, { uid: item.uid });
            s.setValues(data);
            setShow(true);
        } catch (e: any) {}
    };

    const contentRef = useRef(null);
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
            const { data } = await api.post(`/be/admin/ums/template/edit`, s.values);
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
                            <div className="">게시물 {item.uid > 0 ? '수정' : '등록'}</div>
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
                                <div className="w-full col-span-2">
                                    <label className="form-label">관리자메모</label>
                                    <textarea
                                        name="memo"
                                        rows={3}
                                        value={s.values?.memo || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['memo'] ? 'border-danger' : '', 'form-control')}
                                    />
                                </div>
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
                                    <label className="form-label">분류</label>
                                    <select
                                        name="ums_type"
                                        value={s.values?.ums_type || ''}
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['ums_type'] ? 'border-danger' : '', 'form-select')}
                                    >
                                        <option value="">선택해주세요</option>
                                        {filter.ums_type?.map((v, i) => (
                                            <option key={i} value={v.key}>
                                                {v.text}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="w-full">
                                    <label className="form-label">템플릿코드</label>
                                    <input
                                        type="text"
                                        name="template_code"
                                        value={s.values?.template_code || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['template_code'] ? 'border-danger' : '', 'form-control')}
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="form-label">플랫폼</label>
                                    <div className="flex items-center gap-4 h-10">
                                        <select
                                            name="platform"
                                            value={s.values?.platform || ''}
                                            onChange={fn.handleChange}
                                            className={cls(s.errors['platform'] ? 'border-danger' : '', 'form-select')}
                                        >
                                            <option value="">선택해주세요</option>
                                            {filter.platform?.map((v, i) => (
                                                <option key={i} value={v.key}>
                                                    {v.text}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="w-full col-span-1">
                                    <label className="form-label">프로필</label>
                                    <select
                                        name="profile"
                                        value={s.values?.profile || ''}
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['profile'] ? 'border-danger' : '', 'form-select')}
                                    >
                                        <option value="">선택해주세요</option>
                                        {filter.profile?.map((v, i) => (
                                            <option key={i} value={v.key}>
                                                {v.text}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="w-full col-span-2">
                                    <label className="form-label">제목</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        {...attrs.is_mand}
                                        value={s.values?.subject || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['subject'] ? 'border-danger' : '', 'form-control')}
                                    />
                                    {s.errors['subject'] && <div className="form-error">{s.errors['subject']}</div>}
                                </div>
                                <div className="w-full col-span-2">
                                    <label className="form-label">내용</label>
                                    {s.values.ums_type == 'email' ? (
                                        <ToastEditor
                                            name="content"
                                            ref={contentRef}
                                            forwardedRef={contentRef}
                                            initialValue={s.values?.content || ''}
                                            onChange={() => {
                                                fn.handleChangeEditor(contentRef);
                                            }}
                                            hooks={{ addImageBlobHook: fn.handleUploadImageEditor }}
                                        />
                                    ) : (
                                        <textarea
                                            name="content"
                                            rows={10}
                                            {...attrs.is_mand}
                                            value={s.values?.content || ''}
                                            placeholder=""
                                            onChange={fn.handleChange}
                                            className={cls(s.errors['content'] ? 'border-danger' : '', 'form-control')}
                                        />
                                    )}

                                    {s.errors['content'] && <div className="form-error">{s.errors['content']}</div>}
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

UmsEdit.displayName = 'UmsEdit';
export default UmsEdit;
