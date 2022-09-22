// import {  PrismaClient } from "@prisma/client";
import { NextPage } from "next";
import Head from "next/head";
import { signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";
const Login: NextPage = (props): JSX.Element => {
  const [user, setUser] = useState({ password: "" });
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      password: user.password,
      callbackUrl: '/'
    });
  };
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div
          className="
          flex flex-col
          bg-white
          shadow-md
          px-4
          sm:px-6
          md:px-8
          lg:px-10
          py-8
          rounded-3xl
          w-50
          max-w-md
        "
        >
          <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
            Selamat Datang
          </div>
          <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
            Silahkan Login Dulu
          </div>
          <div className="mt-10">
            <form method="POST" onSubmit={handleSubmit}>
              <input type="hidden" name="credentialsID" />
              <div className="flex flex-col mb-5">
                <label className="mb-1 text-xs tracking-wide text-gray-600">
                  Nomor Induk Pegawai
                </label>
                <div className="relative">
                  <div className="icon">
                    <NIMIcon />
                  </div>
                  <input
                    type="password"
                    name="password"
                    className="input"
                    placeholder="Masukkan NIP"
                    value={user.password}
                    onChange={(e) => setUser({ password: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex w-full">
                <button type="submit" className="btn-submit">
                  <span className="mr-2 uppercase">Sign In</span>
                  <span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const NIMIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
      />
    </svg>
  );
};

export default Login;
