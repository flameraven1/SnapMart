import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter , data, RouterProvider } from 'react-router-dom'
import Body from './pages/landing-page/Body.tsx'
import Products from './pages/products/Products.tsx'
import Specific from './pages/specific-product/Specific.tsx'
import Tabs from './pages/specific-product/tabs/Tabs.tsx'
import Tabs2 from './pages/specific-product/tabs/Tabs2.tsx'
import Tabs3 from './pages/specific-product/tabs/Tabs3.tsx'
import Search from './pages/search/Search.tsx'
import Cart from './pages/cart/Cart.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import Checkout from './pages/checkout/Checkout.tsx'
import Payment from './pages/payment/Payment.tsx'

const router = createBrowserRouter([
  {
    path : "/",
    element : <App />,
    children : [
      {
        path : "",
        element : <Body />
      },
      {
        path : "/products",
        element : <Products />
      },
      {
        path : "/search",
        element : <Search />
      },
      {
        path : "/cart",
        children : [
          {
            path : "",
            element : <Cart />,
          },
          {
            path : "checkout",
            children : [
              {
                path : "",
                element : <Checkout />
              },
              {
                path : "payment",
                element : <Payment />
              },
            ]
          },
        ]
      },
      {
        path : "/products/:id",
        element : <Specific />,
        children  : [
          {
            path : "ProductDetails",
            element : <Tabs />
          },
          {
            path : "Shipping&Availability",
            element : <Tabs2 />
          },
          {
            path : "ShippingInformation",
            element : <Tabs3 />
          },
        ]
      },
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
