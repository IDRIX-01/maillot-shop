import { useState } from "react";
import ProductCard from "../components/ProductCard";
import JerseyDialog from "../dialog";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

export default function HomePage({ search, onSelectProduct }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>

      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>🏆 Collection 2025</div>
          <h1 style={styles.heroTitle}>
            Maillots Officiels<br />
            <span style={styles.heroAccent}>Personnalisés</span>
          </h1>
          <p style={styles.heroSub}>
            Abidjan, Côte d'Ivoire · Livraison partout · Flocage sur mesure
          </p>
        </div>
        <div style={styles.heroDecor}>⚽</div>
      </div>

      {/* Products */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            {search ? `Résultats pour "${search}"` : "Tous les maillots"}
          </h2>
          <span style={styles.sectionCount}>
            {filtered.length} article{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div style={styles.noResult}>
            <span style={{ fontSize: "48px" }}>🔍</span>
            <p>Aucun maillot trouvé pour « {search} »</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </div>

      {/* ✅ CORRECTION : onAddToCart branché directement sur addToCart du contexte.
          JerseyDialog construit lui-même l'objet complet, pas besoin de le transformer ici. */}
      <JerseyDialog
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onGoToDetail={(product) => {
          setSelectedProduct(null);
          onSelectProduct(product);
        }}
        onAddToCart={addToCart}
      />

      <footer style={styles.footer}>
        <div style={styles.footerGrid}>
          <div>
            <h3 style={styles.footerHead}>Boutique de Maillot</h3>
            <p style={styles.footerText}>Maillots officiels, personnalisés et livrés partout</p>
            <p style={styles.footerText}>📍 Abidjan, Côte d'Ivoire</p>
          </div>
          <div>
            <h3 style={styles.footerHead}>À propos</h3>
            <p style={styles.footerLink}>Maillots</p>
            <p style={styles.footerLink}>Conditions</p>
            <p style={styles.footerLink}>Politique de confidentialité</p>
          </div>
          <div>
            <h3 style={styles.footerHead}>Contact</h3>
            <p style={styles.footerText}>📧 boutiquedemaillot@ivorycoast.com</p>
            <p style={styles.footerText}>📞 +225 01 43 02 23 55</p>
            <p style={styles.footerText}>📞 +225 05 66 63 69 53</p>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <a
                href="https://wa.me/2250143022355?text=Bonjour%20je%20suis%20intéressé%20par%20un%20maillot"
                target="_blank"
                rel="noreferrer"
                style={styles.socialBtn}
              >
                💬
              </a>
              <span style={styles.socialBtn}>📘</span>
              <span style={styles.socialBtn}>📷</span>
              <span style={styles.socialBtn}>🐦</span>
            </div>
          </div>
          <div>
            <h3 style={styles.footerHead}>Application mobile</h3>
            <p style={styles.footerText}>Téléchargez notre appli gratuitement</p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "10px" }}>
              <span style={styles.storeBtn}>▶ Google Play</span>
              <span style={styles.storeBtn}> App Store</span>
            </div>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p>© 2026 Boutique_Maillot · Production KONE SIE DRISSA</p>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  page:         { paddingTop:"66px", minHeight:"100vh", background:"#f4f6fb" },
  hero:         { background:"linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)", padding:"50px 40px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"relative", overflow:"hidden" },
  heroContent:  { zIndex:1 },
  heroBadge:    { display:"inline-block", background:"rgba(255,255,255,0.12)", color:"#ffd700", padding:"5px 16px", borderRadius:"20px", fontSize:"12px", fontWeight:"700", letterSpacing:"1px", marginBottom:"16px", border:"1px solid rgba(255,215,0,0.3)" },
  heroTitle:    { margin:"0 0 12px", fontSize:"clamp(28px, 5vw, 48px)", fontWeight:"900", color:"#fff", fontFamily:"'Georgia', serif", lineHeight:1.2 },
  heroAccent:   { background:"linear-gradient(90deg, #f6d365, #fda085)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" },
  heroSub:      { color:"rgba(255,255,255,0.65)", fontSize:"14px", margin:0 },
  heroDecor:    { fontSize:"clamp(60px, 10vw, 120px)", opacity:0.08, position:"absolute", right:"40px", bottom:"-10px", lineHeight:1 },
  section:      { maxWidth:"1280px", margin:"0 auto", padding:"36px 24px" },
  sectionHeader:{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"24px" },
  sectionTitle: { margin:0, fontSize:"20px", fontWeight:"800", color:"#1a1a2e", fontFamily:"'Georgia', serif" },
  sectionCount: { background:"#302b6320", color:"#302b63", padding:"3px 12px", borderRadius:"20px", fontSize:"12px", fontWeight:"700" },
  grid:         { display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(190px, 1fr))", gap:"20px" },
  noResult:     { textAlign:"center", padding:"60px", color:"#aaa", fontSize:"16px" },
  footer:       { background:"linear-gradient(135deg, #0f0c29, #1a1a2e)", color:"#ccc", padding:"48px 40px 24px", marginTop:"20px" },
  footerGrid:   { display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))", gap:"32px", maxWidth:"1100px", margin:"0 auto" },
  footerHead:   { color:"#fff", margin:"0 0 14px", fontSize:"14px", fontWeight:"700", textTransform:"uppercase", letterSpacing:"1px" },
  footerText:   { fontSize:"13px", color:"#aaa", margin:"4px 0", lineHeight:1.6 },
  footerLink:   { fontSize:"13px", color:"#aaa", margin:"4px 0", cursor:"pointer" },
  socialBtn:    { width:"34px", height:"34px", background:"rgba(255,255,255,0.08)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"16px", cursor:"pointer", textDecoration:"none" },
  storeBtn:     { background:"rgba(255,255,255,0.1)", color:"#fff", padding:"8px 14px", borderRadius:"8px", fontSize:"12px", fontWeight:"600", cursor:"pointer" },
  footerBottom: { borderTop:"1px solid rgba(255,255,255,0.1)", marginTop:"36px", paddingTop:"20px", textAlign:"center", fontSize:"12px", color:"#666", maxWidth:"1100px", margin:"36px auto 0" },
};
