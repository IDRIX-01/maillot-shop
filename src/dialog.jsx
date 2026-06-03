import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";

const TYPES = [
  { key: "home",       label: "Home" },
  { key: "away",       label: "Away" },
  { key: "third",      label: "Third" },
  { key: "goalkeeper", label: "Gardien" },
];

const YEARS = [
  "2024-25","2023-24","2022-23","2021-22","2020-21",
  "2019-20","2018-19","2017-18","2016-17","2015-16",
];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

const DIALOG_CSS = `
  /* ── Conteneur principal ── */
  .jd-dialog {
    background: #fff;
    border-radius: 16px;
    width: 95%;
    max-width: 740px;
    max-height: 92vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 16px 48px rgba(0,0,0,0.22);
    overflow: hidden;
  }

  /* ── Layout interne (côte à côte sur desktop) ── */
  .jd-layout {
    display: flex;
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }

  /* ── Panneau preview (colonne gauche) ── */
  .jd-preview {
    width: 190px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    padding: 1.5rem 1rem;
    border-right: 1px solid #eee;
  }

  /* ── Formulaire (colonne droite) ── */
  .jd-form {
    flex: 1;
    padding: 1.25rem 1.5rem;
    overflow-y: auto;
  }

  /* ── Footer boutons ── */
  .jd-footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid #eee;
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    flex-shrink: 0;
  }

  /* ── Ligne taille + quantité ── */
  .jd-row {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    margin-bottom: 1.1rem;
  }

  /* ── Ligne flocage ── */
  .jd-floc-row {
    display: flex;
    gap: 10px;
    margin-bottom: 0.9rem;
  }

  /* ════════════ TABLETTE  ≤ 640 px ════════════ */
  @media (max-width: 640px) {
    .jd-dialog {
      width: 100%;
      max-width: 100%;
      max-height: 100dvh;
      border-radius: 20px 20px 0 0;
      margin-top: auto; /* colle en bas */
    }

    /* Overlay : aligner en bas */
    .jd-overlay {
      align-items: flex-end !important;
    }

    /* Layout : empilement vertical */
    .jd-layout {
      flex-direction: column;
      overflow-y: auto;
    }

    /* Preview : ligne horizontale compacte */
    .jd-preview {
      width: 100%;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      border-right: none;
      border-bottom: 1px solid #eee;
      padding: 0.9rem 1rem;
      gap: 10px;
    }

    .jd-jersey-wrap {
      width: 64px !important;
      height: 64px !important;
    }

    .jd-floc-badge {
      flex: 1;
      min-width: 80px;
    }

    .jd-preview-tags {
      display: none !important; /* masqué en mobile pour gagner de la place */
    }

    .jd-price-box {
      margin-left: auto;
      text-align: right;
    }

    .jd-form {
      padding: 1rem 1rem;
      overflow-y: visible; /* le scroll est sur .jd-layout */
    }

    .jd-footer {
      padding: 0.75rem 1rem;
      flex-wrap: wrap;
    }

    .jd-btn-confirm,
    .jd-btn-cancel {
      flex: 1;
      text-align: center;
      justify-content: center;
    }
  }

  /* ════════════ MOBILE  ≤ 400 px ════════════ */
  @media (max-width: 400px) {
    .jd-row {
      flex-direction: column;
      gap: 0;
    }

    .jd-floc-row {
      flex-direction: column;
    }

    .jd-floc-row > div {
      width: 100% !important;
    }

    .jd-chip-group {
      flex-wrap: wrap;
    }
  }
`;

function InjectDialogStyles() {
  useEffect(() => {
    const id = "jd-responsive-styles";
    if (!document.getElementById(id)) {
      const tag = document.createElement("style");
      tag.id = id;
      tag.textContent = DIALOG_CSS;
      document.head.appendChild(tag);
    }
  }, []);
  return null;
}

export default function JerseyDialog({ product, onClose, onAddToCart, onGoToDetail }) {
  const [type,       setType]       = useState("home");
  const [year,       setYear]       = useState("2024-25");
  const [size,       setSize]       = useState("M");
  const [quantity,   setQuantity]   = useState(1);
  const [flocName,   setFlocName]   = useState("");
  const [flocNumber, setFlocNumber] = useState("");
  const [added,      setAdded]      = useState(false);

  if (!product) return null;

  const nameLetters  = flocName.replace(/[^A-Za-zÀ-ÿ]/g, "").length;
  const numberDigits = flocNumber.replace(/\D/g, "").length;
  const flocCost     = (nameLetters + numberDigits) * 300;
  const total        = (product.price + flocCost) * quantity;

  const handleQty = (d) => setQuantity((q) => Math.max(1, Math.min(99, q + d)));

  const handleConfirm = () => {
    onAddToCart({
      productId:  product.id,
      name:       product.name,
      image:      product.image   ?? null,
      color:      product.color   ?? null,
      basePrice:  product.price,
      type,
      typeLabel:  TYPES.find((t) => t.key === type)?.label ?? type,
      year,
      size,
      quantity,
      flocName:   flocName.trim(),
      flocNumber: flocNumber.trim(),
      flocCost,
      price:      total,
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1800);
  };

  const typeLabel = TYPES.find((t) => t.key === type)?.label ?? "";

  return (
    <>
      <InjectDialogStyles />

      {/* Overlay */}
      <div className="jd-overlay" style={s.overlay} onClick={onClose}>
        <div className="jd-dialog" onClick={(e) => e.stopPropagation()}>

          {/* ── Header ── */}
          <div style={s.header}>
            <div>
              <p style={s.title}>{product.name}</p>
              <p style={s.subtitle}>Configurez votre maillot</p>
            </div>
            <button style={s.closeBtn} onClick={onClose}>✕</button>
          </div>

          {/* ── Body ── */}
          <div className="jd-layout">

            {/* Panneau preview */}
            <div
              className="jd-preview"
              style={{ background: `${product.color ?? "#378ADD"}18` }}
            >
              <div className="jd-jersey-wrap" style={s.jerseyWrap}>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    style={s.jerseyImg}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div style={{ ...s.jerseyFallback, display: product.image ? "none" : "flex" }}>
                  👕
                </div>
              </div>

              <div className="jd-floc-badge" style={s.flocBadge}>
                <div style={s.flocBadgeNum}>{flocNumber || "00"}</div>
                <div style={s.flocBadgeName}>{flocName || "NOM"}</div>
              </div>

              <div className="jd-preview-tags" style={s.previewTags}>
                <span style={s.tag}>{typeLabel}</span>
                <span style={s.tag}>{year.replace("-", "–")}</span>
                <span style={s.tag}>{size}</span>
                <span style={s.tag}>Qté {quantity}</span>
              </div>

              <div className="jd-price-box" style={s.previewPriceBox}>
                <span style={s.previewPriceLabel}>Prix total</span>
                <span style={s.previewPriceAmt}>{total} FCFA</span>
              </div>
            </div>

            {/* Formulaire */}
            <div className="jd-form">

              <p style={s.label}>Type</p>
              <div className="jd-chip-group" style={s.chipGroup}>
                {TYPES.map((t) => (
                  <button
                    key={t.key}
                    style={{ ...s.chip, ...(type === t.key ? s.chipOn : {}) }}
                    onClick={() => setType(t.key)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <p style={s.label}>Saison</p>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                style={s.select}
              >
                {YEARS.map((y) => (
                  <option key={y} value={y}>{y.replace("-", "–")}</option>
                ))}
              </select>

              <div className="jd-row">
                <div style={{ flex: 1 }}>
                  <p style={s.label}>Taille</p>
                  <div className="jd-chip-group" style={{ ...s.chipGroup, flexWrap: "wrap", marginBottom: 0 }}>
                    {SIZES.map((sz) => (
                      <button
                        key={sz}
                        style={{ ...s.chip, ...s.chipSm, ...(size === sz ? s.chipOn : {}) }}
                        onClick={() => setSize(sz)}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ flexShrink: 0 }}>
                  <p style={s.label}>Qté</p>
                  <div style={s.stepper}>
                    <button style={s.stepBtn} onClick={() => handleQty(-1)}>−</button>
                    <span style={s.stepVal}>{quantity}</span>
                    <button style={s.stepBtn} onClick={() => handleQty(+1)}>+</button>
                  </div>
                </div>
              </div>

              <div style={s.divider} />

              <p style={s.label}>
                Flocage <span style={s.optional}>(optionnel)</span>
              </p>
              <div className="jd-floc-row">
                <div style={{ flex: 1 }}>
                  <span style={s.inputLabel}>Nom</span>
                  <input
                    style={s.input}
                    type="text"
                    maxLength={14}
                    placeholder="ex : KONE"
                    value={flocName}
                    onChange={(e) => setFlocName(e.target.value.toUpperCase())}
                  />
                </div>
                <div style={{ width: 84 }}>
                  <span style={s.inputLabel}>Numéro</span>
                  <input
                    style={s.input}
                    type="text"
                    maxLength={2}
                    placeholder="10"
                    value={flocNumber}
                    onChange={(e) => setFlocNumber(e.target.value.replace(/\D/g, ""))}
                  />
                </div>
              </div>

              {flocCost > 0 && (
                <div style={s.flocNote}>
                  ✂️ Flocage : +{flocCost} FCFA ({nameLetters} lettre{nameLetters !== 1 ? "s" : ""} + {numberDigits} chiffre{numberDigits !== 1 ? "s" : ""})
                </div>
              )}
            </div>
          </div>

          {/* ── Footer ── */}
          <div className="jd-footer">
            <button className="jd-btn-cancel" style={s.btnCancel} onClick={onClose}>
              Annuler
            </button>
            <button
              className="jd-btn-confirm"
              style={{ ...s.btnConfirm, ...(added ? s.btnAdded : {}) }}
              onClick={handleConfirm}
              disabled={added}
            >
              {added ? (
                "✓ Ajouté !"
              ) : (
                <>
                  <ShoppingCart size={16} style={{ marginRight: 6, verticalAlign: "middle" }} />
                  Ajouter au panier
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

const s = {
  overlay:           { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  header:            { padding: "1.2rem 1.5rem 1rem", borderBottom: "1px solid #eee", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexShrink: 0 },
  title:             { margin: 0, fontSize: 16, fontWeight: 600, color: "#111" },
  subtitle:          { margin: "3px 0 0", fontSize: 13, color: "#999" },
  closeBtn:          { background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#aaa", padding: 4 },
  jerseyWrap:        { width: 110, height: 110, display: "flex", alignItems: "center", justifyContent: "center" },
  jerseyImg:         { maxWidth: "100%", maxHeight: "100%", objectFit: "contain" },
  jerseyFallback:    { fontSize: 64, display: "flex", alignItems: "center", justifyContent: "center" },
  flocBadge:         { textAlign: "center", background: "rgba(0,0,0,0.06)", borderRadius: 10, padding: "10px 16px", width: "100%", boxSizing: "border-box" },
  flocBadgeNum:      { fontSize: 28, fontWeight: 900, color: "#1a2a5e", fontFamily: "Georgia, serif", lineHeight: 1 },
  flocBadgeName:     { fontSize: 11, fontWeight: 700, color: "#1a2a5e", letterSpacing: "2px", fontFamily: "Georgia, serif", marginTop: 4 },
  previewTags:       { display: "flex", flexWrap: "wrap", gap: 5, justifyContent: "center" },
  tag:               { fontSize: 11, fontWeight: 600, color: "#378ADD", background: "#E6F1FB", borderRadius: 99, padding: "3px 9px" },
  previewPriceBox:   { textAlign: "center" },
  previewPriceLabel: { fontSize: 11, color: "#999", display: "block", marginBottom: 2 },
  previewPriceAmt:   { fontSize: 20, fontWeight: 900, color: "#1a2a5e" },
  label:             { fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 8px" },
  optional:          { fontWeight: 400, textTransform: "none", letterSpacing: 0, color: "#bbb", fontSize: 11 },
  chipGroup:         { display: "flex", gap: 6, marginBottom: "1.1rem" },
  chip:              { padding: "5px 14px", borderRadius: 999, border: "1px solid #ddd", background: "#fff", fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" },
  chipSm:            { padding: "4px 10px", fontSize: 12 },
  chipOn:            { background: "#E6F1FB", borderColor: "#378ADD", color: "#0C447C", fontWeight: 600 },
  select:            { width: "100%", fontSize: 13, padding: "8px 12px", borderRadius: 8, border: "1px solid #ddd", marginBottom: "1.1rem", boxSizing: "border-box", background: "#fff" },
  stepper:           { display: "flex", alignItems: "center", border: "1px solid #ddd", borderRadius: 8, overflow: "hidden" },
  stepBtn:           { width: 34, height: 34, border: "none", background: "#f5f5f5", fontSize: 18, cursor: "pointer", color: "#444" },
  stepVal:           { width: 36, textAlign: "center", fontSize: 14, fontWeight: 600 },
  divider:           { borderTop: "1px solid #eee", margin: "0.4rem 0 1.1rem" },
  inputLabel:        { display: "block", fontSize: 11, color: "#aaa", marginBottom: 5 },
  input:             { width: "100%", boxSizing: "border-box", fontSize: 13, padding: "8px 10px", borderRadius: 8, border: "1px solid #ddd", outline: "none", fontFamily: "inherit" },
  flocNote:          { background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 8, padding: "9px 12px", fontSize: 12, color: "#92400e" },
  btnCancel:         { padding: "9px 18px", borderRadius: 8, border: "1px solid #ddd", background: "transparent", fontSize: 13, cursor: "pointer" },
  btnConfirm:        { padding: "9px 22px", borderRadius: 8, border: "none", background: "#378ADD", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "background 0.3s", display: "inline-flex", alignItems: "center" },
  btnAdded:          { background: "#2e7d32" },
};