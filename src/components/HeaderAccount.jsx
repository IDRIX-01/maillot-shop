import { useState, useRef, useEffect } from "react";

export default function HeaderAccount() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [authMode, setAuthMode] = useState(null);
  // null | "login" | "register"

  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    name: "",
    role: "",
    email: "",
    password: "",
  });

  const dropdownRef = useRef(null);

  // fermer dropdown si clic dehors
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // connexion
  const handleLogin = () => {
    setUser({
      name: form.name || "Utilisateur",
      role: form.role || "Member",
    });

    setAuthMode(null);

    setForm({
      name: "",
      role: "",
      email: "",
      password: "",
    });
  };

  // inscription
  const handleRegister = () => {
    setUser({
      name: form.name,
      role: form.role || "New User",
    });

    setAuthMode(null);

    setForm({
      name: "",
      role: "",
      email: "",
      password: "",
    });
  };

  // déconnexion
  const handleLogout = () => {
    setUser(null);
    setDropdownOpen(false);
  };

  return (
    <>
      <div ref={dropdownRef} style={{ position: "relative" }}>
        {/* Avatar */}
        <button
          onClick={() => setDropdownOpen((o) => !o)}
          style={styles.avatarBtn}
        >
          <div style={styles.avatarCircle}>
            {user
              ? user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              : "?"}
          </div>
        </button>

        {/* Dropdown */}
        {dropdownOpen && (
          <div style={styles.dropdown}>
            {user ? (
              <>
                <div style={styles.dropHeader}>
                  <p style={styles.userName}>
                    {user.name}
                  </p>

                  <p style={styles.userRole}>
                    {user.role}
                  </p>
                </div>

                <div style={styles.dropBody}>
                  <button style={styles.dropItem}>
                    ❓ Aide
                  </button>

                  <button style={styles.dropItem}>
                    ℹ️ À propos
                  </button>

                  <button style={styles.dropItem}>
                    ⚙️ Mes préférences
                  </button>

                  <button
                    onClick={handleLogout}
                    style={{
                      ...styles.dropItem,
                      color: "#e53e3e",
                      fontWeight: "700",
                    }}
                  >
                    ⏻ Déconnexion
                  </button>
                </div>
              </>
            ) : (
              <div style={styles.dropBody}>
                <button
                  onClick={() => {
                    setAuthMode("login");
                    setDropdownOpen(false);
                  }}
                  style={styles.dropItem}
                >
                  🔑 Se connecter
                </button>

                <button
                  onClick={() => {
                    setAuthMode("register");
                    setDropdownOpen(false);
                  }}
                  style={styles.dropItem}
                >
                  📝 Créer un compte
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL */}
      {authMode && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>
              {authMode === "login"
                ? "Connexion"
                : "Créer un compte"}
            </h2>

            {authMode === "register" && (
              <>
                <input
                  type="text"
                  placeholder="Nom"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  style={styles.input}
                />

                <input
                  type="text"
                  placeholder="Rôle"
                  value={form.role}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      role: e.target.value,
                    })
                  }
                  style={styles.input}
                />
              </>
            )}

            {authMode === "login" && (
              <input
                type="text"
                placeholder="Nom utilisateur"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                style={styles.input}
              />
            )}

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              style={styles.input}
            />

            <input
              type="password"
              placeholder="Mot de passe"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              style={styles.input}
            />

            <div style={styles.modalActions}>
              <button
                onClick={() => setAuthMode(null)}
                style={styles.cancelBtn}
              >
                Annuler
              </button>

              <button
                onClick={
                  authMode === "login"
                    ? handleLogin
                    : handleRegister
                }
                style={styles.submitBtn}
              >
                {authMode === "login"
                  ? "Connexion"
                  : "Créer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  avatarBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
  },

  avatarCircle: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg, #f6d365, #fda085)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#333",
    fontWeight: "bold",
    fontSize: "13px",
    border:
      "2px solid rgba(255,255,255,0.4)",
  },

  dropdown: {
    position: "absolute",
    top: "50px",
    right: 0,
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
    width: "220px",
    overflow: "hidden",
    zIndex: 2000,
  },

  dropHeader: {
    padding: "14px 16px",
    borderBottom: "1px solid #eee",
    background: "#f8f9fa",
  },

  userName: {
    margin: 0,
    fontWeight: "700",
    fontSize: "14px",
    color: "#222",
  },

  userRole: {
    margin: "2px 0 0",
    fontSize: "12px",
    color: "#888",
  },

  dropBody: {
    padding: "6px 0",
  },

  dropItem: {
    display: "block",
    width: "100%",
    padding: "10px 16px",
    background: "none",
    border: "none",
    textAlign: "left",
    fontSize: "13px",
    cursor: "pointer",
    color: "#444",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5000,
  },

  modal: {
    width: "360px",
    background: "#fff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
  },

  modalTitle: {
    marginTop: 0,
    marginBottom: "18px",
    fontSize: "20px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  },

  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "10px",
  },

  cancelBtn: {
    padding: "10px 14px",
    border: "none",
    borderRadius: "10px",
    background: "#eee",
    cursor: "pointer",
  },

  submitBtn: {
    padding: "10px 14px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
  },
};