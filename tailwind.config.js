// tailwind.config.js
module.exports = {
    purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            width: {
                128: "32rem",
            },
            // image: {
            //     default: "url(/images/logoSignin)",
            // },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
