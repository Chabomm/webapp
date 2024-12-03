export default function Goods(props: any) {
    const data = props.mainData?.order_prd_list[0];
    return (
        <>
            <div className="">
                <div className="bg-white mb-6">
                    <div className="row justify-center">
                        <div
                            className="w-full"
                            style={{ backgroundImage: 'url(/resource/indendkorea/images/_lib/gift-bg_01.jpg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
                        >
                            <div className="grid grid-cols-3 py-5">
                                <div className=""></div>
                                <div className="">
                                    <img
                                        src="https://indend-resource.s3.ap-northeast-1.amazonaws.com/logos/sample/pick-W_File_ComLogo_16477812587371.png"
                                        style={{ width: '100%' }}
                                        alt=""
                                    />
                                </div>
                                <div className=""></div>
                            </div>
                            <div className="mt-3 text-center">
                                <div className="text-2xl pb-5">
                                    {props.mainData?.OrdName}님이
                                    <br />
                                    소중한 선물을 보내주셨어요!
                                </div>
                            </div>
                        </div>
                        <div
                            className="w-full"
                            style={{ backgroundImage: 'url(/resource/indendkorea/images/_lib/gift-bg_02.jpg)', backgroundSize: '100%', backgroundRepeat: 'repeat' }}
                        >
                            {props.mainData?.order_prd_list.length > 1 ? (
                                <div className="px-8">
                                    {props.mainData?.order_prd_list.map((v: any, i: number) => (
                                        <div key={i} className="border-b py-2">
                                            <div className="grid grid-cols-3">
                                                <div className="">
                                                    <img src={`${data.GoodsImg}`} className="border w-full" alt={`${data.GoodsTitle}`} />
                                                </div>

                                                <div className="col-span-2 px-5">
                                                    <div className="font-bold">{data.GoodsTitle}</div>
                                                    <div className="text-sm">수량: {v.Ea}개</div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-3">
                                                <div className=""></div>
                                                <div className="col-span-2 px-5 text-sm">
                                                    {v.option_list.map((vv: any, ii: number) => (
                                                        <div key={ii}>
                                                            <div className="text-gray-600">
                                                                {vv.opt_title} : {vv.opt_item_title}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="text-xl text-center">
                                        {props.mainData?.giftMessage.split('\n').map((message: any) => (
                                            <div key={message} className="border-b">
                                                {message}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="row grid justify-center">
                                        <div className="col-auto">
                                            <img src={`${data.GoodsImg}`} style={{ width: '150px' }} alt={`${data.GoodsTitle}`} className="mt-5" />
                                        </div>
                                    </div>
                                    <div className="mt-4 mb-6 text-center">
                                        <div className="px-12">
                                            {data.GoodsTitle}
                                            <div className="pb-3"></div>
                                        </div>
                                        {props.mainData?.order_prd_list.map((v: any, i: number) => (
                                            <div className="" key={i}>
                                                <div>수량: {v.Ea}개</div>

                                                {v.option_list.map((vv: any, ii: number) => (
                                                    <div key={ii} className="px-12">
                                                        <div className="text-gray-600">
                                                            {vv.opt_title} : {vv.opt_item_title}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-xl text-center px-12">
                                        {props.mainData?.giftMessage.split('\n').map((message: any) => (
                                            <div key={message} className="border-b">
                                                {message}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <img src="/resource/indendkorea/images/_lib/gift-bg_03.jpg" style={{ width: '100%' }} alt="" />
                            <div className="absolute text-right" style={{ bottom: '20px', right: '30px' }}>
                                <small className="text-zinc-500">{props.mainData?.RegDate}</small>
                                <br />
                                <span className="">FROM.</span>
                                <strong className="text-xl text-zinc-500">{props.mainData?.OrdName}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-5 pb-7">
                <div className="container bg-white mb-3 text-xl">
                    <div className="py-3 mb-3 border-b">
                        <h5 className="font-bold mb-0">선물 수락 기한 안내</h5>
                    </div>
                    <div className="text-center">
                        <small className="py-2 text-zinc-500"> {props.mainData?.expiryDate} 까지 </small>
                    </div>
                    <div className="py-3 text-center text-red-400 text-lg">
                        <span>
                            기한 내 배송지를 입력하지 않으실 경우
                            <br />
                            자동 주문 취소되어 환불됩니다.
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
