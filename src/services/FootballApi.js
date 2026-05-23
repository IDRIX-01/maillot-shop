const API_KEY  = import.meta.env.VITE_FOOTBALL_API_KEY || "";
const BASE_URL = "https://v3.football.api-sports.io";

const LEAGUES = [
  { id: 61,  name: "Ligue 1",          country: "France"     },
  { id: 39,  name: "Premier League",   country: "Angleterre" },
  { id: 140, name: "La Liga",          country: "Espagne"    },
  { id: 135, name: "Serie A",          country: "Italie"     },
  { id: 78,  name: "Bundesliga",       country: "Allemagne"  },
  { id: 2,   name: "Champions League", country: "Europe"     },
  { id: 3,   name: "Europa League",    country: "Europe"     },
  { id: 233, name: "COSAFA",           country: "Afrique"    },
];

const SEASON = 2024;

async function apiFetch(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "x-rapidapi-key":  API_KEY,
      "x-rapidapi-host": "v3.football.api-sports.io",
    },
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json();
  if (data.errors && Object.keys(data.errors).length > 0) {
    throw new Error(JSON.stringify(data.errors));
  }
  return data.response;
}

function clubToProduct(team, league, index) {
  const { id, name, logo, country, national } = team.team;
  const venue = team.venue;

  const colorPalette = [
    "#e63946", "#457b9d", "#2d6a4f", "#f4a261",
    "#8338ec", "#023e8a", "#d62828", "#606c38",
    "#3a0ca3", "#f72585", "#0077b6", "#40916c",
  ];
  const color = colorPalette[index % colorPalette.length];
  const basePrice = 12000;

  return {
    id:       `club_${id}`,
    name:     `Maillot ${name}`,
    clubName: name,
    league:   league.name,
    country:  country || league.country,
    image:    logo,
    color,
    price:    basePrice,
    venue:    venue?.name || "",
    national: national || false,
    tags:     [league.name, country || league.country],
  };
}

export async function fetchAllClubs() {
  if (!API_KEY) {
    console.warn("[footballApi] Aucune clé API — utilisation des données de démo");
    return null;
  }

  const allProducts = [];
  const seen = new Set();

  for (const league of LEAGUES) {
    try {
      const teams = await apiFetch(`/teams?league=${league.id}&season=${SEASON}`);
      teams.forEach((team) => {
        if (!seen.has(team.team.id)) {
          seen.add(team.team.id);
          allProducts.push(clubToProduct(team, league, allProducts.length));
        }
      });
    } catch (err) {
      console.error(`[footballApi] Erreur ligue ${league.name}:`, err.message);
    }
  }

  return allProducts;
}

export async function searchClubs(query) {
  if (!API_KEY || !query) return [];
  try {
    const teams = await apiFetch(`/teams?search=${encodeURIComponent(query)}`);
    return teams.map((team, i) =>
      clubToProduct(team, { name: team.team.country, country: team.team.country }, i)
    );
  } catch (err) {
    console.error("[footballApi] Erreur recherche:", err.message);
    return [];
  }
}
