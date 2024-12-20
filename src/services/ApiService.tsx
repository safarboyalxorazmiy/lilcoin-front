// import { Client } from '@stomp/stompjs';

export class ApiService {
  private readonly localUrl = 'http://192.168.0.103:8080';
  private readonly prodUrl = 'http://62.164.220.205:8080';
  private readonly apiUrl = process.env.NODE_ENV === 'production' ? this.prodUrl : this.localUrl;
  // private stompClient: Client;

  constructor() {
    // this.stompClient = new Client({
    //   brokerURL: `${this.apiUrl}/ws`,
    //   connectHeaders: {
    //     Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    //   },
    //   debug: (str) => console.log(str),
    //   reconnectDelay: 5000,
    //   onConnect: () => {
    //     console.log('WebSocket Connected!');
    //     this.subscribeToCoinUpdates();
    //   },
    //   onDisconnect: () => console.log('WebSocket Disconnected!'),
    //   onStompError: (error) => {
    //     console.error('STOMP Error:', error);
    //     alert('WebSocket connection error!');
    //   },
    // });

    // this.stompClient.activate();
  }

  // private subscribeToCoinUpdates() {
  //   this.stompClient.subscribe('/topic/coinUpdate', (message) => {
  //     console.log('Received Coin Update:', message.body);
  //   });
  // }

  // public increaseCoin() {
  //   try {
  //     this.stompClient.publish({
  //       destination: '/app/increase',
  //       body: JSON.stringify({ action: 'increaseCoin' }),
  //     });
  //   } catch (error) {
  //     console.error('Error publishing message:', error);
  //   }
  // }

  // public disconnect() {
  //   if (this.stompClient.active) {
  //     this.stompClient.deactivate();
  //     console.log('WebSocket connection deactivated.');
  //   }
  // }

  public async getTokenByUsername(username: string): Promise<string> {
    try {
      const response = await fetch(`${this.apiUrl}/api/v1/auth/authenticate/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const token = await response.text();
      return token;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}