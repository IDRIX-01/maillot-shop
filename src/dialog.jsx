import { useState } from "react";
import { ShoppingCart } from 'lucide-react';

const TYPES = [
  { key: "home",       label: "Home" },
  { key: "away",       label: "Away" },
  { key: "third",      label: "Third" },
  { key: "goalkeeper", label: "Gardien" },
];

const YEARS = ["2024-25", "2023-24", "2022-23", "2021-22", "2020-21","2019-20","2018-19","2017-18","2016-17","2015-16"];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

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
  const flocCost     = (nameLetters + numberDigits)*300;
  const total        = (product.price + flocCost) * quantity;

  const handleQty = (d) => setQuantity((q) => Math.max(1, Math.min(99, q + d)));

  const handleConfirm = () => {
    onAddToCart({
      productId:   product.id,
      name:        product.name,
      image:       product.image    ?? null,
      color:       product.color    ?? null,
      basePrice:   product.price,
      type,
      typeLabel:   TYPES.find((t) => t.key === type)?.label ?? type,
      year,
      size,
      quantity,
      flocName:    flocName.trim(),
      flocNumber:  flocNumber.trim(),
      flocCost,
      price:       total,
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1800);
  };

  const typeLabel = TYPES.find((t) => t.key === type)?.label ?? "";

  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.dialog} onClick={(e) => e.stopPropagation()}>

        <div style={s.header}>
          <div>
            <p style={s.title}>{product.name}</p>
            <p style={s.subtitle}>Configurez votre maillot</p>
          </div>
          <button style={s.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div style={s.layout}>

          <div style={{ ...s.previewPanel, background: `${product.color ?? "#378ADD"}18` }}>
            <div style={s.jerseyWrap}>
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
              <div style={{ ...s.jerseyFallback, display: product.image ? "none" : "flex" }}>👕</div>
            </div>

            <div style={s.flocBadge}>
              <div style={s.flocBadgeNum}>{flocNumber || "00"}</div>
              <div style={s.flocBadgeName}>{flocName || "NOM"}</div>
            </div>

            <div style={s.previewTags}>
              <span style={s.tag}>{typeLabel}</span>
              <span style={s.tag}>{year.replace("-", "–")}</span>
              <span style={s.tag}>{size}</span>
              <span style={s.tag}>Qté {quantity}</span>
            </div>

            <div style={s.previewPriceBox}>
              <span style={s.previewPriceLabel}>Prix total</span>
              <span style={s.previewPriceAmt}>{total} FCFA</span>
            </div>
          </div>

          <div style={s.form}>

            <p style={s.label}>Type</p>
            <div style={s.chipGroup}>
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
            <select value={year} onChange={(e) => setYear(e.target.value)} style={s.select}>
              {YEARS.map((y) => (
                <option key={y} value={y}>{y.replace("-", "–")}</option>
              ))}
            </select>

            <div style={s.row}>
              <div style={{ flex: 1 }}>
                <p style={s.label}>Taille</p>
                <div style={{ ...s.chipGroup, flexWrap: "wrap", marginBottom: 0 }}>
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

            <p style={s.label}>Flocage <span style={s.optional}>(optionnel)</span></p>
            <div style={s.flocRow}>
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

        <div style={s.footer}>
          {/* {onGoToDetail && (
            <button
              style={s.btnDetail}
              onClick={() => onGoToDetail(product)}
            >
              Voir le détail
            </button>
          )} */}
          <button style={s.btnCancel} onClick={onClose}>Annuler</button>
          <button
            style={{ ...s.btnConfirm, ...(added ? s.btnAdded : {}) }}
            onClick={handleConfirm}
            disabled={added}
          >
            {added ? (
    "✓ Ajouté !"
  ) : (
    <>
      <ShoppingCart size={18} />
      Ajouter au panier
    </>
  )}
          </button>
        </div>
      </div>
    </div>
  );
}

const s = {
  overlay:           { position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000 },
  dialog:            { background:"#fff", borderRadius:16, width:"95%", maxWidth:740, maxHeight:"92vh", display:"flex", flexDirection:"column", boxShadow:"0 16px 48px rgba(0,0,0,0.22)", overflow:"hidden" },
  header:            { padding:"1.2rem 1.5rem 1rem", borderBottom:"1px solid #eee", display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexShrink:0 },
  title:             { margin:0, fontSize:16, fontWeight:600, color:"#111" },
  subtitle:          { margin:"3px 0 0", fontSize:13, color:"#999" },
  closeBtn:          { background:"none", border:"none", fontSize:18, cursor:"pointer", color:"#aaa", padding:4 },
  layout:            { display:"flex", flex:1, minHeight:0, overflow:"hidden" },
  previewPanel:      { width:190, flexShrink:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:14, padding:"1.5rem 1rem", borderRight:"1px solid #eee" },
  jerseyWrap:        { width:110, height:110, display:"flex", alignItems:"center", justifyContent:"center" },
  jerseyImg:         { maxWidth:"100%", maxHeight:"100%", objectFit:"contain" },
  jerseyFallback:    { fontSize:64, display:"flex", alignItems:"center", justifyContent:"center" },
  flocBadge:         { textAlign:"center", background:"rgba(0,0,0,0.06)", borderRadius:10, padding:"10px 16px", width:"100%", boxSizing:"border-box" },
  flocBadgeNum:      { fontSize:28, fontWeight:900, color:"#1a2a5e", fontFamily:"Georgia, serif", lineHeight:1 },
  flocBadgeName:     { fontSize:11, fontWeight:700, color:"#1a2a5e", letterSpacing:"2px", fontFamily:"Georgia, serif", marginTop:4 },
  previewTags:       { display:"flex", flexWrap:"wrap", gap:5, justifyContent:"center" },
  tag:               { fontSize:11, fontWeight:600, color:"#378ADD", background:"#E6F1FB", borderRadius:99, padding:"3px 9px" },
  previewPriceBox:   { textAlign:"center" },
  previewPriceLabel: { fontSize:11, color:"#999", display:"block", marginBottom:2 },
  previewPriceAmt:   { fontSize:20, fontWeight:900, color:"#1a2a5e" },
  form:              { flex:1, padding:"1.25rem 1.5rem", overflowY:"auto" },
  label:             { fontSize:11, fontWeight:700, color:"#888", textTransform:"uppercase", letterSpacing:"0.07em", margin:"0 0 8px" },
  optional:          { fontWeight:400, textTransform:"none", letterSpacing:0, color:"#bbb", fontSize:11 },
  chipGroup:         { display:"flex", gap:6, marginBottom:"1.1rem" },
  chip:              { padding:"5px 14px", borderRadius:999, border:"1px solid #ddd", background:"#fff", fontSize:13, cursor:"pointer", whiteSpace:"nowrap" },
  chipSm:            { padding:"4px 10px", fontSize:12 },
  chipOn:            { background:"#E6F1FB", borderColor:"#378ADD", color:"#0C447C", fontWeight:600 },
  select:            { width:"100%", fontSize:13, padding:"8px 12px", borderRadius:8, border:"1px solid #ddd", marginBottom:"1.1rem", boxSizing:"border-box", background:"#fff" },
  row:               { display:"flex", gap:20, alignItems:"flex-start", marginBottom:"1.1rem" },
  stepper:           { display:"flex", alignItems:"center", border:"1px solid #ddd", borderRadius:8, overflow:"hidden" },
  stepBtn:           { width:34, height:34, border:"none", background:"#f5f5f5", fontSize:18, cursor:"pointer", color:"#444" },
  stepVal:           { width:36, textAlign:"center", fontSize:14, fontWeight:600 },
  divider:           { borderTop:"1px solid #eee", margin:"0.4rem 0 1.1rem" },
  flocRow:           { display:"flex", gap:10, marginBottom:"0.9rem" },
  inputLabel:        { display:"block", fontSize:11, color:"#aaa", marginBottom:5 },
  input:             { width:"100%", boxSizing:"border-box", fontSize:13, padding:"8px 10px", borderRadius:8, border:"1px solid #ddd", outline:"none", fontFamily:"inherit" },
  flocNote:          { background:"#fffbeb", border:"1px solid #fcd34d", borderRadius:8, padding:"9px 12px", fontSize:12, color:"#92400e" },
  footer:            { padding:"1rem 1.5rem", borderTop:"1px solid #eee", display:"flex", gap:10, justifyContent:"flex-end", flexShrink:0 },
  btnDetail:         { padding:"8px 18px", borderRadius:8, border:"1px solid #378ADD", background:"transparent", color:"#378ADD", fontSize:13, cursor:"pointer", marginRight:"auto" },
  btnCancel:         { padding:"8px 18px", borderRadius:8, border:"1px solid #ddd", background:"transparent", fontSize:13, cursor:"pointer" },
  btnConfirm:        { padding:"8px 22px", borderRadius:8, border:"none", background:"#378ADD", color:"#fff", fontSize:13, fontWeight:600, cursor:"pointer", transition:"background 0.3s" },
  btnAdded:          { background:"#2e7d32" },
};
