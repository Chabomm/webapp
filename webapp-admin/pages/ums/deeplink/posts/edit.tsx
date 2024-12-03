import type { GetServerSideProps, NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { api, setContext } from '@/libs/axios';
import { useRouter } from 'next/router';
import { cls, checkNumeric, null2Blank } from '@/libs/utils';

import useForm from '@/components/form/useForm';
import LayoutPopup from '@/components/LayoutPopup';

const DeeplinkPostsEdit: NextPage = (props: any) => {
    const router = useRouter();
    const [filter, setFilter] = useState<any>({});
    const [readonly, setReadonly] = useState<boolean>(false);

    useEffect(() => {
        if (props) {
            s.setValues(props.response);
            getFilterContidion();
        }
    }, [props]);

    const getFilterContidion = async () => {
        try {
            const { data } = await api.post(`/be/admin/applink/deeplink/filter`);
            setFilter(data);
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
            const params = { ...s.values };

            if (mode == 'REG' && s.values.uid > 0) {
                mode = 'MOD';
            }
            params.mode = mode;
            params.app_link = props.response.group.deep_link + params.mall_link;

            if (params.banner == null) {
                alert('배너를 등록해주세요.');
                return;
            }

            const { data } = await api.post(`/be/admin/applink/deeplink/edit`, params);
            if (data.code == 200) {
                if (mode == 'DEL') {
                    alert(data.msg);
                    window.close();
                } else {
                    alert(data.msg);
                    router.push(`/ums/deeplink/posts/edit?group_uid=${params.group_id}&uid=${data.uid}&site_id=${params.site_id}`);
                }
            } else {
                alert(data.msg);
            }
        } catch (e: any) {}

        return;
    };

    // useEffect(() => {
    //     const copy = { ...s.values };
    //     if (s.values.dlink_type == 'event') {
    //         copy.mall_link = '/front/event/detail.asp?euid=' + checkNumeric(s.values.dlink_uid);
    //         setReadonly(true);
    //     } else if (s.values.dlink_type == 'special') {
    //         copy.mall_link = '/front/product/special/list.asp?suid=' + checkNumeric(s.values.dlink_uid);
    //         setReadonly(true);
    //     } else if (s.values.dlink_type == 'weekend') {
    //         copy.mall_link = '/front/product/weekend/list.asp?suid=' + checkNumeric(s.values.dlink_uid);
    //         setReadonly(true);
    //     } else if (s.values.dlink_type == 'month') {
    //         copy.mall_link = '/front/product/month/list.asp?suid=' + checkNumeric(s.values.dlink_uid);
    //         setReadonly(true);
    //     } else if (s.values.dlink_type == 'month_intro') {
    //         copy.mall_link = '/front/product/month/intro.asp?suid=' + checkNumeric(s.values.dlink_uid);
    //         setReadonly(true);
    //     } else if (s.values.dlink_type == 'today') {
    //         copy.mall_link = '/front/product/today/list.asp';
    //         setReadonly(true);
    //     } else if (s.values.dlink_type == 'group') {
    //         copy.mall_link = '/front/product/group/list.asp';
    //         setReadonly(true);
    //     } else if (s.values.dlink_type == 'plan') {
    //         copy.mall_link = '/front/plan/exhi/detail.asp?uid=' + checkNumeric(s.values.dlink_uid);
    //         setReadonly(true);
    //     } else if (s.values.dlink_type == 'goods') {
    //         copy.mall_link = '/front/goods/content.asp?guid=' + checkNumeric(s.values.dlink_uid);
    //         setReadonly(true);
    //     } else if (s.values.dlink_type == 'etc') {
    //         copy.dlink_uid = '0';
    //         setReadonly(false);
    //     } else {
    //         copy.mall_link = '';
    //         setReadonly(false);
    //     }

    //     copy.app_link = copy?.group?.deep_link + copy.mall_link;

    //     s.setValues(copy);
    // }, [s.values.dlink_type, s.values.dlink_uid]);

    const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;

        setReadonly(true);

        const copy = { ...s.values };

        let possMallLink = false;

        if (name == 'dlink_type') {
            copy.dlink_type = value;
            if (copy.dlink_type == 'etc') {
                copy.dlink_uid = '';
                setReadonly(false);
            } else if (checkNumeric(copy.dlink_uid) > 0) {
                possMallLink = true;
            } else {
                copy.mall_link = '';
            }
        } else if (name == 'dlink_uid') {
            copy.dlink_uid = value;
            if (null2Blank(copy.dlink_type) != 'etc') {
                possMallLink = true;
            } else {
                copy.mall_link = '';
            }
        } else if (name == 'mall_link') {
            copy.mall_link = value;
            setReadonly(false);
        }

        if (possMallLink) {
            if (false) {
            } else if (copy.dlink_type == 'event') {
                copy.mall_link = '/front/event/detail.asp?euid=' + checkNumeric(copy.dlink_uid);
                setReadonly(true);
            } else if (copy.dlink_type == 'special') {
                copy.mall_link = '/front/product/special/list.asp?suid=' + checkNumeric(copy.dlink_uid);
                setReadonly(true);
            } else if (copy.dlink_type == 'weekend') {
                copy.mall_link = '/front/product/weekend/list.asp?suid=' + checkNumeric(copy.dlink_uid);
                setReadonly(true);
            } else if (copy.dlink_type == 'month') {
                copy.mall_link = '/front/product/month/list.asp?suid=' + checkNumeric(copy.dlink_uid);
                setReadonly(true);
            } else if (copy.dlink_type == 'month_intro') {
                copy.mall_link = '/front/product/month/intro.asp?suid=' + checkNumeric(copy.dlink_uid);
                setReadonly(true);
            } else if (copy.dlink_type == 'today') {
                copy.mall_link = '/front/product/today/list.asp';
                setReadonly(true);
            } else if (copy.dlink_type == 'group') {
                copy.mall_link = '/front/product/group/list.asp';
                setReadonly(true);
            } else if (copy.dlink_type == 'plan') {
                copy.mall_link = '/front/plan/exhi/detail.asp?uid=' + checkNumeric(copy.dlink_uid);
                setReadonly(true);
            } else if (copy.dlink_type == 'goods') {
                copy.mall_link = '/front/goods/content.asp?guid=' + checkNumeric(copy.dlink_uid);
                setReadonly(true);
            }
        }

        copy.app_link = copy?.group?.deep_link + copy.mall_link;

        s.setValues(copy);
    };

    return (
        <>
            <LayoutPopup title={''}>
                <div className="w-full bg-slate-100 mx-auto py-10">
                    <form onSubmit={fn.handleSubmit} noValidate>
                        <div className="px-9">
                            <div className="flex justify-between">
                                <div className="text-2xl font-semibold">딥링크 {s.values.uid > 0 ? '수정' : '등록'}</div>
                            </div>
                            <div className="border py-4 px-6 rounded shadow-md bg-white mt-5">
                                <div className="grid grid-cols-2 gap-4">
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
                                        <label className="form-label">타입</label>
                                        <select
                                            name="dlink_type"
                                            value={s.values?.dlink_type || ''}
                                            {...attrs.is_mand}
                                            onChange={handleChangeType}
                                            className={cls(s.errors['dlink_type'] ? 'border-danger' : '', 'form-select')}
                                        >
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
                                        <input type="text" name="dlink_uid" value={s.values?.dlink_uid || ''} placeholder="" onChange={handleChangeType} className="form-control" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="form-label">mall링크</label>
                                        <input
                                            type="text"
                                            name="mall_link"
                                            {...attrs.is_mand}
                                            value={s.values?.mall_link || ''}
                                            readOnly={readonly}
                                            placeholder=""
                                            onChange={handleChangeType}
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
                                    {/* end grid */}
                                </div>
                                {/* card_area */}
                            </div>
                            <div className="mt-5 w-full text-center">
                                <button className="mr-3 px-5 bg-blue-500 rounded-md py-2 text-white text-center" disabled={s.submitting}>
                                    저장
                                </button>
                                {s.values.uid > 0 && (
                                    <button type="button" className="px-5 bg-red-500 rounded-md py-2 text-white text-center" onClick={deleting}>
                                        삭제
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </LayoutPopup>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    setContext(ctx);
    var request: any = {
        link_uid: ctx.query.uid,
        group_uid: ctx.query.group_uid,
        site_id: ctx.query.site_id,
    };
    var response: any = {};
    try {
        const { data } = await api.post(`/be/admin/applink/deeplink/read`, request);
        response = data;
    } catch (e: any) {
        if (typeof e.redirect !== 'undefined') {
            return { redirect: e.redirect };
        }
    }
    return {
        props: { request, response },
    };
};

export default DeeplinkPostsEdit;
