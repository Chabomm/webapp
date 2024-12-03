import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Seo from '@/components/Seo';
import Aside from '@/components/Aside';
import Breadcrumb from '@/components/Breadcrumb';
import { checkNumeric } from '@/libs/utils';

export default function LayoutPopup({ children, title }) {
    return (
        <>
            <Seo title={title} />
            {children}
        </>
    );
}
