# 🎤 Karaoke YouTube App

Um aplicativo web moderno para buscar e reproduzir vídeos de karaokê do YouTube com integração Firebase.

## 🚀 Características

- 🔍 Busca inteligente de vídeos de karaokê no YouTube
- 🎵 Biblioteca de músicas organizadas por gênero (MPB, Pagode, Gospel, Funk, Internacional)
- ⭐ Sistema de favoritos com sincronização Firebase
- 📱 Interface responsiva e moderna
- 🎲 Seleção aleatória de músicas
- 💾 Cache inteligente para melhor performance
- 🔄 Múltiplas chaves de API para alta disponibilidade

## 🛠️ Configuração

### 1. Configuração das Variáveis de Ambiente

Para proteger informações sensíveis, este projeto usa um sistema de configuração centralizada:

1. **Copie o arquivo de exemplo:**
   ```bash
   cp .env.example .env
   ```

2. **Configure suas chaves no arquivo `.env`:**
   ```env
   # Configurações do Firebase
   FIREBASE_API_KEY=sua_chave_firebase_aqui
   FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
   FIREBASE_PROJECT_ID=seu-projeto-id
   FIREBASE_STORAGE_BUCKET=seu-projeto.firebasestorage.app
   FIREBASE_MESSAGING_SENDER_ID=123456789
   FIREBASE_APP_ID=1:123456789:web:abcdef123456

   # Chaves da API do YouTube (múltiplas para alta disponibilidade)
   YOUTUBE_API_KEY_1=sua_primeira_chave_youtube_aqui
   YOUTUBE_API_KEY_2=sua_segunda_chave_youtube_aqui
   # ... adicione até 8 chaves
   ```

### 2. Obtenção das Chaves de API

#### Firebase:
1. Acesse o [Console do Firebase](https://console.firebase.google.com/)
2. Crie um novo projeto ou use um existente
3. Vá em "Configurações do projeto" > "Geral"
4. Na seção "Seus aplicativos", adicione um app web
5. Copie as configurações fornecidas

#### YouTube Data API:
1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a "YouTube Data API v3"
4. Vá em "Credenciais" > "Criar credenciais" > "Chave de API"
5. Configure as restrições conforme necessário
6. Repita o processo para criar múltiplas chaves (recomendado)

### 3. Configuração do Firebase

1. **Firestore Database:**
   - Crie um banco de dados Firestore
   - Configure as regras de segurança apropriadas

2. **Authentication (opcional):**
   - Configure os métodos de autenticação desejados
   - Ajuste as regras de segurança conforme necessário

### 4. Execução Local

1. **Servidor HTTP simples:**
   ```bash
   python -m http.server 8000
   ```

2. **Acesse no navegador:**
   ```
   http://localhost:8000
   ```

## 📁 Estrutura do Projeto

```
karaoke-youtube/
├── index.html              # Aplicação principal
├── script.js              # Lógica principal
├── config.js              # Configurações centralizadas
├── styles.css             # Estilos CSS
├── .env.example           # Exemplo de configuração
├── .gitignore            # Arquivos ignorados pelo Git
├── README.md             # Este arquivo
├── test-*.html           # Arquivos de teste
└── batch-populate.html   # Ferramenta de população em lote
```

## 🔒 Segurança

### Informações Protegidas

Este projeto protege as seguintes informações sensíveis:

- ✅ Chaves de API do Firebase
- ✅ Chaves de API do YouTube
- ✅ IDs e configurações do projeto Firebase
- ✅ Tokens de autenticação

### Arquivos Ignorados pelo Git

O arquivo `.gitignore` está configurado para ignorar:

```gitignore
# Arquivos de configuração sensíveis
.env
config.js
firebase-config.js

# Arquivos de chaves/certificados
*.key
*.pem
*.p12
*.pfx

# Arquivos de backup e temporários
*.bak
*.tmp
*.temp
*~

# Arquivos de sistema
.DS_Store
Thumbs.db
desktop.ini

# Diretórios de dependências
node_modules/
bower_components/

# Arquivos de IDE
.vscode/
.idea/
*.swp
*.swo

# Arquivos de cache e build
dist/
build/
.cache/
```

## 🚨 Importante

⚠️ **NUNCA** commite arquivos contendo:
- Chaves de API reais
- Configurações de produção
- Tokens de acesso
- Informações de autenticação

✅ **SEMPRE** use o arquivo `.env.example` como referência e mantenha suas configurações reais no arquivo `.env` (que é ignorado pelo Git).

## 🎵 Gêneros Disponíveis

- **MPB**: Música Popular Brasileira clássica
- **Pagode**: Samba e pagode brasileiro
- **Gospel**: Música gospel e cristã
- **Funk**: Funk carioca e brasileiro
- **Internacional**: Sucessos internacionais

## 🔧 Funcionalidades Técnicas

- **Cache Inteligente**: Armazena resultados para reduzir chamadas de API
- **Rotação de Chaves**: Sistema automático de rotação entre múltiplas chaves de API
- **Fallback**: Sistema de fallback para quando as APIs não estão disponíveis
- **Responsivo**: Interface adaptável para desktop e mobile
- **PWA Ready**: Preparado para ser uma Progressive Web App

## 📝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🤝 Suporte

Se você encontrar problemas ou tiver dúvidas:

1. Verifique se todas as configurações estão corretas no arquivo `.env`
2. Confirme se as chaves de API estão válidas e ativas
3. Verifique o console do navegador para mensagens de erro
4. Abra uma issue no repositório do projeto

---

**Desenvolvido com ❤️ para a comunidade de karaokê**