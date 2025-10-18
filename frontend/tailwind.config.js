const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
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
        },
        {
          values: {
            dark: "gray-900",
            light: "gray-200",
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
