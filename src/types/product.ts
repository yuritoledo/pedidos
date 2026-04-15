export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  active: boolean;
}

export interface Store {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  whatsappNumber: string;
}
