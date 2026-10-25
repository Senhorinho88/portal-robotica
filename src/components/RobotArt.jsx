export default function RobotArt({ variant = "board", hero = false }) {
  return (
    <svg
      className={hero ? "hero-art" : "course-art"}
      viewBox="0 0 400 220"
      fill="none"
      aria-hidden="true"
    >
      <g opacity=".18" stroke="currentColor">
        <path d="M0 180h400M0 140h400M0 100h400M0 60h400M40 0v220M100 0v220M160 0v220M220 0v220M280 0v220M340 0v220" />
      </g>
      <ellipse
        cx="206"
        cy="188"
        rx="103"
        ry="12"
        fill="currentColor"
        opacity=".08"
      />
      {(variant === "board" || variant === "code") && (
        <g transform="translate(86 37) rotate(-9 110 70)">
          <path
            d="M24 0h183a15 15 0 0 1 15 15v121a15 15 0 0 1-15 15H24A15 15 0 0 1 9 136V15A15 15 0 0 1 24 0Z"
            fill="#245f50"
            stroke="#163e34"
            strokeWidth="3"
          />
          <rect
            x="-2"
            y="19"
            width="38"
            height="43"
            rx="4"
            fill="#e8ece5"
            stroke="#7d9789"
            strokeWidth="3"
          />
          <rect x="-1" y="96" width="29" height="27" rx="4" fill="#202d29" />
          <rect
            x="76"
            y="57"
            width="76"
            height="46"
            rx="4"
            fill="#182d27"
            stroke="#8faa98"
            strokeWidth="2"
          />
          {Array.from({ length: 9 }, (_, i) => (
            <g key={i}>
              <rect
                x={56 + i * 16}
                y="7"
                width="9"
                height="15"
                rx="1"
                fill="#172d26"
              />
              <rect
                x={56 + i * 16}
                y="128"
                width="9"
                height="15"
                rx="1"
                fill="#172d26"
              />
              <path
                d={`M${81 + i * 8} 51v6m0 46v7`}
                stroke="#c8ceb3"
                strokeWidth="2"
              />
            </g>
          ))}
          <path
            d="M43 76h18v39h117V42h-55V28M53 36h41v13M162 89h31v24"
            stroke="#80ad87"
            strokeWidth="2"
          />
          <circle cx="40" cy="132" r="4" stroke="#b9d3ab" strokeWidth="3" />
          <circle cx="201" cy="32" r="4" stroke="#b9d3ab" strokeWidth="3" />
          <circle cx="190" cy="73" r="5" fill="#c9ee8f" />
          <text
            x="104"
            y="86"
            fill="#d7e7d7"
            fontFamily="monospace"
            fontSize="13"
            textAnchor="middle"
          >
            {variant === "code" ? "</>" : "UNO"}
          </text>
        </g>
      )}
      {variant === "sensor" && (
        <g transform="translate(88 54) rotate(7 110 60)">
          <rect
            x="0"
            y="9"
            width="225"
            height="117"
            rx="12"
            fill="#505a97"
            stroke="#323c77"
            strokeWidth="3"
          />
          <path
            d="M83 127v31m17-31v31m17-31v31m17-31v31"
            stroke="#c5b98c"
            strokeWidth="6"
          />
          {[54, 171].map((x) => (
            <g key={x}>
              <circle
                cx={x}
                cy="65"
                r="43"
                fill="#dbe0e4"
                stroke="#8d99a4"
                strokeWidth="4"
              />
              <circle
                cx={x}
                cy="65"
                r="32"
                fill="#303b52"
                stroke="#a2acb6"
                strokeWidth="3"
              />
              <circle cx={x} cy="65" r="24" fill="#56657b" />
              <path
                d={`M${x - 21} 53h42m-44 8h46m-46 8h46m-42 8h38`}
                stroke="#a6b4c1"
                strokeWidth="2"
              />
            </g>
          ))}
          <rect x="99" y="42" width="25" height="39" rx="3" fill="#202a48" />
        </g>
      )}
      {variant === "rover" && (
        <g transform="translate(84 37)">
          <path
            d="m35 74 97-28 80 47-97 32Z"
            fill="#f1bd6c"
            stroke="#966d43"
            strokeWidth="3"
          />
          <path
            d="M35 74v27l80 49v-25m0 25 97-30V93"
            fill="#d8974f"
            stroke="#966d43"
            strokeWidth="3"
          />
          <g fill="#34413b" stroke="#1b2924" strokeWidth="4">
            <ellipse
              cx="48"
              cy="113"
              rx="19"
              ry="29"
              transform="rotate(-20 48 113)"
            />
            <ellipse
              cx="114"
              cy="154"
              rx="19"
              ry="29"
              transform="rotate(-20 114 154)"
            />
            <ellipse
              cx="208"
              cy="119"
              rx="16"
              ry="27"
              transform="rotate(15 208 119)"
            />
          </g>
          <path
            d="m81 78 47-15 40 24-48 15Z"
            fill="#4e8a69"
            stroke="#2f6146"
            strokeWidth="2"
          />
          <path d="M153 71V35" stroke="#626e66" strokeWidth="7" />
          <rect
            x="119"
            y="13"
            width="74"
            height="33"
            rx="5"
            fill="#7c8f99"
            transform="rotate(9 119 13)"
          />
          <circle
            cx="137"
            cy="32"
            r="11"
            fill="#25394b"
            stroke="#d4dbde"
            strokeWidth="3"
          />
          <circle
            cx="176"
            cy="38"
            r="11"
            fill="#25394b"
            stroke="#d4dbde"
            strokeWidth="3"
          />
          <path d="m71 95 20-8 37 23" stroke="#b04d40" strokeWidth="3" />
        </g>
      )}
      {(variant === "arm" || hero) && (
        <g
          transform={hero ? "translate(86 5)" : "translate(86 0)"}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="m37 182 74-23 79 23-75 26Z"
            fill="#586c55"
            stroke="#819477"
            strokeWidth="2"
          />
          <path
            d="M37 182v14l78 24 75-24v-14l-75 26Z"
            fill="#293e31"
            stroke="#819477"
            strokeWidth="2"
          />
          <path d="M103 181v-35l39-60" stroke="#182f25" strokeWidth="37" />
          <path d="M103 178v-32l39-60" stroke="#c5ef8d" strokeWidth="27" />
          <path d="m143 85 51-48" stroke="#182f25" strokeWidth="32" />
          <path d="m143 85 51-48" stroke="#e1f5bb" strokeWidth="23" />
          <circle
            cx="103"
            cy="148"
            r="17"
            fill="#304a36"
            stroke="#9dbe7b"
            strokeWidth="4"
          />
          <circle cx="103" cy="148" r="5" fill="#c5ef8d" />
          <circle
            cx="144"
            cy="86"
            r="18"
            fill="#304a36"
            stroke="#9dbe7b"
            strokeWidth="4"
          />
          <circle cx="144" cy="86" r="6" fill="#c5ef8d" />
          <circle
            cx="194"
            cy="37"
            r="14"
            fill="#304a36"
            stroke="#9dbe7b"
            strokeWidth="4"
          />
          <path
            d="m207 36 21 16-6 18m-14-27 5 19 17 8"
            stroke="#d8e8cd"
            strokeWidth="7"
          />
          <path d="M77 187h54" stroke="#b3d293" strokeWidth="4" />
          <path
            d="m94 132 30-48 50-45"
            stroke="#f0f6df"
            strokeWidth="2"
            opacity=".5"
          />
        </g>
      )}
      {variant === "home" && (
        <g transform="translate(100 34)">
          <path
            d="m0 75 100-63 100 63"
            stroke="#2e6e57"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M24 69v105h150V69l-75-48Z"
            fill="#e5f2d5"
            stroke="#6f9c79"
            strokeWidth="3"
          />
          <rect x="87" y="112" width="34" height="62" rx="3" fill="#497d68" />
          <rect
            x="43"
            y="94"
            width="26"
            height="31"
            rx="3"
            fill="#b1d7c1"
            stroke="#497d68"
            strokeWidth="3"
          />
          <path
            d="M74 44q25-23 50 0m-39 9q14-13 28 0"
            stroke="#477b63"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="99" cy="62" r="3" fill="#477b63" />
        </g>
      )}
    </svg>
  );
}
