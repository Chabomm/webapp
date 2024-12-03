import { GetServerSideProps, NextPage } from 'next';
import useForm from '@/components/common/useForm';
import Goods from '@/components/order/Goods';
import Forms from '@/components/order/Forms';
import Terms from '@/components/order/Terms';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAgentDevice } from '@/libs/utils';
import { api, setContext } from '@/libs/axios';

const OrderGift: NextPage = (props: any) => {
    const router = useRouter();

    useEffect(() => {
        if (!props) {
            return;
        }
        if (props.response.code != 200) {
            alert(props.response.msg);
        }
    }, []);

    const { s, fn, attrs } = useForm({
        initialValues: {
            RcvName: props.response.RcvName,
            RcvMobile: props.response.RcvMobile,
            RcvPost: '',
            RcvAddr: '',
            RcvAddrDetail: '',
            OrderMemo: '',
            agree: false,
        },
        onSubmit: async () => {
            await fnOrderGiftOK('accept');
        },
    });

    async function fnOrderGiftOK(mode: string) {
        s.values.mode = mode;

        var confirmMsg = '선물을 거절하시겠습니까?\n거절할 경우 주문이 취소됩니다.';
        if (s.values.mode == 'reject') {
            if (!confirm(confirmMsg)) {
                return;
            }
        }

        s.values.orderNo = props.response.orderNo;
        s.values.orderUid = props.response.orderUid;
        s.values.action_token = props.response.action_token;

        try {
            const { data } = await api.post(`/be/welfare/giftOk`, s.values);

            if (data.code === 200) {
                alert(data.msg);
                router.push(router.asPath);
            } else {
                alert('예기치 못한 오류가 발생하였습니다.\n문제 지속시 고객센터(032-719-3366)로 문의 바랍니다.\n평일 10:00~18:00(점심 11:30~12:30)\n주말/공휴일 휴무');
                throw new Error();
            }
            s.setSubmitting(false);
        } catch (e: any) {}
    }

    return (
        <>
            {props.device == 'desktop' ? (
                <div className="order_gift_back">
                    <div>
                        <h5>
                            <strong>모바일에서만 접속이 가능합니다</strong>
                        </h5>
                        <h6>
                            <small>{props.response.result_sub_msg}</small>
                        </h6>
                    </div>
                </div>
            ) : (
                <div>
                    {props.response.result_code == 200 && (
                        <form onSubmit={fn.handleSubmit} noValidate>
                            <Goods mainData={props.response} />
                            <div className="px-5 pb-7">
                                <Forms values={s.values} setValues={s.setValues} errors={s.errors} handleChange={fn.handleChange} />
                                <Terms values={s.values} setValues={s.setValues} errors={s.errors} handleChange={fn.handleChange} />
                            </div>
                            <div className="h-12"></div>
                            <div className="fixed grid grid-cols-3 bottom-0 h-12 w-full">
                                <button type="button" onClick={() => fnOrderGiftOK('reject')} className="bg-gray-400 text-white grow p-3 text-xl">
                                    거절
                                </button>
                                <button type="submit" className="col-span-2 bg-blue-500 disabled:bg-red-500 text-white grow p-3 text-xl" disabled={s.submitting}>
                                    승인
                                </button>
                            </div>
                        </form>
                    )}

                    {props.response.code != 200 && (
                        <div className="order_gift_back">
                            <div>
                                <h5>
                                    <strong>{props.response.msg}</strong>
                                </h5>
                                <h6>
                                    <small>{props.response.result_sub_msg}</small>
                                </h6>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    setContext(ctx);
    const device = getAgentDevice(ctx);

    var request: any = {
        orderNo: ctx.query.id,
    };

    var response: any = {};
    try {
        const { data } = await api.post(`/be/welfare/gift`, request);
        response = data;
    } catch (e: any) {
        if (typeof e.redirect !== 'undefined') {
            return { redirect: e.redirect };
        }
    }
    return {
        props: { request, response, device: device },
    };
};

export default OrderGift;
