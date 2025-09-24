// Firebase Optimizer - Sistema de otimização para reduzir consumo de cota
// Implementa cache inteligente, batch operations e validação de vídeos karaokê

class FirebaseOptimizer {
    constructor() {
        this.cache = new Map();
        this.cacheTimestamps = new Map();
        this.CACHE_DURATION = 10 * 60 * 1000; // 10 minutos
        this.BATCH_SIZE = 500; // Limite do Firestore
        this.pendingOperations = [];
        this.batchTimer = null;
    }

    // Sistema de cache inteligente
    getCachedData(key) {
        const timestamp = this.cacheTimestamps.get(key);
        if (timestamp && (Date.now() - timestamp) < this.CACHE_DURATION) {
            return this.cache.get(key);
        }
        return null;
    }

    setCachedData(key, data) {
        this.cache.set(key, data);
        this.cacheTimestamps.set(key, Date.now());
    }

    // Validação de vídeos karaokê
    isKaraokeVideo(videoData) {
        if (!videoData || !videoData.title) return false;
        
        const title = videoData.title.toLowerCase();
        const description = (videoData.description || '').toLowerCase();
        
        // Palavras-chave positivas para karaokê
        const karaokeKeywords = [
            'karaoke', 'playback', 'instrumental', 'backing track',
            'sing along', 'cover', 'versão instrumental', 'base musical'
        ];
        
        // Palavras-chave negativas (não karaokê)
        const nonKaraokeKeywords = [
            'live', 'ao vivo', 'concert', 'show', 'performance',
            'official video', 'music video', 'clipe oficial'
        ];
        
        // Verificar se contém palavras karaokê
        const hasKaraokeKeywords = karaokeKeywords.some(keyword => 
            title.includes(keyword) || description.includes(keyword)
        );
        
        // Verificar se NÃO contém palavras não-karaokê
        const hasNonKaraokeKeywords = nonKaraokeKeywords.some(keyword => 
            title.includes(keyword) || description.includes(keyword)
        );
        
        return hasKaraokeKeywords && !hasNonKaraokeKeywords;
    }

    // Função wrapper para validação de karaokê (compatibilidade)
    validateKaraokeVideo(title, description) {
        return this.isKaraokeVideo({ title, description });
    }

    // Batch operations para reduzir operações individuais
    addToBatch(operation) {
        this.pendingOperations.push(operation);
        
        // Auto-executar batch quando atingir o limite ou após timeout
        if (this.pendingOperations.length >= this.BATCH_SIZE) {
            this.executeBatch();
        } else if (!this.batchTimer) {
            this.batchTimer = setTimeout(() => this.executeBatch(), 5000); // 5 segundos
        }
    }

    async executeBatch() {
        if (this.pendingOperations.length === 0) return;
        
        const batch = db.batch();
        const operations = [...this.pendingOperations];
        this.pendingOperations = [];
        
        if (this.batchTimer) {
            clearTimeout(this.batchTimer);
            this.batchTimer = null;
        }
        
        try {
            operations.forEach(operation => {
                switch (operation.type) {
                    case 'add':
                        const docRef = db.collection(operation.collection).doc();
                        batch.set(docRef, operation.data);
                        break;
                    case 'update':
                        batch.update(operation.ref, operation.data);
                        break;
                    case 'delete':
                        batch.delete(operation.ref);
                        break;
                }
            });
            
            await batch.commit();
            console.log(`✅ Batch executado: ${operations.length} operações`);
            
        } catch (error) {
            console.error('❌ Erro no batch:', error);
            // Re-adicionar operações falhadas para retry
            this.pendingOperations.unshift(...operations);
        }
    }

    // Otimização de consultas com cache
    async getOptimizedCollection(collectionName, useCache = true) {
        const cacheKey = `collection_${collectionName}`;
        
        if (useCache) {
            const cached = this.getCachedData(cacheKey);
            if (cached) {
                console.log(`📦 Usando cache para ${collectionName}`);
                return cached;
            }
        }
        
        try {
            const snapshot = await db.collection(collectionName).get();
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            this.setCachedData(cacheKey, data);
            console.log(`🔄 Carregado do Firebase: ${collectionName} (${data.length} itens)`);
            
            return data;
        } catch (error) {
            console.error(`❌ Erro ao carregar ${collectionName}:`, error);
            return [];
        }
    }

    // Sistema de fallback offline
    getOfflineFallback(key) {
        try {
            const stored = localStorage.getItem(`offline_${key}`);
            return stored ? JSON.parse(stored) : null;
        } catch (error) {
            console.error('❌ Erro ao acessar fallback offline:', error);
            return null;
        }
    }

    setOfflineFallback(key, data) {
        try {
            localStorage.setItem(`offline_${key}`, JSON.stringify(data));
        } catch (error) {
            console.error('❌ Erro ao salvar fallback offline:', error);
        }
    }

    // Limpeza de cache
    clearExpiredCache() {
        const now = Date.now();
        for (const [key, timestamp] of this.cacheTimestamps.entries()) {
            if ((now - timestamp) > this.CACHE_DURATION) {
                this.cache.delete(key);
                this.cacheTimestamps.delete(key);
            }
        }
    }

    // Estatísticas de uso
    getStats() {
        return {
            cacheSize: this.cache.size,
            pendingOperations: this.pendingOperations.length,
            cacheHitRate: this.calculateCacheHitRate()
        };
    }

    calculateCacheHitRate() {
        // Implementar lógica de cálculo de hit rate se necessário
        return 0;
    }
}

// Instância global do otimizador
window.firebaseOptimizer = new FirebaseOptimizer();

// REMOVIDO: Limpeza automática de cache desnecessária
// As músicas são permanentes no banco, não precisam de verificação constante
// setInterval(() => {
//     window.firebaseOptimizer.clearExpiredCache();
// }, 30 * 60 * 1000);

console.log('🚀 Firebase Optimizer carregado! (Cache permanente ativado)');