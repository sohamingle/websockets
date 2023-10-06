import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import NavbarComponent from "@/components/Navbar"

export default async function Home() {

  const session = await getServerSession(authOptions)
  if (session) {
    redirect('/dashboard')
  }

  return (
    <>
      <NavbarComponent />
      <main className="p-10 space-y-6">
        <h1 className="text-5xl">Welcome to Chat App</h1>
        <p>Made using tRPC, Socket.io, Typescript, Tailwind CSS, NextUI and etc.</p>
        <p>Login or Sign Up to use.</p>
      </main>
    </>
  )
}
