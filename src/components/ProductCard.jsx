import { useState } from "react";

export default function ProductCard({ product, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ ...styles.card, boxShadow: hovered ? "0 12px 32px rgba(0,0,0,0.18)" : "0 2px 12px rgba(0,0,0,0.08)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(product)}
    >
      {/* Image zone */}
      <div style={{ ...styles.imgWrap, background: `${product.color}18` }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            ...styles.img,
            transform: hovered ? "scale(1.1)" : "scale(1)",
          }}
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <div style={{ ...styles.fallback, display: "none" }}>
          <span style={{ fontSize: "52px" }}>⚽</span>
        </div>
        <div style={{ ...styles.overlay, opacity: hovered ? 1 : 0 }}>
          <span style={styles.overlayText}>👁 Aperçu rapide</span>
        </div>
        <div style={{ ...styles.colorBadge, background: product.color }} />
      </div>

      {/* Info */}
      <div style={styles.info}>
        <h3 style={styles.name}>{product.name}</h3>
        <div style={styles.priceRow}>
          <span style={styles.price}>{product.price} FCFA</span>
          <span style={styles.tag}>⚡ En stock</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "box-shadow 0.25s, transform 0.25s",
    transform: "translateY(0)",
    border: "1px solid #f0f0f0",
  },
  imgWrap: {
    position: "relative",
    height: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  img: {
    maxHeight: "160px",
    maxWidth: "160px",
    objectFit: "contain",
    transition: "transform 0.35s ease",
    zIndex: 1,
  },
  fallback: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(15,12,41,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity 0.25s",
    zIndex: 2,
  },
  overlayText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: "14px",
    letterSpacing: "0.5px",
  },
  colorBadge: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    border: "2px solid #fff",
    zIndex: 3,
  },
  info: {
    padding: "14px 16px",
  },
  name: {
    margin: "0 0 8px",
    fontSize: "14px",
    fontWeight: "700",
    color: "#1a1a2e",
    fontFamily: "'Georgia', serif",
  },
  priceRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontSize: "18px",
    fontWeight: "800",
    color: "#302b63",
  },
  tag: {
    fontSize: "10px",
    background: "#e8f5e9",
    color: "#2e7d32",
    padding: "3px 8px",
    borderRadius: "20px",
    fontWeight: "600",
  },
};
