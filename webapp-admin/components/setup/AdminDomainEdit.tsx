import { api } from '@/libs/axios';
import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { cls } from '@/libs/utils';
import useForm from '@/components/form/useForm';
import Datepicker from 'react-tailwindcss-datepicker';

const AdminDomainEdit = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        init,
    }));

    const [item, setItem] = useState<any>({});
    function init(v: any) {
        if (JSON.stringify(item) !== '{}' && item === v) {
            getDataRead(item.uid);
            setOpen(true);
        } else {
            setItem(v);
            setOpen(true);
        }
    }

    const [open, setOpen] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);

    const onToggle = () => {
        setShow(!open);
        setOpen(!open);
    };

    useEffect(() => {
        if (JSON.stringify(item) !== '{}') {
            getDataRead(item.uid);
        }
    }, [item]);

    const getDataRead = async (uid: number) => {
        try {
            const { data } = await api.post(`/be/admin/setting/domain/read`, { uid: uid });
            s.setValues(data);
            setShow(true);
        } catch (e: any) {}
    };

    const { s, fn, attrs } = useForm({
        initialValues: {
            expire: {
                startDate: '',
                endDate: '',
            },
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
            params.expire = params.expire.startDate;
            const { data } = await api.post(`/be/admin/setting/domain/edit`, params);
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
                            <div className="">메뉴 {item.uid > 0 ? '수정' : '등록'}</div>
                            <i className="fas fa-times btn-close" onClick={onToggle}></i>
                        </div>

                        <div className="offcanvas-body">
                            {process.env.NODE_ENV == 'development' && (
                                <pre className="">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="font-bold mb-3 text-red-500">s.values</div>
                                            {JSON.stringify(s.values, null, 4)}
                                        </div>
                                    </div>
                                </pre>
                            )}
                            <div className="">
                                <div className="grid grid-cols-2 gap-4 px-5 pt-5">
                                    <div className="col-span-1">
                                        <label className="form-label">도메인 주소</label>
                                        <input
                                            type="text"
                                            name="domain"
                                            {...attrs.is_mand}
                                            value={s.values?.domain || ''}
                                            placeholder=""
                                            onChange={fn.handleChange}
                                            className={cls(s.errors['domain'] ? 'border-danger' : '', 'form-control')}
                                        />
                                        {s.errors['domain'] && <div className="form-error">{s.errors['domain']}</div>}
                                    </div>
                                    <div className="col-span-1">
                                        <label className="form-label">만료일</label>

                                        <Datepicker
                                            containerClassName="relative w-full text-gray-700 border border-gray-300 rounded"
                                            useRange={false}
                                            asSingle={true}
                                            inputName="expire"
                                            i18n={'ko'}
                                            value={{
                                                startDate: s.values?.expire.startDate || '',
                                                endDate: s.values?.expire.endDate || '',
                                            }}
                                            onChange={fn.handleChangeDateRange}
                                        />

                                        {s.errors['expire'] && <div className="form-error">{s.errors['expire']}</div>}
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
                    <div className="offcanvas-backdrop fade" onClick={onToggle}></div>
                </>
            )}
        </>
    );
});

AdminDomainEdit.displayName = 'AdminDomainEdit';
export default AdminDomainEdit;
