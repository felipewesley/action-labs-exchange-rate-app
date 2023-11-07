const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,scss,ts}'],
  theme: {
    extend: {
			screens: {
				xs: '360px',
			},
			colors: {
				primary: '#07B0FB'
			},
		},
		fontFamily: {
			body: ['Roboto', '"Helvetica Neue"', ...defaultTheme.fontFamily.sans],
		},
  },
  plugins: [],
}
