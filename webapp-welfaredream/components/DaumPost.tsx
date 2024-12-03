import DaumPostCode from 'react-daum-postcode';

interface Props {
    daumModal?: any;
    setDaumModal?: any;
    handleCompleteFormSet?: any;
}

export default function DaumPost({ daumModal, setDaumModal, handleCompleteFormSet }: Props) {
    const handleComplete = (data: any) => {
        handleCompleteFormSet(data);
        closeModal();
    };

    const closeModal = () => {
        setDaumModal(false);
    };

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-80 my-6 mx-auto max-w-sm">
                    <div className="shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none py-3">
                        <DaumPostCode onComplete={handleComplete} autoClose className="post-code" />;
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}
