export class ApiService {
  private readonly localUrl = 'http://localhost:3001/api';
  private readonly prodUrl = 'https://notcoin-api.herokuapp.com/api';
  private readonly apiUrl = process.env.NODE_ENV === 'production' ? this.prodUrl : this.localUrl;

  private async fetch<T>(url: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${this.apiUrl}/${url}`, init);
    return response.json();
  }

  public async increaseCoin(): Promise<Boolean> {
    console.log(this.apiUrl);

    return this.fetch<Boolean>('coin/increase');
  }


}