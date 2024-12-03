import React from 'react';
import Link from 'next/link';

export default function BannerForLinkType({ item, img }: any) {
    return (
        <>
            {item.link_type == 'inside' && <Link href={item.link}>{img}</Link>}
            {item.link_type == 'outside' && (
                <Link href={item.link} target="_blank">
                    {img}
                </Link>
            )}
            {item.link_type == 'none' && <img alt="img" src={item.banner_src} className="w-full" />}
        </>
    );
}
