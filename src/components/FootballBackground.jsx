export default function FootballBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <defs>
          {/* Lignes de terrain */}
          <pattern
            id="terrainPattern"
            x="0"
            y="0"
            width="240"
            height="240"
            patternUnits="userSpaceOnUse"
          >
            {/* Bandes de gazon alternées */}
            <rect x="0" y="0" width="240" height="120" fill="rgba(48,43,99,0.03)" />
            <rect x="0" y="120" width="240" height="120" fill="rgba(48,43,99,0.015)" />
            {/* Ligne centrale */}
            <line x1="120" y1="0" x2="120" y2="240" stroke="rgba(48,43,99,0.06)" strokeWidth="1" />
            {/* Cercle central */}
            <circle cx="120" cy="120" r="50" fill="none" stroke="rgba(48,43,99,0.07)" strokeWidth="1" />
            {/* Point central */}
            <circle cx="120" cy="120" r="3" fill="rgba(48,43,99,0.08)" />
            {/* Lignes de touche */}
            <rect x="10" y="10" width="220" height="220" fill="none" stroke="rgba(48,43,99,0.05)" strokeWidth="1" />
            {/* Surface de réparation gauche */}
            <rect x="10" y="80" width="50" height="80" fill="none" stroke="rgba(48,43,99,0.05)" strokeWidth="1" />
            {/* Surface de réparation droite */}
            <rect x="180" y="80" width="50" height="80" fill="none" stroke="rgba(48,43,99,0.05)" strokeWidth="1" />
          </pattern>

          {/* Ballons de foot */}
          <pattern
            id="ballPattern"
            x="30"
            y="30"
            width="160"
            height="160"
            patternUnits="userSpaceOnUse"
          >
            <g transform="translate(80,80)">
              {/* Cercle extérieur */}
              <circle cx="0" cy="0" r="22" fill="none" stroke="rgba(48,43,99,0.1)" strokeWidth="1.5" />
              {/* Pentagone central */}
              <polygon
                points="0,-10 9.5,-3 5.9,8 -5.9,8 -9.5,-3"
                fill="rgba(48,43,99,0.12)"
                stroke="rgba(48,43,99,0.1)"
                strokeWidth="0.8"
              />
              {/* Segments hexagonaux */}
              <line x1="0" y1="-22" x2="0" y2="-10" stroke="rgba(48,43,99,0.08)" strokeWidth="1" />
              <line x1="20.9" y1="-7" x2="9.5" y2="-3" stroke="rgba(48,43,99,0.08)" strokeWidth="1" />
              <line x1="12.9" y1="18" x2="5.9" y2="8" stroke="rgba(48,43,99,0.08)" strokeWidth="1" />
              <line x1="-12.9" y1="18" x2="-5.9" y2="8" stroke="rgba(48,43,99,0.08)" strokeWidth="1" />
              <line x1="-20.9" y1="-7" x2="-9.5" y2="-3" stroke="rgba(48,43,99,0.08)" strokeWidth="1" />
            </g>
          </pattern>

          {/* Grands éléments décoratifs espacés */}
          <pattern
            id="bigDecorPattern"
            x="0"
            y="0"
            width="500"
            height="500"
            patternUnits="userSpaceOnUse"
          >
            {/* Grand ballon fantôme */}
            <circle cx="250" cy="250" r="80" fill="none" stroke="rgba(48,43,99,0.04)" strokeWidth="2" />
            <polygon
              points="250,170 325,220 296,308 204,308 175,220"
              fill="none"
              stroke="rgba(48,43,99,0.04)"
              strokeWidth="1.5"
            />
            {/* Lignes diagonales légères */}
            <line x1="0" y1="0" x2="500" y2="500" stroke="rgba(48,43,99,0.02)" strokeWidth="1" />
            <line x1="500" y1="0" x2="0" y2="500" stroke="rgba(48,43,99,0.02)" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Appliquer les patterns en couches */}
        <rect width="100%" height="100%" fill="url(#bigDecorPattern)" />
        <rect width="100%" height="100%" fill="url(#terrainPattern)" />
        <rect width="100%" height="100%" fill="url(#ballPattern)" />
      </svg>
    </div>
  );
}
