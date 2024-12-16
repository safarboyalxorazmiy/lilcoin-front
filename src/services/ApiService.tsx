export class ApiService {
  private readonly localUrl = 'http://192.168.0.103:8080/';
  private readonly prodUrl = 'https://62.164.220.205:8080/';
  private readonly apiUrl = this.localUrl;

  private async fetch<T>(url: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${this.apiUrl}/${url}`, init);
    return response.json();
  }

  public async increaseCoin(token: string): Promise<Boolean> {
    console.log(this.apiUrl);
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);

    return this.fetch<Boolean>('coin/increase', { headers });
  }


}