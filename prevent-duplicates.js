/**
 * 🚫 SISTEMA DE PREVENÇÃO DE DUPLICATAS
 * Funções para evitar músicas duplicadas durante a população
 */

// Função para normalizar strings para comparação
function normalizeString(str) {
    if (!str) return '';
    return str.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .replace(/[^\w\s]/g, '') // Remove pontuação
        .replace(/\s+/g, ' ') // Normaliza espaços
        .trim();
}

// Função para criar chave única baseada em título + artista
function createSongKey(title, artist) {
    const normalizedTitle = normalizeString(title);
    const normalizedArtist = normalizeString(artist);
    return `${normalizedTitle}|${normalizedArtist}`;
}

// Função para verificar se uma música já existe na coleção
// Função otimizada para verificar se música existe (usa cache)
async function songExists(db, title, artist) {
    try {
        // Verificar se o cache precisa ser atualizado
        if (!cacheLastUpdated || (Date.now() - cacheLastUpdated) > CACHE_DURATION) {
            await updateSongsCache(db);
        }
        
        const songKey = createSongKey(title, artist);
        
        // Buscar no cache primeiro
        if (songsCache.has(songKey)) {
            const cached = songsCache.get(songKey);
            console.log(`🔍 Duplicata encontrada no cache: "${title}" - "${artist}" (ID: ${cached.id})`);
            return { exists: true, docId: cached.id, data: cached.data };
        }
        
        return { exists: false };
    } catch (error) {
        console.error('❌ Erro ao verificar duplicata:', error);
        return { exists: false };
    }
}

// Função para inserir música apenas se não existir
async function insertSongIfNotExists(db, songData) {
    try {
        const { title, artist } = songData;
        
        if (!title || !artist) {
            console.log('⚠️ Música ignorada - título ou artista em branco');
            return { inserted: false, reason: 'missing_data' };
        }
        
        // Verificar se já existe
        const existsResult = await songExists(db, title, artist);
        
        if (existsResult.exists) {
            console.log(`⏭️ Música já existe: "${title}" - "${artist}"`);
            return { 
                inserted: false, 
                reason: 'duplicate', 
                existingId: existsResult.docId 
            };
        }
        
        // Inserir nova música
        const songsRef = db.collection('songs');
        const docRef = await songsRef.add({
            ...songData,
            createdAt: new Date().toISOString(),
            source: 'deduplication_system'
        });
        
        console.log(`✅ Nova música inserida: "${title}" - "${artist}" (ID: ${docRef.id})`);
        return { 
            inserted: true, 
            docId: docRef.id 
        };
        
    } catch (error) {
        console.error('❌ Erro ao inserir música:', error);
        return { inserted: false, reason: 'error', error: error.message };
    }
}

// Função para processar lista de músicas com verificação de duplicatas
async function insertSongsWithDeduplication(db, songs, onProgress = null) {
    console.log(`🎵 Iniciando inserção de ${songs.length} músicas com verificação de duplicatas...`);
    
    const results = {
        total: songs.length,
        inserted: 0,
        duplicates: 0,
        errors: 0,
        skipped: 0
    };
    
    for (let i = 0; i < songs.length; i++) {
        const song = songs[i];
        const result = await insertSongIfNotExists(db, song);
        
        if (result.inserted) {
            results.inserted++;
        } else if (result.reason === 'duplicate') {
            results.duplicates++;
        } else if (result.reason === 'error') {
            results.errors++;
        } else {
            results.skipped++;
        }
        
        // Callback de progresso
        if (onProgress) {
            onProgress({
                current: i + 1,
                total: songs.length,
                results: { ...results }
            });
        }
        
        // Log de progresso a cada 50 músicas
        if ((i + 1) % 50 === 0) {
            console.log(`📈 Progresso: ${i + 1}/${songs.length} - Inseridas: ${results.inserted}, Duplicatas: ${results.duplicates}`);
        }
        
        // Pequeno delay para não sobrecarregar o Firebase
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('🎉 Inserção concluída!');
    console.log(`📊 Resultados finais:`, results);
    
    return results;
}

// Função para limpar duplicatas existentes (manter apenas a primeira ocorrência)
async function removeDuplicatesFromCollection(db, onProgress = null) {
    console.log('🧹 Iniciando limpeza de duplicatas na coleção songs...');
    
    try {
        const songsRef = db.collection('songs');
        const snapshot = await songsRef.get();
        
        if (snapshot.empty) {
            console.log('⚠️ Nenhuma música encontrada na coleção');
            return { removed: 0, kept: 0 };
        }
        
        const songMap = new Map();
        const duplicatesToRemove = [];
        
        // Agrupar músicas por chave única
        snapshot.docs.forEach(doc => {
            const songData = doc.data();
            const songKey = createSongKey(songData.title, songData.artist);
            
            if (songMap.has(songKey)) {
                // Duplicata encontrada - marcar para remoção
                duplicatesToRemove.push({
                    id: doc.id,
                    title: songData.title,
                    artist: songData.artist
                });
            } else {
                // Primeira ocorrência - manter
                songMap.set(songKey, {
                    id: doc.id,
                    title: songData.title,
                    artist: songData.artist
                });
            }
        });
        
        console.log(`📊 Encontradas ${duplicatesToRemove.length} duplicatas para remover`);
        
        // Remover duplicatas em lotes
        const batchSize = 10;
        let removedCount = 0;
        
        for (let i = 0; i < duplicatesToRemove.length; i += batchSize) {
            const batch = db.batch();
            const currentBatch = duplicatesToRemove.slice(i, i + batchSize);
            
            currentBatch.forEach(duplicate => {
                const docRef = songsRef.doc(duplicate.id);
                batch.delete(docRef);
                console.log(`🗑️ Removendo duplicata: "${duplicate.title}" - "${duplicate.artist}"`);
            });
            
            await batch.commit();
            removedCount += currentBatch.length;
            
            if (onProgress) {
                onProgress({
                    current: removedCount,
                    total: duplicatesToRemove.length
                });
            }
            
            console.log(`📈 Progresso: ${removedCount}/${duplicatesToRemove.length} duplicatas removidas`);
        }
        
        const results = {
            removed: removedCount,
            kept: songMap.size
        };
        
        console.log('🎉 Limpeza de duplicatas concluída!');
        console.log(`📊 Resultados: ${results.removed} removidas, ${results.kept} mantidas`);
        
        return results;
        
    } catch (error) {
        console.error('❌ Erro na limpeza de duplicatas:', error);
        throw error;
    }
}

// Exportar funções (se usando módulos)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        normalizeString,
        createSongKey,
        songExists,
        insertSongIfNotExists,
        insertSongsWithDeduplication,
        removeDuplicatesFromCollection
    };
}


// Função para calcular similaridade entre strings (algoritmo Levenshtein simplificado)
function calculateSimilarity(str1, str2) {
    if (!str1 || !str2) return 0;
    
    const normalized1 = normalizeString(str1);
    const normalized2 = normalizeString(str2);
    
    if (normalized1 === normalized2) return 1;
    
    const maxLength = Math.max(normalized1.length, normalized2.length);
    if (maxLength === 0) return 1;
    
    const distance = levenshteinDistance(normalized1, normalized2);
    return (maxLength - distance) / maxLength;
}

// Algoritmo de distância de Levenshtein
function levenshteinDistance(str1, str2) {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    
    return matrix[str2.length][str1.length];
}

// Cache para otimizar verificações de duplicatas
let songsCache = new Map();
let cacheLastUpdated = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

// Função para atualizar o cache de músicas
async function updateSongsCache(db) {
    try {
        console.log('🔄 Atualizando cache de músicas...');
        const songsRef = db.collection('songs');
        const snapshot = await songsRef.get();
        
        songsCache.clear();
        
        snapshot.docs.forEach(doc => {
            const songData = doc.data();
            const songKey = createSongKey(songData.title, songData.artist);
            
            // Armazenar por chave normalizada
            songsCache.set(songKey, {
                id: doc.id,
                data: songData
            });
            
            // Armazenar por videoId se existir
            if (songData.videoId) {
                songsCache.set(`video_${songData.videoId}`, {
                    id: doc.id,
                    data: songData
                });
            }
        });
        
        cacheLastUpdated = Date.now();
        console.log(`✅ Cache atualizado com ${songsCache.size} entradas`);
        
    } catch (error) {
        console.error('❌ Erro ao atualizar cache:', error);
    }
}

// Função expandida para verificar duplicatas (otimizada com cache)
async function songExistsAdvanced(db, title, artist, videoId = null) {
    try {
        // Verificar se o cache precisa ser atualizado
        if (!cacheLastUpdated || (Date.now() - cacheLastUpdated) > CACHE_DURATION) {
            await updateSongsCache(db);
        }
        
        const songKey = createSongKey(title, artist);
        
        // 1. Verificação exata por título + artista (usando cache)
        if (songsCache.has(songKey)) {
            const cached = songsCache.get(songKey);
            console.log(`🔍 Duplicata exata encontrada (cache): "${title}" - "${artist}" (ID: ${cached.id})`);
            return { exists: true, docId: cached.id, data: cached.data, reason: 'exact_match' };
        }
        
        // 2. Verificação por videoId (usando cache)
        if (videoId && songsCache.has(`video_${videoId}`)) {
            const cached = songsCache.get(`video_${videoId}`);
            console.log(`🔍 Duplicata por videoId encontrada (cache): "${title}" - videoId: ${videoId} (ID: ${cached.id})`);
            return { exists: true, docId: cached.id, data: cached.data, reason: 'video_id_match' };
        }
        
        // 3. Verificação por similaridade (apenas se não encontrou exata)
        for (const [key, cached] of songsCache) {
            if (key.startsWith('video_')) continue; // Pular entradas de videoId
            
            const songData = cached.data;
            const titleSimilarity = calculateSimilarity(title, songData.title);
            const artistSimilarity = calculateSimilarity(artist, songData.artist);
            
            if (titleSimilarity > 0.85 && artistSimilarity > 0.85) {
                console.log(`🔍 Duplicata por similaridade encontrada: "${title}" vs "${songData.title}" (${Math.round(titleSimilarity * 100)}% similar) (ID: ${cached.id})`);
                return { exists: true, docId: cached.id, data: songData, reason: 'similarity_match', similarity: { title: titleSimilarity, artist: artistSimilarity } };
            }
        }
        
        return { exists: false };
    } catch (error) {
        console.error('❌ Erro ao verificar duplicata avançada:', error);
        return { exists: false };
    }
}

// Função para forçar atualização do cache
async function refreshSongsCache(db) {
    cacheLastUpdated = null;
    await updateSongsCache(db);
}

// Função para extrair título e artista de títulos de vídeos do YouTube
function parseVideoTitle(videoTitle) {
    if (!videoTitle) return { title: '', artist: '' };
    
    // Remover indicadores de karaoke
    let cleanTitle = videoTitle
        .replace(/\(karaoke\)/gi, '')
        .replace(/\[karaoke\]/gi, '')
        .replace(/karaoke/gi, '')
        .replace(/instrumental/gi, '')
        .replace(/playback/gi, '')
        .trim();
    
    // Padrões comuns de separação artista - título
    const patterns = [
        /^(.+?)\s*[-–—]\s*(.+)$/,  // "Artista - Título"
        /^(.+?)\s*[|]\s*(.+)$/,    // "Artista | Título"
        /^(.+?)\s*[:]\s*(.+)$/,    // "Artista: Título"
        /^(.+?)\s+by\s+(.+)$/i,    // "Título by Artista"
        /^(.+?)\s*\(\s*(.+?)\s*\)$/, // "Título (Artista)"
    ];
    
    for (const pattern of patterns) {
        const match = cleanTitle.match(pattern);
        if (match) {
            // Para "by" o artista vem depois
            if (pattern.source.includes('by')) {
                return {
                    title: match[1].trim(),
                    artist: match[2].trim()
                };
            }
            // Para outros padrões, artista vem primeiro
            return {
                title: match[2].trim(),
                artist: match[1].trim()
            };
        }
    }
    
    // Se não encontrou padrão, tentar dividir por palavras
    const words = cleanTitle.split(/\s+/);
    if (words.length >= 2) {
        // Assumir que as primeiras palavras são o artista
        const midPoint = Math.ceil(words.length / 2);
        return {
            artist: words.slice(0, midPoint).join(' '),
            title: words.slice(midPoint).join(' ')
        };
    }
    
    // Fallback: título completo como título, artista vazio
    return {
        title: cleanTitle,
        artist: 'Artista Desconhecido'
    };
}