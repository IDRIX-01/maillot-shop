import { useCart } from "../context/CartContext";

export default function CartPage({ onBack }) {
  const { cart, removeFromCart } = useCart();

  const grandTotal = cart.reduce((sum, item) => sum + item.price, 0);

  function handleWhatsApp() {
    const lines = cart.map(
      (item, i) =>
        `${i + 1}. ${item.name} (${item.size}) - Année: ${item.year}, Type: ${item.type}, Nom: ${item.playerName || "-"}, N°: ${item.playerNumber || "-"} x${item.quantity} = ${item.price}€`
    );

    const msg = `Bonjour, je souhaite commander :\n${lines.join("\n")}\n\nTotal : ${grandTotal}€`;

    window.open(
      `https://wa.me/2250143022355?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.topRow}>
          <button onClick={onBack} style={styles.back}>
            ← Retour boutique
          </button>
          <h1 style={styles.title}>🛒 Votre panier</h1>
          <span style={styles.count}>
            {cart.length} article{cart.length !== 1 ? "s" : ""}
          </span>
        </div>

        {cart.length === 0 ? (
          <div style={styles.empty}>
            <span style={{ fontSize: "64px" }}>🛒</span>
            <p style={{ color: "#aaa", fontSize: "18px", marginTop: "16px" }}>
              Votre panier est vide
            </p>
            <button onClick={onBack} style={styles.shopBtn}>
              Découvrir les maillots
            </button>
          </div>
        ) : (
          <div style={styles.layout}>
            <div style={styles.items}>
              {cart.map((item, index) => (
                <CartItem
                  key={index}
                  item={item}
                  onRemove={() => removeFromCart(index)}
                />
              ))}
            </div>

            <div style={styles.summary}>
              <h2 style={styles.sumTitle}>Récapitulatif</h2>

              <div style={styles.sumRow}>
                <span>Sous-total</span>
                <span>{grandTotal} €</span>
              </div>

              <div style={styles.sumRow}>
                <span>Livraison</span>
                <span style={{ color: "#2e7d32" }}>Gratuite</span>
              </div>

              <div style={{ ...styles.sumRow, ...styles.sumTotal }}>
                <span>Total</span>
                <span>{grandTotal} €</span>
              </div>

              <button onClick={handleWhatsApp} style={styles.whatsapp}>
                📲 Commander via WhatsApp
              </button>

              <p style={styles.hint}>
                Vous serez redirigé vers WhatsApp pour finaliser votre commande
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CartItem({ item, onRemove }) {
  return (
    <div style={styles.cartItem}>
      <div style={styles.itemImg}>
        <img
          src={item.image}
          alt={item.name}
          style={{ maxWidth: "80px", maxHeight: "80px", objectFit: "contain" }}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </div>

      <div style={styles.itemInfo}>
        <h3 style={styles.itemName}>{item.name}</h3>

        <div style={styles.itemMeta}>
          {item.type && (
            <span>
              Type : <strong>{item.type}</strong>
            </span>
          )}

          {item.year && (
            <span>
              Année : <strong>{item.year}</strong>
            </span>
          )}

          <span>
            Taille : <strong>{item.size}</strong>
          </span>

          {item.playerName && (
            <span>
              Nom : <strong>{item.playerName}</strong>
            </span>
          )}

          {item.playerNumber && (
            <span>
              N° : <strong>{item.playerNumber}</strong>
            </span>
          )}

          <span>
            Qté : <strong>{item.quantity}</strong>
          </span>
        </div>
      </div>

      <div style={styles.itemRight}>
        <span style={styles.itemPrice}>{item.price} €</span>
        <button onClick={onRemove} style={styles.removeBtn}>
          🗑
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6fb",
    paddingTop: "86px",
    paddingBottom: "60px",
  },
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "0 20px",
  },
  topRow: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "28px",
    flexWrap: "wrap",
  },
  back: {
    background: "#fff",
    border: "none",
    color: "#302b63",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
    padding: "8px 16px",
    borderRadius: "8px",
  },
  title: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "800",
    color: "#1a1a2e",
    flex: 1,
  },
  count: {
    background: "#302b63",
    color: "#fff",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },
  empty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "80px 20px",
    background: "#fff",
    borderRadius: "20px",
  },
  shopBtn: {
    marginTop: "20px",
    background: "#302b63",
    color: "#fff",
    border: "none",
    padding: "12px 28px",
    borderRadius: "10px",
    cursor: "pointer",
  },
  layout: {
    display: "flex",
    gap: "24px",
    flexWrap: "wrap",
  },
  items: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    minWidth: "280px",
  },
  cartItem: {
    background: "#fff",
    borderRadius: "14px",
    padding: "16px 20px",
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },
  itemImg: {
    width: "90px",
    height: "90px",
    background: "#f8f9fa",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    margin: "0 0 8px",
    fontSize: "15px",
    fontWeight: "700",
  },
  itemMeta: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    fontSize: "12px",
    color: "#666",
  },
  itemRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "10px",
  },
  itemPrice: {
    fontSize: "18px",
    fontWeight: "800",
    color: "#302b63",
  },
  removeBtn: {
    background: "#fff0f0",
    border: "1px solid #ffcdd2",
    borderRadius: "8px",
    padding: "6px 10px",
    cursor: "pointer",
    color: "#e53e3e",
  },
  summary: {
    width: "280px",
    background: "#fff",
    borderRadius: "16px",
    padding: "24px",
  },
  sumTitle: {
    marginBottom: "20px",
  },
  sumRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "12px",
  },
  sumTotal: {
    borderTop: "1px solid #eee",
    paddingTop: "10px",
    fontWeight: "800",
  },
  whatsapp: {
    width: "100%",
    marginTop: "20px",
    background: "#25D366",
    color: "#fff",
    border: "none",
    padding: "14px",
    borderRadius: "10px",
    fontWeight: "700",
    cursor: "pointer",
  },
  hint: {
    fontSize: "11px",
    textAlign: "center",
    marginTop: "10px",
    color: "#aaa",
  },
};