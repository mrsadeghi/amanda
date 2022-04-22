export class Product {
  city: string;
  id: number;
  productName: string;
  price: number;
  star: number;
  imageUrl: string;
  description: string;
  category: string;
}

export class ProductRequestVM {
  cityId: number;
  productName: string;
  price: number;
  description: string;
  imageData: string;
}