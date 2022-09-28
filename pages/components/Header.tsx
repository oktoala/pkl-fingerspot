import { pegawai } from "@prisma/client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { status, data } = useSession();
  const pegawaii= data?.pegawai as pegawai;
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between container mx-auto ">
          <Link href="/">
            <a className="flex items-center">
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                FingerSpot
              </span>
            </a>
          </Link>
          <div className="flex items-center lg:order-2">
            {status === "unauthenticated" ? (
              <Link href="/login">
                <a className="sign text-white">Log In</a>
              </Link>
            ) : (
              <button onClick={() => signOut()} className="sign border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                Log Out
              </button>
            )}
            {status === "authenticated" && (
              <a
                href="#"
                className="bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
              >
                {pegawaii.pegawai_nama}
              </a>
            )}
          </div>
          
        </div>
      </nav>
    </header>
  );
};
export default Header;
