import Container from '@mui/material/Container';
import Header from './Header';

export const Layout: React.FC<{
    children?: any,
    padding?: number | string
}> = ({ children, padding }) => (
    <>
        <Header />
        <main style={{ padding }}>{children}</main>
    </>
);

export const ContainerLayout: React.FC = ({ children }) => (
    <Layout><Container>{children}</Container></Layout>
);

export default Layout;
