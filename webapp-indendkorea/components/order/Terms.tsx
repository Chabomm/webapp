interface Props {
    values?: any;
    setValues?: any;
    errors?: any;
    handleChange?: any;
}

export default function Terms({ values, handleChange, errors }: Props) {
    const attr_is_mand = {
        is_mand: 'true',
    };
    return (
        <>
            <div className="container bg-white mb-3 text-xl">
                <div className="py-3 mb-3 border-b">
                    <h5 className="font-bold mb-0">개인정보 수집 및 이용 안내</h5>
                </div>
                <div className="mt-4 text-base">
                    <h6>[필수] 비회원 개인정보 수집･이용 동의</h6>

                    <div className="overscroll-contain border rounded overflow-y-auto h-24 p-4 my-3">
                        <div className="">
                            <div>
                                <strong>
                                    <span style={{ fontSize: '16px' }}>* 선물하기 개인정보 수집/이용 동의</span>
                                </strong>
                            </div>
                            <br />
                            <div>
                                <strong>1.개인정보의 수집 및 이용 목적</strong>
                            </div>
                            <div>&nbsp; 1) 주문자 정보 확보</div>
                            <div>&nbsp; 2) 상품에 관한 배송지 정보 확보</div>
                            <div>&nbsp; 3) 불만처리 의사소통 경로 확보</div>
                            <div>&nbsp; 4) 주문상품에 대한 결제 및 취소</div>
                            <br />
                            <div>
                                <strong>2.수집하는 개인정보의 항목</strong>
                            </div>
                            <div>&nbsp; - 주문자 이름, e-mail, 휴대폰 번호</div>
                            <div>&nbsp; - 수령인 이름, 전화번호, 휴대폰 번호, 주소</div>
                            <br />
                            <div>
                                <strong>* 서비스 이용과정이나 사업처리 과정에서 아래와 같은 정보들이 생성되어 수집될 수 있습니다.</strong>
                            </div>
                            <div>&nbsp; - 서비스 이용 기록, 접속로그, 쿠키, 접속IP정보, 이용정지기록</div>
                            <br />
                            <div>
                                <strong>3.개인정보의 보유 및 이용기간</strong>
                            </div>
                            <div>&nbsp; - 원칙적으로 개인정보의 수집목적 또는 제공은 목적이 달성되면 지체 없이 파기합니다.</div>
                            <div>&nbsp; - 다만, 전자상거래등에서의소비자보호에관한법률 등 관계법률에 의해 보존할 필요가 있는 경우에는 일정기간 보존합니다.</div>
                            <div>&nbsp; - 이 경우 보관하는 정보를 그 보관 목적으로만 이용하며, 보존기간은 아래와 같습니다.</div>
                            <br />
                            <div>
                                <strong>- 계약 또는 청약철회 등에 관한 기록 보존</strong>
                            </div>
                            <div>&nbsp; 이유 : 전자상거래등에서의소비자보호에관한법률</div>
                            <div>&nbsp; 보존기간 : 5년</div>
                            <div>&nbsp;</div>
                            <div>
                                <strong>- 대금결제 및 재화 등의 공급에 관한 기록 보존</strong>
                            </div>
                            <div>&nbsp; 이유 : 전자상거래등에서의소비자보호에관한법률</div>
                            <div>&nbsp; 보존기간 : 5년</div>
                            <div>&nbsp;</div>
                            <div>
                                <strong>- 소비자 불만 또는 분쟁처리에 관한 기록 보존</strong>
                            </div>
                            <div>&nbsp; 이유 : 전자상거래등에서의소비자보호에관한법률</div>
                            <div>&nbsp; 보존기간 : 3년</div>
                            <br />
                            <div>비회원 주문시 제공하신 모든 정보는 상기 목적에 필요한 용도 이외로는 사용되지 않습니다.</div>
                            <div>보다 자세한 내용은 개인정보취급방침을 확인하여 주시기 바랍니다.</div>
                        </div>
                    </div>
                    <div className="flex items-center mr-4">
                        <input
                            id="agree"
                            name="agree"
                            onChange={handleChange}
                            {...attr_is_mand}
                            checked={values?.agree}
                            type="checkbox"
                            className="w-4 h-4 text-green-600 border-gray-300 rounded checked:bg-blue-500  focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="agree" className="ml-2 text-base font-medium text-gray-900 dark:text-gray-300">
                            비회원 개인정보 수집이용에 대한 내용을 확인하였으며 이에 동의합니다.
                        </label>
                    </div>
                    {errors?.agree && <p className="text-red-500 text-xs italic">{errors?.agree}</p>}
                </div>
            </div>

            <div className="px-3">
                <ul className="mt-8 px-3 list-disc">
                    <li>
                        <small>
                            선물 주문은 결제 후 선물 받는 분의 배송정보 확인 시점의 차이로 인해 상품의 품절 등 배송이 불가능한 사유가 발생할 수 있으며, 이 경우 받는 분에게 해당
                            상품은 제외되어 배송될 수 있습니다.
                        </small>
                    </li>
                    <li>
                        <small>품절된 상품에 대한 주문은 취소되어 선물 하신 분에게 자동 환불 처리됩니다.</small>
                    </li>
                    <li>
                        <small>선물서비스 관련 궁금한 사항은 고객센터(032-719-3366)로 문의 주세요.</small>
                    </li>
                </ul>
            </div>
        </>
    );
}
