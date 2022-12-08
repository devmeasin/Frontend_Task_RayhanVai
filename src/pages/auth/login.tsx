import Layout from 'components/Layout/Layout';
import { UnAuthenticated } from 'components/ProtectedRoute';
import { Login as LoginX } from 'components/auth/Login';

const Login = () => {
    return (
        <>
            <Layout footerTopStatic={false}>
                <UnAuthenticated>
                    <LoginX />
                </UnAuthenticated>
            </Layout>
        </>
    );
};

export default Login;

