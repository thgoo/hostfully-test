export type Property = {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
};

export type Booking = {
  id: string;
  propertyId: number;
  start: Date;
  end: Date;
};

export type BookingWithProperty = Booking & {
  property: Property;
  nights: number;
};
