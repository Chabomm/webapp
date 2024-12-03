import { api } from '@/libs/axios';
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { cls } from '@/libs/utils';
import useForm from '@/components/form/useForm';

const BannerEdit = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        init,
    }));

    let item: any = {};
    let main: any = {};
    const [filter, setFilter] = useState<any>({});
    function init(v: any, m: any) {
        item = v;
        main = m;
        setFilter(item);
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
            const { data } = await api.post(`/be/admin/main/banner/read`, { uid: item.uid });
            data.main_uid = main.uid;
            data.site_id = main.site_id;
            data.area = main.area;
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
            const { data } = await api.post(`/be/admin/main/banner/edit`, s.values);
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
                            <div className="grid grid-cols-2 gap-4 px-5 pt-5">
                                <div className="col-span-1">
                                    <label className="form-label">등록일</label>
                                    <input
                                        readOnly
                                        type="text"
                                        name="create_at"
                                        value={s.values?.create_at || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['create_at'] ? 'border-danger' : '', 'form-control')}
                                    />
                                </div>

                                <div className="col-span-1">
                                    <div className="form-label">수정일</div>
                                    <input
                                        readOnly
                                        type="text"
                                        name="update_at"
                                        value={s.values?.update_at || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['update_at'] ? 'border-danger' : '', 'form-control')}
                                    />
                                </div>

                                <div className="col-span-1">
                                    <label className="form-label">카테고리</label>
                                    <select
                                        name="cate_uid"
                                        value={s.values?.cate_uid || ''}
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['site_id'] ? 'border-danger' : '', 'form-select')}
                                    >
                                        <option value="">없음</option>
                                        {filter.cate_list?.map((v, i) => (
                                            <option key={i} value={v.uid}>
                                                {v.cate_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-span-1">
                                    <label className="form-label">플랫폼</label>
                                    <select
                                        name="area_class"
                                        value={s.values?.area_class || ''}
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['area_class'] ? 'border-danger' : '', 'form-select')}
                                    >
                                        <option value="A">웹&모바일</option>
                                        <option value="W">웹(PC)</option>
                                        <option value="M">모바일</option>
                                    </select>
                                </div>
                                <div className="col-span-1">
                                    <label className="form-label">배너명</label>
                                    <input
                                        type="text"
                                        name="banner_name"
                                        {...attrs.is_mand}
                                        value={s.values?.banner_name || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['banner_name'] ? 'border-danger' : '', 'form-control')}
                                    />
                                    {s.errors['banner_name'] && <div className="form-error">{s.errors['banner_name']}</div>}
                                </div>
                                <div className="col-span-1">
                                    <label className="form-label">링크타입</label>
                                    <select
                                        name="link_type"
                                        value={s.values?.link_type || ''}
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['link_type'] ? 'border-danger' : '', 'form-select')}
                                    >
                                        <option value="inside">내부 url /로시작하는</option>
                                        <option value="outside">외부 url http로 시작하는</option>
                                        <option value="none">링크없음</option>
                                    </select>
                                </div>
                                <div className="col-span-1">
                                    <label className="form-label">링크</label>
                                    <input
                                        type="text"
                                        name="link"
                                        value={s.values?.link || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['link'] ? 'border-danger' : '', 'form-control')}
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="ml-1 font-bold text-xs text-slate-700">배너이미지</label>

                                    <input
                                        name="banner_src-file"
                                        type="file"
                                        className={cls(s.errors['banner_src'] ? 'border-danger' : '', 'form-control')}
                                        accept="image/*"
                                        onChange={e => {
                                            fn.handleImage(e, '/main/');
                                        }}
                                    />

                                    {s.values.banner_src ? <img src={s.values.banner_src} className="my-3" alt="banner_src" /> : ''}
                                </div>
                                <div className="col-span-1">
                                    <label className="form-label">노출여부</label>
                                    <select
                                        name="is_display"
                                        {...attrs.is_mand}
                                        value={s.values?.is_display || ''}
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['is_display'] ? 'border-danger' : '', 'form-select')}
                                    >
                                        <option value="T">진열</option>
                                        <option value="F">미진열</option>
                                    </select>
                                    {s.errors['is_display'] && <div className="form-error">{s.errors['is_display']}</div>}
                                </div>

                                <div className="col-span-1">
                                    <label className="form-label">텍스트1</label>
                                    <input
                                        type="text"
                                        name="txt1"
                                        value={s.values?.txt1 || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['txt1'] ? 'border-danger' : '', 'form-control')}
                                    />
                                </div>

                                <div className="col-span-1">
                                    <label className="form-label">텍스트2</label>
                                    <input
                                        type="text"
                                        name="txt2"
                                        value={s.values?.txt2 || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['txt2'] ? 'border-danger' : '', 'form-control')}
                                    />
                                </div>

                                <div className="col-span-1">
                                    <label className="form-label">텍스트3</label>
                                    <input
                                        type="text"
                                        name="txt3"
                                        value={s.values?.txt3 || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['txt3'] ? 'border-danger' : '', 'form-control')}
                                    />
                                </div>

                                <div className="col-span-1">
                                    <label className="form-label">텍스트4</label>
                                    <input
                                        type="text"
                                        name="txt4"
                                        value={s.values?.txt4 || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['txt4'] ? 'border-danger' : '', 'form-control')}
                                    />
                                </div>

                                <div className="col-span-1">
                                    <label className="form-label">텍스트5</label>
                                    <input
                                        type="text"
                                        name="txt5"
                                        value={s.values?.txt5 || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['txt5'] ? 'border-danger' : '', 'form-control')}
                                    />
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

BannerEdit.displayName = 'BannerEdit';
export default BannerEdit;
