import { useEffect, useState } from "react";
import { Search, ShoppingCart, LogOut, X } from "lucide-react";
import { useCart } from "../context/CartContext";

/* ─── CSS responsive injecté une seule fois ─── */
const NAVBAR_CSS = `
  .nb-header {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    height: 66px;
    background: linear-gradient(135deg, rgba(15,12,41,0.97) 0%, rgba(48,43,99,0.97) 100%);
    display: flex;
    align-items: center;
    padding: 0 24px;
    gap: 16px;
    box-shadow: 0 2px 16px rgba(0,0,0,0.25);
  }

  /* Barre de recherche : cachée par défaut sur mobile, visible sur desktop */
  .nb-search-wrap {
    flex: 1;
    position: relative;
    max-width: 480px;
  }

  /* Overlay de recherche mobile (caché par défaut) */
  .nb-search-overlay {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 200;
    background: rgba(15,12,41,0.97);
    align-items: center;
    padding: 0 16px;
    gap: 12px;
  }
  .nb-search-overlay.open {
    display: flex;
  }

  /* Nom de la marque : visible en desktop */
  .nb-brand-text {
    display: inline;
  }

  /* Bouton loupe mobile (caché en desktop) */
  .nb-search-toggle {
    display: none;
    background: rgba(255,255,255,0.1);
    border: none;
    color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
  }

  /* ════════ TABLETTE  ≤ 640 px ════════ */
  @media (max-width: 640px) {
    .nb-header {
      padding: 0 14px;
      gap: 10px;
    }

    /* Masquer la barre de recherche inline */
    .nb-search-wrap {
      display: none;
    }

    /* Afficher le bouton loupe */
    .nb-search-toggle {
      display: flex;
    }

    /* Nom de marque raccourci */
    .nb-brand-text {
      display: none;
    }
    .nb-brand-short {
      display: inline !important;
    }

    /* Masquer le nom d'utilisateur, garder avatar + logout */
    .nb-username {
      display: none;
    }

    .nb-user-area {
      padding: 4px !important;
      gap: 4px !important;
    }
  }

  /* ════════ MOBILE  ≤ 400 px ════════ */
  @media (max-width: 400px) {
    .nb-header {
      padding: 0 10px;
      gap: 8px;
    }

    .nb-logo-circle {
      width: 30px !important;
      height: 30px !important;
      font-size: 15px !important;
    }

    .nb-cart-btn {
      width: 36px !important;
      height: 36px !important;
    }
  }
`;

function InjectNavbarStyles() {
  useEffect(() => {
    const id = "nb-responsive-styles";
    if (!document.getElementById(id)) {
      const tag = document.createElement("style");
      tag.id = id;
      tag.textContent = NAVBAR_CSS;
      document.head.appendChild(tag);
    }
  }, []);
  return null;
}

export default function Navbar({ search, setSearch, onCartClick, onBack, user, onLogout }) {
  const { totalItems } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);

  /* Fermer l'overlay si on appuie sur Escape */
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setSearchOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <InjectNavbarStyles />

      <header className="nb-header">

        {/* ── Logo ── */}
        <div style={styles.logoArea}>
          <div className="nb-logo-circle" style={styles.logoCircle}>⚽</div>
          <button onClick={onBack} style={styles.brandName}>
            <span className="nb-brand-text">BoutiqueMaillot</span>
            {/* Version courte sur mobile */}
            <span className="nb-brand-short" style={{ display: "none" }}>BM</span>
          </button>
        </div>

        {/* ── Recherche inline (desktop) ── */}
        <div className="nb-search-wrap">
          <span style={styles.searchIcon}><Search size={16} /></span>
          <input
            type="text"
            placeholder="Rechercher un maillot..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        {/* ── Actions droite ── */}
        <div style={styles.rightArea}>

          {/* Bouton loupe (mobile uniquement) */}
          <button
            className="nb-search-toggle"
            onClick={() => setSearchOpen(true)}
            title="Rechercher"
          >
            <Search size={18} />
          </button>

          {/* Panier */}
          <button className="nb-cart-btn" onClick={onCartClick} style={styles.cartBtn}>
            <ShoppingCart size={20} />
            {totalItems > 0 && <span style={styles.badge}>{totalItems}</span>}
          </button>

          {/* Utilisateur connecté */}
          {user && (
            <div className="nb-user-area" style={styles.userArea}>
              <div style={styles.avatar}>
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <span className="nb-username" style={styles.userName}>
                {user.name}
              </span>
              <button onClick={onLogout} style={styles.logoutBtn} title="Se déconnecter">
                <LogOut size={16} />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* ── Overlay de recherche mobile ── */}
      <div className={`nb-search-overlay${searchOpen ? " open" : ""}`}>
        <span style={{ color: "rgba(255,255,255,0.5)", display: "flex", flexShrink: 0 }}>
          <Search size={18} />
        </span>
        <input
          type="text"
          placeholder="Rechercher un maillot..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus={searchOpen}
          style={{ ...styles.searchInput, flex: 1, maxWidth: "none" }}
        />
        <button
          onClick={() => setSearchOpen(false)}
          style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", display: "flex", flexShrink: 0 }}
        >
          <X size={22} />
        </button>
      </div>
    </>
  );
}

const styles = {
  logoArea:    { display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 },
  logoCircle:  { width: "36px", height: "36px", background: "rgba(255,255,255,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" },
  brandName:   { background: "none", border: "none", color: "#fff", fontSize: "16px", fontWeight: "800", cursor: "pointer", fontFamily: "'Georgia', serif", letterSpacing: "0.5px", padding: 0 },
  searchIcon:  { position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", pointerEvents: "none" },
  searchInput: { width: "100%", padding: "9px 14px 9px 40px", borderRadius: "10px", border: "1.5px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: "14px", outline: "none", boxSizing: "border-box", fontFamily: "inherit" },
  rightArea:   { display: "flex", alignItems: "center", gap: "12px", marginLeft: "auto", flexShrink: 0 },
  cartBtn:     { position: "relative", background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", width: "40px", height: "40px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
  badge:       { position: "absolute", top: "-6px", right: "-6px", background: "#fda085", color: "#fff", fontSize: "10px", fontWeight: "800", width: "18px", height: "18px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" },
  userArea:    { display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.08)", borderRadius: "20px", padding: "4px 12px 4px 4px" },
  avatar:      { width: "30px", height: "30px", borderRadius: "50%", background: "linear-gradient(135deg, #f6d365, #fda085)", display: "flex", alignItems: "center", justifyContent: "center", color: "#1a1a2e", fontWeight: "800", fontSize: "13px" },
  userName:    { color: "#fff", fontSize: "13px", fontWeight: "600", maxWidth: "100px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  logoutBtn:   { background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", display: "flex", alignItems: "center", padding: "2px", borderRadius: "4px" },
};