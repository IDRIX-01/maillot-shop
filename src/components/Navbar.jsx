import { useState, useRef, useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function Navbar({ search, setSearch, onCartClick }) {
  const { totalItems } = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header style={styles.header}>
      {/* Logo */}
      <div style={styles.logoArea}>
        <div style={styles.logoCircle}>
          <span style={styles.logoText}>⚽</span>
        </div>
        <span style={styles.brandName}>BoutiqueMaillot</span>
      </div>

      {/* Search */}
      <div style={styles.searchWrap}>
        <span style={styles.searchIcon}>🔍</span>
        <input
          type="text"
          placeholder="Rechercher un maillot..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* Right */}
      <div style={styles.rightArea}>
        {/* Cart */}
        <button onClick={onCartClick} style={styles.cartBtn}>
          🛒
          {totalItems > 0 && (
            <span style={styles.badge}>{totalItems}</span>
          )}
        </button>

        {/* User menu */}
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <button
            onClick={() => setDropdownOpen((o) => !o)}
            style={styles.avatarBtn}
            title="Mon compte"
          >
            <div style={styles.avatarCircle}>KS</div>
          </button>

          {dropdownOpen && (
            <div style={styles.dropdown}>
              <div style={styles.dropHeader}>
                <p style={styles.userName}>KONE SIE</p>
                <p style={styles.userRole}>Technician</p>
              </div>
              <div style={styles.dropBody}>
                {["❓ Aide", "ℹ️ À propos", "⚙️ Mes préférences"].map((label) => (
                  <button key={label} style={styles.dropItem}>{label}</button>
                ))}
                <button style={{ ...styles.dropItem, color: "#e53e3e", fontWeight: "700" }}>
                  ⏻ Déconnexion
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    height: "66px",
    background: "linear-gradient(90deg, #0f0c29, #302b63, #24243e)",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    boxShadow: "0 2px 20px rgba(0,0,0,0.4)",
  },
  logoArea: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none",
  },
  logoCircle: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #f6d365, #fda085)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
  },
  logoText: { fontSize: "20px" },
  brandName: {
    color: "#fff",
    fontFamily: "'Georgia', serif",
    fontWeight: "700",
    fontSize: "17px",
    letterSpacing: "0.5px",
  },
  searchWrap: {
    flex: 1,
    maxWidth: "420px",
    margin: "0 24px",
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    fontSize: "14px",
    opacity: 0.6,
  },
  searchInput: {
    width: "100%",
    padding: "9px 14px 9px 36px",
    borderRadius: "24px",
    border: "1.5px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.1)",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    backdropFilter: "blur(6px)",
    boxSizing: "border-box",
  },
  rightArea: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  cartBtn: {
    position: "relative",
    background: "rgba(255,255,255,0.1)",
    border: "1.5px solid rgba(255,255,255,0.2)",
    borderRadius: "50%",
    width: "42px",
    height: "42px",
    fontSize: "18px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s",
  },
  badge: {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    background: "#ff4d4d",
    color: "#fff",
    borderRadius: "50%",
    width: "18px",
    height: "18px",
    fontSize: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  avatarBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
  },
  avatarCircle: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #f6d365, #fda085)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#333",
    fontWeight: "bold",
    fontSize: "13px",
    border: "2px solid rgba(255,255,255,0.4)",
  },
  dropdown: {
    position: "absolute",
    top: "50px",
    right: 0,
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
    width: "220px",
    overflow: "hidden",
    zIndex: 2000,
  },
  dropHeader: {
    padding: "14px 16px",
    borderBottom: "1px solid #eee",
    background: "#f8f9fa",
  },
  userName: { margin: 0, fontWeight: "700", fontSize: "14px", color: "#222" },
  userRole: { margin: "2px 0 0", fontSize: "12px", color: "#888" },
  dropBody: { padding: "6px 0" },
  dropItem: {
    display: "block",
    width: "100%",
    padding: "10px 16px",
    background: "none",
    border: "none",
    textAlign: "left",
    fontSize: "13px",
    cursor: "pointer",
    color: "#444",
    transition: "background 0.15s",
  },
};
