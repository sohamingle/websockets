import Image from 'next/image';
import chatLogo from '@/public/chatLogo.png'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import Link from 'next/link';
import { Button } from '@nextui-org/button';

const NavbarComponent = async () => {

    return (
        <Navbar isBlurred={false} maxWidth='full'className=' shadow-black shadow-sm px-12'>
            <Link href={'/'}>
                <NavbarBrand className='space-x-3'>
                    <Image
                        src={chatLogo}
                        alt='logo'
                        width={30}
                        height={30}
                    />
                    <p className="font-bold text-inherit">Chat App</p>
                </NavbarBrand>
            </Link>
            <NavbarContent justify='end'>
                <NavbarItem>
                    <Button as={Link} href='/api/auth/signin' variant='ghost' color='primary'>Login</Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}

export default NavbarComponent;