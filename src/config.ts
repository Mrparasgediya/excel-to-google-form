
const config = {
    JWT_SECRET: process.env.JWT_SECRET!,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
    GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI!,
    GOOGLE_SCOPE: JSON.parse(process.env.GOOGLE_SCOPE!),
    FETCH_BASE_URL: process.env.NODE_ENV === 'development' ? process.env.DEVELOPMENT_BASE_URL!
        : process.env.PRODUCTION_BASE_URL!
};

export default config;