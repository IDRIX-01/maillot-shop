import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

// ─── JerseyDialog ────────────────────────────────────────────────────────────

const TYPES = [
  { key: "home",       label: "Home" },
  { key: "away",       label: "Away" },
  { key: "third",      label: "Third" },
  { key: "goalkeeper", label: "Gardien" },
];

const YEARS = ["2024-25", "2023-24", "2022-23", "2021-22", "2020-21"];

function JerseyDialog({ product, onClose, onAddToCart, onGoToDetail }) {
  const [type, setType] = useState("home");
  const [year, setYear] = useState("2024-25");

  if (!product) return null;

  const handleConfirm = () => {
    onAddToCart({ product, type, year });
    onClose();
  };

  return (
    <div style={dialogStyles.overlay} onClick={onClose}>
      <div style={dialogStyles.dialog} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div style={dialogStyles.header}>
          <div>
            <p style={dialogStyles.title}>{product.name}</p>
            <p style={dialogStyles.subtitle}>Choisissez votre maillot</p>
          </div>
          <button style={dialogStyles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div style={dialogStyles.body}>
          <p style={dialogStyles.sectionLabel}>Type</p>
          <div style={dialogStyles.chipGroup}>
            {TYPES.map((t) => (
              <button
                key={t.key}
                style={{
                  ...dialogStyles.chip,
                  ...(type === t.key ? dialogStyles.chipActive : {}),
                }}
                onClick={() => setType(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <p style={dialogStyles.sectionLabel}>Saison</p>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            style={dialogStyles.select}
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y.replace("-", "–")}
              </option>
            ))}
          </select>

          {/* Preview */}
          <div style={dialogStyles.preview}>
            <span style={{ fontSize: 32 }}>👕</span>
            <div>
              <p style={dialogStyles.previewName}>
                {product.name} — {TYPES.find((t) => t.key === type)?.label}
              </p>
              <p style={dialogStyles.previewMeta}>
                Saison {year.replace("-", "–")}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={dialogStyles.footer}>
          <button style={dialogStyles.btnCancel} onClick={onClose}>
            Annuler
          </button>
          <button style={dialogStyles.btnConfirm} onClick={() => onGoToDetail(product)}>
            Produit détails
          </button>
        </div>
      </div>
    </div>
  );
}

const dialogStyles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  dialog: {
    background: "#fff",
    borderRadius: 12,
    width: "90%",
    maxWidth: 480,
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
  },
  header: {
    padding: "1.25rem 1.5rem 1rem",
    borderBottom: "1px solid #eee",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  title:        { margin: 0, fontSize: 16, fontWeight: 500 },
  subtitle:     { margin: "2px 0 0", fontSize: 13, color: "#888" },
  closeBtn:     { background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#888", padding: 4 },
  body:         { padding: "1.25rem 1.5rem" },
  sectionLabel: { fontSize: 12, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 10px" },
  chipGroup:    { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "1.25rem" },
  chip:         { padding: "6px 16px", borderRadius: 999, border: "1px solid #ddd", background: "#fff", fontSize: 14, cursor: "pointer" },
  chipActive:   { background: "#E6F1FB", borderColor: "#378ADD", color: "#0C447C", fontWeight: 500 },
  select:       { width: "100%", fontSize: 14, padding: "8px 12px", borderRadius: 8, border: "1px solid #ddd", marginBottom: "1.25rem" },
  preview:      { background: "#f5f5f5", borderRadius: 8, padding: "1rem", display: "flex", alignItems: "center", gap: 14 },
  previewName:  { margin: "0 0 3px", fontSize: 15, fontWeight: 500 },
  previewMeta:  { margin: 0, fontSize: 13, color: "#888" },
  footer:       { padding: "1rem 1.5rem", borderTop: "1px solid #eee", display: "flex", gap: 10, justifyContent: "flex-end" },
  btnCancel:    { padding: "8px 20px", borderRadius: 8, border: "1px solid #ddd", background: "transparent", fontSize: 14, cursor: "pointer" },
  btnConfirm:   { padding: "8px 20px", borderRadius: 8, border: "none", background: "#378ADD", color: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer" },
};

// ─── HomePage ─────────────────────────────────────────────────────────────────

export default function HomePage({ search, onSelectProduct }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

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

      {/* Dialog */}
      <JerseyDialog
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onGoToDetail={(product) => {
          setSelectedProduct(null);
          onSelectProduct(product);
        }}
        onAddToCart={({ product, type, year }) => {
          console.log("Ajout :", product.name, type, year);
          // ta logique panier ici
        }}
      />

      {/* Footer */}
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
  page: {
    paddingTop: "66px",
    minHeight: "100vh",
    background: "#f4f6fb",
  },
  hero: {
    background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    padding: "50px 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    overflow: "hidden",
  },
  heroContent: { zIndex: 1 },
  heroBadge: {
    display: "inline-block",
    background: "rgba(255,255,255,0.12)",
    color: "#ffd700",
    padding: "5px 16px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "1px",
    marginBottom: "16px",
    border: "1px solid rgba(255,215,0,0.3)",
  },
  heroTitle: {
    margin: "0 0 12px",
    fontSize: "clamp(28px, 5vw, 48px)",
    fontWeight: "900",
    color: "#fff",
    fontFamily: "'Georgia', serif",
    lineHeight: 1.2,
  },
  heroAccent: {
    background: "linear-gradient(90deg, #f6d365, #fda085)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  heroSub: {
    color: "rgba(255,255,255,0.65)",
    fontSize: "14px",
    margin: 0,
  },
  heroDecor: {
    fontSize: "clamp(60px, 10vw, 120px)",
    opacity: 0.08,
    position: "absolute",
    right: "40px",
    bottom: "-10px",
    lineHeight: 1,
  },
  section: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "36px 24px",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "24px",
  },
  sectionTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "800",
    color: "#1a1a2e",
    fontFamily: "'Georgia', serif",
  },
  sectionCount: {
    background: "#302b6320",
    color: "#302b63",
    padding: "3px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
    gap: "20px",
  },
  noResult: {
    textAlign: "center",
    padding: "60px",
    color: "#aaa",
    fontSize: "16px",
  },
  footer: {
    background: "linear-gradient(135deg, #0f0c29, #1a1a2e)",
    color: "#ccc",
    padding: "48px 40px 24px",
    marginTop: "20px",
  },
  footerGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "32px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  footerHead: {
    color: "#fff",
    margin: "0 0 14px",
    fontSize: "14px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  footerText: {
    fontSize: "13px",
    color: "#aaa",
    margin: "4px 0",
    lineHeight: 1.6,
  },
  footerLink: {
    fontSize: "13px",
    color: "#aaa",
    margin: "4px 0",
    cursor: "pointer",
    transition: "color 0.2s",
  },
  socialBtn: {
    width: "34px",
    height: "34px",
    background: "rgba(255,255,255,0.08)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    cursor: "pointer",
    textDecoration: "none",
  },
  storeBtn: {
    background: "rgba(255,255,255,0.1)",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
  },
  footerBottom: {
    borderTop: "1px solid rgba(255,255,255,0.1)",
    marginTop: "36px",
    paddingTop: "20px",
    textAlign: "center",
    fontSize: "12px",
    color: "#666",
    maxWidth: "1100px",
    margin: "36px auto 0",
  },
};
