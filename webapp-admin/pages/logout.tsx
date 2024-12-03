import { GetServerSideProps, NextPage, NextPageContext } from 'next';
const Logout: NextPage = (props: any) => {
    return <></>;
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    ctx.res?.setHeader('set-cookie', `${process.env.NEXT_PUBLIC_TOKENNAME}=; path=/;`);
    return {
        redirect: {
            permanent: false,
            destination: '/login',
        },
    };
};

export default Logout;
