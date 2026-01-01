# Pedra, Papel e Tesoura Online

Jogo multiplayer de Pedra, Papel e Tesoura em tempo real com comunicação WebSocket. Conecte-se com outro jogador e dispute partidas instantâneas sem necessidade de cadastro.

![Screenshot](public/game.png)

## O que o projeto faz

- Conecta dois jogadores simultaneamente através de WebSocket
- Permite escolhas em tempo real (pedra, papel ou tesoura)
- Exibe resultado instantâneo das partidas
- Mantém indicador visual do status de conexão
- Desabilita controles automaticamente durante espera
- Suporta múltiplas partidas consecutivas

## Problemas que resolve

- Permite jogar remotamente sem estar no mesmo local físico
- Elimina possibilidade de manipulação de resultados
- Fornece feedback instantâneo sobre todas as ações
- Não requer cadastro, login ou instalação

## Tecnologias

**Frontend:**
- Angular 20.3
- TypeScript 5.9
- WebSocket API nativa
- CSS3
- Standalone Components

**Backend (repositório separado):**
- Spring Boot 3.5
- Java 21
- Spring WebSocket
- Maven

## Requisitos

### Obrigatório
- Node.js 18 ou superior
- npm 9 ou superior
- Angular CLI 20

### Para execução completa
- Backend rodando (veja seção Backend)
- Navegador moderno com suporte a WebSocket

## Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/CesarAVB/angular-game-websocket.git
cd angular-game-websocket
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure a URL do backend

O frontend está configurado para conectar em:
```
wss://websocket-jokenpo.cesaravb.com.br/game
```

Para desenvolvimento local, edite `src/app/websocket.ts`:

```typescript
private readonly WS_URL = 'ws://localhost:8080/game';
```

### 4. Execute a aplicação

**Desenvolvimento:**
```bash
npm start
# ou
ng serve
```

**Build de produção:**
```bash
npm run build
# Arquivos gerados em: dist/
```

### 5. Acesse no navegador

**Desenvolvimento:**
```
http://localhost:4200
```

**Produção:**
```
https://jokenpo.cesaravb.com.br
```

## Backend

Este projeto requer o backend WebSocket disponível em:
**[Backend Jokenpo - Spring Boot](https://github.com/CesarAVB/jokenpo-websocket-backend)**

**Execução do backend:**
```bash
git clone https://github.com/CesarAVB/jokenpo-websocket-backend.git
cd jokenpo-websocket-backend
mvn spring-boot:run
```

O backend estará disponível em: `ws://localhost:8080/game`

## Como usar

1. **Abra a aplicação** em duas abas ou navegadores diferentes
2. **Aguarde a conexão** - Indicador verde confirma conexão estabelecida
3. **Espere o segundo jogador** - Mensagem "Jogadores conectados!" aparecerá
4. **Faça sua escolha** - Clique em pedra, papel ou tesoura
5. **Aguarde o oponente** - Botões ficam desabilitados automaticamente
6. **Veja o resultado** - Resultado formatado é exibido para ambos
7. **Jogue novamente** - Clique em nova opção para próxima rodada

## Estrutura do projeto

```
src/
├── app/
│   ├── game/                    # Componente principal do jogo
│   │   ├── game.ts             # Lógica do componente
│   │   ├── game.html           # Template
│   │   └── game.css            # Estilos
│   ├── footer/                 # Rodapé da aplicação
│   │   ├── footer.ts
│   │   ├── footer.html
│   │   └── footer.css
│   ├── websocket.ts            # Serviço de comunicação WebSocket
│   ├── app.ts                  # Componente raiz
│   ├── app.html                # Template raiz
│   ├── app.config.ts           # Configuração da aplicação
│   └── app.routes.ts           # Rotas (futuro)
├── assets/                     # Recursos estáticos
│   ├── rock.png               # Imagem pedra
│   ├── paper.png              # Imagem papel
│   └── scissors.png           # Imagem tesoura
├── index.html                  # HTML principal
├── main.ts                     # Bootstrap da aplicação
└── styles.css                  # Estilos globais
```

## Funcionalidades

### Implementadas
- ✅ Conexão WebSocket em tempo real
- ✅ Indicador visual de status (conectado/desconectado)
- ✅ Desabilitação automática de botões durante espera
- ✅ Exibição formatada de resultados com quebras de linha
- ✅ Design responsivo e clean
- ✅ Feedback visual para todas as interações
- ✅ Reconexão automática em caso de falha
- ✅ Tratamento de erros robusto
- ✅ Sanitização de HTML para segurança

### Detalhes técnicos
- **Standalone Components**: Arquitetura moderna do Angular
- **RxJS Observables**: Gerenciamento reativo de mensagens
- **DomSanitizer**: Sanitização segura de HTML dinâmico
- **WebSocket nativo**: Comunicação bidirecional eficiente
- **TypeScript strict**: Tipagem forte para maior segurança

## Fluxo de comunicação

```
Cliente 1                    Backend                     Cliente 2
   |                            |                            |
   |----[conectar]------------->|                            |
   |<---"Aguardando..."---------|                            |
   |                            |<----[conectar]-------------|
   |<---"Conectados!"-----------|----"Conectados!"---------->|
   |                            |                            |
   |----"pedra"---------------->|                            |
   |                            |<----"tesoura"--------------|
   |<---"J1 venceu!"------------|----"J1 venceu!"----------->|
   |                            |                            |
   |    [conexão fechada]       |     [conexão fechada]      |
```

## Melhorias futuras

### Funcionalidades de jogo
- [ ] Adicionar placar de vitórias por sessão
- [ ] Modo treino contra IA
- [ ] Sala de espera com lista de jogadores online
- [ ] Chat entre jogadores
- [ ] Histórico de partidas
- [ ] Sistema de ranking
- [ ] Modo melhor de 3/5 rodadas
- [ ] Timeout automático para jogadas (30s)
- [ ] Variação: Pedra, Papel, Tesoura, Lagarto, Spock

### Interface e UX
- [ ] Animações de transição entre estados
- [ ] Efeitos sonoros para ações
- [ ] Temas claro/escuro
- [ ] Avatares personalizáveis
- [ ] Notificações push
- [ ] Tutorial interativo para novos jogadores
- [ ] Modo tela cheia

### Sistema de usuários
- [ ] Autenticação e perfis
- [ ] Sistema de amigos
- [ ] Estatísticas pessoais
- [ ] Conquistas e badges
- [ ] Customização de perfil

### Técnico
- [ ] Testes unitários (Jasmine/Karma)
- [ ] Testes E2E (Playwright)
- [ ] PWA (Progressive Web App)
- [ ] Service Workers para offline
- [ ] Internacionalização (i18n)
- [ ] Acessibilidade WCAG 2.1
- [ ] Performance monitoring
- [ ] Analytics de uso

## Configurações avançadas

### Ambiente de desenvolvimento

Crie `src/environments/environment.development.ts`:

```typescript
export const environment = {
  production: false,
  wsUrl: 'ws://localhost:8080/game'
};
```

### Ambiente de produção

Crie `src/environments/environment.ts`:

```typescript
export const environment = {
  production: true,
  wsUrl: 'wss://websocket-jokenpo.cesaravb.com.br/game'
};
```

### Proxy para desenvolvimento

Crie `proxy.conf.json`:

```json
{
  "/game": {
    "target": "ws://localhost:8080",
    "ws": true,
    "logLevel": "debug"
  }
}
```

Execute com proxy:
```bash
ng serve --proxy-config proxy.conf.json
```

## Troubleshooting

### WebSocket não conecta

**Sintomas:** Indicador vermelho "Não conectado"

**Soluções:**
1. Verifique se o backend está rodando
2. Confirme a URL no `websocket.ts`
3. Verifique CORS no backend
4. Teste conexão direta: `curl http://localhost:8080/game`

### Botões ficam desabilitados

**Sintomas:** Não consegue clicar em pedra/papel/tesoura

**Soluções:**
1. Aguarde segundo jogador conectar
2. Recarregue a página
3. Verifique console do navegador (F12)

### Resultado não aparece

**Sintomas:** Fez escolha mas nada acontece

**Soluções:**
1. Verifique se ambos jogadores fizeram escolha
2. Veja logs do backend
3. Confirme formato de mensagem no console

### Erro de CORS

**Sintomas:** Erro "blocked by CORS policy" no console

**Soluções:**
1. Adicione origem no backend (`WebSocketConfig.java`)
2. Verifique `setAllowedOrigins()` está correto
3. Reinicie o backend após alterações

## Deploy

### Cloudflare Pages (recomendado)

```bash
npm run build
# Upload pasta dist/ para Cloudflare Pages
```

**Importante:** Ative WebSockets no painel do Cloudflare (Network → WebSockets)

### Netlify

```bash
npm run build
netlify deploy --prod --dir=dist/browser
```

### Vercel

```bash
npm run build
vercel --prod
```

### Docker

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build e run:
```bash
docker build -t jokenpo-frontend .
docker run -p 80:80 jokenpo-frontend
```

## Como contribuir

1. **Fork o projeto**
2. **Crie uma branch para sua feature:**
   ```bash
   git checkout -b feature/minha-feature
   ```
3. **Commit suas mudanças:**
   ```bash
   git commit -m "feat: adiciona minha feature"
   ```
4. **Push para a branch:**
   ```bash
   git push origin feature/minha-feature
   ```
5. **Abra um Pull Request**

### Convenção de commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Manutenção

## Reportar problemas

Encontrou um bug? [Abra uma issue](https://github.com/CesarAVB/angular-game-websocket/issues) descrevendo:

- **O que esperava** que acontecesse
- **O que realmente** aconteceu
- **Passos para reproduzir** o problema
- **Screenshots** ou mensagens de erro
- **Ambiente**: Browser, versão, SO

## Licença

Este projeto usa a licença MIT. Você pode usar, modificar e distribuir livremente.

## Contato

**Desenvolvedor:** César Augusto

- GitHub: [@CesarAVB](https://github.com/CesarAVB)
- LinkedIn: [César Augusto](https://linkedin.com/in/cesaravb)

## Agradecimentos

- Comunidade Angular pela excelente documentação
- Spring Boot pela robustez do WebSocket
- Todos os contribuidores do projeto

## Notas importantes

⚠️ **Limitações conhecidas:**
- Jogo requer exatamente 2 jogadores conectados
- Sessões encerram após cada partida
- Não persiste dados entre sessões
- Sem identificação de jogadores
- Escolhas devem ser em MAIÚSCULAS no frontend (`PEDRA`, `PAPEL`, `TESOURA`)

🔒 **Segurança:**
- HTML é sanitizado antes de renderização
- WebSocket usa WSS em produção (criptografado)
- CORS configurado para origens específicas

🚀 **Performance:**
- Aplicação SPA extremamente leve (~500KB)
- First Contentful Paint < 1s
- Comunicação WebSocket de baixa latência

📱 **Compatibilidade:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Dispositivos móveis (iOS/Android)

---

**⭐ Se este projeto foi útil, deixe uma estrela no repositório!**
