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
        },
        {
          values: {
            dark: "gray-900",
          },
        }, // Add more combos as needed
      );
    }),
  ],
};
