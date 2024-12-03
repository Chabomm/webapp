import DaumPost from '@/components/DaumPost';
import React, { useState } from 'react';

interface Props {
    values?: any;
    setValues?: any;
    errors?: any;
    handleChange?: any;
}

export default function Forms({ values, errors, handleChange, setValues }: Props) {
    const [daumModal, setDaumModal] = useState(false);

    // 주소 모달에서 선택 후
    const handleCompleteFormSet = (data: any) => {
        values.RcvPost = data.zonecode;
        values.RcvAddr = data.roadAddress;
        const el = document.querySelector("input[name='RcvAddrDetail']");
        (el as HTMLElement)?.focus();
    };

    const handleChangeTargetValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const target = (name + '').replace('select', '');
        values[target] = value;
        setValues({ ...values, [name]: value });
        const el = document.querySelector("input[name='" + target + "']");
        (el as HTMLElement)?.focus();
    };

    // interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    //     // extends React's HTMLAttributes
    //     is_mand?: string;
    // }

    const attr_is_mand = {
        is_mand: 'true',
    };

    const attr_is_mobile = {
        is_mobile: 'true',
    };

    return (
        <>
            {daumModal && <DaumPost daumModal={daumModal} setDaumModal={setDaumModal} handleCompleteFormSet={handleCompleteFormSet} />}
            <div className="container bg-white mb-12 text-xl">
                <div className="py-3 mb-3 border-b">
                    <h5 className="font-bold mb-0">배송지 정보</h5>
                </div>
                <div className="relative z-0 w-full mb-4 group">
                    <label
                        htmlFor="RcvName"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-8 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                        받으시는 분 이름을 입력해주세요
                    </label>
                    <input
                        id="RcvName"
                        name="RcvName"
                        value={values?.RcvName}
                        onChange={handleChange}
                        {...attr_is_mand}
                        type="text"
                        className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                            errors.RcvName && 'errorInput'
                        }`}
                        placeholder=" "
                    />
                    {errors?.RcvName && <p className="text-red-500 text-xs italic">{errors?.RcvName}</p>}
                </div>
                <div className="relative z-0 w-full mb-4 group">
                    <label
                        htmlFor="RcvMobile"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-8 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                        받으시는 분 연락처를 입력해주세요
                    </label>
                    <input
                        name="RcvMobile"
                        value={values?.RcvMobile}
                        {...attr_is_mand}
                        {...attr_is_mobile}
                        onChange={handleChange}
                        type="text"
                        id="RcvMobile"
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder="받으시는 분 연락처를 입력해주세요"
                    />
                    {errors?.RcvMobile && <p className="text-red-500 text-xs italic">{errors?.RcvMobile}</p>}
                </div>
                <div className="flex last:relative z-0 w-full group">
                    <button
                        className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
                        type="button"
                        onClick={() => {
                            setDaumModal(true);
                        }}
                    >
                        주소검색
                    </button>
                    <input
                        name="RcvPost"
                        value={values?.RcvPost}
                        onChange={handleChange}
                        {...attr_is_mand}
                        type="text"
                        className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="우편번호"
                        readOnly
                    />
                </div>
                {errors?.RcvPost && <p className="text-red-500 text-xs italic">{errors?.RcvPost}</p>}
                <div className="relative z-0 w-full my-4 group">
                    <label
                        htmlFor="RcvAddr"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-8 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                        배송지 주소를 입력해주세요
                    </label>
                    <input
                        name="RcvAddr"
                        value={values?.RcvAddr}
                        onChange={handleChange}
                        type="text"
                        id="RcvAddr"
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder="배송지 주소를 입력해주세요"
                        readOnly
                    />
                    {errors?.RcvAddr && <p className="text-red-500 text-xs italic">{errors?.RcvAddr}</p>}
                </div>

                <div className="relative z-0 w-full mb-4 group">
                    <label
                        htmlFor="RcvAddrDetail"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-8 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                        배송지 상세주소를 입력해주세요
                    </label>
                    <input
                        name="RcvAddrDetail"
                        value={values?.RcvAddrDetail}
                        onChange={handleChange}
                        {...attr_is_mand}
                        type="text"
                        id="RcvAddrDetail"
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                    />
                    {errors?.RcvAddrDetail && <p className="text-red-500 text-xs italic">{errors?.RcvAddrDetail}</p>}
                </div>
                <div className="relative z-0 w-full mb-4 group">
                    <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                        배송시 요청사항 (선택)
                    </label>
                    <select
                        name="selectOrderMemo"
                        onChange={handleChangeTargetValue}
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="">직접입력</option>
                        <option value="배송메모를 선택해 주세요.">배송메모를 선택해 주세요.</option>
                        <option value="배송 전 연락바랍니다.">배송 전 연락바랍니다.</option>
                        <option value="경비실에 맡겨주세요.">경비실에 맡겨주세요.</option>
                        <option value="집앞에 놔주세요.">집앞에 놔주세요.</option>
                        <option value="택배함에 놔주세요.">택배함에 놔주세요.</option>
                        <option value="부재시 핸드폰으로 연락주세요.">부재시 핸드폰으로 연락주세요.</option>
                        <option value="부재시 경비실에 맡겨주세요.">부재시 경비실에 맡겨주세요.</option>
                        <option value="부재시 집 앞에 놔주세요.">부재시 집 앞에 놔주세요.</option>
                    </select>
                </div>
                <div className="relative z-0 w-full mb-4 group">
                    <input
                        onChange={handleChange}
                        name="OrderMemo"
                        value={values?.OrderMemo}
                        type="text"
                        id="OrderMemo"
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder="배송시 요청사항을 입력해주세요"
                    />
                    <label
                        htmlFor="OrderMemo"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-8 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                        배송시 요청사항을 입력해주세요
                    </label>
                </div>
                <div className="pl-2">
                    <ul className="mt-5 px-4 list-disc text-base">
                        <li className="text-red-400">
                            <span>제주도 및 도서산간 지역은 추가 배송비가 발생할 수 있으며, 출고 전 안내될 예정입니다.</span>
                        </li>
                        <li>
                            <span className="text-red-400">배송지 입력 후 주문 최소는 불가합니다.</span>단, 교환 및 반품은 고객센터(032-719-3366)로 문의 바랍니다.
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
