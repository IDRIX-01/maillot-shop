import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function ProductDetail({ product, onBack }) {
  const { addToCart } = useCart();
  const [playerName, setPlayerName] = useState("");
  const [playerNumber, setPlayerNumber] = useState("");
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const nameLetters = playerName.replace(/[^A-Za-zÀ-ÿ]/g, "").length;
  const numberDigits = playerNumber.replace(/\D/g, "").length;
  const flocage = nameLetters + numberDigits;
  const total = (product.price + flocage) * quantity;

  function handleSubmit(e) {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      size,
      quantity,
      playerName,
      playerNumber,
      price: total,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  return (
    <div style={styles.page}>
      <button onClick={onBack} style={styles.back}>← Retour</button>

      <div style={styles.card}>
        {/* Left - image */}
        <div style={{ ...styles.imgSide, background: `${product.color}14` }}>
          <img
            src={product.image}
            alt={product.name}
            style={styles.img}
            onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "block"; }}
          />
          <div style={{ display: "none", fontSize: "80px", textAlign: "center" }}>⚽</div>
          <div style={{ ...styles.colorDot, background: product.color }} />

          {/* Live preview */}
          <div style={styles.preview}>
            <div style={styles.previewNumber}>{playerNumber || "00"}</div>
            <div style={styles.previewName}>{playerName.toUpperCase() || "NOM"}</div>
          </div>
        </div>

        {/* Right - form */}
        <div style={styles.formSide}>
          <h1 style={styles.title}>{product.name}</h1>
          <p style={styles.basePrice}>Prix de base : <strong>{product.price} €</strong></p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <Field label="Nom floqué">
              <input
                type="text"
                maxLength={15}
                placeholder="Nom au dos"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                style={styles.input}
              />
            </Field>

            <Field label="Numéro">
              <input
                type="text"
                maxLength={2}
                placeholder="Ex : 10"
                value={playerNumber}
                onChange={(e) => setPlayerNumber(e.target.value.replace(/\D/g, ""))}
                style={styles.input}
              />
            </Field>

            <div style={styles.row}>
              <Field label="Taille">
                <select value={size} onChange={(e) => setSize(e.target.value)} style={styles.select}>
                  {["S", "M", "L", "XL", "XXL"].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </Field>

              <Field label="Quantité">
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  style={styles.input}
                />
              </Field>
            </div>

            {flocage > 0 && (
              <div style={styles.flocageNote}>
                ✂️ Flocage : +{flocage} € ({nameLetters} lettres + {numberDigits} chiffres)
              </div>
            )}

            <div style={styles.totalBox}>
              <span>Prix total</span>
              <span style={styles.totalAmt}>{total} €</span>
            </div>

            <button type="submit" style={{ ...styles.addBtn, background: added ? "#2e7d32" : "linear-gradient(90deg, #302b63, #0f0c29)" }}>
              {added ? "✓ Ajouté au panier !" : "🛒 Ajouter au panier"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <label style={{ display: "block", fontWeight: "700", fontSize: "12px", color: "#666", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</label>
      {children}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6fb",
    paddingTop: "86px",
    paddingBottom: "40px",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  back: {
    background: "none",
    border: "none",
    color: "#302b63",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    marginBottom: "20px",
    padding: "8px 16px",
    borderRadius: "8px",
    background: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  card: {
    maxWidth: "900px",
    margin: "0 auto",
    background: "#fff",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
    display: "flex",
    flexWrap: "wrap",
  },
  imgSide: {
    flex: "0 0 340px",
    minHeight: "420px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "32px",
    position: "relative",
    gap: "16px",
  },
  img: {
    maxWidth: "220px",
    maxHeight: "220px",
    objectFit: "contain",
  },
  colorDot: {
    position: "absolute",
    top: "18px",
    right: "18px",
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    border: "2px solid #fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  },
  preview: {
    textAlign: "center",
    background: "rgba(0,0,0,0.05)",
    padding: "10px 24px",
    borderRadius: "12px",
    width: "100%",
  },
  previewNumber: {
    fontSize: "36px",
    fontWeight: "900",
    color: "#302b63",
    fontFamily: "'Georgia', serif",
  },
  previewName: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#302b63",
    letterSpacing: "2px",
    fontFamily: "'Georgia', serif",
    marginTop: "4px",
  },
  formSide: {
    flex: 1,
    padding: "36px 32px",
    minWidth: "280px",
  },
  title: {
    margin: "0 0 6px",
    fontSize: "26px",
    fontWeight: "800",
    color: "#1a1a2e",
    fontFamily: "'Georgia', serif",
  },
  basePrice: {
    fontSize: "14px",
    color: "#888",
    margin: "0 0 24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    gap: "16px",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1.5px solid #e0e0e0",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  },
  select: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1.5px solid #e0e0e0",
    fontSize: "14px",
    outline: "none",
    background: "#fff",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  flocageNote: {
    background: "#fff8e1",
    border: "1px solid #ffe082",
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "12px",
    color: "#795548",
    marginBottom: "16px",
  },
  totalBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 0",
    borderTop: "2px dashed #eee",
    marginBottom: "20px",
    fontSize: "15px",
    color: "#555",
    fontWeight: "600",
  },
  totalAmt: {
    fontSize: "26px",
    fontWeight: "900",
    color: "#302b63",
  },
  addBtn: {
    color: "#fff",
    border: "none",
    padding: "14px",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "background 0.3s, transform 0.1s",
    letterSpacing: "0.5px",
  },
};
