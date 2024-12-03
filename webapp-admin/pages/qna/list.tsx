import type { NextPage } from 'next';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Empty from '@/components/Empty';

const QnaList: NextPage = (props: any) => {
    const router = useRouter();
    const [oNav, setONav] = useState({ nav_id: 12, nav_name: '복지드림' });
    useEffect(() => {
        const { site_id } = router.query;
        if (site_id == 'dream') {
            setONav({ nav_id: 12, nav_name: '복지드림' });
        } else if (site_id == 'indend') {
            setONav({ nav_id: 13, nav_name: '인디앤드' });
        }
    }, [router]);

    return (
        <Layout user={props.user} title="indendkorea admin console" nav_id={oNav.nav_id} crumbs={['문의내역', oNav.nav_name]}>
            <Empty title={oNav?.nav_name} />
            <Empty title={oNav?.nav_name} />
            <Empty title={oNav?.nav_name} />
            <Empty title={oNav?.nav_name} />
            <Empty title={oNav?.nav_name} />
        </Layout>
    );
};

export default QnaList;
