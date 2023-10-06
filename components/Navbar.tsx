import Image from 'next/image';
import chatLogo from '@/public/chatLogo.png'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import Link from 'next/link';
import AvatarProvider from '@/providers/avatar-provider';

const NavbarComponent = async () => {

    return (
        <Navbar maxWidth='full' className='shadow-black shadow-sm px-12'>
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
                    <AvatarProvider/>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}

export default NavbarComponent;