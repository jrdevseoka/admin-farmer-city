module.exports = {
    prefix: '',
    purge: {
        content: [
            './src/**/*.{html,ts}',
        ]
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {

                //Green color for Farmcity Admin
                'farmer-green': '#004C40',
                'farmer-green-shade-3': '#001A15',
                'farmer-green-shade-2': '#00B296',
                'farmer-green-shade-1': '#00E5C1',

                //Yellow Color for Farm-city Admin
                'farmer-yellow': '#FEC424',
                'farmer-yellow-shade-4': '#BC8A01',
                'farmer-yellow-shade-3': '#EFAF01',
                'farmer-yellow-shade-2': '#FED257',
                'farmer-yellow-shade-1': '#FEE08A',

                //Red Color for Farm City Admin
                'farmer-red': '#D72914',
                'farmer-red-shade-4': '#79170B',
                'farmer-red-shade-3': '#A82010',
                'farmer-red-shade-2': '#EC4632',
                'farmer-red-shade-1': '#F07060',

                //Black Color for Farm City Admin
                'farmer-black': '#14181A',
                'farmer-black-shade-2': '#2A3337',
                'farmer-black-shade-1': '#404D54',

                //White Color for Farm City Admin
                'farmer-white': '#F5FFFD',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
