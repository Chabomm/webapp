import { motion } from 'framer-motion';

export default function pageHeader({ params, device }: any) {
    const navs = params?.nav_id?.split('/');
    const group_code = typeof navs === 'undefined' ? '' : navs[1];
    const nav_code = typeof navs === 'undefined' ? '' : navs[navs.length - 1];

    const getMessage = () => {
        if (group_code == 'about') {
            return '임직원과 고객을 생각하며 함께\n가치를 창조하는 인디앤드코리아입니다.';
        } else if (nav_code == 'mall') {
            return '기업과 임직원의 행복을 여는 문!\n 선택적 복지제도 \n인디앤드코리아에 답이 있습니다.';
        } else if (nav_code == 'domastic' || nav_code == 'foreign') {
            return '새로운 가치를 만드는 움직임, \n최고의 유통서비스를 제공하겠습니다.';
        } else if (nav_code == 'partner') {
            return '수많은 파트너사들이 인디앤드와 \n함께하고 있습니다.';
        }

        return '#ffffff';
    };

    const getBackgroundPosY = () => {
        if (nav_code == 'history') {
            return '-400px';
        } else if (nav_code == 'organize' && device == 'desktop') {
            return '-400px';
        } else if (nav_code == 'organize' && device == 'mobile') {
            return '-300px';
        } else if (nav_code == 'domastic' && device == 'desktop') {
            return '-840px';
        } else if (nav_code == 'domastic' && device == 'mobile') {
            return '-200px';
        } else if (nav_code == 'partner') {
            return '-200px';
        }
        return 'center';
    };

    return (
        <>
            <div
                className="bg-fixed bg-cover bg-center relative"
                style={{
                    height: device == 'desktop' ? '500px' : '350px',
                    backgroundImage: `url(/resource/indendkorea/page_header/${device}/${nav_code}.jpg)`,
                    backgroundPositionY: `${getBackgroundPosY()}`,
                }}
            >
                <div
                    style={{
                        height: device == 'desktop' ? '500px' : '350px',
                        backgroundColor: 'rgba(0,0,0,0.3)',
                    }}
                >
                    <div className="absolute top-0">
                        <motion.div initial={{ x: -300, opacity: 0 }} whileInView={{ x: -50, opacity: 1 }} transition={{ duration: 1.5 }}>
                            <img src="/resource/indendkorea/images/main/bg_line.png" className="w-3/4 lg:w-full" alt="" />
                        </motion.div>
                    </div>
                    <div className="absolute absolute-middle">
                        <motion.div initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                            <div className="text-white text-xl lg:text-3xl whitespace-pre text-center">{getMessage()}</div>
                        </motion.div>
                    </div>
                </div>
            </div>
            <div className="w-full text-center text-2xl lg:text-4xl font-semibold text-black mb-10 pt-20">
                <span className="p-3 border-b border-black">{params.title}</span>
            </div>
        </>
    );
}
