import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

@Injectable()
export class AuthService {
  public oauth2Client: OAuth2Client;
  static SCOPES = ['email', 'profile'];

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.DOMAIN}/auth/redirect`,
    );
  }

  generateUrl(): string {
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: AuthService.SCOPES,
      response_type: 'code',
    });
  }

  async getIdToken(code: string): Promise<string> {
    const tokenResponse = await this.oauth2Client.getToken(code);
    return tokenResponse.tokens.id_token;
  }
}
