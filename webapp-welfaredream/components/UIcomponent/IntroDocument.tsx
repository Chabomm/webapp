import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { cls } from '@/libs/utils';
import { api } from '@/libs/axios';
import { useRouter } from 'next/router';
import useForm from '@/components/form/useForm';

const IntroDocument = forwardRef(({ device }: any, ref) => {
    const router = useRouter();

    useImperativeHandle(ref, () => ({
        init,
    }));
    const [open, setOpen] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);

    function init() {
        setOpen(true);
    }

    const onToggle = () => {
        setShow(!open);
        setOpen(!open);
    };

    const { s, fn, attrs } = useForm({
        initialValues: {
            company: '',
            staff: '',
            mobile: '',
            to_email: '',
        },
        onSubmit: async () => {
            await editing();
        },
    });

    const editing = async () => {
        var params: any = { ...s.values };
        params.doc_type = 'WELFARE';

        if (!params.front_agree) {
            alert('개인정보 수집 이용 동의를 체크 해주세요');
            return;
        }

        try {
            const { data } = await api.post(`/be/dream/send_intro_doc`, params);
            if (data.code == 200) {
                alert(data.msg);
                router.reload();
            } else {
                alert(data.msg);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <section>
                {open && (
                    <>
                        <form onSubmit={fn.handleSubmit} noValidate className={cls(device == 'mobile' ? 'introdoc-mobile' : 'introdoc', show ? 'show' : '')}>
                            <div className="introdoc-header">
                                <div className="">복지드림 서비스 소개 신청</div>
                                <i className="fas fa-times btn-close" onClick={onToggle}></i>
                            </div>
                            <div className="introdoc-body text-start">
                                <div className="grid grid-cols-3 mb-4">
                                    <label className="form-label col-span-1">기업명</label>
                                    <div className="col-span-2">
                                        <input
                                            type="text"
                                            name="company"
                                            {...attrs.is_mand}
                                            value={s.values?.company || ''}
                                            placeholder="기업명을 입력해주세요"
                                            onChange={fn.handleChange}
                                            className={cls(s.errors['company'] ? 'border-danger' : '', 'form-control')}
                                        />
                                        {s.errors['company'] && <div className="form-error">{s.errors['company']}</div>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-3  mb-4">
                                    <label className="form-label col-span-1">담당자명</label>
                                    <div className="col-span-2">
                                        <input
                                            type="text"
                                            name="staff"
                                            {...attrs.is_mand}
                                            value={s.values?.staff || ''}
                                            placeholder="담당자명을 입력해주세요."
                                            onChange={fn.handleChange}
                                            className={cls(s.errors['staff'] ? 'border-danger' : '', 'form-control')}
                                        />
                                        {s.errors['staff'] && <div className="form-error">{s.errors['staff']}</div>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 mb-4">
                                    <label className="form-label col-span-1">연락처</label>
                                    <div className="col-span-2">
                                        <input
                                            type="text"
                                            name="mobile"
                                            {...attrs.is_mand}
                                            {...attrs.is_mobile}
                                            value={s.values?.mobile || ''}
                                            placeholder="010-0000-0000"
                                            onChange={fn.handleChange}
                                            className={cls(s.errors['mobile'] ? 'border-danger' : '', 'form-control')}
                                        />
                                        {s.errors['mobile'] && <div className="form-error">{s.errors['mobile']}</div>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 mb-4">
                                    <label className="form-label col-span-1">이메일 주소</label>
                                    <div className="col-span-2">
                                        <input
                                            type="text"
                                            name="to_email"
                                            {...attrs.is_mand}
                                            {...attrs.is_email}
                                            value={s.values?.to_email || ''}
                                            placeholder="abc@example.com"
                                            onChange={fn.handleChange}
                                            className={cls(s.errors['to_email'] ? 'border-danger' : '', 'form-control')}
                                        />
                                        {s.errors['to_email'] && <div className="form-error">{s.errors['to_email']}</div>}
                                    </div>
                                </div>
                                <div className="px-3 text-red-600">* 입력해주시는 이메일 주소로 복지드림 서비스 소개서가 발송됩니다.</div>
                                <div className="px-3 my-4">
                                    <div className="font-bold mb-4">개인정보 수집 이용 동의</div>

                                    <table className="border-collapse border border-slate-400 w-full">
                                        <tbody>
                                            <tr>
                                                <th className="border border-slate-200 bg-gray-100 w-24">분류</th>
                                                <td className="border border-slate-200 p-2">필수</td>
                                            </tr>
                                            <tr>
                                                <th className="border border-slate-200 bg-gray-100 w-24">목적</th>
                                                <td className="border border-slate-200 p-2">
                                                    ･ 서비스소개, 서비스 문의 등 고객문의 처리
                                                    <br />･ 이벤트 광고성 정보 제공
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="border border-slate-200 bg-gray-100 w-24">수집항목</th>
                                                <td className="border border-slate-200 p-2">기업명, 담당자명, 연락처, 이메일주소</td>
                                            </tr>
                                            <tr>
                                                <th className="border border-slate-200 bg-gray-100 w-24">보유기간</th>
                                                <td className="border border-slate-200 p-2">수집일로부터 1년</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div className="pt-5">
                                        <input
                                            className="mr-2"
                                            onChange={fn.handleChange}
                                            name="front_agree"
                                            id="front_agree"
                                            {...attrs.is_mand}
                                            checked={s.values?.is_agree}
                                            type="checkbox"
                                        />
                                        <label className="font-medium" htmlFor="front_agree">
                                            개인정보 수집 이용 동의
                                        </label>
                                        {s.errors?.front_agree && <p className="text-red-500 text-xs italic">{s.errors?.front_agree}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="introdoc-footer">
                                <button className={cls('introdoc-btn-save', s.submitting ? '!bg-gray-500 !text-white' : '')} disabled={s.submitting}>
                                    {s.submitting ? '전송중...' : '확인'}
                                </button>
                            </div>
                        </form>
                        <div className="offcanvas-backdrop fade" onClick={onToggle}></div>
                    </>
                )}
            </section>
        </>
    );
});

IntroDocument.displayName = 'IntroDocument';
export default IntroDocument;
