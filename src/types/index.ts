export type Product = {
    id: number,
    name: string,
    image: string,
    description: string,
    price: number,
}

export type ProductItem = Product & {
    quantity: number
}

export type ProductId = Product['id']