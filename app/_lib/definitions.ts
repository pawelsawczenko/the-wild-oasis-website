export type Cabin = {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
};

export type Guest = {
  id: number;
  created_at: string;
  fullName: string;
  email: string;
  nationalID: string;
  nationality: string;
  countryFlag: string;
};

export type Booking = {
  id: number;
  guestId: number;
  startDate: string;
  endDate: string;
  numNights: number;
  totalPrice: number;
  numGuests: number;
  status: string;
  created_at: string;
  cabins: { name: string; image: string };
};
