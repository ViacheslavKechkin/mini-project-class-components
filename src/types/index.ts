export type TProduct = {
    id: string,
    title: string,
    price: number,
    quantity: number,
    count: number,
}

export type TQuantityArg = {
    product: TProduct,
    add: boolean
}