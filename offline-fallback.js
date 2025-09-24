// Sistema de Fallback Offline para reduzir uso do Firebase
// Este sistema mantém dados locais quando o Firebase não está disponível

class OfflineFallback {
    constructor() {
        this.OFFLINE_STORAGE_KEY = 'karaoke_offline_data';
        this.OFFLINE_FAVORITES_KEY = 'karaoke_offline_favorites';
        this.CONNECTION_CHECK_INTERVAL = 300000; // 5 minutos (reduzido de 30s)
        this.isOnline = navigator.onLine;
        this.firebaseAvailable = true;
        
        this.initializeOfflineSystem();
    }

    initializeOfflineSystem() {
        // Monitorar status de conexão
        window.addEventListener('online', () => {
            this.isOnline = true;
            console.log('🌐 Conexão restaurada - sincronizando dados offline');
            this.syncOfflineData();
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            console.log('📴 Modo offline ativado');
        });

        // REMOVIDO: Verificação periódica desnecessária do Firebase
        // Como as músicas são permanentes, não precisamos verificar constantemente
        // setInterval(() => {
        //     this.checkFirebaseAvailability();
        // }, this.CONNECTION_CHECK_INTERVAL);
    }

    async checkFirebaseAvailability() {
        try {
            // Tentar uma operação simples no Firebase
            if (typeof db !== 'undefined') {
                await db.collection('songs').limit(1).get();
                if (!this.firebaseAvailable) {
                    console.log('🔥 Firebase disponível novamente');
                    this.firebaseAvailable = true;
                    this.syncOfflineData();
                }
            }
        } catch (error) {
            if (this.firebaseAvailable) {
                console.log('⚠️ Firebase indisponível - ativando modo offline');
                this.firebaseAvailable = false;
            }
        }
    }

    // Salvar dados localmente quando Firebase não está disponível
    saveOfflineData(key, data) {
        try {
            const offlineData = this.getOfflineData();
            offlineData[key] = {
                data: data,
                timestamp: Date.now(),
                synced: false
            };
            localStorage.setItem(this.OFFLINE_STORAGE_KEY, JSON.stringify(offlineData));
            console.log(`💾 Dados salvos offline: ${key}`);
        } catch (error) {
            console.error('Erro ao salvar dados offline:', error);
        }
    }

    // Recuperar dados offline
    getOfflineData() {
        try {
            const data = localStorage.getItem(this.OFFLINE_STORAGE_KEY);
            return data ? JSON.parse(data) : {};
        } catch (error) {
            console.error('Erro ao recuperar dados offline:', error);
            return {};
        }
    }

    // Salvar favoritos offline
    saveFavoritesOffline(favorites) {
        try {
            const offlineFavorites = {
                favorites: favorites,
                timestamp: Date.now(),
                synced: false
            };
            localStorage.setItem(this.OFFLINE_FAVORITES_KEY, JSON.stringify(offlineFavorites));
            console.log('💾 Favoritos salvos offline');
        } catch (error) {
            console.error('Erro ao salvar favoritos offline:', error);
        }
    }

    // Recuperar favoritos offline
    getFavoritesOffline() {
        try {
            const data = localStorage.getItem(this.OFFLINE_FAVORITES_KEY);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Erro ao recuperar favoritos offline:', error);
            return null;
        }
    }

    // Sincronizar dados offline quando a conexão for restaurada
    async syncOfflineData() {
        if (!this.isOnline || !this.firebaseAvailable) {
            return;
        }

        try {
            // Sincronizar dados gerais
            const offlineData = this.getOfflineData();
            for (const [key, item] of Object.entries(offlineData)) {
                if (!item.synced) {
                    console.log(`🔄 Sincronizando dados offline: ${key}`);
                    // Aqui você pode implementar a lógica específica de sincronização
                    // Por exemplo, salvar no Firebase
                    item.synced = true;
                }
            }
            localStorage.setItem(this.OFFLINE_STORAGE_KEY, JSON.stringify(offlineData));

            // Sincronizar favoritos
            const offlineFavorites = this.getFavoritesOffline();
            if (offlineFavorites && !offlineFavorites.synced) {
                console.log('🔄 Sincronizando favoritos offline');
                // Implementar sincronização de favoritos com Firebase
                if (typeof saveFavoritesToFirebase === 'function') {
                    await saveFavoritesToFirebase(offlineFavorites.favorites);
                    offlineFavorites.synced = true;
                    localStorage.setItem(this.OFFLINE_FAVORITES_KEY, JSON.stringify(offlineFavorites));
                }
            }

            console.log('✅ Sincronização offline concluída');
        } catch (error) {
            console.error('Erro na sincronização offline:', error);
        }
    }

    // Verificar se deve usar modo offline
    shouldUseOfflineMode() {
        return !this.isOnline || !this.firebaseAvailable;
    }

    // Wrapper para operações do Firebase com fallback offline
    async executeWithFallback(firebaseOperation, offlineKey, offlineData = null) {
        if (this.shouldUseOfflineMode()) {
            console.log(`📴 Usando modo offline para: ${offlineKey}`);
            if (offlineData) {
                this.saveOfflineData(offlineKey, offlineData);
            }
            return this.getOfflineData()[offlineKey]?.data || null;
        }

        try {
            const result = await firebaseOperation();
            return result;
        } catch (error) {
            console.warn(`⚠️ Erro no Firebase, usando fallback offline: ${error.message}`);
            this.firebaseAvailable = false;
            
            if (offlineData) {
                this.saveOfflineData(offlineKey, offlineData);
            }
            return this.getOfflineData()[offlineKey]?.data || null;
        }
    }

    // Limpar dados offline antigos (mais de 7 dias)
    cleanOldOfflineData() {
        try {
            const offlineData = this.getOfflineData();
            const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
            
            let cleaned = false;
            for (const [key, item] of Object.entries(offlineData)) {
                if (item.timestamp < sevenDaysAgo) {
                    delete offlineData[key];
                    cleaned = true;
                }
            }
            
            if (cleaned) {
                localStorage.setItem(this.OFFLINE_STORAGE_KEY, JSON.stringify(offlineData));
                console.log('🧹 Dados offline antigos removidos');
            }
        } catch (error) {
            console.error('Erro ao limpar dados offline:', error);
        }
    }

    // Obter estatísticas do modo offline
    getOfflineStats() {
        const offlineData = this.getOfflineData();
        const offlineFavorites = this.getFavoritesOffline();
        
        return {
            isOnline: this.isOnline,
            firebaseAvailable: this.firebaseAvailable,
            offlineDataCount: Object.keys(offlineData).length,
            hasFavoritesOffline: !!offlineFavorites,
            unsyncedItems: Object.values(offlineData).filter(item => !item.synced).length
        };
    }
}

// Inicializar sistema de fallback offline
const offlineFallback = new OfflineFallback();

// Limpar dados antigos na inicialização
offlineFallback.cleanOldOfflineData();

console.log('📴 Sistema de fallback offline inicializado');