/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/views/**/*.ejs"],
    theme: {
        fontFamily: {
            base: ["Space Grotesk"],
        },
        extend: {
            colors: {
                black: "#333333",
                gray: "#999999",
                blueSky: "#3991F5",
                navy: "#2F3B52",
                brown: "#2F3E37",
                beige: "#DFDAD0",
                maroon: "#E8816E",
            },
            backgroundImage: {
                hi: "url('/images/img/emj_hi.png')",
                fingers: "url('/images/img/emj_fingers.png')",
            },
        },
    },
    plugins: [],
};
