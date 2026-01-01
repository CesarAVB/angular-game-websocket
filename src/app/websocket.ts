import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private webSocket!: WebSocket;
  private messageSubject: Subject<any> = new Subject<any>();
  public messages$: Observable<any> = this.messageSubject.asObservable();

  private readonly WS_URL = 'wss://websocket-jokenpo.cesaravb.com.br/game';

  constructor() { }

  public connect(): void {
    if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
      console.log('WebSocket já está conectado.');
      return;
    }

    this.webSocket = new WebSocket(this.WS_URL);

    this.webSocket.onopen = (event) => {
      console.log('Conexão WebSocket aberta:', event);
      this.messageSubject.next({ type: 'internal_status', connected: true });
    };

    this.webSocket.onmessage = (event) => {
      console.log('Mensagem recebida do backend:', event.data);
      try {
        // O backend envia JSON strings, então... parsear
        const message = JSON.parse(event.data);
        this.messageSubject.next(message);
      } catch (e) {
        console.error('Erro ao parsear mensagem JSON do backend (esperado JSON):', e, 'Mensagem:', event.data);
        // Se por algum motivo não for JSON, ainda podemos passar como raw
        this.messageSubject.next({ type: 'error', msg: 'Formato de mensagem inesperado do servidor.', raw: event.data });
      }
    };

    this.webSocket.onclose = (event) => {
      console.log('Conexão WebSocket fechada:', event);
      this.messageSubject.next({ type: 'internal_status', connected: false });
      // Tentar reconectar após um tempo, se desejar
      // setTimeout(() => this.connect(), 3000);
    };

    this.webSocket.onerror = (event) => {
      console.error('Erro WebSocket:', event);
      this.messageSubject.next({ type: 'internal_status', error: true, msg: 'Erro na conexão WebSocket.' });
    };
  }

  // O 'message' aqui será a string da escolha (ex: "pedra")
  public sendMessage(message: string): void {
    if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
      this.webSocket.send(message);

    } else {
      console.warn('WebSocket não está conectado. Não foi possível enviar a mensagem:', message);
    }
  }

  public close(): void {
    if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
      this.webSocket.close();
    }
  }

  public isConnected(): boolean {
    return this.webSocket && this.webSocket.readyState === WebSocket.OPEN;
  }
}
