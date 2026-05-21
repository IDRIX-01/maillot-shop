import { Search, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import HeaderAccount from "./HeaderAccount";

export default function Navbar({ search, setSearch, onCartClick, onBack }) {
  const { totalItems } = useCart();

  return (
    <header style={styles.header}>
      {/* Logo */}
      <div style={styles.logoArea}>
        <div style={styles.logoCircle}>⚽</div>
        <button
          onClick={onBack}
          style={styles.brandName}
        >
          BoutiqueMaillot
        </button>
      </div>

      {/* Recherche */}
      <div style={styles.searchWrap}>
        <span style={styles.searchIcon}><Search /></span>
        <input
          type="text"
          placeholder="Rechercher un maillot..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* Actions */}
      <div style={styles.rightArea}>
        {/* Panier */}
        <button onClick={onCartClick} style={styles.cartBtn}>
          <ShoppingCart />
          {totalItems > 0 && (
            <span style={styles.badge}>{totalItems}</span>
          )}
        </button>

        {/* Compte */}
        <HeaderAccount />
      </div>
    </header>
  );
}

const styles = {
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    height: "66px",
    background: "linear-gradient(135deg, rgba(15,12,41,0.97) 0%, rgba(48,43,99,0.97) 100%)",
    display: "flex",
    alignItems: "center",
    padding: "0 24px",
    gap: "16px",
    boxShadow: "0 2px 16px rgba(0,0,0,0.25)",
  },
  logoArea: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexShrink: 0,
  },
  logoCircle: {
    width: "36px",
    height: "36px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
  },
  brandName: {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "800",
    cursor: "pointer",
    fontFamily: "'Georgia', serif",
    letterSpacing: "0.5px",
    padding: 0,
  },
  searchWrap: {
    flex: 1,
    position: "relative",
    maxWidth: "480px",
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "rgba(255,255,255,0.4)",
    display: "flex",
    alignItems: "center",
    pointerEvents: "none",
  },
  searchInput: {
    width: "100%",
    padding: "9px 14px 9px 40px",
    borderRadius: "10px",
    border: "1.5px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  rightArea: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginLeft: "auto",
    flexShrink: 0,
  },
  cartBtn: {
    position: "relative",
    background: "rgba(255,255,255,0.1)",
    border: "none",
    color: "#fff",
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "20px",
  },
  badge: {
    position: "absolute",
    top: "-6px",
    right: "-6px",
    background: "#fda085",
    color: "#fff",
    fontSize: "10px",
    fontWeight: "800",
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};