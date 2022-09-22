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
                <a className="sign">Log In</a>
              </Link>
            ) : (
              <button onClick={() => signOut()} className="sign">
                Log Out
              </button>
            )}
            {status === "authenticated" && (
              <a
                href="#"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                {pegawaii.pegawai_alias}
              </a>
            )}
          </div>
          {/* <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-white rounded bg-blue-700 lg:bg-transparent lg:text-blue-700 lg:p-0 dark:text-white"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              
            </ul>
          </div> */}
        </div>
      </nav>
    </header>
  );
};
export default Header;
