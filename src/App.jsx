import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";

export default function App() {
  const [page, setPage] = useState("home"); // "home" | "detail" | "cart"
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");

  function openProduct(product) {
    setSelectedProduct(product);
    setPage("detail");
  }

  function openCart() {
    setPage("cart");
  }

  function goHome() {
    setPage("home");
    setSelectedProduct(null);
  }

  return (
    <CartProvider>
      <Navbar
        search={search}
        setSearch={setSearch}
        onCartClick={openCart}
      />

      {page === "home" && (
        <HomePage search={search} onSelectProduct={openProduct} />
      )}

      {page === "detail" && selectedProduct && (
        <ProductDetail product={selectedProduct} onBack={goHome} />
      )}

      {page === "cart" && (
        <CartPage onBack={goHome} />
      )}
    </CartProvider>
  );
}
