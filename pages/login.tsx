// import {  PrismaClient } from "@prisma/client";
import {
  ClientSafeProvider,
  getProviders,
  getSession,
  GetSessionParams,
  LiteralUnion,
  signIn,
} from "next-auth/react";
import Head from "next/head";
import { BuiltInProviderType } from "next-auth/providers";

// const prisma = new PrismaClient();

export const getServerSideProps = async (context: GetSessionParams) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {
      providers: await getProviders(),
    },
  };
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   const pegawaii = await prisma.pegawai.findMany({
//     select: {
//       pegawai_nama: true,
//     },
//   });
//   return {
//     props: {
//       pegawaii: JSON.parse(JSON.stringify(pegawaii)),
//     },
//   };
// };
// type Props = {
//   pegawaii: pegawai[];
// };

type provider = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
};

function login(e: any): void {
  signIn(e.target.credentialsID.value, {
    nip: e.target.nip.value,
  });
}

const Login: React.FC<provider> = ({ providers }) => {
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
            <form method="POST" onSubmit={login}>
              <input
                type="hidden"
                name="credentialsID"
                value={providers.credentials.id}
              />
              <div className="flex flex-col mb-5">
                <label className="mb-1 text-xs tracking-wide text-gray-600">
                  Nomor Induk Pegawai
                </label>
                <div className="relative">
                  <div
                    className="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                  >
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
                  </div>
                  <input
                    id="nip"
                    type="text"
                    name="nip"
                    className="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                    placeholder="Masukkan NIP"
                  />
                </div>
              </div>
              <div className="flex w-full">
                <button
                  type="submit"
                  className="
                  flex
                  mt-2
                  items-center
                  justify-center
                  focus:outline-none
                  text-white text-sm
                  sm:text-base
                  bg-blue-500
                  hover:bg-blue-600
                  rounded-2xl
                  py-2
                  w-full
                  transition
                  duration-150
                  ease-in
                "
                >
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

export default Login;
