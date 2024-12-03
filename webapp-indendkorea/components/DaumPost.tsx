import DaumPostCode from 'react-daum-postcode';

interface Props {
    daumModal?: any;
    setDaumModal?: any;
    handleCompleteFormSet?: any;
}

export default function DaumPost({ setDaumModal, handleCompleteFormSet }: Props) {
    const handleComplete = (data: any) => {
        handleCompleteFormSet(data);
        closeModal();
    };

    const closeModal = () => {
        setDaumModal(false);
    };

    return (
        <>
            <div className="fixed z-50 left-0 top-0 w-full h-full flex justify-center items-center">
                <div className="w-90">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none z-50">
                        {/* <div className="flex justify-between px-5 pt-5 rounded-t">
                            <div>주소검색</div>
                            <button className="text-red-500 text-sm " type="button" onClick={closeModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div> */}
                        <div className="py-5">
                            <DaumPostCode onComplete={handleComplete} autoClose className="post-code" />
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black" onClick={closeModal}></div>
            </div>
        </>
    );
}
