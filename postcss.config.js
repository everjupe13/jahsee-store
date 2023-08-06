export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  }
}
