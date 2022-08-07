import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library';
import { GetTokenResponse } from 'google-auth-library/build/src/auth/oauth2client';
import config from '../config';

export const getOAuthClient = (): OAuth2Client => {
    return new google.auth.OAuth2({ clientId: config.GOOGLE_CLIENT_ID, clientSecret: config.GOOGLE_CLIENT_SECRET, redirectUri: config.GOOGLE_REDIRECT_URI })
}

export const getAuthUrl = (oAuthClient: OAuth2Client): string => oAuthClient.generateAuthUrl({ scope: config.GOOGLE_SCOPE });

export const getTokenFromCode = (oAuthClient: OAuth2Client, code: string): Promise<GetTokenResponse> => oAuthClient.getToken(code); 