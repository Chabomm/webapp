import React from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ButtonTop from '@/components/ButtonTop';

const Layout = ({ children, title, nav_id, device }: { children: React.ReactNode; title: string; nav_id: string; device: string }) => {
    return (
        <div className={`bg-primary ${device}`}>
            <Header title={title} nav_id={nav_id} device={device} />
            {children}
            <ButtonTop title={title} nav_id={nav_id} device={device} />
            <Footer title={title} nav_id={nav_id} device={device} />
        </div>
    );
};

export default Layout;
