const stickerShadow = [
  "drop-shadow(2px 0 0 white)",
  "drop-shadow(-2px 0 0 white)",
  "drop-shadow(0 2px 0 white)",
  "drop-shadow(0 -2px 0 white)",
  "drop-shadow(2px 2px 0 white)",
  "drop-shadow(-2px -2px 0 white)",
  "drop-shadow(2px -2px 0 white)",
  "drop-shadow(-2px 2px 0 white)",
  "drop-shadow(0 3px 5px rgba(0,0,0,0.5))",
].join(" ");

export function StopSign() {
  return (
    <svg
      viewBox="0 0 240 240"
      xmlns="http://www.w3.org/2000/svg"
      width="240"
      height="240"
    >
      {/* Pole */}
      <rect x="112" y="185" width="16" height="55" fill="#888" rx="2" />

      {/* Sign body — octagon */}
      <polygon
        points="73,20 167,20 220,73 220,167 167,220 73,220 20,167 20,73"
        fill="#CC0000"
        stroke="#fff"
        strokeWidth="8"
      />
      <polygon
        points="78,30 162,30 210,78 210,162 162,210 78,210 30,162 30,78"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
      />

      {/* STOP text */}
      <text
        x="120"
        y="138"
        textAnchor="middle"
        fontFamily="Arial Black, Arial, sans-serif"
        fontWeight="900"
        fontSize="52"
        fill="#fff"
        letterSpacing="2"
      >
        STOP
      </text>

      {/* Sticker: TypeScript — top-left */}
      <g transform="translate(38, 42) rotate(-18)">
        <g style={{ filter: stickerShadow }}>
          <rect width="36" height="36" rx="4" fill="#3178C6" />
          <text
            x="4"
            y="15"
            fontFamily="Arial"
            fontWeight="900"
            fontSize="9"
            fill="#fff"
          >
            TS
          </text>
          <rect
            x="4"
            y="20"
            width="28"
            height="11"
            rx="1"
            fill="#fff"
            opacity="0.2"
          />
          <text
            x="6"
            y="29"
            fontFamily="Arial"
            fontWeight="700"
            fontSize="7"
            fill="#fff"
          >
            type
          </text>
        </g>
      </g>

      {/* Sticker: React — top-right */}
      <g transform="translate(168, 32) rotate(14)">
        <g style={{ filter: stickerShadow }}>
          <circle cx="18" cy="18" r="18" fill="#20232A" />
          <g fill="none" stroke="#61DAFB" strokeWidth="2.5">
            <ellipse cx="18" cy="18" rx="16" ry="6" />
            <ellipse
              cx="18"
              cy="18"
              rx="16"
              ry="6"
              transform="rotate(60 18 18)"
            />
            <ellipse
              cx="18"
              cy="18"
              rx="16"
              ry="6"
              transform="rotate(120 18 18)"
            />
          </g>
          <circle cx="18" cy="18" r="3" fill="#61DAFB" />
        </g>
      </g>

      {/* Sticker: JavaScript — bottom-right */}
      <g transform="translate(160, 165) rotate(22)">
        <g style={{ filter: stickerShadow }}>
          <rect width="34" height="34" fill="#F7DF1E" />
          <text
            x="4"
            y="14"
            fontFamily="Arial"
            fontWeight="900"
            fontSize="8"
            fill="#323330"
          >
            JS
          </text>
          <rect
            x="16"
            y="18"
            width="14"
            height="12"
            rx="1"
            fill="#323330"
            opacity="0.15"
          />
          <text
            x="18"
            y="27"
            fontFamily="Arial"
            fontWeight="700"
            fontSize="7"
            fill="#323330"
          >
            fn()
          </text>
        </g>
      </g>

      {/* Sticker: Python — bottom-left */}
      <g transform="translate(38, 162) rotate(-12)">
        <g style={{ filter: stickerShadow }}>
          <rect width="36" height="36" rx="18" fill="#306998" />
          <text
            x="18"
            y="23"
            textAnchor="middle"
            fontFamily="Arial"
            fontWeight="900"
            fontSize="14"
            fill="#FFD43B"
          >
            Py
          </text>
        </g>
      </g>

      {/* Sticker: Go — right middle */}
      <g transform="translate(190, 108) rotate(8)">
        <g style={{ filter: stickerShadow }}>
          <rect width="34" height="22" rx="4" fill="#00ACD7" />
          <text
            x="17"
            y="15"
            textAnchor="middle"
            fontFamily="Arial"
            fontWeight="900"
            fontSize="13"
            fill="#fff"
          >
            Go
          </text>
        </g>
      </g>
    </svg>
  );
}
