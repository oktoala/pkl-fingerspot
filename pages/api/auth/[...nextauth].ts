import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { DateScan, Pegawaii, Scan } from "../../components/Header";

const prisma = new PrismaClient();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getDate() {}

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { password } = credentials as {
          password: string;
        };

        const user = await prisma.pegawai.findUnique({
          where: {
            pegawai_pin: password,
          },
        });

        if (!user && password === user!.pegawai_nip) {
          throw new Error("Error Login");
        }

        return { name: user?.pegawai_pin };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token, user }) {
      const users: Pegawaii = {
        nip: null,
        nama: "",
        jabatan: undefined,
        departemen: undefined,
        kantor: undefined,
        data: [],
        scanLen: 0,
      };

      const pegawaii = await prisma.pegawai.findUnique({
        where: {
          pegawai_pin: session.user?.name as string | undefined,
        },
      });
      const jabatan = await prisma.pembagian1.findFirst({
        where: {
          pembagian1_id: pegawaii?.pembagian1_id as number | undefined,
        },
      });
      const departemen = await prisma.pembagian2.findFirst({
        where: {
          pembagian2_id: pegawaii?.pembagian2_id as number | undefined,
        },
      });
      const kantor = await prisma.pembagian3.findFirst({
        where: {
          pembagian3_id: pegawaii?.pembagian3_id as number | undefined,
        },
      });

      const attendances = await prisma.att_log.findMany({
        where: {
          pin: session.user?.name as string | undefined,
        },
        orderBy: {
          scan_date: "asc",
        },
      });

      // Insert to user
      users.nip = pegawaii?.pegawai_nip;
      users.nama = pegawaii?.pegawai_nama;
      users.jabatan = jabatan?.pembagian1_nama;
      users.departemen = departemen?.pembagian2_nama;
      users.kantor = kantor?.pembagian3_nama;

      let go = true;
      let dateOld: number = 0;
      let index = 0;
      let scanLen = 0;

      attendances.forEach((e, i) => {
        const dateScan: DateScan = {
          tanggal: undefined,
          scan: [],
          dateParse: 0,
        };
        const scans: Scan = {
          scanParse: 0,
          scanStr: ""
        }

        const date = new Date(`${e.scan_date}`);

        const tanggal = date.getDate();
        const bulan = months[date.getMonth()];
        const tahun = date.getFullYear();
        const dateCurr = Date.parse(`${bulan} ${tanggal}, ${tahun}`);
        const jam = date.getUTCHours();
        const menit = date.getMinutes();
        const detik = date.getSeconds();
        const scanParse = Date.parse(`${bulan} ${tanggal}, ${tahun} ${jam}:${menit}:${detik}`);
        scans.scanParse = scanParse;
        scans.scanStr = `${jam}:${menit}:${detik}`;

        if (dateCurr === dateOld) {
          users.data[index].scan.push(scans);
          go = false;
          scanLen = scanLen < users.data[index].scan.length ? users.data[index].scan.length : scanLen;
        }
        if (dateCurr !== dateOld && i > 0) {
          go = true;
          index++;
        }

        if (go) {
          dateScan.tanggal = `${tanggal}-${bulan}-${tahun}`;
          dateScan.scan?.push(scans);
          dateScan.dateParse = dateCurr;
          users.data.push(dateScan);
          dateOld = dateCurr;
        }
      });
      


      users.scanLen = scanLen;
      session.users = users;
      return session;
    },
  },
};

export default NextAuth(authOptions);
