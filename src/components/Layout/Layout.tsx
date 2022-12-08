import React from 'react';
import { Container } from '@mantine/core';
import { PageLoader } from 'components/Loader';

interface LayoutProps {
    loader?: boolean;
    footerTopStatic?: boolean;
    children: React.ReactNode;
}


const Layout = ({loader = false, footerTopStatic = true, children} : LayoutProps ) => {
    return (
        <div>
            <Container size={Number('97%')}>
                {loader === true ? <PageLoader /> : children}
            </Container>
        </div>
    )
}

export default Layout;
