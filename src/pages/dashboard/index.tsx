import React from 'react';
import Layout from 'components/Layout/Layout';
import {IsAuthenticated} from 'components/ProtectedRoute';
import {Dashboard} from 'components/Layout/Dashboard';

const dashboard = () => {
    return (
        <div>
            <Layout>
                <IsAuthenticated>
                    <Dashboard/>
                </IsAuthenticated>
            </Layout>
        </div>
    )
}

export default dashboard;
