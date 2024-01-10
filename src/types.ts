export type Property = {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
};

export type Booking = {
  id: number;
  propertyId: number;
  start: Date;
  end: Date;
  guestName: string;
};
