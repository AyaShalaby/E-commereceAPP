import { ProductI } from "./product"

export interface WishlistResponse {
    status: string
    message?: string
    count: number
    data: ProductI[]
}



