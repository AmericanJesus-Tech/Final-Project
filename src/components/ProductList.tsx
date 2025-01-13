import { useEffect, useState } from "react"
import type { Product } from "../types"
import { Link, useLoaderData, useParams } from "react-router-dom"


export const productListLoader = async () => {
    const response = await fetch("http://localhost:3000/products")
    if (!response.ok) {
        throw new Error(response.statusText)
        return []
    }
    const data = await response.json()
    return data
}


export default function ProductList() {
    const products = useLoaderData() as Product[]
    const [productsDelete, setProductsDelete] = useState<Product[]>([]);
    const [isAddingToCart, setIsAddingToCart] = useState(false)
    const [error, setError] = useState<null | string>(null)
    const [cartItems, setCartItems] = useState<Product[]>([])
    const { productId } = useParams()
    const [showEdit, setShowEdit] = useState(false)
    const [editProduct, setEditProduct] = useState<Product | null>(null)

    // useEffect to get card items, and make the function to get cart items.
    useEffect(() => {
        fetchCartItems()
    }, [])

    const fetchCartItems = async () => {
        try {
            const response = await fetch("http://localhost:3000/cart" + productId)
            const data = await response.json()
            setCartItems(data)
        } catch (error) {
            console.error(error)
        }
    }

    const fetchPut = async (product: Product) => {
        try {
            const response = await fetch(`http://localhost:3000/products/${product.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const handleUpdate = (product: Product) => {
        fetchPut(product)
    }

    const addToCart = async (product: Product) => {
        console.log("product id at add: ", product)
        const newCartItem = {
            productID: product.id,
            amount: 1,
            name: product.name,
            price: product.price,
            brand: product.brand
        }
        setIsAddingToCart(true)
        try {
            const response = await fetch("http://localHost:3000/cart", {
                method: "POST",
                body: JSON.stringify(newCartItem),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (!response.ok) {
                setError(response.statusText)
            }
        } catch (error: any) {
            setError(error.message)
        }
        setCartItems([...cartItems, newCartItem])
        setIsAddingToCart(false)

    }

    const handleDelete = async (productId: string) => {
        try {
            const response = await fetch(`http://localhost:3000/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setProductsDelete(productsDelete.filter(product => product.id !== Number(productId)));
            console.log('Delete Success');
        } catch (error: any) {
            setError(error.message);
        }
    };
    
    const handleEditClick = (product: Product) => {
        setEditProduct(product)
        setShowEdit(true)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editProduct) {
            const { name, value } = e.target
            setEditProduct({ ...editProduct, [name]: name === 'price' ? Number(value) : value })
        }
    }

    return (
        <>
            <h2 className="display-5 mb-4">Crave</h2>
            <div className="d-flex flex-wrap gap-3">
                {error && <p className="text-danger">{error}</p>}
                {products.map(product => (
                    <div className="card flex-grow-1" key={product.id}>
                        <div className="card-body">
                            <h3 className="card-title">{product.name}</h3>
                            <p className="card-text">{product.brand}</p>
                            <p><Link to={"/products/" + product.id}>Details</Link></p>
                            <button
                                className="btn btn-success"
                                disabled={isAddingToCart}
                                onClick={() => addToCart(product)}
                            >
                                {isAddingToCart ? "Adding..." :
                                    "$" + product.price.toFixed(2)}
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={() => handleEditClick(product)}>Edit</button>
                            <button
                                className="btn btn-danger"
                                onClick={() => handleDelete(product.id?.toString() || '')}
                            >
                                Delete
                            </button>
                            {showEdit && editProduct && editProduct.id === product.id && (
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editProduct.name}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="brand"
                                        value={editProduct.brand}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="number"
                                        name="price"
                                        value={editProduct.price}
                                        onChange={handleInputChange}
                                    />
                                    <button
                                        onClick={() => handleUpdate(editProduct)}
                                    >
                                        Save
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
} 
