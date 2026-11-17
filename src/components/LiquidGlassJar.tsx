import React from 'react';

interface LiquidGlassJarProps {
  doneTopics: number;
  totalTopics: number;
  pct: number;
  level: number;
}

export const LiquidGlassJar: React.FC<LiquidGlassJarProps> = ({
  doneTopics,
  totalTopics,
  pct,
  level,
}) => {
  // 0% -> translateY(182px) (empty base); 100% -> translateY(34px) (neck)
  const emptyY = 182;
  const fullY = 34;
  const currentY = emptyY - (pct / 100) * (emptyY - fullY);

  return (
    <div className="flex flex-col items-center justify-center gap-3 select-none">
      <div className="relative w-44 h-48 flex items-center justify-center">
        <svg
          viewBox="0 0 200 220"
          xmlns="http://www.w3.org/2000/svg"
          aria-label={`Jarro da Aprovação OAB: ${pct}% concluído`}
          className="w-full h-full overflow-visible drop-shadow-[0_14px_24px_rgba(15,23,42,0.08)]"
        >
          <defs>
            {/* Inner carafe cavity clip */}
            <clipPath id="jarInteriorClip">
              <path
                d="M 60 36
                   C 66 56, 65 72, 52 94
                   C 36 120, 35 162, 56 184
                   C 66 193, 124 193, 134 184
                   C 155 162, 154 120, 138 94
                   C 125 72, 124 56, 130 36 Z"
              />
            </clipPath>

            {/* Luminous OAB crimson liquid gradient */}
            <linearGradient id="oabRedLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f87171" stopOpacity="0.92" />
              <stop offset="22%" stopColor="#dc2626" stopOpacity="0.96" />
              <stop offset="100%" stopColor="#881337" stopOpacity="0.98" />
            </linearGradient>

            {/* Secondary depth wave */}
            <linearGradient id="oabRedBack" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#b91c1c" stopOpacity="0.82" />
              <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0.92" />
            </linearGradient>

            {/* Frosted glass specular refraction */}
            <linearGradient id="glassTint" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.72" />
              <stop offset="35%" stopColor="#e2e8f0" stopOpacity="0.22" />
              <stop offset="70%" stopColor="#ffffff" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.45" />
            </linearGradient>

            {/* Glass rim stroke gradient */}
            <linearGradient id="glassRimStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#94a3b8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#475569" stopOpacity="0.32" />
            </linearGradient>
          </defs>

          {/* Soft ambient base shadow */}
          <ellipse cx="95" cy="198" rx="44" ry="6.5" fill="rgba(15, 23, 42, 0.08)" />
          <ellipse cx="95" cy="196" rx="34" ry="4" fill="rgba(185, 28, 28, 0.1)" />

          {/* Minimalist glass handle */}
          <path
            d="M 134 46
               C 144 46, 146 54, 156 54
               C 178 54, 188 82, 184 114
               C 180 138, 168 144, 167 162
               C 166 171, 158 172, 155 164
               C 152 152, 154 134, 147 125"
            fill="none"
            stroke="rgba(148, 163, 184, 0.45)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 134 46
               C 144 46, 146 54, 156 54
               C 178 54, 188 82, 184 114
               C 180 138, 168 144, 167 162
               C 166 171, 158 172, 155 164
               C 152 152, 154 134, 147 125"
            fill="none"
            stroke="rgba(255, 255, 255, 0.72)"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 144 56 C 166 56, 177 78, 175 110"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Translucent glass body */}
          <path
            d="M 55 30
               C 64 52, 63 70, 49 93
               C 31 121, 31 165, 54 188
               C 65 197, 125 197, 136 188
               C 159 165, 159 121, 141 93
               C 127 70, 126 52, 135 30 Z"
            fill="url(#glassTint)"
          />

          {/* Animated crimson liquid */}
          <g clipPath="url(#jarInteriorClip)">
            <g
              style={{
                transform: `translateY(${currentY}px)`,
                transition: 'transform 0.85s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <path
                className="jar-wave-back"
                d="M 0 6 Q 30 -3, 60 6 T 120 6 T 180 6 T 240 6 T 300 6 L 300 185 L 0 185 Z"
                fill="url(#oabRedBack)"
              />
              <path
                className="jar-wave-front"
                d="M 0 8 Q 30 16, 60 8 T 120 8 T 180 8 T 240 8 T 300 8 L 300 185 L 0 185 Z"
                fill="url(#oabRedLiquid)"
              />
              <path
                className="jar-wave-front"
                d="M 0 8 Q 30 16, 60 8 T 120 8 T 180 8 T 240 8 T 300 8"
                fill="none"
                stroke="#fecaca"
                strokeWidth="1.8"
                opacity="0.75"
              />

              <circle className="jar-bubble" cx="74" cy="84" r="2.6" fill="#fecaca" />
              <circle className="jar-bubble" cx="102" cy="96" r="1.9" fill="#fecaca" />
              <circle className="jar-bubble" cx="116" cy="78" r="2.3" fill="#fecaca" />
            </g>
          </g>

          {/* Outer crystal glass contour */}
          <path
            d="M 55 30
               C 64 52, 63 70, 49 93
               C 31 121, 31 165, 54 188
               C 65 197, 125 197, 136 188
               C 159 165, 159 121, 141 93
               C 127 70, 126 52, 135 30"
            fill="none"
            stroke="url(#glassRimStroke)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Glass spout & lip */}
          <path
            d="M 50 24
               C 46 26, 48 31, 55 32
               C 76 37, 114 37, 135 32
               C 140 31, 141 26, 136 25
               C 114 28, 78 21, 56 22
               C 53 22, 51 23, 50 24 Z"
            fill="rgba(255, 255, 255, 0.72)"
            stroke="rgba(148, 163, 184, 0.52)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M 58 27 C 80 31, 112 31, 131 28"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.88"
          />

          {/* Vertical specular glass highlights */}
          <path
            d="M 54 102 C 42 126, 43 158, 60 179"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3.2"
            strokeLinecap="round"
            opacity="0.82"
          />
          <path
            d="M 134 104 C 144 126, 143 155, 129 175"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Frosted glass central optical readout */}
          <g transform="translate(95, 134)">
            <rect
              x="-34"
              y="-21"
              width="68"
              height="42"
              rx="14"
              fill="rgba(255, 255, 255, 0.88)"
              stroke="rgba(255, 255, 255, 0.95)"
              strokeWidth="1.5"
            />
            <text
              x="0"
              y="3"
              textAnchor="middle"
              fontSize="18"
              fontWeight="700"
              fill="#0f172a"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {pct}%
            </text>
            <text
              x="0"
              y="14"
              textAnchor="middle"
              fontSize="8"
              fontWeight="700"
              fill="#b91c1c"
              letterSpacing="0.08em"
            >
              OAB
            </text>
          </g>
        </svg>
      </div>

      {/* Unboxed quiet metadata */}
      <div className="text-center space-y-0.5">
        <div className="text-sm font-semibold text-slate-800 tabular-nums">
          {doneTopics} de {totalTopics} tópicos
        </div>
        <div className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
          <span>Jarro da Aprovação</span>
          <span aria-hidden="true">·</span>
          <span>Nível {level}</span>
        </div>
      </div>
    </div>
  );
};
