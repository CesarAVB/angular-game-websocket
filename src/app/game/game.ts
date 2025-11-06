import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, NgIf, TitleCasePipe } from '@angular/common';
import { WebsocketService } from '../websocket';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, NgIf, TitleCasePipe],
  templateUrl: './game.html',
  styleUrl: './game.css'
})
export class GameComponent implements OnInit, OnDestroy {

  isConnected: boolean = false;
  playerChoice: string | null = null;
  opponentChoice: string | null = null; // O backend não envia a escolha do oponente diretamente
  gameResult: SafeHtml | null = null;
  messageSubscription!: Subscription;
  waitingForOpponent: boolean = false;

  constructor(private websocketService: WebsocketService,  private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.websocketService.connect();

    this.messageSubscription = this.websocketService.messages$.subscribe(
      message => {
        console.log('Mensagem processada no GameComponent:', message);

        // Lidar com status de conexão interno do serviço
        if (message.type === 'internal_status') {
          this.isConnected = message.connected;
          if (message.error) {
            console.error('Erro na conexão WebSocket.');
            this.gameResult = message.msg || 'Erro na conexão. Tente novamente.';
          } else if (message.connected) {
            this.gameResult = 'Conectado. Aguardando jogadores...';
          } else {
            this.gameResult = 'Desconectado do servidor.';
          }
          return; // Processado, não precisa ir para os tipos do backend
        }

        // Lidar com mensagens do backend (type: "info", "start", "result")
        switch (message.type) {
          case 'info':
            this.gameResult = message.msg;
            this.playerChoice = null;
            this.opponentChoice = null;
            this.waitingForOpponent = true; // Estamos aguardando
            break;

          case 'start':
            this.gameResult = message.msg;
            this.playerChoice = null;
            this.opponentChoice = null;
            this.waitingForOpponent = false; // O jogo vai começar
            break;

          case 'result':
            this.gameResult = message.msg;
            this.playerChoice = null;
            this.opponentChoice = null;
            this.waitingForOpponent = false; // O jogo terminou
            break;

          case 'error': // Para erros de parsing ou outros erros do serviço
            this.gameResult = message.msg;
            console.error('Erro do serviço WebSocket:', message.raw);
            this.playerChoice = null;
            this.opponentChoice = null;
            this.waitingForOpponent = false;
            break;

          default:
            this.gameResult = `Mensagem do servidor em formato inesperado: ${JSON.stringify(message)}`;
            console.warn('Mensagem do backend com tipo desconhecido:', message);
            this.playerChoice = null;
            this.opponentChoice = null;
            this.waitingForOpponent = false;
            break;
        }
      },
      error => {
        console.error('Erro na inscrição do WebSocket:', error);
        this.isConnected = false;
        this.gameResult = 'Erro na comunicação com o servidor.';
        this.waitingForOpponent = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
    this.websocketService.close();
  }

  makeChoice(choice: string): void {
    if (this.isConnected) {
      this.playerChoice = choice;
      this.opponentChoice = null;
      this.gameResult = this.processGameResult('Sua jogada: ' + choice + '. Aguardando oponente...');
      this.waitingForOpponent = true;

      this.websocketService.sendMessage(choice.toLowerCase());
    } else {
      this.gameResult = this.processGameResult('Não conectado ao servidor. Tente recarregar a página.');
    }
  }

  // NOVO MÉTODO: Para converter \n em <br> e marcar como HTML seguro
  private processGameResult(message: string): SafeHtml {
    // Substitui todas as ocorrências de '\n' por '<br>'
    const htmlString = message.replace(/\n/g, '<br>');
    // Marca o HTML como seguro para ser renderizado pelo Angular
    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  }

}
