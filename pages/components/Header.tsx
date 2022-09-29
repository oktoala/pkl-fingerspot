import { pegawai } from "@prisma/client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import { useState } from "react";
import { atom, useAtom } from "jotai";

// Atom
export const dateState = atom<Range[]>([
  {
    startDate: new Date("2018-01-01"),
    endDate: new Date(),
  },
]);


// Interfaces
export interface Pegawaii {
  nip: string | null | undefined;
  nama: string | undefined;
  jabatan: string | null | undefined;
  departemen: string | null | undefined;
  kantor: string | null | undefined;
  data: DateScan[];
  scanLen: number;
}

export interface DateScan {
  tanggal: string | undefined;
  scan: Scan[];
  dateParse: number;
}

export interface Scan {
  scanStr: string;
  scanParse: number;
}


export interface Selection {
  startDate: Date;
  endDate: Date;
  key: string;
}

const Header = () => {
  const [state, setState] = useAtom(dateState);
  const startDate = state[0].startDate;
  const endDate = state[0].endDate;
  const [show, setShow] = useState(false);
  const { status, data } = useSession();
  const pegawaii = data?.pegawai as pegawai;
  const users = data?.users as Pegawaii;
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
            {status === "authenticated" && (
              <>
                <a
                  href="#"
                  className="bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
                >
                  {users.nama}
                </a>
                <button
                  onClick={() => setShow(!show)}
                  className={`border-2 border-orange-500 ${show ? 'bg-orange-500 text-white font-bold' : 'text-orange-500'} p-2 rounded-md mr-10 `}
                >
                {startDate?.getDate()}-{startDate?.getMonth()}-{startDate?.getFullYear()}{" "}/{" "}
                {endDate?.getDate()}-{endDate?.getMonth()}-{endDate?.getFullYear()} 
                </button>
                {show && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item: RangeKeyDict) => setState([item.range1])}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                    dateDisplayFormat="dd-MM-yyyy"
                    className="absolute top-16"
                  />
                )}
              </>
            )}
            {status === "unauthenticated" ? (
              <Link href="/login">
                <a className="sign text-white">Log In</a>
              </Link>
            ) : (
              <button
                onClick={() => signOut()}
                className="sign border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
