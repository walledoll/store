import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import Products from "../components/Products"
import { ROUTES } from "./routes"
import { ProductDetails } from "@components/ProductDetails"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path={ROUTES.HOME} element={<Products />} />
        <Route path={ROUTES.DETAILS} element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
)
}

export default App
