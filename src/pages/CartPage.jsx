import { useCart } from "../context/CartContext";
import { ShoppingCart } from 'lucide-react';

export default function CartPage({ onBack }) {
  const { cart, removeFromCart } = useCart();

  const grandTotal = cart.reduce((sum, item) => sum + (item.price ?? 0), 0);

  function handleWhatsApp() {
    const lines = cart.map((item, i) =>
      `${i + 1}. ${item.name}` +
      ` | Type: ${item.typeLabel ?? item.type ?? "-"}` +
      ` | Saison: ${item.year ?? "-"}` +
      ` | Taille: ${item.size ?? "-"}` +
      ` | Qté: ${item.quantity ?? 1}` +
      (item.flocName   ? ` | Nom: ${item.flocName}`     : "") +
      (item.flocNumber ? ` | N°: ${item.flocNumber}`    : "") +
      ` | Prix: ${item.price ?? 0} FCFA`
    );
    const msg = `Bonjour, je souhaite commander :\n${lines.join("\n")}\n\nTotal : ${grandTotal} FCFA`;
    window.open(`https://wa.me/2250143022355?text=${encodeURIComponent(msg)}`, "_blank");
  }

  return (
    <div style={st.page}>
      <div style={st.container}>

        <div style={st.topRow}>
          <button onClick={onBack} style={st.back}>← Retour boutique</button>
          <h1 style={st.title}>  <ShoppingCart /> Votre panier</h1>
          <span style={st.count}>{cart.length} article{cart.length !== 1 ? "s" : ""}</span>
        </div>

        {cart.length === 0 ? (
          <div style={st.empty}>
            <span style={{ fontSize: 64 }}><ShoppingCart /></span>
            <p style={{ color: "#aaa", fontSize: 18, marginTop: 16 }}>Votre panier est vide</p>
            <button onClick={onBack} style={st.shopBtn}>Découvrir les maillots</button>
          </div>
        ) : (
          <div style={st.layout}>
            <div style={st.items}>
              {cart.map((item, index) => (
                <CartItem key={index} item={item} onRemove={() => removeFromCart(index)} />
              ))}
            </div>

            <div style={st.summary}>
              <h2 style={st.sumTitle}>Récapitulatif</h2>
              <div style={st.sumRow}><span>Sous-total</span><span>{grandTotal} FCFA</span></div>
              <div style={st.sumRow}><span>Livraison</span><span style={{ color: "#2e7d32" }}>Gratuite</span></div>
              <div style={{ ...st.sumRow, ...st.sumTotal }}><span>Total</span><span>{grandTotal} FCFA</span></div>
              <button onClick={handleWhatsApp} style={st.whatsapp}>📲 Commander via WhatsApp</button>
              <p style={st.hint}>Vous serez redirigé vers WhatsApp pour finaliser votre commande</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CartItem({ item, onRemove }) {
  return (
    <div style={st.cartItem}>

      {/* Image */}
      <div style={st.itemImg}>
        {item.image
          ? <img src={item.image} alt={item.name}
              style={{ maxWidth: 80, maxHeight: 80, objectFit: "contain" }}
              onError={(e) => { e.target.style.display = "none"; }} />
          : <span style={{ fontSize: 40 }}>👕</span>
        }
      </div>

      {/* Infos */}
      <div style={st.itemInfo}>
        <h3 style={st.itemName}>{item.name}</h3>
        <div style={st.itemMeta}>
          {item.typeLabel  && <Pill label="Type"   value={item.typeLabel} />}
          {item.year       && <Pill label="Saison" value={item.year.replace("-", "–")} />}
          {item.size       && <Pill label="Taille" value={item.size} />}
          {item.quantity   && <Pill label="Qté"    value={item.quantity} />}
          {item.flocName   && <Pill label="Nom"    value={item.flocName}   highlight />}
          {item.flocNumber && <Pill label="N°"     value={item.flocNumber} highlight />}
          {item.flocCost > 0 && (
            <Pill label="Flocage" value={`+${item.flocCost} FCFA`} highlight />
          )}
        </div>
      </div>

      {/* Prix + suppression */}
      <div style={st.itemRight}>
        <span style={st.itemPrice}>{item.price} FCFA</span>
        <button onClick={onRemove} style={st.removeBtn}>🗑</button>
      </div>
    </div>
  );
}

function Pill({ label, value, highlight }) {
  return (
    <span style={{ ...st.pill, ...(highlight ? st.pillHL : {}) }}>
      {label} : <strong>{value}</strong>
    </span>
  );
}

const st = {
  page:      { minHeight:"100vh", background:"#f4f6fb", paddingTop:86, paddingBottom:60 },
  container: { maxWidth:1000, margin:"0 auto", padding:"0 20px" },
  topRow:    { display:"flex", alignItems:"center", gap:16, marginBottom:28, flexWrap:"wrap" },
  back:      { background:"#fff", border:"none", color:"#302b63", fontSize:13, fontWeight:700, cursor:"pointer", padding:"8px 16px", borderRadius:8 },
  title:     { margin:0, fontSize:24, fontWeight:800, color:"#1a1a2e", flex:1 },
  count:     { background:"#302b63", color:"#fff", padding:"4px 12px", borderRadius:20, fontSize:12, fontWeight:600 },
  empty:     { display:"flex", flexDirection:"column", alignItems:"center", padding:"80px 20px", background:"#fff", borderRadius:20 },
  shopBtn:   { marginTop:20, background:"#302b63", color:"#fff", border:"none", padding:"12px 28px", borderRadius:10, cursor:"pointer" },
  layout:    { display:"flex", gap:24, flexWrap:"wrap" },
  items:     { flex:1, display:"flex", flexDirection:"column", gap:14, minWidth:280 },
  cartItem:  { background:"#fff", borderRadius:14, padding:"16px 20px", display:"flex", gap:16, alignItems:"center" },
  itemImg:   { width:90, height:90, background:"#f8f9fa", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 },
  itemInfo:  { flex:1 },
  itemName:  { margin:"0 0 8px", fontSize:15, fontWeight:700 },
  itemMeta:  { display:"flex", flexWrap:"wrap", gap:6, fontSize:12, color:"#555" },
  pill:      { background:"#f0f0f0", borderRadius:6, padding:"3px 8px" },
  pillHL:    { background:"#E6F1FB", color:"#0C447C" },
  itemRight: { display:"flex", flexDirection:"column", alignItems:"flex-end", gap:10, flexShrink:0 },
  itemPrice: { fontSize:18, fontWeight:800, color:"#302b63" },
  removeBtn: { background:"#fff0f0", border:"1px solid #ffcdd2", borderRadius:8, padding:"6px 10px", cursor:"pointer", color:"#e53e3e" },
  summary:   { width:280, background:"#fff", borderRadius:16, padding:24, alignSelf:"flex-start" },
  sumTitle:  { marginBottom:20, fontSize:17, fontWeight:700, margin:"0 0 20px" },
  sumRow:    { display:"flex", justifyContent:"space-between", marginBottom:12, fontSize:14, color:"#555" },
  sumTotal:  { borderTop:"1px solid #eee", paddingTop:10, fontWeight:800, fontSize:16, color:"#111", marginTop:4 },
  whatsapp:  { width:"100%", marginTop:20, background:"#25D366", color:"#fff", border:"none", padding:14, borderRadius:10, fontWeight:700, cursor:"pointer", fontSize:14, boxSizing:"border-box" },
  hint:      { fontSize:11, textAlign:"center", marginTop:10, color:"#aaa" },
};
