// import { createContext, useState } from "react";
// import { DateRange } from "react-day-picker";

// const initialState: {
//   from: Date | undefined;
//   to: Date | undefined;
// } = { from: undefined, to: undefined };

// const ReservationContext = createContext(initialState);

// function ReservationProvider({ children }: { children: React.ReactNode }) {
//   const [range, setRange] = useState<{
//     from: Date | undefined;
//     to: Date | undefined;
//   }>(initialState);

//   return (
//     <ReservationContext.Provider value={{ range, setRange }}>
//       {children}
//     </ReservationContext.Provider>
//   );
// }
"use client";
import { createContext, useContext, useState } from "react";

export interface Range {
  from: Date | undefined;
  to: Date | undefined;
}

export type RangeContextType = {
  range: Range;
  setRange: (range: Range) => void;
  resetRange: () => void;
};

const initialState: Range = { from: undefined, to: undefined };

const ReservationContext = createContext<RangeContextType | null>(null);

function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [range, setRange] = useState(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext) as RangeContextType;
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}

export { ReservationProvider, useReservation };
