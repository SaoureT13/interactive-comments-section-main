/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                Rubik: "Rubik",
            },
            colors: {
                Moderate_blue: "hsl(238, 40%, 52%)",
                Soft_Red: "hsl(358, 79%, 66%)",
                Light_grayish_blue: "hsl(239, 57%, 85%)",
                Pale_red: "hsl(357, 100%, 86%)",

                Dark_blue: "hsl(212, 24%, 26%)",
                Grayish_Blue: "hsl(211, 10%, 45%)",
                Light_gray: "hsl(223, 19%, 93%)",
                Very_light_gray: "hsl(228, 33%, 97%)",
                White: "hsl(0, 0%, 100%)",
            },
            gridTemplateAreas: {
                layout: [
                    "user user user",
                    "content content content",
                    "react . reply",
                ],
                sm_layout: ["react user reply", "react content content"],
            },
            gridTemplateColumns: {
                layout: "35px 1fr 1fr",
            },
        },
    },
    plugins: [require("@savvywombat/tailwindcss-grid-areas")],
};
