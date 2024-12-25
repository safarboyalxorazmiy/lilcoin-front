export class ApiService {
  private readonly localUrl = 'http://192.168.0.100:8080';
  // private readonly prodUrl = 'http://62.164.220.205:8080';
  private readonly apiUrl = this.localUrl;

  private socket: WebSocket;

  constructor() {
    // Dynamically set WebSocket URL based on environment
    const socketUrl = process.env.NODE_ENV === 'production' 
      ? 'ws://62.164.220.205:8080/ws' 
      : 'ws://192.168.0.100:8080/ws';
    this.socket = new WebSocket(socketUrl);

    this.socket.onopen = () => {
      console.log('WebSocket connected');
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
    };
  }

  public async getTokenByUsername(username: string): Promise<string> {
    try {
      const response = await fetch(`${this.apiUrl}/api/v1/auth/get/token/${username}`, {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch token: ${response.statusText}`);
      }

      const data = await response.text(); // Assuming response is in JSON format
      return data; // Assuming the response contains a token field
    } catch (error) {
      console.error('Error fetching token:', error);
      throw error;
    }
  }

  public increaseCoin(): void {
    // const username = localStorage.getItem('username');
    // if (!username) {
    //   console.error('No username found in localStorage.');
    //   return;
    // }

    this.socket.send("manxorazmiyim");
    console.log('Sent message to server:', "manxorazmiyim");
  }

  public async coinInfo(): Promise<number> {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      console.error('No token found in localStorage.');
      return 0;
    }
    
    try {
      const response = await fetch(`${this.apiUrl}/coin/info`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch coin info: ${response.statusText}`);
      }

      const data = await response.text();
      return parseInt(data);
    } catch (error) {
      console.error('Error fetching coin info:', error);
      throw error;
    }
  }

  public async setUserLang(lang: string): Promise<void> {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      console.error('No token found in localStorage.');
      return;
    }

    const apiUrl = `${this.apiUrl}/language/set/${lang}`;
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to set language. Status: ${response.status}`);
      }
  
      console.log(`Language set to ${lang} successfully.`);
    } catch (error: any) {
      console.error(`Error setting language: ${error.message}`);
    }
  }  

}