import Link from 'next/link';

export default function ButtonTop({ nav_id, title, device }: any) {
    return (
        <>
            {device == 'desktop' && (
                <div className="section_wrap" style={{ borderTop: '1px solid #eee' }}>
                    <div className="text-center py-3 flex">
                        <Link href="#" className="w-full block text-black text-lg">
                            맨위로
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 inline-block">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18" />
                            </svg>
                        </Link>
                    </div>
                </div>
            )}
            {device == 'mobile' && (
                <div className="section_wrap" style={{ borderTop: '1px solid #eee' }}>
                    <div className="text-center py-2 flex">
                        <Link href="#" className="w-full block text-black">
                            맨위로
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 inline-block ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18" />
                            </svg>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}
