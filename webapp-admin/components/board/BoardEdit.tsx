import { api } from '@/libs/axios';
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { cls } from '@/libs/utils';
import useForm from '@/components/form/useForm';

const BoardEdit = forwardRef((props, ref) => {
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
            const { data } = await api.post(`/be/admin/board/read`, { uid: item.uid });
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
            const { data } = await api.post(`/be/admin/board/edit`, s.values);
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
                            <div className="">게시판 {item.uid > 0 ? '수정' : '등록'}</div>
                            <i className="fas fa-times btn-close" onClick={onToggle}></i>
                        </div>

                        <div className="offcanvas-body">
                            <div className="grid grid-cols-2 gap-4 px-5 pt-5">
                                <div className="w-full col-span-2">
                                    <label className="form-label">프로젝트</label>
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

                                <div className="col-span-1">
                                    <label className="form-label">게시판 유형</label>
                                    <input
                                        type="text"
                                        name="board_type"
                                        {...attrs.is_mand}
                                        value={s.values?.board_type || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['board_type'] ? 'border-danger' : '', 'form-control')}
                                    />
                                    {s.errors['board_type'] && <div className="form-error">{s.errors['board_type']}</div>}
                                </div>

                                <div className="col-span-1">
                                    <label className="form-label">게시판 이름</label>
                                    <input
                                        type="text"
                                        name="board_name"
                                        {...attrs.is_mand}
                                        value={s.values?.board_name || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['board_name'] ? 'border-danger' : '', 'form-control')}
                                    />
                                    {s.errors['board_name'] && <div className="form-error">{s.errors['board_name']}</div>}
                                </div>

                                <div className="col-span-2">
                                    <label className="form-label">프론트 URL</label>
                                    <input
                                        type="text"
                                        name="front_url"
                                        value={s.values?.front_url || ''}
                                        placeholder="도메인을 제외한 / 부터 입력해주세요"
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['front_url'] ? 'border-danger' : '', 'form-control')}
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
                                    <label className="form-label">읽기권한</label>
                                    <input
                                        type="text"
                                        name="per_read"
                                        value={s.values?.per_read || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['per_read'] ? 'border-danger' : '', 'form-control')}
                                    />
                                </div>

                                <div className="col-span-1">
                                    <label className="form-label">댓글여부</label>
                                    <select
                                        name="is_comment"
                                        value={s.values?.is_comment || ''}
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['is_comment'] ? 'border-danger' : '', 'form-select')}
                                    >
                                        <option value="F">미사용</option>
                                        <option value="T">사용</option>
                                    </select>
                                </div>

                                <div className="col-span-1">
                                    <label className="form-label">진열여부</label>
                                    <select
                                        name="is_display"
                                        value={s.values?.is_display || ''}
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['is_display'] ? 'border-danger' : '', 'form-select')}
                                    >
                                        <option value="T">진열</option>
                                        <option value="F">미진열</option>
                                    </select>
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

BoardEdit.displayName = 'BoardEdit';
export default BoardEdit;
