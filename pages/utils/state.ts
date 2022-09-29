import { atom, useAtom } from "jotai";

import { Range  } from "react-date-range";
export const dateState = atom<Range[]>([
  {
    startDate: new Date("2018-01-01"),
    endDate: new Date(),
  },
]);
