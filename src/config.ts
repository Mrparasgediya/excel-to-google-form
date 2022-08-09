const config = (() => {
    const currentBaseFetchUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://excel-to-google-form.vercel.app';
    return {
        JWT_SECRET: process.env.JWT_SECRET!,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
        FETCH_BASE_URL: currentBaseFetchUrl,
        GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI && `${currentBaseFetchUrl}${process.env.GOOGLE_REDIRECT_URI}` || undefined,
        GOOGLE_SCOPE: process.env.GOOGLE_SCOPE && JSON.parse(process.env.GOOGLE_SCOPE!) || undefined,
    }
})();

export default config;