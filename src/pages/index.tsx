import Layout from 'components/Layout/Layout';
import { UnAuthenticated } from 'components/ProtectedRoute';
import { Login } from 'components/auth/Login';

export default function HomePage() {
	return (
		<>
			<Layout>
				<UnAuthenticated>
					<Login />
				</UnAuthenticated>
			</Layout>
		</>
	);
}
