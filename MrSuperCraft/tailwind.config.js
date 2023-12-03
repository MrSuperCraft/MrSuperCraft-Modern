/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './node_modules/flowbite/**/*.js'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'vsm': {'min': '399px'},
        'sm': {'min': '639px'},   // Small devices like smartphones
        'md': {'min': '767px'},   // Medium devices like tablets
        'lg': {'min': '1023px'},  // Large devices like laptops
        'xl': {'min': '1279px'},  // Extra-large devices like desktops
        '2xl': {'min': '1535px'}, // Larger desktops and high-resolution displays

        'max-xs': {'max': '399px'},
        'max-vsm': {'max': '399px'},
        'max-sm': {'max': '639px'},   // Small devices like smartphones
        'max-md': {'max': '767px'},   // Medium devices like tablets
        'max-lg': {'max': '1023px'},  // Large devices like laptops
        'max-xl': {'max': '1279px'},  // Extra-large devices like desktops
        'max-2xl': {'max': '1535px'}, // Larger desktops and high-resolution displays
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        caveat: ['Caveat' , 'cursive'],
        patrick: ['Patrick Hand', 'cursive'],
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],

  variants: {
    extend: {
      scale: ['hover'],
    }
  }
}

