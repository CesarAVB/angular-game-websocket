# Pedra, Papel e Tesoura Online

Um jogo multiplayer de Pedra, Papel e Tesoura em tempo real. Você joga contra outro jogador conectado ao mesmo tempo.

![Screenshot](public/game.png)

## O que o projeto faz

- Conecta dois jogadores através de WebSocket
- Permite que você faça sua escolha (pedra, papel ou tesoura)
- Mostra o resultado da partida em tempo real
- Mantém você informado sobre o status da conexão

**Backend (não incluído neste repositório):**
- Spring Boot
- WebSocket
- Java

## Como usar

1. Abra a aplicação em duas abas ou navegadores diferentes
2. Aguarde a mensagem "Conectado ao servidor"
3. Quando aparecer "Clique em uma opção para jogar", escolha pedra, papel ou tesoura
4. Aguarde o outro jogador fazer sua escolha
5. Veja o resultado da partida
6. Jogue novamente clicando em outra opção

## Funcionalidades

- Conexão em tempo real via WebSocket
- Indicador visual de status de conexão
- Desabilita botões enquanto aguarda oponente
- Mostra resultado formatado da partida
- Design responsivo e clean
- Feedback visual para todas as ações

## Melhorias futuras

- Adicionar placar de vitórias
- Modo treino contra IA
- Sala de espera com lista de jogadores
- Chat entre jogadores
- Histórico de partidas

## Notas importantes

- O jogo precisa de exatamente 2 jogadores conectados para funcionar
- Se um jogador desconectar, o outro será notificado
- A conexão WebSocket reconecta automaticamente em caso de falha
- Os botões ficam desabilitados quando não há conexão ativa
