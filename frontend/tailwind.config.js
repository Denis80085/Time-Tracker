const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ matchUtilities, theme, addBase }) {
      addBase({
        "@keyframes l3": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      });
      matchUtilities(
        {
          inborder: (value) => {
            const [color, val] = value.split("-");
            return {
              position: "relative",
              borderRadius: "10px",
              "&::before": {
                content: "''",
                position: "absolute",
                border: `4px solid ${theme(`colors.${color}.${val}`)}`,
                width: "calc(100% + 4px)",
                height: "calc(100% + 4px)",
                top: "-2px",
                left: "-2px",
                borderRadius: "10px",
                padding: "10px",
                zIndex: "-1",
              },
            };
          },
          "border-underline": (value) => {
            const [color, val] = value.split("-");
            return {
              position: "relative",
              "&::after": {
                content: "''",
                transition: "all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                position: "absolute",
                width: "30%",
                height: "1px",
                bottom: "2px",
                left: "35%",
                borderBottom: `1px solid ${theme(`colors.${color}.${val}`)}`,
              },
              "&:hover": {
                "&::after": {
                  width: "70%",
                  left: "15%",
                },
              },
            };
          },
          loader: (value) => {
            const [color, val] = value.split("-");
            return {
              position: "relative",
              "&::before": {
                content: "''",
                position: "absolute",
                width: "5em",
                height: "5em",
                left: "calc(50% - 2.5em)",
                top: "calc(50% - 2.5em)",
                padding: "8px",
                "aspect-ratio": 1,
                "border-radius": "50%",
                background: `${theme(`colors.${color}.${val}`)}`,
                "--_m":
                  " conic-gradient(#0000 10%,#000), linear-gradient(#000 0 0) content-box;",
                "-webkit-mask": "var(--_m)",
                mask: "var(--_m)",
                "-webkit-mask-composite": "source-out",
                "mask-composite": "subtract",
                animation: "l3 1s infinite linear",
              },
            };
          },
        },
        {
          values: {
            dark: "gray-900",
            light: "gray-100",
            red: "red-500",
            yellow: "yellow-500",
            green: "green-400",
            blue: "blue-400",
            indigo: "indigo-500",
            gray: "gray-500",
          },
        }, // Add more combos as needed
      );
    }),
    plugin(function ({ matchUtilities }) {
      matchUtilities(
        {
          "rotate-forwards": (value) => ({
            transition: "all 0.3s ease",
            transform: `rotate(${value})`,
            transformOrigin: "center",
          }),
          "rotate-backwards": (value) => ({
            transition: "all 0.3s ease",
            transform: `rotate(-${value})`,
          }),
        },
        {
          values: {
            // Define common values or allow arbitrary values
            0: "0deg",
            45: "45deg",
            90: "90deg",
            135: "135deg",
            180: "180deg",
            225: "225deg",
            270: "270deg",
            315: "315deg",
            360: "360deg",
          },
          // Optional: allow arbitrary values like rotate-[30deg]
          type: ["angle"],
        },
      );
    }),
  ],
};
