export function Cloud({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`cloud ${className}`}
      viewBox="0 0 200 80"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 59h145c43 0 37-37 14-37-9 0-15 4-18 12C146 2 107 2 96 29 81 10 50 18 50 42 18 28 1 48 10 59Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M38 66h124M75 73h52M61 43h38c22 0 22-25 5-25M137 44h27"
        stroke="currentColor"
      />
    </svg>
  );
}
export function Blossom({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`blossom ${className}`}
      viewBox="0 0 240 340"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M-10 325Q113 248 127 105T219 3M69 267Q30 178 4 163M118 159Q174 167 202 124M126 103Q81 90 61 32M173 43l-4-39"
        stroke="#655b4d"
        strokeWidth="3"
      />
      {[
        [62, 52],
        [125, 101],
        [168, 47],
        [199, 127],
        [113, 169],
        [39, 211],
        [74, 257],
        [18, 166],
        [208, 18],
        [155, 91],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${i * 23})`}>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse
              key={a}
              rx="7"
              ry="11"
              cy="-9"
              transform={`rotate(${a})`}
              fill={i % 2 ? "#e5b3b1" : "#f2d0c9"}
              stroke="#d19a9b"
              strokeWidth=".5"
            />
          ))}
          <circle r="3" fill="#a26a65" />
        </g>
      ))}
    </svg>
  );
}
export function Landscape({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`landscape ${className}`}
      viewBox="0 0 1440 230"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 145 60 100 100 115 170 25 230 100 320 74 410 159 520 129 620 190 710 161 810 182 920 106 1040 145 1120 42 1220 110 1300 51 1440 138V230H0Z"
        fill="#d9dfd0"
      />
      <path
        d="M0 188 100 139 180 170 275 114 380 192 480 174 590 216 720 193 840 205 920 165 1020 181 1140 108 1250 179 1350 133 1440 170V230H0Z"
        fill="#b6c5b2"
      />
      <path d="M0 216Q210 150 430 218T870 215 1440 194V230H0" fill="#8da998" />
      <g stroke="#748b77" fill="none" opacity=".6">
        <path d="m120 165 48-106 53 76m881 40 71-111 42 74m153 35 33-92 58 85" />
        <path d="M10 224q190-49 340-6m700 1q180-45 380-12" />
      </g>
    </svg>
  );
}
export function Roof() {
  return (
    <svg className="roof" viewBox="0 0 1200 100" aria-hidden="true">
      <path
        d="M0 83Q130 93 285 38L600 15 915 38Q1070 93 1200 83L1170 98Q1000 102 900 65H300Q200 102 30 98Z"
        fill="currentColor"
      />
      {Array.from({ length: 45 }, (_, i) => (
        <path
          key={i}
          d={`M${300 + i * 14} 42l-5 20`}
          stroke="var(--paper)"
          strokeWidth="1"
          opacity=".4"
        />
      ))}
    </svg>
  );
}
