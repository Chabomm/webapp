const HistoryItem = ({ params, device, position }: any) => {
    {
        if (device == 'desktop') {
            return (
                <div className="w-full lg:w-1200 mx-auto justify-center relative flex pb-4">
                    {position == 'left' ? (
                        <div className="grow-1 w-full pr-10 text-end">
                            <div className="text-normal">
                                <div className="font-semibold mb-3 text-4xl">{params.year}</div>
                                {params?.list?.map((v: any, i: number) => (
                                    <div key={`left_${i}`} className="mb-3">
                                        <div className="tracking-tighter font-semibold my-1 text-2xl" dangerouslySetInnerHTML={{ __html: v.title }}></div>
                                        <div className="text-gray-500" dangerouslySetInnerHTML={{ __html: v.body }}></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="grow-1 w-full pr-10 text-end"></div>
                    )}

                    <div className="shrink-0">
                        <div className="h-full w-6 inset-0 flex justify-center">
                            <div className="mt-3 w-3 h-3 rounded-full flex items-center justify-center border-2 border-black bg-white text-white relative z-10 title-font font-medium text-sm"></div>
                            <div className="h-full w-px bg-black absolute pointer-events-none"></div>
                        </div>
                    </div>

                    {position == 'right' ? (
                        <div className="grow-1 w-full ps-10">
                            <div className="text-normal">
                                <div className="font-semibold mb-3 text-4xl">{params.year}</div>
                                {params?.list?.map((v: any, i: number) => (
                                    <div key={`right_${i}`} className="mb-3">
                                        <div className="tracking-tighter font-semibold my-1 text-2xl" dangerouslySetInnerHTML={{ __html: v.title }}></div>
                                        <div className="text-gray-500" dangerouslySetInnerHTML={{ __html: v.body }}></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="grow-1 w-full ps-10"></div>
                    )}
                </div>
            );
        } else {
            return (
                <div className="w-full lg:w-1200 mx-auto justify-center relative flex pb-4">
                    <div className="shrink-0">
                        <div className="h-full w-6 inset-0 flex justify-center">
                            <div className="mt-3 w-3 h-3 rounded-full flex items-center justify-center border-2 border-black bg-white text-white relative z-10 title-font font-medium text-sm"></div>
                            <div className="h-full w-px bg-black absolute pointer-events-none"></div>
                        </div>
                    </div>
                    <div className="grow-1 w-full pr-10">
                        <div className="text-normal">
                            <div className="font-semibold mb-3 text-3xl">{params.year}</div>
                            {params?.list?.map((v: any, i: number) => (
                                <div key={i} className="mb-3">
                                    <div className="tracking-tighter font-semibold my-1 text-xl" dangerouslySetInnerHTML={{ __html: v.title }}></div>
                                    <div className="text-gray-500" dangerouslySetInnerHTML={{ __html: v.body }}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }
    }
};

export default HistoryItem;
