import { useEffect, useState } from "react"
import { CartItem, Product } from "../types"
import CartItemRow from "../CartItemRow"


export default function CartList() {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        const fetchCart = async () => {
            setLoading(true)
            try {
                const response = await fetch("http://localhost:3000/cart")
                if (!response.ok) {
                    setErrorMessage(response.statusText)
                } else {
                    const data = await response.json()
                    setCartItems(data)
                }
            } catch (error: any) {
                setErrorMessage(error.message)
            }
            setLoading(false)
        }
        fetchCart()

        const fetchProducts = async () => {
            setLoading(true)
            try {
                const response = await fetch("http://localhost:3000/products")

                if (!response.ok) {
                    setErrorMessage("Oops. No candy for you:" + response.statusText)
                } else {

                    const data = await response.json()
                    setProducts(data)
                    setErrorMessage("")
                }
            } catch (error: any) {
                setErrorMessage("Oops. No candy for you:" + error.message)
            }
            setLoading(false)
        }
        fetchProducts()
    }, [])
    return (
        <>
            <h2 className="display-5 mb-4">Crave Cart</h2>
            {loading ? <p className="text-body-tertiary">Loading...</p> :
                errorMessage ? <p className="text-danger">{errorMessage}</p> :
                    <table className="table table-striped">
                        <tbody>
                            {cartItems.map(item => (
                                <CartItemRow
                                    key={item.id}
                                    item={item}
                                    products={products}
                                />
                            ))}
                        </tbody>
                    </table>
            }
        </>
    )
}