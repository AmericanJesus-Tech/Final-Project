export type CartItem = {
    id: number,
    productId: number,
    amount: number,
}
export type Product ={
    "id"?: number,
    "name": string,
    "brand": string,
    "price": number,
    "flavor"?: string,
    "weight"?: string,
    "ingredients"?: string[],
    "inStock"?: boolean
  }
