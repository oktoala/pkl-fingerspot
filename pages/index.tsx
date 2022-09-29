import type { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { useRef, useState } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { Pegawaii } from "./utils/interfaces";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useAtom } from "jotai";
import { dateState } from "./utils/state";

const Home: NextPage = (): JSX.Element => {
  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      Router.replace("/login");
    },
  });

  const users = data?.users as Pegawaii;
  const tableRef = useRef(null);

  const [state, setState] = useAtom(dateState);

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div>
      <Head>
        <title>{users.nama}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto">
        <div className="mt-2">
          <div className="">
            <DownloadTableExcel
              filename={`${users.nama}`}
              currentTableRef={tableRef.current}
              sheet="sheet1"
            >
              <button className="bg-green-500 p-2 text-sm rounded-md text-white">
                Download Excel
              </button>
            </DownloadTableExcel>
          </div>
          <div className="overflow-x-auto h-[80vh]">
            <table
              ref={tableRef}
              className="mt-5 border-collapse table-auto w-full text-sm overflow-auto"
            >
              <thead className="">
                <tr>
                  <th className="th">ID</th>
                  <th className="th">Nama</th>
                  <th className="th">Jabatan</th>
                  <th className="th">Departemen</th>
                  <th className="th">Kantor</th>
                  <th className="th">Tanggal</th>
                  {[...Array(users.scanLen)].map((e, i) => {
                    return (
                      <th key={i} className="th">
                        Scan {++i}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="bg-white">
                {users.data.map((e, i) => {
                  if (
                    e.dateParse >= Date.parse(`${state[0].startDate}`) &&
                    e.dateParse <= Date.parse(`${state[0].endDate}`)
                  ) {
                    return (
                      <tr key={i}>
                        <td className="td">{users.nip}</td>
                        <td className="td">{users.nama}</td>
                        <td className="td">{users.jabatan}</td>
                        <td className="td">{users.departemen}</td>
                        <td className="td">{users.kantor}</td>
                        <td className="td">{e.tanggal}</td>
                        {e.scan.reverse().map((e, i) => {
                          return (
                            <td key={i + e} className="td">
                              {e}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  } else {
                    return null;
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

const Loading: NextPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="w-12 h-12 rounded-full animate-spin
                    border-8 border-solid border-blue-700 border-t-transparent shadow-md"
      ></div>
    </div>
  );
};

export default Home;
