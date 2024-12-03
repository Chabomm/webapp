import { api } from '@/libs/axios';
import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { cls } from '@/libs/utils';
import useForm from '@/components/form/useForm';

import dynamic from 'next/dynamic';
const ToastEditor = dynamic(() => import('@/components/editor/ToastEditor'), { ssr: false });

interface Iprops {
    searching: () => void;
}

const BoardPostsEdit = forwardRef(({ searching }: Iprops, ref) => {
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

    const [open, setOpen] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);

    const onToggle = () => {
        setShow(!open);
        setOpen(!open);
    };

    const getDataRead = async () => {
        try {
            const { data } = await api.post(`/be/admin/posts/read`, { uid: item.uid });
            s.setValues(data);
            setShow(true);
            const editor_instance = contentRef.current;
            if (typeof editor_instance === 'undefined') {
                contentRef.current.getInstance()?.setHTML(data.contents);
            }
        } catch (e: any) {}
    };

    const contentRef = useRef<any>();
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
            const { data } = await api.post(`/be/admin/posts/edit`, s.values);
            if (data.code == 200) {
                alert(data.msg);
                searching();
            } else {
                alert(data.msg);
            }
        } catch (e: any) {}
    };

    const [EditorOpen, setEditorOpen] = useState<boolean>(false);
    const openToastEditor = () => {
        const editor_instance = contentRef.current;
        if (typeof editor_instance.retry === 'undefined') {
            contentRef.current.getInstance()?.setHTML(s.values.contents);
            setEditorOpen(false);
        }
        setEditorOpen(true);
    };
    const saveToastEditor = () => {
        const editor_instance = contentRef.current;
        if (typeof editor_instance.retry === 'undefined') {
            s.setValues({ ...s.values, contents: contentRef.current.getInstance()?.getHTML() });
            setEditorOpen(false);
        }
    };

    return (
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
                            <label className="form-label">제목</label>
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

                        <div className="col-span-1">
                            <label className="form-label">프로젝트</label>
                            <select
                                name="site_id"
                                value={s.values?.site_id || ''}
                                onChange={fn.handleChange}
                                className={cls(s.errors['site_id'] ? 'border-danger' : '', 'form-select')}
                            >
                                {filter.site_id?.map((v, i) => (
                                    <option key={i} value={v.key}>
                                        {v.value}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-span-1">
                            <label className="form-label">게시판</label>
                            <select
                                name="board_uid"
                                value={s.values?.board_uid || ''}
                                onChange={fn.handleChange}
                                className={cls(s.errors['board_uid'] ? 'border-danger' : '', 'form-select')}
                            >
                                <option value="">전체</option>
                                {filter.board_uid?.map((v, i) => (
                                    <option key={i} value={v.key}>
                                        {v.value}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-span-1">
                            <label className="form-label">카테고리</label>
                            <select
                                name="cate_uid"
                                value={s.values?.cate_uid || ''}
                                onChange={fn.handleChange}
                                className={cls(s.errors['cate_uid'] ? 'border-danger' : '', 'form-select')}
                            >
                                <option value="">없음</option>
                                {filter.cate_uid?.map((v, i) => (
                                    <option key={i} value={v.key}>
                                        {v.value}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-span-1">
                            <label className="form-label">등록일</label>
                            <input
                                type="text"
                                name="create_at"
                                value={s.values?.create_at || ''}
                                placeholder=""
                                onChange={fn.handleChange}
                                className={cls(s.errors['create_at'] ? 'border-danger' : '', 'form-control')}
                                disabled={s.values.uid == 0 ? true : false}
                            />
                        </div>

                        <div className="w-full col-span-2">
                            <label className="form-label">태그</label>
                            <input
                                type="text"
                                name="tags"
                                value={s.values?.tags || ''}
                                placeholder=""
                                onChange={fn.handleChange}
                                className={cls(s.errors['tags'] ? 'border-danger' : '', 'form-control')}
                            />
                        </div>

                        <div className="w-full col-span-2">
                            <label className="form-label">영역썸네일</label>
                            <input
                                name="thumb-file"
                                type="file"
                                className={cls(s.errors['thumb'] ? 'border-danger' : '', 'form-control')}
                                accept="image/*"
                                onChange={e => {
                                    fn.handleImage(e, '/board/thumb/');
                                }}
                            />
                            {s.values.thumb ? <img src={s.values.thumb} className="my-3" alt="area_thumb" /> : ''}
                        </div>

                        <div className="w-full col-span-2">
                            <label className="form-label">
                                내용
                                <button
                                    type="button"
                                    className="text-blue-500 underline ms-3"
                                    onClick={() => {
                                        openToastEditor();
                                    }}
                                >
                                    수정 {'>'}
                                </button>
                            </label>
                            <div className="border border-t-2 p-3 relative">
                                <div
                                    onClick={() => {
                                        openToastEditor();
                                    }}
                                    className="absolute top-3 right-3 border cursor-pointer bg-amber-50 p-2 rounded hover:bg-amber-200"
                                >
                                    <i className="far fa-edit"></i>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: s.values.contents }}></div>
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

            <div className={cls(EditorOpen ? '' : 'hidden', 'editor_wrap')}>
                <div className="h-16">
                    <div className="offcanvas-footer grid grid-cols-3 gap-4">
                        <button
                            className="btn-del"
                            type="button"
                            onClick={() => {
                                setEditorOpen(false);
                            }}
                        >
                            {'<'} 뒤로가기
                        </button>
                        <button className="btn-save col-span-2 hover:bg-blue-600" onClick={saveToastEditor}>
                            저장하기
                        </button>
                    </div>
                </div>
                <ToastEditor ref={contentRef} forwardedRef={contentRef} hooks={{ addImageBlobHook: fn.handleUploadImageEditor }} />
            </div>
            <div className={cls('offcanvas-backdrop fade', show ? '' : 'hidden')} onClick={onToggle}></div>
        </>
    );
});

BoardPostsEdit.displayName = 'BoardPostsEdit';
export default BoardPostsEdit;
