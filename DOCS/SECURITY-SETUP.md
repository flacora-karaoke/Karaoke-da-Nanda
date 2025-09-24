# 🔒 Guia de Configuração de Segurança - Firebase

## ⚠️ IMPORTANTE: Configuração de Segurança Obrigatória

Você está correto! As chaves do Firebase são públicas por padrão, mas precisamos configurar **restrições de domínio** e **regras de segurança** para proteger o projeto.

## 🎯 Domínios que Precisam ser Autorizados

Baseado no seu deploy, você precisa autorizar estes domínios:

### 📍 **Domínios Locais (Desenvolvimento)**
- `localhost:8000`
- `127.0.0.1:8000`
- `localhost:3000` (caso use outro servidor)

### 🌐 **Domínios de Produção**
- `seu-usuario.github.io` (GitHub Pages)
- `seu-projeto.vercel.app` (Vercel)
- Qualquer domínio customizado que você tenha configurado

---

## 🔧 PASSO 1: Configurar Restrições de API Key

### 1.1 Acesse o Google Cloud Console
1. Vá para: https://console.cloud.google.com/
2. Selecione seu projeto: `karaokehub-5b1bc`
3. No menu lateral, vá em **APIs & Services** > **Credentials**

### 1.2 Configurar a API Key do Firebase
1. Encontre sua API Key: `AIzaSyCCwVRf1FxGDPpN0DcG1RohR6JniQheN3Q`
2. Clique no ícone de **editar** (lápis)
3. Em **Application restrictions**, selecione **HTTP referrers (web sites)**
4. Adicione os seguintes referrers:

```
http://localhost:*
http://127.0.0.1:*
https://*.github.io/*
https://karaoke-da-nanda.vercel.app/*
https://*.vercel.app/*
```

⚠️ **IMPORTANTE**: 
- Use `http://localhost:*` (não `localhost:8000/*`)
- Use `https://*.github.io/*` (não `github.com`)
- Inclua o protocolo (`http://` ou `https://`)
- Use `*` para permitir todas as portas do localhost

### 1.3 Configurar APIs Permitidas
Na seção **API restrictions**:
- ✅ Identity Toolkit API (para Firebase Authentication)
- ✅ Cloud Firestore API
- ✅ Firebase Realtime Database API (se usar)
- ✅ Cloud Storage API (se usar)
- ✅ Firebase Installations API

---

## 🔧 PASSO 2: Configurar Regras do Firestore

### 2.1 Acesse o Firebase Console
1. Vá para: https://console.firebase.google.com/
2. Selecione seu projeto: `karaokehub-5b1bc`
3. No menu lateral, vá em **Firestore Database** > **Rules**

### 2.2 Configurar Regras de Segurança
Substitua as regras atuais por estas regras mais seguras:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Regras para a coleção de músicas
    match /songs/{songId} {
      // Permitir leitura para todos (dados públicos do karaokê)
      allow read: if true;
      
      // Permitir escrita apenas de domínios autorizados
      allow write: if request.auth != null || 
                      resource == null || 
                      isAuthorizedDomain();
    }
    
    // Regras para outras coleções (se existirem)
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null || isAuthorizedDomain();
    }
    
    // Função para verificar domínios autorizados
    function isAuthorizedDomain() {
      return request.headers.origin in [
        'http://localhost:8000',
        'http://127.0.0.1:8000',
        'https://flacora-karaoke.github.io',
        'https://karaoke-da-nanda.vercel.app'
      ];
    }
  }
}
```

---

## 🔧 PASSO 3: Configurar Restrições do YouTube API

### 3.1 Acesse o Google Cloud Console
1. Vá para: https://console.cloud.google.com/
2. Selecione o projeto onde suas YouTube API Keys estão configuradas
3. Vá em **APIs & Services** > **Credentials**

### 3.2 Configurar cada YouTube API Key
Para cada uma das suas 9 chaves do YouTube:

```
AIzaSyDu-crlw3bxZnAjro1Afdo57WX_GFiykaE
AIzaSyCxwTtmGkxVvEBGhqpzpqKFZ4u0zKKW6Gg
AIzaSyDvtd3Y3PXgGDF0AZCGXFDZWmS8rN4Xlcw
... (e assim por diante)
```

1. Clique em cada API Key para editá-la
2. Em **Application restrictions**, selecione **HTTP referrers**
3. Adicione os mesmos domínios do Firebase:

```
localhost:8000/*
127.0.0.1:8000/*
*.github.io/*
*.vercel.app/*
seu-dominio-customizado.com/*
```

---

## 🔧 PASSO 4: Configurar CORS (se necessário)

Se você encontrar problemas de CORS, adicione estas configurações no seu projeto:

### 4.1 Criar arquivo de configuração CORS
Crie um arquivo `cors.json` na raiz do projeto:

```json
[
  {
    "origin": [
      "http://localhost:8000",
      "http://127.0.0.1:8000",
      "https://seu-usuario.github.io",
      "https://seu-projeto.vercel.app"
    ],
    "method": ["GET", "POST", "PUT", "DELETE"],
    "maxAgeSeconds": 3600
  }
]
```

---

## 🔧 PASSO 5: Atualizar Configurações de Deploy

### 5.1 Para GitHub Pages
Certifique-se de que o domínio GitHub Pages está correto:
- Formato: `https://seu-usuario.github.io/nome-do-repositorio`

### 5.2 Para Vercel
1. No dashboard do Vercel, vá em **Settings** > **Domains**
2. Anote o domínio exato (ex: `karaoke-hub-xyz.vercel.app`)
3. Use esse domínio nas configurações de API

---

## ✅ CHECKLIST DE SEGURANÇA

- [ ] **API Key do Firebase** configurada com restrições de domínio
- [ ] **YouTube API Keys** (todas as 9) configuradas com restrições
- [ ] **Regras do Firestore** atualizadas para maior segurança
- [ ] **Domínios de produção** (GitHub Pages e Vercel) autorizados
- [ ] **Domínios locais** autorizados para desenvolvimento
- [ ] **Teste de funcionamento** em todos os ambientes

---

## 🚨 AÇÕES IMEDIATAS NECESSÁRIAS

1. **AGORA**: Configure as restrições de API Key no Google Cloud Console
2. **AGORA**: Atualize as regras do Firestore
3. **TESTE**: Verifique se o projeto funciona em localhost
4. **TESTE**: Verifique se o projeto funciona no GitHub Pages
5. **TESTE**: Verifique se o projeto funciona no Vercel

---

## 📞 SUPORTE

Se encontrar problemas:
1. Verifique o console do navegador para erros de CORS ou API
2. Confirme se os domínios estão escritos corretamente
3. Aguarde até 10 minutos para as configurações propagarem
4. Teste em modo incógnito para evitar cache

**Lembre-se**: As configurações podem levar alguns minutos para fazer efeito!