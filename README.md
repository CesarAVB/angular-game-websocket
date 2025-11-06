🪨📄✂️ Pedra, Papel e Tesoura - Frontend Angular
Este é o frontend da aplicação "Pedra, Papel e Tesoura", desenvolvido em Angular 19+ com componentes standalone. Ele se comunica em tempo real com o backend Spring Boot via WebSockets para gerenciar a lógica do jogo e exibir os resultados.

🌟 Funcionalidades
Interface Intuitiva: Botões claros para as opções "Pedra", "Papel" e "Tesoura".
Comunicação em Tempo Real: Conexão persistente com o backend via WebSockets para atualizações instantâneas do jogo.
Componentes Standalone: Utiliza a arquitetura moderna de componentes standalone do Angular para modularidade e performance.
Feedback Visual: Exibe o status da conexão, a escolha do jogador, o estado de espera por um oponente e o resultado da rodada.
Tratamento de Quebras de Linha: Converte caracteres de nova linha (\n) recebidos do backend em quebras de linha HTML (<br>) para uma exibição formatada.
🚀 Tecnologias Utilizadas
Angular 19+: Framework para construção de interfaces de usuário.
TypeScript: Linguagem de programação que adiciona tipagem estática ao JavaScript.
HTML5 & CSS3: Estrutura e estilização da interface.
RxJS: Biblioteca para programação reativa, utilizada para gerenciar o fluxo de mensagens do WebSocket.
Angular CLI: Ferramenta de linha de comando para inicializar, desenvolver e manter aplicações Angular.
📋 Pré-requisitos
Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

Node.js: Versão LTS recomendada (inclui npm).
*   Verifique a instalação: `node -v` e `npm -v`
Angular CLI:
*   Instale globalmente: `npm install -g @angular/cli`
*   Verifique a instalação: `ng version`
🛠️ Configuração e Instalação
Siga os passos abaixo para configurar e rodar o projeto em sua máquina local:

Clone o repositório:
bash
Copiar

    git clone <URL_DO_SEU_REPOSITORIO_FRONTEND>
    cd rock-paper-scissors-frontend
*(Substitua `<URL_DO_SEU_REPOSITORIO_FRONTEND>` pela URL real do seu repositório.)*
Instale as dependências:
bash
Copiar

    npm install
Ou, se preferir usar Yarn:
bash
Copiar

    yarn install
Verifique a URL do WebSocket:
Abra o arquivo `src/app/websocket.service.ts` e certifique-se de que a constante `WS_URL` aponte para o endereço correto do seu backend Spring Boot. Por padrão, deve ser `ws://localhost:8080/game`.
typescript
Copiar

    // src/app/websocket.service.ts
    private readonly WS_URL = 'ws://localhost:8080/game'; // Ajuste se necessário
▶️ Como Rodar
Certifique-se de que o backend Spring Boot esteja em execução. O frontend precisa de uma conexão ativa com o servidor WebSocket.
Inicie o servidor de desenvolvimento do Angular:
bash
Copiar

    ng serve --open
Este comando compilará a aplicação e abrirá automaticamente uma nova aba no seu navegador padrão em `http://localhost:4200/`.
🎮 Como Jogar
Abra a aplicação em dois navegadores (ou abas anônimas) para simular dois jogadores.
Ambos os navegadores devem se conectar ao backend. O primeiro jogador verá "Aguardando outro jogador…".
Quando o segundo jogador se conectar, ambos verão "Jogadores conectados! Escolham pedra, papel ou tesoura.".
Clique em "Pedra", "Papel" ou "Tesoura" para fazer sua jogada.
Após ambos os jogadores fazerem suas escolhas, o resultado será exibido.
O jogo reinicia automaticamente após cada rodada, limpando as escolhas e aguardando novos jogadores (ou a próxima rodada se os mesmos jogadores permanecerem conectados).
📂 Estrutura do Projeto
src/app/app.component.ts: Componente raiz que hospeda o GameComponent.
src/app/game/game.component.ts: Componente principal do jogo, responsável pela interface e lógica de interação com o WebsocketService.
src/app/websocket.service.ts: Serviço que gerencia a conexão WebSocket, o envio e recebimento de mensagens com o backend.
src/assets/: Pasta para imagens (como rock.png, paper.png, scissors.png) e outros recursos estáticos.
