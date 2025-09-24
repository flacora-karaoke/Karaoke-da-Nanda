# 🎤 KaraokeHub - Seu App de Karaokê

Um aplicativo web moderno e elegante para karaokê que utiliza vídeos do YouTube, desenvolvido com HTML, CSS e JavaScript puro.

## ✨ Funcionalidades

- 🎵 **Biblioteca Extensa**: Mais de 100 músicas populares organizadas por gênero
- 🔍 **Busca Inteligente**: Pesquise por música, artista ou gênero
- 🎭 **Categorias por Gênero**: Pop, Rock, Sertanejo, MPB, Funk, Pagode, Gospel e Internacional
- 📱 **Design Responsivo**: Interface moderna que funciona em desktop, tablet e mobile
- ⭐ **Sistema de Favoritos**: Salve suas músicas preferidas
- 🎲 **Música Aleatória**: Descubra novas músicas com o botão aleatório
- 📊 **Múltiplas Visualizações**: Visualização em grade ou lista
- 🔗 **Integração YouTube**: Links diretos para vídeos de karaokê no YouTube

## 🚀 Como Usar

### Opção 1: Uso Básico (Sem API do YouTube)
1. Abra o arquivo `index.html` em seu navegador
2. O app funcionará com dados mock e thumbnails padrão
3. Clique em qualquer música para abrir o modal
4. Use o botão "Cantar Agora" para buscar a música no YouTube

### Opção 2: Uso Completo (Com API do YouTube)
1. Obtenha uma chave da API do YouTube:
   - Acesse o [Google Cloud Console](https://console.cloud.google.com/)
   - Crie um novo projeto ou selecione um existente
   - Ative a YouTube Data API v3
   - Crie credenciais (API Key)
   - Copie sua chave da API

2. Configure a API:
   - Abra o arquivo `script.js`
   - Substitua `'YOUR_YOUTUBE_API_KEY'` pela sua chave real
   - Salve o arquivo

3. Abra o arquivo `index.html` em seu navegador

## 🎯 Funcionalidades Principais

### Navegação por Gêneros
- **Todos**: Visualiza todas as músicas disponíveis
- **Pop**: Sucessos pop nacionais e internacionais
- **Rock**: Clássicos do rock nacional
- **Sertanejo**: Hits sertanejos e country
- **MPB**: Música Popular Brasileira
- **Funk**: Funk carioca e brasileiro
- **Pagode**: Samba e pagode
- **Gospel**: Música gospel e religiosa
- **Internacional**: Sucessos internacionais

### Sistema de Busca
- Busque por nome da música
- Busque por artista
- Busque por gênero musical
- Busca em tempo real com debounce

### Ordenação
- **Ordem Alfabética**: Músicas ordenadas A-Z
- **Por Artista**: Agrupadas por artista
- **Popularidade**: Baseada na data de publicação no YouTube

### Favoritos
- Adicione músicas aos favoritos
- Favoritos são salvos no localStorage
- Ícone de coração indica músicas favoritadas

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica moderna
- **CSS3**: 
  - Flexbox e Grid Layout
  - Animações e transições suaves
  - Design responsivo
  - Backdrop filter para efeitos de vidro
  - Gradientes modernos
- **JavaScript ES6+**:
  - Async/Await para chamadas de API
  - LocalStorage para persistência
  - Event delegation
  - Debouncing para otimização
- **APIs Externas**:
  - YouTube Data API v3
  - Font Awesome para ícones
  - Google Fonts (Poppins)

## 📱 Compatibilidade

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Dispositivos móveis (iOS/Android)

## 🎨 Design Inspirado em

Baseado nas melhores práticas de UI/UX de 2025 <mcreference link="https://www.zegocloud.com/blog/karaoke-app-development" index="2">2</mcreference>, incluindo:
- Interface limpa e intuitiva <mcreference link="https://www.zegocloud.com/blog/karaoke-app-development" index="2">2</mcreference>
- Elementos de gamificação
- Design responsivo moderno
- Experiência de usuário fluida

## 🔧 Personalização

### Adicionando Novas Músicas
1. Abra o arquivo `script.js`
2. Localize o array `musicDatabase`
3. Adicione novos objetos seguindo o padrão:
```javascript
{
    title: 'Nome da Música',
    artist: 'Nome do Artista',
    genre: 'genero',
    searchTerm: 'termo de busca karaoke'
}
```

### Modificando Cores e Estilos
1. Abra o arquivo `styles.css`
2. Modifique as variáveis CSS no início do arquivo
3. Personalize gradientes, cores e espaçamentos

## 📊 Estrutura do Projeto

```
KARAOKE YOUTUBE/
├── index.html          # Página principal
├── styles.css          # Estilos e design
├── script.js           # Lógica e funcionalidades
└── README.md           # Documentação
```

## 🚨 Limitações e Considerações

- **Quota da API**: A YouTube API tem limites de uso diário
- **CORS**: Para uso em produção, considere implementar um backend
- **Offline**: Funciona offline com dados mock (sem thumbnails reais)
- **Navegadores**: Requer navegadores modernos com suporte a ES6+

## 🔮 Futuras Melhorias

- [ ] Sistema de playlists personalizadas
- [ ] Integração com Spotify/Apple Music
- [ ] Modo karaokê com letras sincronizadas
- [ ] Sistema de pontuação
- [ ] Compartilhamento social
- [ ] Modo offline completo
- [ ] Suporte a múltiplos idiomas

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Melhorar a documentação
- Adicionar novas músicas ao banco de dados

---

**Desenvolvido com ❤️ para amantes do karaokê em 2025**