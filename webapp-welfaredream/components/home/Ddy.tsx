import { motion } from 'framer-motion';
import BannerForLinkType from '@/components/UIcomponent/BannerForLinkType';

export default function Ddy({ data, device }: any) {
    return (
        <>
            {device == 'desktop' ? (
                <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 2 }} transition={{ duration: 1 }}>
                    <section className="w-full pt-20">
                        <div className="mx-auto" style={{ width: '1320px' }}>
                            {data.DDY_LIST?.map((v: any, i: number) => (
                                <div key={i}>
                                    <BannerForLinkType item={v} img={<img alt="img" src={v.banner_src} className="w-full" />} />
                                </div>
                            ))}
                        </div>
                    </section>
                </motion.div>
            ) : (
                <></>
            )}
        </>
    );
}
