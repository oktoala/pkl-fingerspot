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
  scan: string[];
  dateParse: number;
}