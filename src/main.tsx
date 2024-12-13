import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Root from './Root.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProductList, { productListLoader } from './components/ProductList.tsx'
import CartList from './components/CartList.tsx'
import ErrorPage from './components/ErrorPage.tsx'
import ProductDetails from './components/ProductDetails.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <ProductList/>,
        loader: productListLoader
      },
      {
        path: "/cart",
        element: <CartList/>

      },
      {
        path: "/products/:productId",
        element: <ProductDetails/>
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
