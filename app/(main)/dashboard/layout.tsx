import NavbarComponent from "@/components/Navbar"
import SideNav from "@/components/SideNav"


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="h-screen flex justify-between">
            <SideNav />
            {children}
        </main>
    )
}
