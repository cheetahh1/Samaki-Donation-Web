import Image from "next/image";
import { Button } from "@/components/ui/button"; 
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-2 bg-white shadow-sm">
      <div className="flex items-center gap-2">
        <Link href="/home"> 
        <Image src="/logo.png" alt="Samaki Logo" width={95} height={28} />
        </Link>
      </div>

      <nav className="md:flex gap-6 text-sm text-gray-600 ml-auto mr-8 hidden">
        <Link href="/home" className="hover:text-gray-900">Home</Link>
        <Link href="/home" className="hover:text-gray-900">About</Link>
        <a href="/admin_login" className="hover:text-gray-900">Admin</a>
      </nav>
      <Link href="/Signup"> {/* Use Link to navigate */}
        <Button className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded-lg">
          Sign In
        </Button>
      </Link>
            
    </header>
  );
}