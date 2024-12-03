import type { GetServerSideProps, NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { api, setContext } from '@/libs/axios';
import { useRouter } from 'next/router';
import { cls } from '@/libs/utils';

import useForm from '@/components/form/useForm';
import BoardPostsEditor from '@/components/board/BoardPostsEditor';
import LayoutPopup from '@/components/LayoutPopup';

const BoardPostsEdit: NextPage = (props: any) => {
    const router = useRouter();
    const [filter, setFilter] = useState<any>([]);

    useEffect(() => {
        if (props) {
            s.setValues(props.response.values);
            setFilter(props.response.filter);
        }
    }, [props]);

    const { s, fn, attrs } = useForm({
        initialValues: {},
        onSubmit: async () => {
            await editing('REG');
        },
    });

    const deleting = () => editing('DEL');

    const editing = async mode => {
        const params = { ...s.values };

        if (params.mode != 'CONTENTS_DEL' && mode == 'REG' && params.uid > 0) {
            mode = 'MOD';
        }
        params.mode = mode;

        // files 때문에 모든 데이터를 formData로 변경해서 넣어준다
        const formData = new FormData();
        formData.append('mode', mode);
        formData.append('no', params.no);
        formData.append('board_uid', params.board_uid);
        formData.append('uid', params.uid);
        formData.append('cate_uid', params.cate_uid);
        formData.append('thumb', params.thumb);
        formData.append('title', params.title);
        formData.append('tags', params.tags);
        formData.append('is_display', params.is_display);
        formData.append('contents', JSON.stringify(s.values.contents)); //multifile은 string, blob만 넘어가기 때문에 string형태로 변경해줘야함

        // u번째의 contetns 의 files 를 넣기 위해서 for문 돌리기
        for (var i = 0; i < s.values.contents.length; i++) {
            // if (JSON.stringify(s.values.contents[i].files) == '{}') {
            if (typeof s.values.contents[i].files.index !== 'undefined') {
                formData.append('files', s.values.contents[i].files);
                formData.append('indexs', s.values.contents[i].files.index + '');
            }
        }

        try {
            const { data } = await api.post(`/be/admin/posts/edit`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            s.setSubmitting(false);
            if (data.code == 200) {
                if (params.mode == 'REG') {
                    alert(data.msg);
                    router.replace(`/board/posts/edit?board_uid=${params.board_uid}&uid=${data.uid}`);
                } else {
                    alert(data.msg + '\n데이터를 다시 불러와주세요.');
                }
            } else {
                alert(data.msg);
            }
        } catch (e: any) {}

        return;
    };

    // [ S ] dropdown
    const [dropDownOpen, setDropDownOpen] = useState<Boolean>(false);
    const fnblockAdd = () => {
        setDropDownOpen(!dropDownOpen);
    };
    const handleAddContentsFields = (btype: string) => {
        const copy = { ...s.values };
        copy.contents.push({
            uid: 0,
            image_url: '',
            link: '',
            html: '',
            link_target: '',
            files: {},
            btype: btype,
        });
        s.setValues({ ...s.values, contents: copy.contents });
    };
    // [ E ] dropdown

    const getLogList = (uid: any) => {
        window.open(`/setup/log/popup?table_name=BOARD&uid=${uid}`, '로그정보', 'width=1120,height=800,location=no,status=no,scrollbars=yes,left=400%,top=50%');
    };

    return (
        <>
            <LayoutPopup title={''}>
                <form onSubmit={fn.handleSubmit} noValidate>
                    <div className="edit_popup w-full bg-slate-100 mx-auto py-10" style={{ minHeight: '100vh' }}>
                        <div className="px-9">
                            <div className="flex justify-between">
                                <div className="text-2xl font-semibold">게시물 {s.values.uid > 0 ? '수정' : '등록'}</div>
                                <div className="" onClick={() => getLogList(s.values.uid)}>
                                    <button type="button" className="ml-3 px-5 bg-gray-500 rounded-md py-2 text-white text-center">
                                        로그 리스트
                                    </button>
                                </div>
                            </div>
                            <div className="card_area">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
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

                                    <div className="col-span-1">
                                        <label className="form-label">게시판</label>
                                        <select
                                            name="board_uid"
                                            value={s.values?.board_uid || ''}
                                            onChange={fn.handleChange}
                                            {...attrs.is_mand}
                                            className={cls(s.errors['board_uid'] ? 'border-danger' : '', 'form-select')}
                                        >
                                            <option value="">전체</option>
                                            {filter.board_uid?.map((v, i) => (
                                                <option key={i} value={v.key}>
                                                    {v.value}
                                                </option>
                                            ))}
                                        </select>
                                        {s.errors['board_uid'] && <div className="form-error">{s.errors['board_uid']}</div>}
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

                                    <div className="col-span-2">
                                        <label className="form-label">내용</label>
                                        <BoardPostsEditor s={s} fn={fn} attrs={attrs} />

                                        <div className="dropDownMenu relative" tabIndex={!fnblockAdd ? 0 : -1} onBlur={() => setDropDownOpen(false)}>
                                            <button className="btn-filter !w-full hover:bg-gray-600 hover:text-white" type="button" onClick={fnblockAdd}>
                                                블록추가
                                            </button>
                                            <ul className={`dropdown_menu cursor-pointer absolute left-[50%] ms-[-50px] top-8 divide-y ${dropDownOpen ? 'dropdown_active' : ''}`}>
                                                {[
                                                    ['이미지 등록', 'img'],
                                                    ['HTML 등록', 'html'],
                                                ].map(([title, type], i: number) => (
                                                    <li key={i} className="py-2 flex items-center" onClick={() => handleAddContentsFields(type)}>
                                                        <div>{title}</div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/* end grid */}
                            </div>
                            {/* card_area */}

                            <div className="offcanvas-footer grid grid-cols-3 gap-4 !p-0 my-5">
                                <button className="btn-del" type="button" onClick={deleting}>
                                    삭제
                                </button>
                                <button className="btn-save col-span-2 hover:bg-blue-600" disabled={s.submitting}>
                                    저장
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </LayoutPopup>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    setContext(ctx);
    var request: any = {
        uid: ctx.query.uid,
    };
    var response: any = {};
    try {
        const { data } = await api.post(`/be/admin/posts/read`, request);
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

export default BoardPostsEdit;
