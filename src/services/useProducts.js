// ─────────────────────────────────────────────────────────────────
//  useProducts.js
//  Hook qui gère : chargement API, cache sessionStorage, pagination,
//  filtrage par ligue/pays et recherche.
// ─────────────────────────────────────────────────────────────────

import { useState, useEffect, useMemo, useCallback } from "react";
import { fetchAllClubs } from "./footballApi";
import { demoProducts }  from "../data/demoProducts";

const CACHE_KEY     = "bm_products_cache";
const CACHE_VERSION = "v3_12000"; // ← changer à chaque modification de prix
const PAGE_SIZE     = 24;

export function useProducts(search = "") {
  const [allProducts, setAllProducts]   = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [isDemo, setIsDemo]             = useState(false);
  const [page, setPage]                 = useState(1);
  const [filterLeague,  setFilterLeague]  = useState("Tous");
  const [filterCountry, setFilterCountry] = useState("Tous");

  // ── 1. Chargement initial ───────────────────────────────────────
  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      // Vérifier le cache (valide 1h + version)
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, ts, version } = JSON.parse(cached);
          if (version === CACHE_VERSION && Date.now() - ts < 3_600_000) {
            setAllProducts(data);
            setIsDemo(false);
            setLoading(false);
            return;
          } else {
            sessionStorage.removeItem(CACHE_KEY); // cache périmé ou mauvaise version
          }
        }
      } catch (_) {}

      // Appel API
      try {
        const products = await fetchAllClubs();

        if (!products || products.length === 0) {
          // Pas de clé API → données de démo
          setAllProducts(demoProducts);
          setIsDemo(true);
        } else {
          setAllProducts(products);
          setIsDemo(false);
          // Mettre en cache
          try {
            sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: products, ts: Date.now(), version: CACHE_VERSION }));
          } catch (_) {}
        }
      } catch (err) {
        console.error("[useProducts]", err);
        setAllProducts(demoProducts);
        setIsDemo(true);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // ── 2. Listes de filtres dynamiques ────────────────────────────
  const leagues = useMemo(() => {
    const s = new Set(allProducts.map((p) => p.league).filter(Boolean));
    return ["Tous", ...Array.from(s).sort()];
  }, [allProducts]);

  const countries = useMemo(() => {
    const s = new Set(allProducts.map((p) => p.country).filter(Boolean));
    return ["Tous", ...Array.from(s).sort()];
  }, [allProducts]);

  // ── 3. Filtrage + recherche ─────────────────────────────────────
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return allProducts.filter((p) => {
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.clubName?.toLowerCase().includes(q) ||
        p.country?.toLowerCase().includes(q) ||
        p.league?.toLowerCase().includes(q);

      const matchLeague  = filterLeague  === "Tous" || p.league  === filterLeague;
      const matchCountry = filterCountry === "Tous" || p.country === filterCountry;

      return matchSearch && matchLeague && matchCountry;
    });
  }, [allProducts, search, filterLeague, filterCountry]);

  // ── 4. Pagination ───────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  // Reset page quand les filtres changent
  useEffect(() => { setPage(1); }, [search, filterLeague, filterCountry]);

  // ── 5. Invalidation du cache (rechargement forcé) ───────────────
  const refresh = useCallback(() => {
    sessionStorage.removeItem(CACHE_KEY);
    setAllProducts([]);
    setPage(1);
    setLoading(true);
    fetchAllClubs()
      .then((products) => {
        if (!products || products.length === 0) {
          setAllProducts(demoProducts);
          setIsDemo(true);
        } else {
          setAllProducts(products);
          setIsDemo(false);
          try {
            sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: products, ts: Date.now(), version: CACHE_VERSION }));
          } catch (_) {}
        }
      })
      .catch(() => {
        setAllProducts(demoProducts);
        setIsDemo(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return {
    products:      paginated,
    totalProducts: filtered.length,
    loading,
    error,
    isDemo,
    // pagination
    page,
    totalPages,
    setPage,
    // filtres
    leagues,
    countries,
    filterLeague,
    filterCountry,
    setFilterLeague,
    setFilterCountry,
    // actions
    refresh,
  };
}