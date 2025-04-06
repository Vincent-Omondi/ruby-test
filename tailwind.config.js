module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/javascript/**/*.jsx',
    './app/frontend/**/*.jsx',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['Georgia', 'serif'],
    },
    extend: {
      colors: {
        primary: '#3D2D1C',
        secondary: '#F8C05C',
        accent: '#4A90E2',
      },
    },
  },
  plugins: [],
} 