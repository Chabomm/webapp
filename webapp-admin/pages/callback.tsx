import { GetServerSideProps, NextPage, NextPageContext } from 'next';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { api, setContext } from '@/libs/axios';

const AzureCallBack: NextPage = (props: any) => {
    const router = useRouter();
    const redirect_url: string = router.query.redirect_url !== undefined ? router.query.redirect_url + '' : '';

    useEffect(() => {
        if (props.response?.code == 200) {
            localStorage.setItem('admin_menus', JSON.stringify(props.response.admin_menus));
            router.replace(redirect_url);
        }
    }, [props]);

    return <></>;
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    setContext(ctx);
    var request: any = {
        sub: ctx.query.sub,
    };
    var response: any = {};
    try {
        const { data } = await api.post(`/be/azure/pullgy`, request);
        response = data;
    } catch (e: any) {
        if (typeof e.redirect !== 'undefined') {
            return { redirect: e.redirect };
        }
    }
    return {
        props: { request, response },
    };
};

export default AzureCallBack;
