import React, { useState, useImperativeHandle, forwardRef, useRef, useEffect } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { api } from '@/libs/axios';
import { cls } from '@/libs/utils';
import useForm from '@/components/form/useForm';
import AdminMenuEdit from '@/components/setup/AdminMenuEdit';

const AdminMenuDepth2 = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        init,
    }));

    // let item: any = {};
    const [item, setItem] = useState<any>({});
    function init(v: any) {
        setItem(v);
        getDataRead(v.uid);
        setOpen(true);
    }

    const [open, setOpen] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const [posts, setPosts] = useState<any>([]);
    const [sortDiff, setSortDiff] = useState<boolean>(false);
    const [sort, setSort] = useState<any>([]);

    const onToggle = () => {
        setShow(!open);
        setOpen(!open);
    };

    useEffect(() => {
        if (sort.length == 0) {
            posts.map((v: any) => {
                setSort(current => [...current, v.uid]);
            });
        } else {
            var sort_diff = false;
            posts.map((v: any, i: number) => {
                if (v.uid != sort[i]) {
                    sort_diff = true;
                }
            });
            if (sort_diff) {
                setSort([]);
                posts.map((v: any) => {
                    setSort(current => [...current, v.uid]);
                });
                setSortDiff(sort_diff);
            }
        }
    }, [posts]);

    const getDataRead = async (uid: number) => {
        try {
            const { data } = await api.post(`/be/admin/setup/menus`, { parent: uid });
            setPosts(data);
            setShow(true);
        } catch (e: any) {}
    };

    // 대/소메뉴 등록 수정
    const refAdminMenuEdit = useRef<any>();
    function openAdminMenuEdit(v: any) {
        refAdminMenuEdit.current.init(v);
    }

    const { s, fn, attrs } = useForm({
        initialValues: {},
        onSubmit: async () => {
            await editing('REG');
        },
    });

    const sortableOptions = {
        animation: 150,
        handle: '.handle',
    };

    const sorting = async () => {
        const p = {
            mode: 'SORT',
            parent: item.uid,
            sort_array: sort,
        };

        try {
            const { data } = await api.post(`/be/admin/setup/menus/edit`, p);
            if (data.code == 200) {
                alert(data.msg);
            } else {
                alert(data.msg);
            }
        } catch (e: any) {}
    };

    const deleting = () => editing('DEL');

    const editing = async mode => {
        if (mode == 'REG' && s.values.uid > 0) {
            mode = 'MOD';
        }
        s.values.mode = mode;

        try {
            const { data } = await api.post(`/be/admin/main/edit`, s.values);
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
                            <div className="">소메뉴 등록/수정</div>
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

                            {sortDiff && (
                                <div className="py-5">
                                    <button
                                        type="button"
                                        className="btn-funcs"
                                        onClick={() => {
                                            sorting();
                                        }}
                                    >
                                        소메뉴 순서 적용하기
                                    </button>
                                    <div className="text-red-600 font-bold ml-5">순서가 변경되었습니다. 적용하기 버튼을 클릭하여 저장해 주세요</div>
                                </div>
                            )}
                            <div className="text-right my-5">
                                <button
                                    type="button"
                                    className="btn-funcs"
                                    onClick={() => {
                                        openAdminMenuEdit({ uid: 0, depth: 2, parent: item.uid });
                                    }}
                                >
                                    <i className="fas fa-pen me-2"></i> 등록
                                </button>
                            </div>

                            <div className="col-table">
                                <div className="col-table-th grid grid-cols-7 top-16 bg-gray-100">
                                    {/* col-span-2 */}
                                    <div className="">순서</div>
                                    <div className="">uid</div>
                                    <div className="">소메뉴명</div>
                                    <div className="col-span-3">링크</div>
                                    <div className="">수정하기</div>
                                </div>

                                <ReactSortable {...sortableOptions} list={posts} setList={setPosts} dragClass="sortableDrag">
                                    {posts?.map((v: any, i: number) => (
                                        <div key={i} className="col-table-td grid grid-cols-7 bg-white transition duration-300 ease-in-out hover:bg-gray-100">
                                            <div className="handle flex-col cursor-pointer">
                                                <div className="flex items-center justify-center border p-3 rounded bg-slate-50">
                                                    <i className="fas fa-sort me-2"></i>
                                                    <div className="font-semibold">{v.sort}</div>
                                                </div>
                                            </div>
                                            <div className="">{v.uid}</div>
                                            <div className="">{v.name}</div>
                                            <div className="col-span-3">{v.to}</div>
                                            <div className="">
                                                <button
                                                    type="button"
                                                    className="text-blue-500 underline"
                                                    onClick={() => {
                                                        openAdminMenuEdit(v);
                                                    }}
                                                >
                                                    수정하기
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </ReactSortable>
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
            <AdminMenuEdit ref={refAdminMenuEdit} />
        </>
    );
});

AdminMenuDepth2.displayName = 'AdminMenuDepth2';
export default AdminMenuDepth2;
