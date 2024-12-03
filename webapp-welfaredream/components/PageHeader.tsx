import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function pageHeader({ params, device }: any) {
    const navs = params?.nav_id?.split('/');
    const group_code = typeof navs === 'undefined' ? '' : navs[1];
    const nav_code = typeof navs === 'undefined' ? '' : navs[navs.length - 1];
    return (
        <div
            className="bg-fixed bg-center relative"
            style={{
                height: device == 'desktop' ? '254px' : '165px',
                backgroundImage: `url(/resource/welfaredream/page_header/${device}/${nav_code}.jpg)`,
                backgroundPosition: '0px 80px;',
            }}
        >
            <div
                style={{
                    height: device == 'desktop' ? '254px' : '165px',
                    backgroundColor: 'rgba(0,0,0,0.1)',
                }}
            >
                <div className="absolute absolute-middle text-white font-bold text-center">
                    <motion.div initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <div className="text-3xl lg:text-5xl leading-normal whitespace-pre">{params.title}</div>
                        <div className="text-2xl lg:text-3xl">{params.sub}</div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
