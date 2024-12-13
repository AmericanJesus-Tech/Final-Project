import { CartItem, Product } from "./types"

type Props = {
    item: CartItem
    products: Product[]
}

export default function CartItemRow({item, products}: Props){
    const product = products.find(p => p.id === item.productId)
    return(
        <tr>
            <td>{product?.name || "???"}</td>
            <td>${product?.price.toFixed(2)}</td>
            <td>{item.amount}</td>
        </tr>
    )
}