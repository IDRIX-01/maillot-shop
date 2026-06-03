import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import JerseyDialog from "../dialog";
import { useCart } from "../context/CartContext";
import { useProducts } from "../services/useProducts";

const RESPONSIVE_CSS = `
  /* ── Hero ── */
  .bm-hero {
    background: linear-gradient(
      135deg,
      rgba(15,12,41,0.96) 0%,
      rgba(48,43,99,0.96) 50%,
      rgba(36,36,62,0.96) 100%
    );
    padding: 50px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
  }

  /* ── Grille produits ── */
  .bm-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
    gap: 20px;
  }

  /* ── Filtres ── */
  .bm-filters-bar {
    max-width: 1280px;
    margin: 0 auto;
    padding: 20px 24px 0;
    display: flex;
    align-items: flex-end;
    gap: 16px;
    flex-wrap: wrap;
  }

  /* ── Pagination ── */
  .bm-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 36px;
    flex-wrap: wrap;
  }

  /* ── Footer grid ── */
  .bm-footer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 32px;
    max-width: 1100px;
    margin: 0 auto;
  }

  /* ── Social icons row ── */
  .bm-social-row {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }

  /* ── Store buttons row ── */
  .bm-store-row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 10px;
  }

  /* ════════════════ TABLET  ≤ 768 px ════════════════ */
  @media (max-width: 768px) {
    .bm-hero {
      padding: 36px 24px;
      flex-direction: column;
      align-items: flex-start;
      gap: 0;
    }

    .bm-grid {
      grid-template-columns: repeat(auto-fill, minmax(155px, 1fr));
      gap: 14px;
    }

    .bm-filters-bar {
      padding: 16px 16px 0;
      gap: 10px;
    }

    .bm-footer-grid {
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }

    .bm-pagination {
      gap: 6px;
      margin-top: 28px;
    }
  }

  /* ════════════════ MOBILE  ≤ 480 px ════════════════ */
  @media (max-width: 480px) {
    .bm-hero {
      padding: 28px 16px 32px;
    }

    .bm-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .bm-filters-bar {
      flex-direction: column;
      align-items: stretch;
      padding: 14px 16px 0;
    }

    /* Chaque filtre prend toute la largeur */
    .bm-filters-bar > * {
      width: 100%;
    }

    .bm-footer-grid {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    /* Boutons précédent/suivant plus compacts */
    .bm-page-btn {
      padding: 7px 12px !important;
      font-size: 12px !important;
    }

    /* Numéros de page : masquer les extrêmes pour éviter le dépassement */
    .bm-page-numbers {
      gap: 2px;
    }

    .bm-page-num {
      width: 30px !important;
      height: 30px !important;
      font-size: 12px !important;
    }
  }

  /* ════════════════ TRÈS PETIT  ≤ 360 px ════════════════ */
  @media (max-width: 360px) {
    .bm-grid {
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
  }
`;

function InjectStyles() {
  useEffect(() => {
    const id = "bm-responsive-styles";
    if (!document.getElementById(id)) {
      const tag = document.createElement("style");
      tag.id = id;
      tag.textContent = RESPONSIVE_CSS;
      document.head.appendChild(tag);
    }
    return () => {
      /* Ne retire pas le style au démontage pour éviter le flash */
    };
  }, []);
  return null;
}

export default function HomePage({ search, onSelectProduct }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();

  const {
    products,
    totalProducts,
    loading,
    error,
    isDemo,
    page,
    totalPages,
    setPage,
    leagues,
    countries,
    filterLeague,
    filterCountry,
    setFilterLeague,
    setFilterCountry,
    refresh,
  } = useProducts(search);

  return (
    <div style={styles.page}>
      <InjectStyles />

      {/* ── Hero ── */}
      <div className="bm-hero">
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>🏆 Collection 2025</div>
          <h1 style={styles.heroTitle}>
            Maillots Officiels
            <br />
            <span style={styles.heroAccent}>Personnalisés</span>
          </h1>
          <p style={styles.heroSub}>
            Abidjan, Côte d'Ivoire · Livraison partout · Flocage sur mesure
          </p>
        </div>
        <div style={styles.heroDecor}>⚽</div>
      </div>

      {/* ── Bandeau démo ── */}
      {isDemo && !loading && (
        <div style={styles.demoBanner}>
          <span>
            ⚠️ Mode démo — Configurez <code>VITE_FOOTBALL_API_KEY</code> dans
            votre <code>.env</code> pour charger tous les clubs du monde.
          </span>
          <a
            href="https://dashboard.api-football.com/register"
            target="_blank"
            rel="noreferrer"
            style={styles.demoLink}
          >
            Obtenir une clé gratuite →
          </a>
        </div>
      )}

      {/* ── Filtres ── */}
      <div className="bm-filters-bar">
        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>🏆 Ligue</label>
          <select
            value={filterLeague}
            onChange={(e) => setFilterLeague(e.target.value)}
            style={styles.filterSelect}
          >
            {leagues.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>

        <div style={styles.filterGroup}>
          <label style={styles.filterLabel}>🌍 Pays</label>
          <select
            value={filterCountry}
            onChange={(e) => setFilterCountry(e.target.value)}
            style={styles.filterSelect}
          >
            {countries.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <button
          onClick={refresh}
          style={styles.refreshBtn}
          title="Recharger depuis l'API"
        >
          🔄 Actualiser
        </button>
      </div>

      {/* ── Section produits ── */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            {search ? `Résultats pour "${search}"` : "Tous les maillots"}
          </h2>
          {!loading && (
            <span style={styles.sectionCount}>
              {totalProducts} club{totalProducts !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Skeleton */}
        {loading && (
          <div className="bm-grid">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} style={styles.skeleton}>
                <div style={styles.skeletonImg} />
                <div style={styles.skeletonLine} />
                <div style={{ ...styles.skeletonLine, width: "60%" }} />
              </div>
            ))}
          </div>
        )}

        {/* Erreur */}
        {error && !loading && (
          <div style={styles.errorBox}>
            <span style={{ fontSize: "32px" }}>⚠️</span>
            <p>Erreur de chargement : {error}</p>
            <button onClick={refresh} style={styles.retryBtn}>
              Réessayer
            </button>
          </div>
        )}

        {/* Aucun résultat */}
        {!loading && products.length === 0 && !error && (
          <div style={styles.noResult}>
            <span style={{ fontSize: "48px" }}>🔍</span>
            <p>Aucun maillot trouvé</p>
          </div>
        )}

        {/* Grille produits */}
        {!loading && products.length > 0 && (
          <div className="bm-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={setSelectedProduct}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="bm-pagination">
            <button
              className="bm-page-btn"
              style={{ ...styles.pageBtn, opacity: page === 1 ? 0.4 : 1 }}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              ← Précédent
            </button>

            <div className="bm-page-numbers" style={styles.pageNumbers}>
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                let num;
                if (totalPages <= 7) {
                  num = i + 1;
                } else if (page <= 4) {
                  num = i + 1;
                } else if (page >= totalPages - 3) {
                  num = totalPages - 6 + i;
                } else {
                  num = page - 3 + i;
                }
                return (
                  <button
                    key={num}
                    className="bm-page-num"
                    style={{
                      ...styles.pageNum,
                      background: num === page ? "#302b63" : "#fff",
                      color: num === page ? "#fff" : "#302b63",
                      fontWeight: num === page ? "800" : "600",
                    }}
                    onClick={() => setPage(num)}
                  >
                    {num}
                  </button>
                );
              })}
            </div>

            <button
              className="bm-page-btn"
              style={{
                ...styles.pageBtn,
                opacity: page === totalPages ? 0.4 : 1,
              }}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Suivant →
            </button>
          </div>
        )}
      </div>

      <JerseyDialog
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onGoToDetail={(product) => {
          setSelectedProduct(null);
          onSelectProduct(product);
        }}
        onAddToCart={addToCart}
      />

      {/* ── Footer ── */}
      <footer style={styles.footer}>
        <div className="bm-footer-grid">
          <div>
            <h3 style={styles.footerHead}>Boutique de Maillot</h3>
            <p style={styles.footerText}>
              Maillots officiels, personnalisés et livrés partout
            </p>
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
            <div className="bm-social-row">
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
            <p style={styles.footerText}>
              Téléchargez notre appli gratuitement
            </p>
            <div className="bm-store-row">
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

/* ─── Styles JS (invariants) ─── */
const styles = {
  page: { paddingTop: "66px", minHeight: "100vh", background: "transparent" },

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
    fontSize: "clamp(24px, 5vw, 48px)",
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
    fontSize: "clamp(12px, 2vw, 14px)",
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

  demoBanner: {
    background: "#fff8e1",
    borderBottom: "1px solid #ffe082",
    padding: "10px 24px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
    fontSize: "13px",
    color: "#795548",
  },
  demoLink: {
    color: "#302b63",
    fontWeight: "700",
    textDecoration: "none",
    marginLeft: "auto",
  },

  filterGroup: { display: "flex", flexDirection: "column", gap: "4px" },
  filterLabel: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#555",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  filterSelect: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1.5px solid #ddd",
    fontSize: "13px",
    background: "#fff",
    color: "#1a1a2e",
    outline: "none",
    cursor: "pointer",
    minWidth: "160px",
    width: "100%",
  },
  refreshBtn: {
    alignSelf: "flex-end",
    padding: "8px 16px",
    borderRadius: "8px",
    border: "1.5px solid #302b63",
    background: "#fff",
    color: "#302b63",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  section: { maxWidth: "1280px", margin: "0 auto", padding: "24px 16px 40px" },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "24px",
    flexWrap: "wrap",
  },
  sectionTitle: {
    margin: 0,
    fontSize: "clamp(16px, 3vw, 20px)",
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

  noResult: {
    textAlign: "center",
    padding: "60px 16px",
    color: "#aaa",
    fontSize: "16px",
  },

  skeleton: {
    background: "#fff",
    borderRadius: "14px",
    overflow: "hidden",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  skeletonImg: {
    width: "100%",
    height: "130px",
    background: "#ececec",
    borderRadius: "8px",
  },
  skeletonLine: { height: "12px", background: "#ececec", borderRadius: "6px" },

  errorBox: {
    textAlign: "center",
    padding: "40px 16px",
    background: "#fff5f5",
    borderRadius: "12px",
    color: "#c62828",
  },
  retryBtn: {
    marginTop: "12px",
    padding: "8px 20px",
    borderRadius: "8px",
    background: "#302b63",
    color: "#fff",
    border: "none",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "13px",
  },

  pageBtn: {
    padding: "8px 18px",
    borderRadius: "8px",
    border: "1.5px solid #302b63",
    background: "#fff",
    color: "#302b63",
    fontWeight: "700",
    fontSize: "13px",
    cursor: "pointer",
  },
  pageNumbers: { display: "flex", gap: "4px" },
  pageNum: {
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    border: "1.5px solid #302b63",
    fontSize: "13px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  footer: {
    background:
      "linear-gradient(135deg, rgba(15,12,41,0.97), rgba(26,26,46,0.97))",
    color: "#ccc",
    padding: "48px 24px 24px",
    marginTop: "20px",
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