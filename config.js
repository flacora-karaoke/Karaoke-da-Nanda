// ========================================
// CONFIGURAÇÃO CENTRALIZADA DO PROJETO
// ========================================
// Este arquivo carrega as configurações de ambiente
// e fornece uma interface unificada para todo o projeto

// Função para carregar variáveis de ambiente do arquivo .env
function loadEnvVariables() {
    // Em um ambiente de produção real, você usaria um carregador de .env
    // Para este projeto, vamos simular carregando de localStorage ou definindo manualmente
    
    // Verificar se as variáveis já foram carregadas no localStorage
    const savedConfig = localStorage.getItem('app_config');
    if (savedConfig) {
        return JSON.parse(savedConfig);
    }
    
    // Se não houver configuração salva, usar as configurações reais do projeto
    return {
        // Firebase Configuration - Configurações reais do projeto
        FIREBASE_API_KEY: 'AIzaSyCCwVRf1FxGDPpN0DcG1RohR6JniQheN3Q',
        FIREBASE_AUTH_DOMAIN: 'karaokehub-5b1bc.firebaseapp.com',
        FIREBASE_PROJECT_ID: 'karaokehub-5b1bc',
        FIREBASE_STORAGE_BUCKET: 'karaokehub-5b1bc.firebasestorage.app',
        FIREBASE_MESSAGING_SENDER_ID: '155863546905',
        FIREBASE_APP_ID: '1:155863546905:web:cb0d719b05c9e2d03e3e88',
        
        // YouTube API Keys - Chaves reais encontradas no projeto
        YOUTUBE_API_KEYS: [
            'AIzaSyDu-crlw3bxZnAjro1Afdo57WX_GFiykaE', // CHAVE PRINCIPAL
            'AIzaSyCxwTtmGkxVvEBGhqpzpqKFZ4u0zKKW6Gg', // CHAVE TEMPORÁRIA 01
            'AIzaSyDvtd3Y3PXgGDF0AZCGXFDZWmS8rN4Xlcw', // CHAVE TEMPORÁRIA 02
            'AIzaSyCZl7zZi8WLCcWs2jvf2Yhn0OpbJn6a41k', // CHAVE TEMPORÁRIA 03
            'AIzaSyADBa9q8l24FJNyxBibVxQaFbQTq2h5brc', // CHAVE TEMPORÁRIA 04
            'AIzaSyBW3JuuJPZKYE-PMl_ZuJafkGE5x4ZS0fU', // CHAVE TEMPORÁRIA 05
            'AIzaSyAlSEqbfWHRFrB5mjOHtbm35p6Af45ROrA', // CHAVE TEMPORÁRIA 06
            'AIzaSyBHNoJ1iJJcmWkni-1u00THqxzgp4je7Q4', // CHAVE TEMPORÁRIA 07
            'AIzaSyCurcs8-pdQed7KIU4nAUWiDiSbblIDT0M'  // CHAVE TEMPORÁRIA 08
        ],
        
        // Configurações opcionais
        NODE_ENV: 'development',
        CACHE_DURATION_MINUTES: 5,
        DEBUG_MODE: true
    };
}

// Carregar configurações
const CONFIG = loadEnvVariables();

// Configuração do Firebase
const firebaseConfig = {
    apiKey: CONFIG.FIREBASE_API_KEY,
    authDomain: CONFIG.FIREBASE_AUTH_DOMAIN,
    projectId: CONFIG.FIREBASE_PROJECT_ID,
    storageBucket: CONFIG.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: CONFIG.FIREBASE_MESSAGING_SENDER_ID,
    appId: CONFIG.FIREBASE_APP_ID
};

// Chaves do YouTube API
const YOUTUBE_API_KEYS = CONFIG.YOUTUBE_API_KEYS;

// Função para salvar configuração no localStorage (para desenvolvimento)
function saveConfig(config) {
    localStorage.setItem('app_config', JSON.stringify(config));
    console.log('Configuração salva com sucesso!');
}

// Função para verificar se as configurações estão válidas
function validateConfig() {
    const requiredFields = [
        'FIREBASE_API_KEY',
        'FIREBASE_AUTH_DOMAIN', 
        'FIREBASE_PROJECT_ID',
        'FIREBASE_STORAGE_BUCKET',
        'FIREBASE_MESSAGING_SENDER_ID',
        'FIREBASE_APP_ID'
    ];
    
    const missingFields = requiredFields.filter(field => 
        !CONFIG[field] || CONFIG[field].includes('sua_') || CONFIG[field].includes('seu-')
    );
    
    const invalidYouTubeKeys = CONFIG.YOUTUBE_API_KEYS.filter(key => 
        !key || key.includes('sua_')
    );
    
    if (missingFields.length > 0) {
        console.warn('⚠️ Campos de configuração do Firebase não configurados:', missingFields);
    }
    
    if (invalidYouTubeKeys.length === CONFIG.YOUTUBE_API_KEYS.length) {
        console.warn('⚠️ Nenhuma chave válida do YouTube API configurada');
    }
    
    return missingFields.length === 0 && invalidYouTubeKeys.length < CONFIG.YOUTUBE_API_KEYS.length;
}

// Exportar configurações (compatível com diferentes ambientes)
if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    module.exports = { CONFIG, firebaseConfig, YOUTUBE_API_KEYS, saveConfig, validateConfig };
} else {
    // Browser environment - variáveis globais
    window.CONFIG = CONFIG;
    window.firebaseConfig = firebaseConfig;
    window.YOUTUBE_API_KEYS = YOUTUBE_API_KEYS;
    window.saveConfig = saveConfig;
    window.validateConfig = validateConfig;
}

// Log de inicialização
console.log('🔧 Configuração carregada:', {
    firebase: CONFIG.FIREBASE_PROJECT_ID !== 'seu-projeto-id' ? '✅ Configurado' : '❌ Não configurado',
    youtubeKeys: CONFIG.YOUTUBE_API_KEYS.filter(key => !key.includes('sua_')).length + ' chaves válidas',
    environment: CONFIG.NODE_ENV
});