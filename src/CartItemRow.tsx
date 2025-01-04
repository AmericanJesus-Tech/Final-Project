
import { CartItem, Product } from "./types"

type Props = {
    item: CartItem
    products: Product[]
}

export default function CartItemRow({item, products}: Props){
    // do fetch to cart to get items in the cart. 
    
    //const product = products.find(p => p.id === item.productId)

    console.log("product: ", products)
    return (
        <div>
            {products.map(product => {
                return(
            <tr>
                <td>{product?.name}</td>
                <td>${product?.price.toFixed(2)}</td>
                <td>{item.amount}</td>
            </tr>
            )})
            }
        </div>
    )
}
