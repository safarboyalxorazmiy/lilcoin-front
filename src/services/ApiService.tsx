export class ApiService {
  // private readonly localUrl = 'http://192.168.0.100:8080';
  private readonly prodUrl = 'https://api-lilcoin.ru';
  private readonly apiUrl = this.prodUrl;

  private socket: WebSocket;

  constructor() {
    // Dynamically set WebSocket URL based on environment
    const socketUrl = process.env.NODE_ENV === 'production' 
      ? 'wss://api-lilcoin.ru/ws' 
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
    const username = localStorage.getItem('username');
    if (!username) {
      console.error('No username found in localStorage.');
      return;
    }

    this.socket.send(username);
    console.log('Sent message to server:', username);
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

  public async coinInfoByCurrentDate(): Promise<number> {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      console.error('No token found in localStorage.');
      return 0;
    }
    
    try {
      const response = await fetch(`${this.apiUrl}/coin/info/by/current/date`, {
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


  public async boostLevel(): Promise<boolean> {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      console.error('No token found in localStorage.');
      return false;
    }

    const apiUrl = `${this.apiUrl}/level/upgrade`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      return false;
    }
  }
  
  public async getLevelInfo(): Promise<Object | null> {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      console.error('No token found in localStorage.');
      return null;
    }
  
    const apiUrl = `${this.apiUrl}/level/info`;
  
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        console.error(`Error fetching level info: ${response.status} - ${response.statusText}`);
        return null;
      }
  
      const data = await response.json();
  
      const levelInfo = {
        level: data.level,
        levelTitle: data.levelTitle,
        levelPrice: data.levelPrice,
      };
  
      return levelInfo;
    } catch (error) {
      console.error('Error during API call:', error);
      return null;
    }
  }  

  public async getInviteURL(): Promise<string> {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      console.error('No token found in localStorage.');
      return "";
    }
  
    const apiUrl = `${this.apiUrl}/invite/link/get`;
  
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        console.error(`Error fetching level info: ${response.status} - ${response.statusText}`);
        return "";
      }
  
      return await response.text();
    } catch (error) {
      console.error('Error during API call:', error);
      return "";
    }
  } 
}