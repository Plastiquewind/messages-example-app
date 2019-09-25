export class FakeUserTokens {
  private static readonly userTokens = new Map<string, string>([
    ['Plastiquewind@12345', 'fake-jwt-token-Plastiquewind'],
    ['Chandler@12345', 'fake-jwt-token-Chandler'],
    ['Joey@12345', 'fake-jwt-token-Joey']
  ]);
  private static readonly userLogins = new Map<string, string>([
    ['fake-jwt-token-Plastiquewind', 'Plastiquewind'],
    ['fake-jwt-token-Chandler', 'Chandler'],
    ['fake-jwt-token-Joey', 'Joey']
  ]);

  private constructor() {}

  public static getToken(login: string, password: string): string {
    return this.userTokens.get(`${login}@${password}`);
  }

  public static getLogin(token: string): string {
    return this.userLogins.get(token);
  }
}
