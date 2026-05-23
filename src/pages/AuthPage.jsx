// import { useState } from "react";

// export default function AuthPage({ onAuth }) {
//   const [mode, setMode] = useState("login"); // "login" | "register"
//   const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPass, setShowPass] = useState(false);

//   function handle(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setError("");
//   }

//   function validate() {
//     if (!form.email || !form.password) return "Veuillez remplir tous les champs.";
//     if (!/\S+@\S+\.\S+/.test(form.email)) return "Adresse email invalide.";
//     if (form.password.length < 6) return "Le mot de passe doit contenir au moins 6 caractères.";
//     if (mode === "register") {
//       if (!form.name.trim()) return "Veuillez entrer votre nom.";
//       if (form.password !== form.confirm) return "Les mots de passe ne correspondent pas.";
//     }
//     return null;
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     const err = validate();
//     if (err) { setError(err); return; }

//     setLoading(true);
//     // Simulation d'une authentification (remplacez par votre vraie API)
//     setTimeout(() => {
//       setLoading(false);
//       const user = {
//         name:  mode === "register" ? form.name : form.email.split("@")[0],
//         email: form.email,
//       };
//       localStorage.setItem("bm_user", JSON.stringify(user));
//       onAuth(user);
//     }, 1200);
//   }

//   return (
//     <div style={styles.page}>
//       {/* Orbes décoratifs */}
//       <div style={styles.orb1} />
//       <div style={styles.orb2} />
//       <div style={styles.orb3} />

//       <div style={styles.card}>
//         {/* En-tête */}
//         <div style={styles.cardHeader}>
//           <div style={styles.logo}>
//             <span style={styles.logoIcon}>⚽</span>
//           </div>
//           <h1 style={styles.brand}>BoutiqueMaillot</h1>
//           <p style={styles.tagline}>Maillots officiels · Abidjan, Côte d'Ivoire</p>
//         </div>

//         {/* Onglets */}
//         <div style={styles.tabs}>
//           <button
//             style={{ ...styles.tab, ...(mode === "login" ? styles.tabActive : {}) }}
//             onClick={() => { setMode("login"); setError(""); }}
//           >
//             Connexion
//           </button>
//           <button
//             style={{ ...styles.tab, ...(mode === "register" ? styles.tabActive : {}) }}
//             onClick={() => { setMode("register"); setError(""); }}
//           >
//             Inscription
//           </button>
//           {/* Indicateur glissant */}
//           <div style={{ ...styles.tabIndicator, left: mode === "login" ? "4px" : "50%" }} />
//         </div>

//         {/* Formulaire */}
//         <form onSubmit={handleSubmit} style={styles.form}>

//           {/* Nom (inscription seulement) */}
//           {mode === "register" && (
//             <div style={styles.field}>
//               <label style={styles.label}>Nom complet</label>
//               <div style={styles.inputWrap}>
//                 <span style={styles.inputIcon}>👤</span>
//                 <input
//                   name="name"
//                   type="text"
//                   placeholder="Kouamé Koffi"
//                   value={form.name}
//                   onChange={handle}
//                   style={styles.input}
//                   autoComplete="name"
//                 />
//               </div>
//             </div>
//           )}

//           {/* Email */}
//           <div style={styles.field}>
//             <label style={styles.label}>Adresse email</label>
//             <div style={styles.inputWrap}>
//               <span style={styles.inputIcon}>✉️</span>
//               <input
//                 name="email"
//                 type="email"
//                 placeholder="exemple@email.com"
//                 value={form.email}
//                 onChange={handle}
//                 style={styles.input}
//                 autoComplete="email"
//               />
//             </div>
//           </div>

//           {/* Mot de passe */}
//           <div style={styles.field}>
//             <label style={styles.label}>Mot de passe</label>
//             <div style={styles.inputWrap}>
//               <span style={styles.inputIcon}>🔒</span>
//               <input
//                 name="password"
//                 type={showPass ? "text" : "password"}
//                 placeholder="••••••••"
//                 value={form.password}
//                 onChange={handle}
//                 style={{ ...styles.input, paddingRight: "44px" }}
//                 autoComplete={mode === "login" ? "current-password" : "new-password"}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPass(!showPass)}
//                 style={styles.eyeBtn}
//               >
//                 {showPass ? "🙈" : "👁️"}
//               </button>
//             </div>
//           </div>

//           {/* Confirmation (inscription seulement) */}
//           {mode === "register" && (
//             <div style={styles.field}>
//               <label style={styles.label}>Confirmer le mot de passe</label>
//               <div style={styles.inputWrap}>
//                 <span style={styles.inputIcon}>🔒</span>
//                 <input
//                   name="confirm"
//                   type={showPass ? "text" : "password"}
//                   placeholder="••••••••"
//                   value={form.confirm}
//                   onChange={handle}
//                   style={styles.input}
//                   autoComplete="new-password"
//                 />
//               </div>
//             </div>
//           )}

//           {/* Mot de passe oublié */}
//           {mode === "login" && (
//             <div style={{ textAlign: "right", marginTop: "-8px", marginBottom: "8px" }}>
//               <span style={styles.forgotLink}>Mot de passe oublié ?</span>
//             </div>
//           )}

//           {/* Erreur */}
//           {error && (
//             <div style={styles.errorBox}>
//               <span>⚠️</span> {error}
//             </div>
//           )}

//           {/* Bouton soumettre */}
//           <button type="submit" style={styles.submitBtn} disabled={loading}>
//             {loading ? (
//               <span style={styles.spinner}>⚽</span>
//             ) : mode === "login" ? (
//               "Se connecter →"
//             ) : (
//               "Créer mon compte →"
//             )}
//           </button>
//         </form>

//         {/* Séparateur */}
//         <div style={styles.divider}>
//           <span style={styles.dividerLine} />
//           <span style={styles.dividerText}>ou continuer avec</span>
//           <span style={styles.dividerLine} />
//         </div>

//         {/* Boutons sociaux */}
//         <div style={styles.socialRow}>
//           <button style={styles.socialBtn} onClick={() => onAuth({ name: "Invité Google", email: "google@demo.com" })}>
//             <span style={{ fontSize: "18px" }}>G</span> Google
//           </button>
//           <button style={styles.socialBtn} onClick={() => onAuth({ name: "Invité Facebook", email: "fb@demo.com" })}>
//             <span style={{ fontSize: "18px" }}>f</span> Facebook
//           </button>
//         </div>

//         {/* Footer */}
//         <p style={styles.footerNote}>
//           {mode === "login" ? "Pas encore de compte ? " : "Déjà un compte ? "}
//           <span
//             style={styles.switchLink}
//             onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
//           >
//             {mode === "login" ? "S'inscrire" : "Se connecter"}
//           </span>
//         </p>
//       </div>

//       <style>{`
//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(30px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes pulse {
//           0%, 100% { transform: scale(1); opacity: 0.6; }
//           50%       { transform: scale(1.15); opacity: 0.9; }
//         }
//       `}</style>
//     </div>
//   );
// }

// const styles = {
//   page: {
//     minHeight: "100vh",
//     background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "20px",
//     position: "relative",
//     overflow: "hidden",
//   },

//   // Orbes décoratifs
//   orb1: {
//     position: "absolute", top: "-120px", right: "-120px",
//     width: "400px", height: "400px", borderRadius: "50%",
//     background: "radial-gradient(circle, rgba(253,160,133,0.18) 0%, transparent 70%)",
//     animation: "pulse 6s ease-in-out infinite",
//     pointerEvents: "none",
//   },
//   orb2: {
//     position: "absolute", bottom: "-80px", left: "-80px",
//     width: "300px", height: "300px", borderRadius: "50%",
//     background: "radial-gradient(circle, rgba(246,211,101,0.15) 0%, transparent 70%)",
//     animation: "pulse 8s ease-in-out infinite 2s",
//     pointerEvents: "none",
//   },
//   orb3: {
//     position: "absolute", top: "40%", left: "10%",
//     width: "200px", height: "200px", borderRadius: "50%",
//     background: "radial-gradient(circle, rgba(131,56,236,0.12) 0%, transparent 70%)",
//     animation: "pulse 10s ease-in-out infinite 1s",
//     pointerEvents: "none",
//   },

//   // Carte
//   card: {
//     background: "rgba(255,255,255,0.04)",
//     backdropFilter: "blur(24px)",
//     WebkitBackdropFilter: "blur(24px)",
//     border: "1px solid rgba(255,255,255,0.12)",
//     borderRadius: "24px",
//     padding: "40px 36px",
//     width: "100%",
//     maxWidth: "420px",
//     boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
//     animation: "fadeUp 0.5s ease forwards",
//     position: "relative",
//     zIndex: 1,
//   },

//   // Header
//   cardHeader: { textAlign: "center", marginBottom: "28px" },
//   logo: {
//     width: "64px", height: "64px", borderRadius: "50%",
//     background: "linear-gradient(135deg, #f6d365, #fda085)",
//     display: "flex", alignItems: "center", justifyContent: "center",
//     margin: "0 auto 14px", boxShadow: "0 8px 24px rgba(253,160,133,0.4)",
//   },
//   logoIcon:  { fontSize: "30px" },
//   brand:     { margin: "0 0 6px", color: "#fff", fontSize: "22px", fontWeight: "800", fontFamily: "'Georgia', serif", letterSpacing: "0.5px" },
//   tagline:   { margin: 0, color: "rgba(255,255,255,0.45)", fontSize: "12px" },

//   // Onglets
//   tabs: {
//     display: "flex", position: "relative",
//     background: "rgba(255,255,255,0.06)", borderRadius: "12px",
//     padding: "4px", marginBottom: "28px",
//   },
//   tab: {
//     flex: 1, padding: "10px", border: "none", background: "transparent",
//     color: "rgba(255,255,255,0.5)", fontSize: "14px", fontWeight: "600",
//     cursor: "pointer", borderRadius: "8px", position: "relative", zIndex: 1,
//     transition: "color 0.25s",
//   },
//   tabActive: { color: "#fff" },
//   tabIndicator: {
//     position: "absolute", top: "4px", bottom: "4px",
//     width: "calc(50% - 4px)",
//     background: "linear-gradient(135deg, #302b63, #0f0c29)",
//     borderRadius: "8px",
//     transition: "left 0.25s cubic-bezier(.4,0,.2,1)",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
//   },

//   // Champs
//   form:      { display: "flex", flexDirection: "column", gap: "16px" },
//   field:     { display: "flex", flexDirection: "column", gap: "6px" },
//   label:     { color: "rgba(255,255,255,0.6)", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" },
//   inputWrap: { position: "relative", display: "flex", alignItems: "center" },
//   inputIcon: { position: "absolute", left: "14px", fontSize: "15px", pointerEvents: "none" },
//   input: {
//     width: "100%", padding: "12px 14px 12px 42px",
//     background: "rgba(255,255,255,0.07)",
//     border: "1.5px solid rgba(255,255,255,0.12)",
//     borderRadius: "10px", color: "#fff", fontSize: "14px",
//     outline: "none", boxSizing: "border-box", fontFamily: "inherit",
//     transition: "border-color 0.2s, background 0.2s",
//   },
//   eyeBtn: {
//     position: "absolute", right: "12px",
//     background: "none", border: "none", cursor: "pointer",
//     fontSize: "16px", padding: "4px",
//   },
//   forgotLink: {
//     color: "#fda085", fontSize: "12px", cursor: "pointer",
//     fontWeight: "600",
//   },

//   // Erreur
//   errorBox: {
//     background: "rgba(230,57,70,0.15)", border: "1px solid rgba(230,57,70,0.4)",
//     borderRadius: "8px", padding: "10px 14px",
//     color: "#ff8a8a", fontSize: "13px", display: "flex", gap: "8px", alignItems: "center",
//   },

//   // Bouton principal
//   submitBtn: {
//     marginTop: "4px", padding: "14px",
//     background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
//     border: "none", borderRadius: "12px",
//     color: "#1a1a2e", fontSize: "15px", fontWeight: "800",
//     cursor: "pointer", letterSpacing: "0.5px",
//     boxShadow: "0 8px 24px rgba(253,160,133,0.35)",
//     transition: "opacity 0.2s, transform 0.1s",
//   },
//   spinner: {
//     display: "inline-block",
//     animation: "spin 0.8s linear infinite",
//     fontSize: "18px",
//   },

//   // Séparateur
//   divider: {
//     display: "flex", alignItems: "center", gap: "12px",
//     margin: "24px 0 16px",
//   },
//   dividerLine: { flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" },
//   dividerText: { color: "rgba(255,255,255,0.35)", fontSize: "12px", whiteSpace: "nowrap" },

//   // Boutons sociaux
//   socialRow: { display: "flex", gap: "10px" },
//   socialBtn: {
//     flex: 1, padding: "11px",
//     background: "rgba(255,255,255,0.07)",
//     border: "1px solid rgba(255,255,255,0.12)",
//     borderRadius: "10px", color: "#fff",
//     fontSize: "13px", fontWeight: "700",
//     cursor: "pointer", display: "flex",
//     alignItems: "center", justifyContent: "center", gap: "8px",
//     transition: "background 0.2s",
//   },

//   // Footer
//   footerNote: { textAlign: "center", color: "rgba(255,255,255,0.35)", fontSize: "13px", margin: "20px 0 0" },
//   switchLink: { color: "#fda085", fontWeight: "700", cursor: "pointer" },
// };
