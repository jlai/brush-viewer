import Head from 'next/head'
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Button, { ButtonProps } from '@mui/material/Button';
import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const LinkButton: React.FC<{
    href: string;
    children: any;
    buttonProps?: ButtonProps;
    target?: string;
}> = ({ href, children, target, ...buttonProps }) => (
    <Link href={href} passHref>
        <Button sx={{ color: 'white' }} color="error" {...buttonProps} {...({ target })}>{children}</Button>
    </Link>
);

export const Header = () => (
    <>
        <Head>
            <title>ABR Brush Viewer</title>
        </Head>

        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" color="inherit" component="div">
                    <Link href="/">ABR Brush Viewer</Link>
                </Typography>
                <Box flexGrow={1} />
                <LinkButton href="/docs">Documentation</LinkButton>
                <LinkButton href="https://www.github.com/jlai/brush-viewer" target="_blank">Github</LinkButton>
            </Toolbar>
        </AppBar>
    </>
);

export default Header;
