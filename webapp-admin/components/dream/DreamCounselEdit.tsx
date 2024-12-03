import { api } from '@/libs/axios';
import Datepicker from 'react-tailwindcss-datepicker';
import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { cls } from '@/libs/utils';
import useForm from '@/components/form/useForm';

const DreamCounselEdit = forwardRef((props, ref) => {
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
            const { data } = await api.post(`/be/admin/dream/counsel/read`, { uid: item.uid });
            s.setValues(data);
            setShow(true);
        } catch (e: any) {}
    };

    const { s, fn, attrs } = useForm({
        initialValues: {},
        onSubmit: async () => {
            await editing('MOD');
        },
    });

    const deleting = () => editing('DEL');

    const editing = async mode => {
        try {
            const params = { ...s.values };
            params.mode = mode;
            const { data } = await api.post(`/be/admin/dream/counsel/edit`, params);
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
                            <div className="">상담신청 수정</div>
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
                                <div className="w-full col-span-1">
                                    <label className="form-label">상담신청일</label>
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
                                <div className="w-full col-span-1">
                                    <label className="form-label">최근수정일</label>
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
                                    <label className="form-label">진행상태</label>
                                    <select
                                        name="state"
                                        value={s.values?.state || ''}
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['state'] ? 'border-danger' : '', 'form-select')}
                                    >
                                        <option value="100">상담문의</option>
                                        <option value="200">상담중</option>
                                        <option value="300">도입보류</option>
                                        <option value="501">도입대기</option>
                                        <option value="502">도입신청완료</option>
                                    </select>
                                </div>
                                <div className="col-span-1">
                                    <label className="form-label">회사명</label>
                                    <input
                                        type="text"
                                        name="company_name"
                                        {...attrs.is_mand}
                                        value={s.values?.company_name || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['company_name'] ? 'border-danger' : '', 'form-control')}
                                    />
                                    {s.errors['company_name'] && <div className="form-error">{s.errors['company_name']}</div>}
                                </div>
                                <div className="col-span-1">
                                    <label className="form-label">회사홈페이지(URL)</label>
                                    <input
                                        type="text"
                                        name="homepage_url"
                                        value={s.values?.homepage_url || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['homepage_url'] ? 'border-danger' : '', 'form-control')}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="form-label">임직원수</label>
                                    <input
                                        type="text"
                                        name="staff_count"
                                        {...attrs.is_mand}
                                        value={s.values?.staff_count || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['staff_count'] ? 'border-danger' : '', 'form-control')}
                                    />
                                    {s.errors['staff_count'] && <div className="form-error">{s.errors['staff_count']}</div>}
                                </div>
                                <div className="col-span-1">
                                    <label className="form-label">구축희망일</label>
                                    <Datepicker
                                        containerClassName="relative w-full text-gray-700 border border-gray-300 rounded"
                                        useRange={false}
                                        asSingle={true}
                                        inputName="wish_build_at"
                                        i18n={'ko'}
                                        value={{
                                            startDate: s.values?.wish_build_at,
                                            endDate: s.values?.wish_build_at,
                                        }}
                                        onChange={fn.handleChangeDate}
                                    />
                                </div>

                                <div className="col-span-1">
                                    <label className="form-label">담당자명</label>
                                    <input
                                        type="text"
                                        name="staff"
                                        {...attrs.is_mand}
                                        value={s.values?.staff || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['staff'] ? 'border-danger' : '', 'form-control')}
                                    />
                                    {s.errors['staff'] && <div className="form-error">{s.errors['staff']}</div>}
                                </div>
                                <div className="col-span-1">
                                    <label className="form-label">직급/직책</label>
                                    <input
                                        type="text"
                                        name="staff_position"
                                        value={s.values?.staff_position || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['staff_position'] ? 'border-danger' : '', 'form-control')}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="form-label">연락처</label>
                                    <input
                                        type="text"
                                        name="staff_phone"
                                        {...attrs.is_mand}
                                        value={s.values?.staff_phone || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['staff_phone'] ? 'border-danger' : '', 'form-control')}
                                    />
                                    {s.errors['staff_phone'] && <div className="form-error">{s.errors['staff_phone']}</div>}
                                </div>
                                <div className="col-span-1">
                                    <label className="form-label">이메일</label>
                                    <input
                                        type="text"
                                        name="staff_email"
                                        {...attrs.is_mand}
                                        value={s.values?.staff_email || ''}
                                        placeholder=""
                                        onChange={fn.handleChange}
                                        className={cls(s.errors['staff_email'] ? 'border-danger' : '', 'form-control')}
                                    />
                                    {s.errors['staff_email'] && <div className="form-error">{s.errors['staff_email']}</div>}
                                </div>

                                <div className="w-full col-span-2">
                                    <label className="form-label">내용</label>
                                    <textarea
                                        name="contents"
                                        rows={5}
                                        maxLength={70}
                                        value={s.values?.contents || ''}
                                        placeholder="상담문의 & 요청내용"
                                        onChange={fn.handleTextAreaChange}
                                        className={cls(s.errors['contents'] ? 'border-danger' : '', 'form-control')}
                                    />
                                </div>

                                {s.values.memo_list?.length > 0 && (
                                    <div className="w-full col-span-2">
                                        <div className="form-label">상담자 메모 내역</div>
                                        <table className="col-span-2 border-collapse border border-slate-400 w-full">
                                            <tbody>
                                                {s.values?.memo_list?.map((v, i) => (
                                                    <tr key={i}>
                                                        <th className="border border-slate-200 bg-gray-100 w-44 py-2">
                                                            {v.create_user}
                                                            <div className="text-xs text-slate-400">{v.create_at}</div>
                                                        </th>
                                                        <td className="border border-slate-200 p-2">{v.memo}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                <div className="col-span-2">
                                    <label className="form-label">상담로그</label>
                                    <textarea
                                        name="memo"
                                        rows={5}
                                        maxLength={70}
                                        value={s.values?.memo || ''}
                                        placeholder="추가할 상담로그 내용을 입력하세요"
                                        onChange={fn.handleTextAreaChange}
                                        className={cls(s.errors['memo'] ? 'border-danger' : '', 'form-control')}
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

DreamCounselEdit.displayName = 'DreamCounselEdit';
export default DreamCounselEdit;
