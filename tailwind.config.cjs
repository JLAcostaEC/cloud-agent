const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			screens: {
				xs: '380px'
			},
			keyframes: {
				swipeup: {
					'0%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-150px)', opacity: 0 },
					'65%': { transform: 'translateY(0px)', opacity: 0 },
					'90%': { transform: 'translateY(-15px)', opacity: 1 },
					'100%': { transform: 'translateY(0px)' },
				},
				float: {
					'0%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-15px) scale(1.1)' },
					'100%': { transform: 'translateY(0)' },
				}
			},
			animation: {
				swipeup: 'swipeup 2s linear infinite',
				float: 'float 12s linear infinite'
			}
		},
		fontFamily: {
			selawik: ['Selawik', 'sans-serif']
		}
	}
};

module.exports = config;
