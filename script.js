const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

// Database
const musicDatabase = [
    { title: 'Bohemian Rhapsody', artist: 'Queen', genre: 'internacional', searchTerm: 'bohemian rhapsody queen karaoke playback' },
    { title: 'Don\'t Stop Believin\'', artist: 'Journey', genre: 'internacional', searchTerm: 'dont stop believin journey karaoke playback' },
    { title: 'Hotel California', artist: 'Eagles', genre: 'internacional', searchTerm: 'hotel california eagles karaoke playback' },
    { title: 'Imagine', artist: 'John Lennon', genre: 'internacional', searchTerm: 'imagine john lennon karaoke playback' },
    { title: 'Let It Be', artist: 'The Beatles', genre: 'internacional', searchTerm: 'let it be beatles karaoke playback' },
    { title: 'My Way', artist: 'Frank Sinatra', genre: 'internacional', searchTerm: 'my way frank sinatra karaoke playback' },
    { title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', genre: 'internacional', searchTerm: 'sweet child mine guns roses karaoke playback' },
    { title: 'Yesterday', artist: 'The Beatles', genre: 'internacional', searchTerm: 'yesterday beatles karaoke playback' },
    { title: 'Wonderwall', artist: 'Oasis', genre: 'internacional', searchTerm: 'wonderwall oasis karaoke playback' },
    { title: 'Shape of You', artist: 'Ed Sheeran', genre: 'internacional', searchTerm: 'shape of you ed sheeran karaoke playback' },
    { title: 'Perfect', artist: 'Ed Sheeran', genre: 'internacional', searchTerm: 'perfect ed sheeran karaoke playback' },
    { title: 'Thinking Out Loud', artist: 'Ed Sheeran', genre: 'internacional', searchTerm: 'thinking out loud ed sheeran karaoke playback' },
    { title: 'Someone Like You', artist: 'Adele', genre: 'internacional', searchTerm: 'someone like you adele karaoke playback' },
    { title: 'Hello', artist: 'Adele', genre: 'internacional', searchTerm: 'hello adele karaoke playback' },
    { title: 'Rolling in the Deep', artist: 'Adele', genre: 'internacional', searchTerm: 'rolling deep adele karaoke playback' },
    { title: 'Despacito', artist: 'Luis Fonsi', genre: 'internacional', searchTerm: 'despacito luis fonsi karaoke playback' },
    { title: 'La Vida Es Una Fiesta', artist: 'Manu Chao', genre: 'internacional', searchTerm: 'la vida fiesta manu chao karaoke playback' },
    { title: 'Havana', artist: 'Camila Cabello', genre: 'internacional', searchTerm: 'havana camila cabello karaoke playback' },
    { title: 'Senorita', artist: 'Shawn Mendes', genre: 'internacional', searchTerm: 'senorita shawn mendes karaoke playback' },
    { title: 'Blinding Lights', artist: 'The Weeknd', genre: 'internacional', searchTerm: 'blinding lights weeknd karaoke playback' }
];

// ========================================
// CONFIGURAÇÕES GLOBAIS
// ========================================
// As configurações de API e Firebase agora são carregadas do config.js
// YOUTUBE_API_KEYS e firebaseConfig são definidos globalmente pelo config.js

// Global Variables
let allSongs = [];
let filteredSongs = [];
let currentPage = 1;
let songsPerPage = 12;
let currentView = 'grid';
let favorites = [];
let currentGenre = 'all'; // Variável para controlar o gênero atual
let currentSort = 'title'; // Variável para controlar a ordenação atual

// Constantes para imagens
const KARAOKE_PLACEHOLDER = 'THUMBNAIL.JPG'; // Usando a thumbnail mencionada pelo usuário

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const genreButtons = document.querySelectorAll('.genre-btn');
const sortSelect = document.getElementById('sortSelect');
const gridViewBtn = document.getElementById('gridView');
const listViewBtn = document.getElementById('listView');
const songsContainer = document.getElementById('songsContainer');
const pagination = document.getElementById('pagination');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageNumbers = document.getElementById('pageNumbers');
const randomBtn = document.getElementById('randomBtn');
const modal = document.getElementById('songModal');
const closeModal = document.getElementById('closeModal');
const playKaraokeBtn = document.getElementById('playKaraoke');
const addToFavoritesBtn = document.getElementById('addToFavorites');

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Inicializar favoritos do Firebase na inicialização
async function initializeApp() {
    setupEventListeners();
    
    // Carregar favoritos do Firebase primeiro
    console.log('💖 Carregando favoritos...');
    try {
        const firebaseFavorites = await getFavoritesFromFirebase();
        if (firebaseFavorites && firebaseFavorites.length > 0) {
            favorites = firebaseFavorites;
            console.log(`✅ ${favorites.length} favoritos carregados do Firebase`);
        } else {
            // Fallback para localStorage
            const localFavorites = JSON.parse(localStorage.getItem('karaoke-favorites') || '[]');
            if (localFavorites.length > 0) {
                favorites = localFavorites;
                console.log(`✅ ${favorites.length} favoritos carregados do localStorage`);
                // Migrar para Firebase
                saveFavoritesToFirebase(favorites);
            }
        }
    } catch (error) {
        console.error('❌ Erro ao carregar favoritos:', error);
        // Usar localStorage como fallback final
        favorites = JSON.parse(localStorage.getItem('karaoke-favorites') || '[]');
    }
    
    loadSongs();
}

function setupEventListeners() {
    // Search
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    searchBtn.addEventListener('click', handleSearch);
    
    // Genre filters
    genreButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            genreButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentGenre = btn.dataset.genre;
            currentPage = 1;
            applyFiltersAndSort();
        });
    });
    
    // Sort
    sortSelect.addEventListener('change', () => {
        currentSort = sortSelect.value;
        applyFiltersAndSort();
    });
    
    // View toggle
    gridViewBtn.addEventListener('click', () => toggleView('grid'));
    listViewBtn.addEventListener('click', () => toggleView('list'));
    
    // Pagination
    prevPageBtn.addEventListener('click', () => changePage(currentPage - 1));
    nextPageBtn.addEventListener('click', () => changePage(currentPage + 1));
    
    // Random song
    randomBtn.addEventListener('click', selectRandomSong);
    
    // Expand music database
    const expandMusicBtn = document.getElementById('expandMusicBtn');
    if (expandMusicBtn) {
        expandMusicBtn.addEventListener('click', expandMusicDatabase);
    }
    
    // Modal
    closeModal.addEventListener('click', closeModalHandler);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModalHandler();
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

async function loadSongs() {
    console.log('🚀 CARREGAMENTO OTIMIZADO DE MÚSICAS...');
    try {
        // Usar o otimizador de performance (máximo 1 leitura se cache válido)
        const optimizedSongs = await loadSongsOptimized();
        
        if (optimizedSongs && optimizedSongs.length > 0) {
            console.log(`✅ ${optimizedSongs.length} músicas carregadas (otimizado)!`);
            allSongs = optimizedSongs;
            applyFiltersAndSort();
            
            // Mostrar estatísticas de performance
        if (window.firebaseOptimizer) {
            const stats = window.firebaseOptimizer.getPerformanceStats();
            console.log(`📊 Performance Firebase: ${stats.totalReads} leituras, cache: ${stats.cacheSize} músicas, hits: ${stats.cacheHits}`);
            
            // Exibir estatísticas na interface (opcional)
            const performanceInfo = document.createElement('div');
            performanceInfo.className = 'performance-info';
            performanceInfo.innerHTML = `
                <small style="color: #666; font-size: 12px;">
                    📊 Firebase: ${stats.totalReads} leituras | Cache: ${stats.cacheSize} músicas | Hits: ${stats.cacheHits}
                </small>
            `;
            
            // Adicionar ao header se não existir
            if (!document.querySelector('.performance-info')) {
                const header = document.querySelector('.header-content');
                if (header) {
                    header.appendChild(performanceInfo);
                }
            }
        }
            return;
        }
        
        console.log('⚠️ Fallback: Carregando do banco local...');
        // Se não há dados no Firebase, usar banco local como último recurso
        allSongs = musicDatabase.map(song => ({
            ...song,
            videoId: null, // Será preenchido posteriormente
            thumbnailUrl: null,
            publishedAt: null
        }));
        applyFiltersAndSort();
        
    } catch (error) {
        console.error('❌ Erro ao carregar músicas:', error);
        showError('Erro ao carregar as músicas. Tente novamente.');
    }
}

// Função otimizada para carregar músicas (máximo 1 leitura do Firebase)
async function loadSongsOptimized() {
    try {
        // Inicializar o otimizador se necessário
        if (!window.firebaseOptimizer) {
            console.log('🔧 Inicializando otimizador de performance...');
            await initializeFirebaseOptimizer();
        }
        
        // Carregar músicas usando cache otimizado
        return await window.firebaseOptimizer.loadSongsForPlayback();
    } catch (error) {
        console.error('❌ Erro no carregamento otimizado:', error);
        return null;
    }
}

// Inicializar o otimizador de performance
async function initializeFirebaseOptimizer() {
    try {
        // Carregar o script do otimizador se não estiver carregado
        if (!window.FirebasePerformanceOptimizer) {
            await loadScript('firebase-performance-optimizer.js');
        }
        
        // Inicializar o otimizador
        window.firebaseOptimizer = new window.FirebasePerformanceOptimizer();
        await window.firebaseOptimizer.initialize();
        
        console.log('✅ Otimizador de performance inicializado!');
    } catch (error) {
        console.error('❌ Erro ao inicializar otimizador:', error);
        throw error;
    }
}

// Função auxiliar para carregar scripts dinamicamente
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

async function getCachedSongs() {
    console.log('🔍 Verificando cache de músicas...');
    try {
        const cacheKey = 'karaoke-songs-cache';
        const cacheTimeKey = 'karaoke-songs-cache-time';
        const cacheTime = localStorage.getItem(cacheTimeKey);
        const now = Date.now();
        // Aumentando o tempo de cache para 24 horas para economizar quotas
        const twentyFourHours = 24 * 60 * 60 * 1000;
        
        console.log(`⏰ Tempo atual: ${new Date(now).toLocaleString()}`);
        
        if (cacheTime) {
            const cacheDate = new Date(parseInt(cacheTime));
            console.log(`📅 Cache criado em: ${cacheDate.toLocaleString()}`);
            console.log(`⏳ Idade do cache: ${Math.round((now - parseInt(cacheTime)) / 1000 / 60 / 60)} horas`);
            
            if ((now - parseInt(cacheTime)) < twentyFourHours) {
                const cached = localStorage.getItem(cacheKey);
                if (cached) {
                    const parsedCache = JSON.parse(cached);
                    console.log(`✅ Cache válido encontrado com ${parsedCache.length} músicas (válido por 24h)`);
                    return parsedCache;
                }
            } else {
                console.log('⚠️ Cache expirado (mais de 24 horas)');
            }
        } else {
            console.log('⚠️ Nenhum cache encontrado');
        }
        
        return null;
    } catch (error) {
        console.error('❌ Erro ao acessar cache:', error);
        return null;
    }
}

async function saveSongsToCache(songs) {
    console.log(`💾 Salvando ${songs.length} músicas no cache...`);
    try {
        const cacheKey = 'karaoke-songs-cache';
        const cacheTimeKey = 'karaoke-songs-cache-time';
        
        localStorage.setItem(cacheKey, JSON.stringify(songs));
        localStorage.setItem(cacheTimeKey, Date.now().toString());
        console.log('✅ Cache salvo com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao salvar cache:', error);
    }
}

async function loadSongsWithYouTubeData(backgroundMode = false) {
    if (!backgroundMode) {
        console.log('🎵 Carregando dados do YouTube para as músicas...');
    }
    
    try {
        // Verificar cache primeiro
        const cachedSongs = await getCachedSongsFromFirebase();
        if (cachedSongs && cachedSongs.length > 0) {
            if (!backgroundMode) {
                console.log(`✅ Cache encontrado! ${cachedSongs.length} músicas carregadas`);
                allSongs = cachedSongs;
                applyFiltersAndSort();
            }
            return cachedSongs;
        }
        
        if (!backgroundMode) {
            console.log('⚠️ ATENÇÃO: Iniciando carregamento completo da API do YouTube');
            console.log('💰 Isso consumirá quotas da API. O cache será permanente no Firebase.');
        }
        
        const songsWithYouTube = [];
        const batchSize = 3; // Reduzido para economizar quota
        const delay = backgroundMode ? 1000 : 500; // Delay maior em background
        
        if (!backgroundMode) {
            console.log(`📊 Total de músicas para processar: ${musicDatabase.length}`);
            console.log(`📦 Processando em lotes de ${batchSize} músicas com delay de ${delay}ms`);
        }
        
        for (let i = 0; i < musicDatabase.length; i += batchSize) {
            const batch = musicDatabase.slice(i, i + batchSize);
            const batchNumber = Math.floor(i / batchSize) + 1;
            const totalBatches = Math.ceil(musicDatabase.length / batchSize);
            
            if (!backgroundMode) {
                console.log(`🔄 Processando lote ${batchNumber}/${totalBatches} (${batch.length} músicas)`);
            }
            
            const batchPromises = batch.map(async (song) => {
                try {
                    const youtubeData = await searchYouTubeVideo(song.title, song.artist);
                    return {
                        ...song,
                        videoId: youtubeData.videoId,
                        thumbnail: './THUMBNAIL.JPG',
                        duration: youtubeData.duration,
                        isOffline: !youtubeData.videoId // Marcar como offline se não tem videoId
                    };
                } catch (error) {
                    console.log(`⚠️ Erro ao processar ${song.title}: usando dados padrão`);
                    return {
                        ...song,
                        videoId: null,
                        duration: 'N/A',
                        isOffline: true,
                        hasError: true
                    };
                }
            });
            
            const batchResults = await Promise.all(batchPromises);
            songsWithYouTube.push(...batchResults);
            
            if (!backgroundMode) {
                console.log(`✅ Lote processado! Total processado: ${songsWithYouTube.length}/${musicDatabase.length}`);
            }
            
            // Delay entre lotes para economizar quotas
            if (i + batchSize < musicDatabase.length) {
                if (!backgroundMode) {
                    console.log(`⏳ Aguardando ${delay}ms antes do próximo lote para economizar quotas...`);
                }
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
        
        if (!backgroundMode) {
            console.log('🎉 Carregamento completo finalizado!');
            allSongs = songsWithYouTube;
            applyFiltersAndSort();
        }
        
        // Salvar no Firebase para cache permanente
        try {
            await saveSongsToFirebaseCache(songsWithYouTube);
            if (!backgroundMode) {
                console.log('💾 Cache salvo no Firebase com sucesso!');
            }
        } catch (cacheError) {
            console.error('❌ Erro ao salvar cache no Firebase:', cacheError);
        }
        
        return songsWithYouTube;
        
    } catch (error) {
        console.error('❌ Erro ao carregar dados do YouTube:', error);
        
        // Fallback: retornar dados básicos
        const basicSongs = musicDatabase.map(song => ({
            ...song,
            videoId: null,
            duration: 'N/A',
            isOffline: true,
            hasError: true
        }));
        
        if (!backgroundMode) {
            allSongs = basicSongs;
            applyFiltersAndSort();
            showError('Erro na API do YouTube. Funcionando em modo offline.');
        }
        
        return basicSongs;
    }
}

async function loadSongsFromFirebaseCollection() {
    console.log('🔍 Carregando músicas da coleção Firebase...');
    try {
        // Aguardar autenticação com timeout
        if (!auth.currentUser) {
            console.log('⏳ Aguardando autenticação Firebase...');
            await new Promise((resolve, reject) => {
                const timeout = setTimeout(() => {
                    reject(new Error('Timeout na autenticação Firebase'));
                }, 10000); // 10 segundos timeout
                
                const unsubscribe = auth.onAuthStateChanged((user) => {
                    if (user) {
                        clearTimeout(timeout);
                        unsubscribe();
                        resolve(user);
                    }
                });
            });
        }

        const songsRef = db.collection('songs');
        const snapshot = await songsRef.get();
        
        if (!snapshot.empty) {
            const songs = [];
            const genreCount = {};
            snapshot.forEach(doc => {
                const data = doc.data();
                const genre = data.genre || 'outros';
                
                // Contar gêneros para debug
                genreCount[genre] = (genreCount[genre] || 0) + 1;
                
                songs.push({
                    id: doc.id,
                    title: data.title || '',
                    artist: data.artist || '',
                    genre: genre,
                    searchTerm: data.searchTerm || `${data.title} ${data.artist} karaoke`,
                    videoId: data.videoId || null,
                    thumbnailUrl: data.thumbnail || './THUMBNAIL.JPG',
                    publishedAt: data.publishedAt || null,
                    isFavorite: false // Será atualizado pelos favoritos
                });
            });
            
            console.log(`✅ ${songs.length} músicas carregadas da coleção Firebase`);
            console.log('📊 GÊNEROS ENCONTRADOS NO FIREBASE:', genreCount);
            
            return songs;
        } else {
            console.log('⚠️ Nenhuma música encontrada na coleção Firebase');
            return null;
        }
        
    } catch (error) {
        console.error('❌ Erro ao carregar músicas da coleção Firebase:', error);
        return null;
    }
}

async function getCachedSongsFromFirebase() {
    console.log('🔍 Verificando cache de músicas no Firebase...');
    try {
        // Aguardar autenticação com timeout
        if (!auth.currentUser) {
            console.log('⏳ Aguardando autenticação Firebase...');
            await new Promise((resolve, reject) => {
                const timeout = setTimeout(() => {
                    reject(new Error('Timeout na autenticação Firebase'));
                }, 10000); // 10 segundos timeout
                
                const unsubscribe = auth.onAuthStateChanged((user) => {
                    if (user) {
                        clearTimeout(timeout);
                        unsubscribe();
                        resolve(user);
                    }
                });
            });
        }

        const cacheRef = db.collection('songsCache').doc('karaoke-songs');
        const doc = await cacheRef.get();
        
        if (doc.exists) {
            const data = doc.data();
            if (data && data.songs && Array.isArray(data.songs)) {
                console.log(`✅ Cache Firebase encontrado com ${data.songs.length} músicas`);
                console.log(`📅 Cache criado em: ${new Date(data.timestamp).toLocaleString()}`);
                return data.songs;
            }
        }
        
        console.log('⚠️ Nenhum cache encontrado no Firebase');
        return null;
    } catch (error) {
        console.error('❌ Erro ao acessar cache do Firebase:', error);
        return null;
    }
}

// Função para buscar vídeo individual no YouTube
async function searchYouTubeVideo(title, artist) {
    const query = `${title} ${artist} karaoke playback instrumental`;
    console.log(`🔍 Buscando: ${query}`);
    
    let attempts = 0;
    const maxAttempts = YOUTUBE_API_KEYS.length;
    
    while (attempts < maxAttempts) {
        const currentKey = getNextAPIKey();
        if (!currentKey) {
            console.log(`⚠️ Todas as chaves esgotadas para "${title}" - usando fallback`);
            return createFallbackVideoData(title, artist);
        }
        
        try {
            const searchUrl = `${YOUTUBE_API_URL}?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=1&key=${currentKey}`;
            const response = await fetch(searchUrl);
            
            // Verificar se a resposta é bem-sucedida
            if (!response.ok) {
                if (response.status === 403) {
                    console.log(`⚠️ Erro 403 com chave ${currentKeyIndex} para "${title}" - tentando próxima chave`);
                    markKeyAsExhausted(currentKeyIndex);
                    attempts++;
                    continue;
                }
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Verificar se há erro na resposta da API
            if (data.error) {
                if (data.error.errors && data.error.errors.some(e => e.reason === 'quotaExceeded')) {
                    console.log(`⚠️ Quota excedida com chave ${currentKeyIndex} para "${title}" - tentando próxima chave`);
                    markKeyAsExhausted(currentKeyIndex);
                    attempts++;
                    continue;
                }
                throw new Error(data.error.message);
            }
            
            // Verificar se há resultados
            if (!data.items || data.items.length === 0) {
                console.log(`⚠️ Nenhum resultado para "${title}" - usando fallback`);
                return createFallbackVideoData(title, artist);
            }
            
            const video = data.items[0];
            console.log(`✅ Sucesso com chave ${currentKeyIndex} para "${title}"`);
            
            // Validar se o vídeo é realmente karaokê usando o firebase-optimizer
            if (typeof firebaseOptimizer !== 'undefined' && firebaseOptimizer.validateKaraokeVideo) {
                const isKaraoke = firebaseOptimizer.validateKaraokeVideo(video.snippet.title, video.snippet.description || '');
                if (!isKaraoke) {
                    console.log(`⚠️ Vídeo "${video.snippet.title}" não passou na validação de karaokê - usando fallback`);
                    return createFallbackVideoData(title, artist);
                }
                console.log(`✅ Vídeo "${video.snippet.title}" validado como karaokê`);
            }
            
            // Registrar uso bem-sucedido da chave
            recordSuccessfulAPICall(currentKeyIndex);
            
            return {
                videoId: video.id.videoId,
                duration: 'N/A', // A API de busca não retorna duração
                title: video.snippet.title,
                channelTitle: video.snippet.channelTitle
            };
            
        } catch (error) {
            console.error(`Erro na busca do YouTube com chave ${currentKeyIndex}:`, error);
            
            // Para erros 403 ou quota excedida, tentar próxima chave
            if (error.message.includes('403') || error.message.includes('quotaExceeded')) {
                console.log(`🔄 Marcando chave ${currentKeyIndex} como esgotada e tentando próxima`);
                markKeyAsExhausted(currentKeyIndex);
                attempts++;
                continue;
            }
            
            // Para outros erros, usar fallback
            console.log(`🔄 Usando fallback para "${title}" devido a erro: ${error.message}`);
            return createFallbackVideoData(title, artist);
        }
    }
    
    // Se chegou aqui, todas as tentativas falharam
    console.log(`⚠️ Todas as tentativas falharam para "${title}" - usando fallback`);
    return createFallbackVideoData(title, artist);
}

// Função para criar dados de fallback quando a API falha
function createFallbackVideoData(title, artist) {
    return {
        videoId: null,
        duration: 'N/A',
        title: `${title} - ${artist}`,
        channelTitle: 'YouTube Search',
        isOffline: true,
        hasError: true,
        searchTerm: `${title} ${artist} karaoke playback`
    };
}

async function saveFavoritesToFirebase(favorites) {
    console.log(`💖 Salvando ${favorites.length} favoritos no Firebase...`);
    
    // Usar sistema de fallback offline se disponível
    if (typeof offlineFallback !== 'undefined') {
        return await offlineFallback.executeWithFallback(
            async () => {
                // Operação normal do Firebase
                return await performFirebaseFavoritesSave(favorites);
            },
            'favorites',
            favorites
        );
    }
    
    // Fallback para operação normal se o sistema offline não estiver disponível
    return await performFirebaseFavoritesSave(favorites);
}

async function performFirebaseFavoritesSave(favorites) {
    try {
        // Aguardar autenticação com timeout
        if (!auth.currentUser) {
            await new Promise((resolve, reject) => {
                const timeout = setTimeout(() => {
                    reject(new Error('Timeout na autenticação Firebase'));
                }, 10000); // 10 segundos timeout
                
                const unsubscribe = auth.onAuthStateChanged((user) => {
                    if (user) {
                        clearTimeout(timeout);
                        unsubscribe();
                        resolve(user);
                    }
                });
            });
        }

        const favData = {
            favorites: favorites,
            timestamp: Date.now(),
            totalFavorites: favorites.length
        };

        const favRef = db.collection('userPreferences').doc('favorites');
        await favRef.set(favData);
        
        console.log('✅ Favoritos salvos no Firebase com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao salvar favoritos no Firebase:', error);
    }
}

// ===== FUNÇÃO PARA MIGRAR DADOS DO LOCALSTORAGE PARA FIREBASE =====

async function migrateLocalStorageToFirebase() {
    console.log('🔄 Verificando migração do localStorage para Firebase...');
    
    try {
        // Migrar cache de músicas
        const localCache = localStorage.getItem('karaoke-songs-cache');
        if (localCache) {
            console.log('📦 Encontrado cache local - migrando para Firebase...');
            const songs = JSON.parse(localCache);
            await saveSongsToFirebaseCache(songs);
            
            // Limpar localStorage após migração
            localStorage.removeItem('karaoke-songs-cache');
            localStorage.removeItem('karaoke-songs-cache-time');
            console.log('🧹 Cache local removido após migração');
        }

        // Migrar favoritos
        const localFavorites = localStorage.getItem('karaoke-favorites');
        if (localFavorites) {
            console.log('💖 Encontrados favoritos locais - migrando para Firebase...');
            const favorites = JSON.parse(localFavorites);
            await saveFavoritesToFirebase(favorites);
            console.log('✅ Favoritos migrados para Firebase');
        }

    } catch (error) {
        console.error('❌ Erro na migração:', error);
    }
}

async function loadYouTubeDataInBackground() {
    try {
        console.log('🔄 Carregando dados do YouTube em background...');
        const songsWithYouTube = await loadSongsWithYouTubeData(true); // true = background mode
        
        if (songsWithYouTube && songsWithYouTube.length > 0) {
            console.log('✅ Dados do YouTube carregados em background!');
            allSongs = songsWithYouTube;
            applyFiltersAndSort();
            
            // Salvar no Firebase para próximas sessões
            await saveSongsToFirebaseCache(songsWithYouTube);
        }
    } catch (error) {
        console.log('⚠️ Falha ao carregar YouTube em background, mantendo modo offline');
    }
}

function handleSearch() {
    const query = searchInput.value.trim();
    
    // Se não há query, limpa a busca e retorna ao estado original
    if (!query) {
        clearSearchAndReturnToOriginal();
        return;
    }
    
    // Busca diretamente no YouTube com termos de karaoke
    console.log('🔍 Buscando no YouTube:', query);
    searchYouTubeAndDisplay(query);
}

async function searchYouTubeAndDisplay(query) {
    try {
        const results = await searchYouTubeDirectly(query);
        
        if (results.length > 0) {
            allSongs = results;
            filteredSongs = results;
            currentPage = 1;
            renderSongs();
            renderPagination();
        } else {
            showError('Nenhum resultado encontrado no YouTube.');
        }
    } catch (error) {
        console.error('Erro na busca do YouTube:', error);
        showError('Erro ao buscar no YouTube. Tente novamente.');
    }
}

async function searchYouTubeDirectly(query) {
    console.log(`🔍 Tentando buscar no YouTube: ${query}`);
    
    let attempts = 0;
    const maxAttempts = YOUTUBE_API_KEYS.length;
    
    while (attempts < maxAttempts) {
        const currentKey = getNextAPIKey();
        if (!currentKey) {
            console.log('⚠️ Todas as chaves esgotadas - usando fallback');
            break;
        }
        
        try {
            const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query + ' karaoke playback instrumental version')}&type=video&maxResults=20&key=${currentKey}`;
            const response = await fetch(searchUrl);
            
            if (!response.ok) {
                if (response.status === 403) {
                    console.log(`⚠️ Erro 403 com chave ${currentKeyIndex} - tentando próxima chave`);
                    markKeyAsExhausted(currentKeyIndex);
                    attempts++;
                    continue;
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.error) {
                if (data.error.errors && data.error.errors[0].reason === 'quotaExceeded') {
                    console.log(`⚠️ Quota excedida com chave ${currentKeyIndex} - tentando próxima chave`);
                    markKeyAsExhausted(currentKeyIndex);
                    attempts++;
                    continue;
                }
                throw new Error(data.error.message);
            }
            
            // Registrar uso bem-sucedido da chave
            recordSuccessfulAPICall(currentKeyIndex);
            console.log(`✅ Busca direta bem-sucedida com chave ${currentKeyIndex + 1}`);
            
            return data.items || [];
            
        } catch (error) {
            console.error(`❌ Erro na busca do YouTube com chave ${currentKeyIndex}:`, error);
            
            // Para erros 403 ou quota excedida, tentar próxima chave
            if (error.message.includes('403') || error.message.includes('quotaExceeded')) {
                console.log(`🔄 Marcando chave ${currentKeyIndex} como esgotada e tentando próxima`);
                markKeyAsExhausted(currentKeyIndex);
                attempts++;
                continue;
            }
            
            // Para outros erros, usar fallback
            break;
        }
    }
    
    // Se chegou aqui, usar fallback
    console.log('🔄 API do YouTube indisponível - ativando sistema de fallback');
    
    // Criar fallback com informações da busca
    const fallbackResults = [{
        id: { videoId: 'fallback_' + Date.now() },
        snippet: {
            title: `${query} - Karaoke Version`,
            description: 'Clique para buscar esta música no YouTube',
            thumbnails: {
                medium: {
                    url: 'placeholder-karaoke.svg'
                }
            },
            channelTitle: 'YouTube Search'
        },
        title: query,
        artist: 'Busca no YouTube',
        genre: 'youtube',
        isFallback: true,
        fallbackQuery: query + ' karaoke playback instrumental version'
    }];
    
    console.log('🔄 Retornando 1 opção de fallback com informações da busca');
    return fallbackResults;
}

function applyFiltersAndSort(searchTerm = '') {
    let filtered = [...allSongs];
    
    // Apply search filter
    if (searchTerm) {
        filtered = filtered.filter(song => 
            song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            song.artist.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    // Apply genre filter
    if (currentGenre !== 'all') {
        filtered = filtered.filter(song => song.genre === currentGenre);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
        switch (currentSort) {
            case 'alphabetical':
                return a.title.localeCompare(b.title);
            case 'artist':
                return a.artist.localeCompare(b.artist);
            case 'genre':
                return a.genre.localeCompare(b.genre);
            default:
                return 0;
        }
    });
    
    filteredSongs = filtered;
    currentPage = 1;
    renderSongs();
    renderPagination();
}

function renderSongs() {
    const startIndex = (currentPage - 1) * songsPerPage;
    const endIndex = startIndex + songsPerPage;
    const songsToShow = filteredSongs.slice(startIndex, endIndex);
    
    if (songsToShow.length === 0) {
        songsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                <h3>Nenhuma música encontrada</h3>
                <p>Tente ajustar os filtros ou termo de busca</p>
                <p><strong>💡 Dica:</strong> Digite "youtube: nome da música" para buscar diretamente no YouTube</p>
            </div>
        `;
        return;
    }
    
    // Verificar se há resultados de fallback e mostrar aviso
    const hasFallbackResults = songsToShow.some(song => song.isFallback);
    
    songsContainer.innerHTML = '';
    
    // Adicionar aviso se há resultados de fallback
    if (hasFallbackResults) {
        const warningDiv = document.createElement('div');
        warningDiv.className = 'api-warning';
        warningDiv.innerHTML = `
            <div class="warning-content">
                <i class="fas fa-music"></i>
                <div class="warning-text">
                    <h4>🎤 Ops! Vamos cantar de outro jeito!</h4>
                    <p>🎵 Nosso sistema está descansando um pouquinho, mas não se preocupe!</p>
                    <p>🎶 Vamos buscar suas músicas favoritas diretamente no YouTube!</p>
                    <p>💡 <strong>Dica:</strong> Amanhã voltamos com tudo! Por enquanto, aproveite as opções diretas! 🎸</p>
                </div>
            </div>
        `;
        songsContainer.appendChild(warningDiv);
    }
    
    songsToShow.forEach(song => {
        const songCard = document.createElement('div');
        
        // Adicionar classes para indicadores visuais
        let cardClasses = 'song-card';
        if (song.isYouTubeResult) cardClasses += ' youtube-result';
        if (song.isFallback) cardClasses += ' fallback-result';
        if (song.isOffline) cardClasses += ' offline';
        if (song.hasError) cardClasses += ' has-error';
        
        songCard.className = cardClasses;
        
        const isFavorite = favorites.includes(`${song.title} - ${song.artist}`);
        
        // Determinar qual badge mostrar
        let badgeHtml = '';
        if (song.isFallback) {
            badgeHtml = '<div class="fallback-badge">🔗 Link</div>';
        } else if (song.hasError) {
            badgeHtml = '<div class="error-badge">⚠️ Erro</div>';
        } else if (song.isOffline) {
            badgeHtml = '<div class="offline-badge">📱 Offline</div>';
        }
        
        songCard.innerHTML = `
            <div class="card-image-container">
                <img class="song-thumbnail" src="${song.thumbnail || KARAOKE_PLACEHOLDER}" alt="${song.title}" 
                     onerror="this.src='${KARAOKE_PLACEHOLDER}'">
                <div class="card-overlay">
                    <button class="card-play-btn">
                        <i class="fas ${song.isFallback ? 'fa-external-link-alt' : 'fa-play'}"></i>
                    </button>
                </div>
                ${badgeHtml}
            </div>
            <div class="song-info">
                <h3 class="song-title">${song.title}</h3>
                <p class="song-artist">${song.artist}</p>
                <span class="song-genre">${getGenreDisplayName(song.genre)}</span>
            </div>
            <div class="song-actions">
                <button class="btn-favorite ${isFavorite ? 'active' : ''}" 
                        onclick="toggleCardFavorite('${song.title}', '${song.artist}', this)"
                        ${song.isFallback ? 'style="opacity: 0.5; pointer-events: none;"' : ''}>
                    <i class="fas fa-heart"></i>
                </button>
                <button class="btn-play" onclick="playCardSong(${JSON.stringify(song).replace(/"/g, '&quot;')})">
                    <i class="fas ${song.isFallback ? 'fa-external-link-alt' : 'fa-play'}"></i>
                </button>
            </div>
        `;
        
        songCard.addEventListener('click', (e) => {
            if (!e.target.closest('.song-actions')) {
                if (song.isFallback) {
                    // Para resultados de fallback, abrir busca no YouTube e limpar a tela
                    const searchQuery = encodeURIComponent(song.fallbackQuery || song.title + ' karaoke');
                    window.open(`https://www.youtube.com/results?search_query=${searchQuery}`, '_blank');
                    
                    // Limpar busca e voltar ao estado original
                    clearSearchAndReturnToOriginal();
                } else {
                    openSongModal(song);
                }
            }
        });
        
        songsContainer.appendChild(songCard);
    });
}

function renderPagination() {
    const totalPages = Math.ceil(filteredSongs.length / songsPerPage);
    
    if (totalPages <= 1) {
        pagination.style.display = 'none';
        return;
    }
    
    pagination.style.display = 'flex';
    
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
    
    pageNumbers.innerHTML = '';
    
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
        pageBtn.addEventListener('click', () => changePage(i));
        pageNumbers.appendChild(pageBtn);
    }
}

function changePage(page) {
    const totalPages = Math.ceil(filteredSongs.length / songsPerPage);
    
    if (page < 1 || page > totalPages || page === currentPage) {
        return;
    }
    
    currentPage = page;
    renderSongs();
    renderPagination();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleView(view) {
    currentView = view;
    
    gridViewBtn.classList.toggle('active', view === 'grid');
    listViewBtn.classList.toggle('active', view === 'list');
    
    songsContainer.className = `songs-container ${view}-view`;
}

function selectRandomSong() {
    if (filteredSongs.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * filteredSongs.length);
    const randomSong = filteredSongs[randomIndex];
    openSongModal(randomSong);
}

function openSongModal(song) {
    document.getElementById('modalThumbnail').src = song.thumbnail || KARAOKE_PLACEHOLDER;
    document.getElementById('modalTitle').textContent = song.title;
    document.getElementById('modalArtist').textContent = song.artist;
    document.getElementById('modalGenre').textContent = getGenreDisplayName(song.genre);
    document.getElementById('modalDuration').textContent = song.duration || 'N/A';
    
    const isFavorite = favorites.includes(`${song.title} - ${song.artist}`);
    addToFavoritesBtn.innerHTML = `<i class="fas fa-heart"></i> ${isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}`;
    addToFavoritesBtn.className = `btn ${isFavorite ? 'btn-secondary' : 'btn-primary'}`;
    
    // Store current song data
    modal.currentSong = song;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModalHandler() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showAPIWarning() {
    const warningHTML = `
        <div class="api-warning">
            <div class="warning-content">
                <i class="fas fa-music"></i>
                <div class="warning-text">
                    <h4>🎤 Ops! Vamos cantar de outro jeito!</h4>
                    <p>🎵 Nosso sistema está descansando um pouquinho, mas não se preocupe!</p>
                    <p>🎶 Vamos buscar suas músicas favoritas diretamente no YouTube!</p>
                    <p>💡 <strong>Dica:</strong> Amanhã voltamos com tudo! Por enquanto, aproveite as opções diretas! 🎸</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', warningHTML);
    
    setTimeout(() => {
        const warning = document.querySelector('.api-warning');
        if (warning) {
            warning.remove();
        }
    }, 8000);
}

function playCurrentSong() {
    const song = modal.currentSong;
    if (song && song.directUrl) {
        window.open(song.directUrl, '_blank');
    } else if (song && song.videoId) {
        window.open(`https://www.youtube.com/watch?v=${song.videoId}`, '_blank');
    } else if (song && song.searchTerm) {
        // Use searchTerm para buscar no YouTube
        const searchQuery = encodeURIComponent(song.searchTerm);
        window.open(`https://www.youtube.com/results?search_query=${searchQuery}`, '_blank');
    } else {
        alert('Vídeo não disponível para esta música.');
    }
}

function toggleCardFavorite(title, artist, button) {
    const songKey = `${title} - ${artist}`;
    const index = favorites.indexOf(songKey);
    
    if (index > -1) {
        favorites.splice(index, 1);
        button.classList.remove('active');
    } else {
        favorites.push(songKey);
        button.classList.add('active');
    }
    
    // Salvar no Firebase primeiro
    saveFavoritesToFirebase(favorites);
    
    // Manter localStorage como backup
    localStorage.setItem('karaoke-favorites', JSON.stringify(favorites));
}

 async function playCardSong(song) {
    console.log('🎵 Tocando música otimizada:', song.title);
    
    // Verificar se é um resultado de fallback ou tem dados diretos
    if (song.isFallback) {
        // Para resultados de fallback, abrir busca no YouTube e limpar a tela
        const searchQuery = encodeURIComponent(song.fallbackQuery || song.title + ' karaoke');
        window.open(`https://www.youtube.com/results?search_query=${searchQuery}`, '_blank');
        
        // Limpar busca e voltar ao estado original
        clearSearchAndReturnToOriginal();
        return;
    }
    
    if (song.directUrl) {
        // Abrir link direto do YouTube em nova aba
        window.open(song.directUrl, '_blank');
        return;
    }
    
    if (song.videoId) {
        window.open(`https://www.youtube.com/watch?v=${song.videoId}`, '_blank');
        return;
    }
    
    try {
        // Usar o otimizador para buscar dados do vídeo (máximo 1 leitura)
        if (window.firebaseOptimizer) {
            const optimizedSong = await window.firebaseOptimizer.getSongForPlayback(song.title, song.artist);
            if (optimizedSong && optimizedSong.videoId) {
                console.log('✅ Dados do vídeo obtidos do cache otimizado');
                window.open(`https://www.youtube.com/watch?v=${optimizedSong.videoId}`, '_blank');
                return;
            }
        }
        
        // Fallback: buscar no YouTube se não estiver no cache
        console.log('🔍 Buscando no YouTube (fallback)...');
        const videoData = await searchYouTubeVideo(song.title, song.artist);
        if (videoData && videoData.videoId) {
            // Salvar no cache otimizado para próximas reproduções
            if (window.firebaseOptimizer) {
                await window.firebaseOptimizer.saveSongOptimized({
                    title: song.title,
                    artist: song.artist,
                    videoId: videoData.videoId,
                    thumbnailUrl: videoData.thumbnailUrl,
                    publishedAt: videoData.publishedAt
                });
            }
            window.open(`https://www.youtube.com/watch?v=${videoData.videoId}`, '_blank');
        } else {
            alert('Vídeo não disponível para esta música.');
        }
    } catch (error) {
        console.error('❌ Erro ao tocar música:', error);
        alert('Erro ao carregar o vídeo.');
    }
}

function toggleFavorite() {
    const song = modal.currentSong;
    if (!song) return;
    
    const songKey = `${song.title} - ${song.artist}`;
    const index = favorites.indexOf(songKey);
    
    if (index > -1) {
        favorites.splice(index, 1);
        addToFavoritesBtn.innerHTML = '<i class="fas fa-heart"></i> Adicionar aos Favoritos';
        addToFavoritesBtn.className = 'btn btn-primary';
    } else {
        favorites.push(songKey);
        addToFavoritesBtn.innerHTML = '<i class="fas fa-heart"></i> Remover dos Favoritos';
        addToFavoritesBtn.className = 'btn btn-secondary';
    }
    
    // Salvar no Firebase (permanente)
    saveFavoritesToFirebase(favorites);
    
    // Update the card if visible
    renderSongs();
}

function handleKeyboardShortcuts(e) {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModalHandler();
    }
    
    if (e.key === 'Enter' && document.activeElement === searchInput) {
        handleSearch();
    }
    
    if (e.key === 'r' && e.ctrlKey) {
        e.preventDefault();
        selectRandomSong();
    }
}

function getGenreDisplayName(genre) {
    const genreNames = {
        'sertanejo': 'Sertanejo',
        'mpb': 'MPB',
        'rock': 'Rock Brasileiro',
        'pagode': 'Pagode',
        'gospel': 'Gospel',
        'funk': 'Funk',
        'internacional': 'Internacional',
        'youtube': 'YouTube'
    };
    return genreNames[genre] || genre;
}



function showError(message) {
    songsContainer.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #ff6b6b; margin-bottom: 1rem;"></i>
            <h3>Ops! Algo deu errado</h3>
            <p>${message}</p>
            <button onclick="retryLoadSongs()" class="btn btn-primary">Tentar Novamente</button>
        </div>
    `;
}

function retryLoadSongs() {
    // Recarregar sem limpar cache (Firebase é permanente)
    loadSongs();
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Event listeners for modal buttons
document.addEventListener('DOMContentLoaded', function() {
    if (playKaraokeBtn) {
        playKaraokeBtn.addEventListener('click', playCurrentSong);
    }
    
    if (addToFavoritesBtn) {
        addToFavoritesBtn.addEventListener('click', toggleFavorite);
    }
});


function clearSearchAndReturnToOriginal() {
    // Limpar o campo de busca
    searchInput.value = '';
    
    // Resetar filtros para o estado original
    currentGenre = 'all';
    currentSort = 'alphabetical';
    currentPage = 1;
    
    // Atualizar botões de gênero
    genreButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.genre === 'all') {
            btn.classList.add('active');
        }
    });
    
    // Resetar select de ordenação
    sortSelect.value = 'alphabetical';
    
    // Recarregar as músicas originais do banco de dados
    loadSongs();
}

async function getFavoritesFromFirebase() {
    console.log('🔄 Carregando favoritos do Firebase...');
    
    return new Promise((resolve) => {
        const timeout = setTimeout(() => {
            console.log('⏰ Timeout na autenticação - usando favoritos locais');
            resolve([]);
        }, 5000);

        auth.onAuthStateChanged(async (user) => {
            clearTimeout(timeout);
            
            if (user) {
                try {
                    const favRef = db.collection('userPreferences').doc('favorites');
                    const doc = await favRef.get();
                    
                    if (doc.exists) {
                        const data = doc.data();
                        console.log('✅ Favoritos carregados do Firebase:', data.favorites?.length || 0);
                        resolve(data.favorites || []);
                    } else {
                        console.log('📝 Nenhum favorito encontrado no Firebase');
                        resolve([]);
                    }
                } catch (error) {
                    console.error('❌ Erro ao carregar favoritos do Firebase:', error);
                    resolve([]);
                }
            } else {
                console.log('👤 Usuário não autenticado - usando favoritos locais');
                resolve([]);
            }
        });
    });
}

async function updateSongWithVideoId(songId, videoData) {
    console.log(`💖 Salvando ${songId} com videoId...`);
    try {
        if (!auth.currentUser) {
            console.log('⏳ Aguardando autenticação para atualizar videoId...');
            await new Promise((resolve, reject) => {
                const timeout = setTimeout(() => {
                    reject(new Error('Timeout na autenticação'));
                }, 5000);
                
                const unsubscribe = auth.onAuthStateChanged((user) => {
                    if (user) {
                        clearTimeout(timeout);
                        unsubscribe();
                        resolve(user);
                    }
                });
            });
        }

        const songRef = db.collection('songs').doc(songId);
        await songRef.update({
            videoId: videoData.videoId,
            thumbnail: './THUMBNAIL.JPG',
            publishedAt: videoData.publishedAt,
            updatedAt: Date.now()
        });
        
        console.log(`✅ Música ${songId} atualizada com videoId: ${videoData.videoId}`);
        return true;
    } catch (error) {
        console.error(`❌ Erro ao atualizar música ${songId}:`, error);
        return false;
    }
}

async function enrichSongsWithVideoIds() {
    console.log('💖 Enriquecendo músicas com videoIds...');
    
    try {
        // Carregar músicas que não têm videoId
        const songsRef = db.collection('songs');
        const snapshot = await songsRef.where('videoId', '==', null).limit(50).get(); // Processar mais por vez
        
        if (snapshot.empty) {
            console.log('✅ Todas as músicas já possuem videoId!');
            return;
        }
        
        console.log(`🔄 Processando ${snapshot.size} músicas sem videoId...`);
        
        // Usar batch operations para atualizações
        const batch = db.batch();
        let processedCount = 0;
        
        for (const doc of snapshot.docs) {
            const songData = doc.data();
            const searchTerm = songData.searchTerm || `${songData.title} ${songData.artist} karaoke`;
            
            try {
                console.log(`🔍 Buscando videoId para: ${songData.title} - ${songData.artist}`);
                const videoData = await searchYouTubeVideo(searchTerm);
                
                if (videoData && videoData.videoId) {
                    // Adicionar ao batch ao invés de atualizar individualmente
                    batch.update(doc.ref, {
                        videoId: videoData.videoId,
                        thumbnail: './THUMBNAIL.JPG',
                        publishedAt: videoData.publishedAt,
                        updatedAt: Date.now()
                    });
                    processedCount++;
                    
                    // Delay para não sobrecarregar a API
                    await new Promise(resolve => setTimeout(resolve, 1000));
                } else {
                    console.log(`⚠️ VideoId não encontrado para: ${songData.title}`);
                }
            } catch (error) {
                console.error(`❌ Erro ao processar ${songData.title}:`, error);
            }
        }
        
        // Executar todas as atualizações em uma única operação batch
        if (processedCount > 0) {
            await batch.commit();
            console.log(`✅ ${processedCount} músicas atualizadas em batch!`);
        }
        
        console.log('✅ Enriquecimento concluído!');
    } catch (error) {
        console.error('❌ Erro no enriquecimento:', error);
    }
}

// Nova função para popular a coleção songs com videoIds
async function populateSongsWithVideoIds() {
    console.log('🎵 Iniciando população da coleção songs com videoIds...');
    
    try {
        const songsRef = db.collection('songs');
        const snapshot = await songsRef.get();
        
        if (snapshot.empty) {
            console.log('⚠️ Nenhuma música encontrada na coleção songs');
            return;
        }
        
        console.log(`📊 Total de músicas na coleção: ${snapshot.size}`);
        
        let processedCount = 0;
        let updatedCount = 0;
        
        for (const doc of snapshot.docs) {
            const songData = doc.data();
            
            // Pular se já tem videoId
            if (songData.videoId) {
                console.log(`✅ ${songData.title} já possui videoId: ${songData.videoId}`);
                processedCount++;
                continue;
            }
            
            const searchTerm = songData.searchTerm || `${songData.title} ${songData.artist} karaoke`;
            
            try {
                console.log(`🔍 Buscando videoId para: ${songData.title} - ${songData.artist}`);
                const videoData = await searchYouTubeVideo(searchTerm);
                
                if (videoData && videoData.videoId) {
                    // Preparar dados para atualização - apenas videoId
                    const updateData = {
                        videoId: videoData.videoId
                    };
                    
                    // Só adicionar publishedAt se não for undefined
                    if (videoData.publishedAt) {
                        updateData.publishedAt = videoData.publishedAt;
                    }
                    
                    await doc.ref.update(updateData);
                    
                    console.log(`✅ VideoId adicionado para ${songData.title}: ${videoData.videoId}`);
                    updatedCount++;
                    
                    // Delay para não sobrecarregar a API do YouTube
                    await new Promise(resolve => setTimeout(resolve, 1500));
                } else {
                    console.log(`⚠️ VideoId não encontrado para: ${songData.title}`);
                }
            } catch (error) {
                console.error(`❌ Erro ao processar ${songData.title}:`, error);
            }
            
            processedCount++;
            
            // Log de progresso a cada 10 músicas
            if (processedCount % 10 === 0) {
                console.log(`📈 Progresso: ${processedCount}/${snapshot.size} processadas, ${updatedCount} atualizadas`);
            }
        }
        
        console.log(`🎉 População concluída! ${updatedCount} músicas atualizadas de ${snapshot.size} total`);
        
    } catch (error) {
        console.error('❌ Erro na população:', error);
    }
}

async function saveSongsToFirebaseCache(songs) {
    console.log('💾 Salvando cache de músicas no Firebase...');
    
    return new Promise((resolve) => {
        const timeout = setTimeout(() => {
            console.log('⏰ Timeout na autenticação - cache não salvo');
            resolve();
        }, 5000);

        auth.onAuthStateChanged(async (user) => {
            clearTimeout(timeout);
            
            if (user) {
                try {
                    const cacheData = {
                        songs: songs,
                        timestamp: Date.now(),
                        totalSongs: songs.length
                    };

                    const cacheRef = db.collection('songsCache').doc('karaoke-songs');
                    await cacheRef.set(cacheData);
                    
                    console.log('✅ Cache de músicas salvo no Firebase com sucesso!');
                    resolve();
                } catch (error) {
                    console.error('❌ Erro ao salvar cache no Firebase:', error);
                    resolve();
                }
            } else {
                console.log('👤 Usuário não autenticado - cache não salvo');
                resolve();
            }
        });
    });
}

// Função para expandir banco de músicas
async function expandMusicDatabase() {
    try {
        // Abrir janela de população em lotes
        const popupWindow = window.open('batch-populate.html', 'expandMusic', 'width=1200,height=800,scrollbars=yes,resizable=yes');
        
        if (!popupWindow) {
            alert('Por favor, permita pop-ups para usar a função de expansão do banco de músicas.');
            return;
        }
        
        // Focar na nova janela
        popupWindow.focus();
        
    } catch (error) {
        console.error('❌ Erro ao abrir expansão do banco:', error);
        alert('Erro ao abrir a ferramenta de expansão. Tente novamente.');
    }
}