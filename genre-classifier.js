// SISTEMA DE CLASSIFICAÇÃO AUTOMÁTICA DE GÊNEROS MUSICAIS
// Este arquivo contém a lógica para classificar automaticamente gêneros baseado em artistas

/**
 * 🎵 MAPEAMENTO DE ARTISTAS PARA GÊNEROS
 * Base de dados de artistas conhecidos e seus respectivos gêneros
 */
const ARTIST_GENRE_MAP = {
    // === SERTANEJO ===
    'Bruno e Marrone': 'sertanejo',
    'Chitãozinho e Xororó': 'sertanejo', 
    'Chitãozinho & Xororó': 'sertanejo',
    'Zezé Di Camargo e Luciano': 'sertanejo',
    'Zezé Di Camargo & Luciano': 'sertanejo',
    'Luan Santana': 'sertanejo',
    'Michel Teló': 'sertanejo',
    'Gusttavo Lima': 'sertanejo',
    'Henrique & Juliano': 'sertanejo',
    'Henrique e Juliano': 'sertanejo',
    'Marília Mendonça': 'sertanejo',
    'Almir Sater': 'sertanejo',
    'Matheus & Kauan': 'sertanejo',
    'Matheus e Kauan': 'sertanejo',
    'Léo Magalhães': 'sertanejo',
    'Zé Neto & Cristiano': 'sertanejo',
    'Zé Neto e Cristiano': 'sertanejo',
    'Gabriel Diniz': 'sertanejo',
    'Fernando & Sorocaba': 'sertanejo',
    'Fernando e Sorocaba': 'sertanejo',
    'Jorge & Mateus': 'sertanejo',
    'Jorge e Mateus': 'sertanejo',
    'Maiara & Maraisa': 'sertanejo',
    'Maiara e Maraisa': 'sertanejo',
    'Simone & Simaria': 'sertanejo',
    'Simone e Simaria': 'sertanejo',

    // === MPB ===
    'Elis Regina': 'mpb',
    'Chico Buarque': 'mpb',
    'Toquinho': 'mpb',
    'Tom Jobim': 'mpb',
    'Jorge Ben Jor': 'mpb',
    'Dorival Caymmi': 'mpb',
    'Milton Nascimento': 'mpb',
    'Marisa Monte': 'mpb',
    'Luiz Gonzaga': 'mpb',
    'Pixinguinha': 'mpb',
    'Caetano Veloso': 'mpb',
    'Gilberto Gil': 'mpb',
    'Maria Bethânia': 'mpb',
    'Gal Costa': 'mpb',
    'Djavan': 'mpb',

    // === ROCK NACIONAL ===
    'Legião Urbana': 'rock',
    'Barão Vermelho': 'rock',
    'Lulu Santos': 'rock',
    'Cazuza': 'rock',
    'Geraldo Vandré': 'rock',
    'Skank': 'rock',
    'Capital Inicial': 'rock',
    'Titãs': 'rock',
    'Engenheiros do Hawaii': 'rock',
    'Paralamas do Sucesso': 'rock',
    'Kid Abelha': 'rock',
    'Ultraje a Rigor': 'rock',
    'RPM': 'rock',
    'Ira!': 'rock',

    // === PAGODE ===
    'Zeca Pagodinho': 'pagode',
    'Péricles': 'pagode',
    'Exaltasamba': 'pagode',
    'Arlindo Cruz': 'pagode',
    'Luiz Carlos da Vila': 'pagode',
    'Sorriso Maroto': 'pagode',
    'Thiaguinho': 'pagode',
    'Naldo': 'pagode',
    'Grupo Revelação': 'pagode',
    'Grupo Fundo de Quintal': 'pagode',
    'Jorge Aragão': 'pagode',
    'Bezerra da Silva': 'pagode',
    'Raça Negra': 'pagode',
    'Art Popular': 'pagode',
    'Soweto': 'pagode',

    // === GOSPEL ===
    'Aline Barros': 'gospel',
    'Fernandinho': 'gospel',
    'Kleber Lucas': 'gospel',
    'Gabriela Rocha': 'gospel',
    'Thalles Roberto': 'gospel',
    'Cassiane': 'gospel',
    'Diante do Trono': 'gospel',
    'Anderson Freire': 'gospel',
    'Bruna Karla': 'gospel',
    'Damares': 'gospel',
    'Eyshila': 'gospel',
    'Ludmila Ferber': 'gospel',
    'Ministério Apascentar de Louvor': 'gospel',
    'Renascer Praise': 'gospel',

    // === FUNK ===
    'MC João': 'funk',
    'MC Fioti': 'funk',
    'MC Créu': 'funk',
    'MC Loma': 'funk',
    'Psirico': 'funk',
    'MC Kevinho': 'funk',
    'Anitta': 'funk',
    'Valesca Popozuda': 'funk',
    'Os Barões da Pisadinha': 'funk',
    'MC Zaac': 'funk',
    'MC Davi': 'funk',
    'MC Livinho': 'funk',
    'MC Pedrinho': 'funk',
    'MC Hariel': 'funk',
    'MC Don Juan': 'funk',

    // === POP NACIONAL ===
    'Vitor Kley': 'pop',
    'Zé Felipe': 'pop',
    'Joelma': 'pop',
    'Ivete Sangalo': 'pop',
    'Claudia Leitte': 'pop',
    'Daniela Mercury': 'pop',
    'Sandy': 'pop',
    'Junior': 'pop',
    'Sandy & Junior': 'pop',
    'Sandy e Junior': 'pop',
    'Rouge': 'pop',
    'Kelly Key': 'pop',

    // === INTERNACIONAL ===
    // Rock Clássico Internacional
    'Queen': 'internacional',
    'The Beatles': 'internacional',
    'Led Zeppelin': 'internacional',
    'Pink Floyd': 'internacional',
    'The Rolling Stones': 'internacional',
    'AC/DC': 'internacional',
    'Guns N\' Roses': 'internacional',
    'Metallica': 'internacional',
    'Iron Maiden': 'internacional',
    'Black Sabbath': 'internacional',
    'Deep Purple': 'internacional',
    'The Who': 'internacional',
    'Eagles': 'internacional',
    'Fleetwood Mac': 'internacional',
    'Journey': 'internacional',
    'Bon Jovi': 'internacional',
    'Aerosmith': 'internacional',
    'U2': 'internacional',
    'Coldplay': 'internacional',
    'Radiohead': 'internacional',
    'Nirvana': 'internacional',
    'Pearl Jam': 'internacional',
    'Red Hot Chili Peppers': 'internacional',
    'Foo Fighters': 'internacional',
    'Green Day': 'internacional',
    'Linkin Park': 'internacional',
    'Oasis': 'internacional',
    'The Killers': 'internacional',
    'Arctic Monkeys': 'internacional',
    'Muse': 'internacional',

    // Pop Internacional Clássico
    'Michael Jackson': 'internacional',
    'Madonna': 'internacional',
    'Whitney Houston': 'internacional',
    'Celine Dion': 'internacional',
    'Mariah Carey': 'internacional',
    'Elton John': 'internacional',
    'George Michael': 'internacional',
    'Phil Collins': 'internacional',
    'Stevie Wonder': 'internacional',
    'Diana Ross': 'internacional',
    'Tina Turner': 'internacional',
    'Cher': 'internacional',
    'Barbra Streisand': 'internacional',
    'Frank Sinatra': 'internacional',
    'Elvis Presley': 'internacional',
    'John Lennon': 'internacional',
    'Paul McCartney': 'internacional',
    'David Bowie': 'internacional',
    'Prince': 'internacional',
    'Lionel Richie': 'internacional',

    // Pop Internacional Moderno
    'Ed Sheeran': 'internacional',
    'Adele': 'internacional',
    'Taylor Swift': 'internacional',
    'Bruno Mars': 'internacional',
    'Justin Bieber': 'internacional',
    'Justin Timberlake': 'internacional',
    'Rihanna': 'internacional',
    'Beyoncé': 'internacional',
    'Lady Gaga': 'internacional',
    'Katy Perry': 'internacional',
    'Ariana Grande': 'internacional',
    'Dua Lipa': 'internacional',
    'The Weeknd': 'internacional',
    'Sam Smith': 'internacional',
    'John Legend': 'internacional',
    'Alicia Keys': 'internacional',
    'Christina Aguilera': 'internacional',
    'Britney Spears': 'internacional',
    'Pink': 'internacional',
    'Shakira': 'internacional',
    'Jennifer Lopez': 'internacional',
    'Usher': 'internacional',
    'Chris Brown': 'internacional',
    'Jason Mraz': 'internacional',
    'John Mayer': 'internacional',
    'Shawn Mendes': 'internacional',
    'Camila Cabello': 'internacional',
    'Billie Eilish': 'internacional',
    'Olivia Rodrigo': 'internacional',
    'Harry Styles': 'internacional',
    'Doja Cat': 'internacional',

    // R&B e Soul Internacional
    'Amy Winehouse': 'internacional',
    'Lauryn Hill': 'internacional',
    'Erykah Badu': 'internacional',
    'D\'Angelo': 'internacional',
    'Maxwell': 'internacional',
    'Sade': 'internacional',
    'Seal': 'internacional',
    'Boyz II Men': 'internacional',
    'TLC': 'internacional',
    'Destiny\'s Child': 'internacional',

    // Hip-Hop Internacional
    'Eminem': 'internacional',
    'Jay-Z': 'internacional',
    'Kanye West': 'internacional',
    'Drake': 'internacional',
    '50 Cent': 'internacional',
    'Snoop Dogg': 'internacional',
    'Dr. Dre': 'internacional',
    'Tupac': 'internacional',
    'The Notorious B.I.G.': 'internacional',
    'Nas': 'internacional',
    'Kendrick Lamar': 'internacional',
    'J. Cole': 'internacional',
    'Nicki Minaj': 'internacional',
    'Cardi B': 'internacional',
    'Megan Thee Stallion': 'internacional',

    // Música Latina Internacional
    'Luis Fonsi': 'internacional',
    'Daddy Yankee': 'internacional',
    'Bad Bunny': 'internacional',
    'J Balvin': 'internacional',
    'Maluma': 'internacional',
    'Ozuna': 'internacional',
    'Karol G': 'internacional',
    'Rosalía': 'internacional',
    'Jesse & Joy': 'internacional',
    'Manu Chao': 'internacional',
    'Manu Chao': 'internacional',
    'Julieta Venegas': 'internacional',
    'Natalia Lafourcade': 'internacional',
    'Mon Laferte': 'internacional',
    'Álvaro Soler': 'internacional',
    'Enrique Iglesias': 'internacional',
    'Ricky Martin': 'internacional',
    'Marc Anthony': 'internacional',
    'Gloria Estefan': 'internacional',
    'Selena': 'internacional',

    // Eletrônica Internacional
    'Daft Punk': 'internacional',
    'Calvin Harris': 'internacional',
    'David Guetta': 'internacional',
    'Avicii': 'internacional',
    'Swedish House Mafia': 'internacional',
    'Skrillex': 'internacional',
    'Deadmau5': 'internacional',
    'Tiësto': 'internacional',
    'Armin van Buuren': 'internacional',
    'Martin Garrix': 'internacional',
    'The Chainsmokers': 'internacional',
    'Marshmello': 'internacional',
    'Zedd': 'internacional',
    'Diplo': 'internacional',
    'Major Lazer': 'internacional',

    // Indie e Alternativo Internacional
    'Imagine Dragons': 'internacional',
    'OneRepublic': 'internacional',
    'Maroon 5': 'internacional',
    'The Lumineers': 'internacional',
    'Of Monsters and Men': 'internacional',
    'Foster the People': 'internacional',
    'MGMT': 'internacional',
    'Vampire Weekend': 'internacional',
    'Tame Impala': 'internacional',
    'Glass Animals': 'internacional',
    'Alt-J': 'internacional',
    'Two Door Cinema Club': 'internacional',
    'Phoenix': 'internacional',
    'Arcade Fire': 'internacional',
    'The Strokes': 'internacional',

    // Country Internacional
    'Taylor Swift': 'internacional', // Também country
    'Carrie Underwood': 'internacional',
    'Keith Urban': 'internacional',
    'Blake Shelton': 'internacional',
    'Kenny Chesney': 'internacional',
    'Tim McGraw': 'internacional',
    'Faith Hill': 'internacional',
    'Shania Twain': 'internacional',
    'Dolly Parton': 'internacional',
    'Johnny Cash': 'internacional',

    // Jazz e Blues Internacional
    'Norah Jones': 'internacional',
    'Diana Krall': 'internacional',
    'Michael Bublé': 'internacional',
    'Tony Bennett': 'internacional',
    'Ella Fitzgerald': 'internacional',
    'Louis Armstrong': 'internacional',
    'Miles Davis': 'internacional',
    'John Coltrane': 'internacional',
    'B.B. King': 'internacional',
    'Eric Clapton': 'internacional',

    // Bandas e Grupos Diversos
    'Backstreet Boys': 'internacional',
    'NSYNC': 'internacional',
    'Spice Girls': 'internacional',
    'ABBA': 'internacional',
    'Bee Gees': 'internacional',
    'The Carpenters': 'internacional',
    'Simon & Garfunkel': 'internacional',
    'Hall & Oates': 'internacional',
    'Duran Duran': 'internacional',
    'Depeche Mode': 'internacional',
    'New Order': 'internacional',
    'The Cure': 'internacional',
    'Tears for Fears': 'internacional',
    'Wham!': 'internacional',
    'Culture Club': 'internacional'
};

/**
 * 🎯 PALAVRAS-CHAVE PARA CLASSIFICAÇÃO AUTOMÁTICA
 * Quando não encontrar o artista no mapa, usa palavras-chave do título
 */
const GENRE_KEYWORDS = {
    'sertanejo': [
        'sertanejo', 'modão', 'caipira', 'universitário', 'raiz', 'sofrência',
        'piseiro', 'arrocha', 'forró', 'xote', 'baião', 'vanera'
    ],
    'mpb': [
        'mpb', 'bossa nova', 'samba', 'choro', 'tropicália', 'jovem guarda',
        'música popular brasileira', 'brasil', 'brasileiro', 'brasileira'
    ],
    'funk': [
        'funk', 'baile funk', 'funk carioca', 'montagem', 'putaria',
        'proibidão', 'ostentação', 'melody', 'funk melody'
    ],
    'rock': [
        'rock', 'metal', 'punk', 'grunge', 'alternativo', 'indie rock',
        'hard rock', 'heavy metal', 'progressive', 'classic rock'
    ],
    'pagode': [
        'pagode', 'samba', 'partido alto', 'roda de samba', 'cavaquinho',
        'pandeiro', 'surdo', 'tamborim', 'cuíca'
    ],
    'gospel': [
        'gospel', 'cristã', 'evangélica', 'louvor', 'adoração', 'hino',
        'jesus', 'deus', 'cristo', 'senhor', 'aleluia', 'hosana'
    ],
    'internacional': [
        // Pop Internacional
        'pop', 'dance', 'disco', 'electronic', 'edm', 'house', 'techno',
        'dubstep', 'trap', 'hip hop', 'rap', 'r&b', 'soul', 'blues', 'jazz',
        'country', 'folk', 'indie', 'alternative', 'grunge', 'punk',
        'reggae', 'ska', 'latin', 'reggaeton', 'salsa', 'bachata', 'merengue',
        
        // Palavras em inglês comuns
        'love', 'heart', 'baby', 'girl', 'boy', 'night', 'day', 'time',
        'life', 'world', 'dream', 'fire', 'light', 'dark', 'heaven', 'hell',
        'angel', 'devil', 'star', 'moon', 'sun', 'rain', 'storm', 'wind',
        'ocean', 'river', 'mountain', 'road', 'home', 'away', 'forever',
        'never', 'always', 'tonight', 'yesterday', 'tomorrow', 'memory',
        'feeling', 'emotion', 'passion', 'desire', 'freedom', 'power',
        'magic', 'miracle', 'destiny', 'future', 'past', 'present',
        
        // Expressões em inglês
        'i love you', 'my heart', 'in the night', 'all night long',
        'dancing queen', 'rock and roll', 'shake it off', 'let it go',
        'don\'t stop', 'can\'t stop', 'hold on', 'let me', 'take me',
        'show me', 'tell me', 'give me', 'make me', 'break me',
        'save me', 'help me', 'kiss me', 'touch me', 'hold me',
        'love me', 'need me', 'want me', 'miss me', 'leave me',
        
        // Palavras em espanhol
        'amor', 'corazón', 'vida', 'noche', 'día', 'tiempo', 'mundo',
        'sueño', 'fuego', 'luz', 'cielo', 'tierra', 'mar', 'sol', 'luna',
        'estrella', 'casa', 'camino', 'siempre', 'nunca', 'todo', 'nada',
        'mi amor', 'te amo', 'mi vida', 'mi corazón', 'para siempre',
        'despacito', 'gasolina', 'bailando', 'vivir', 'sentir', 'amar',
        
        // Artistas/bandas claramente internacionais
        'featuring', 'feat', 'ft', 'remix', 'acoustic', 'live', 'version',
        'radio edit', 'extended', 'club mix', 'original mix'
    ]
};

/**
 * 🔍 FUNÇÃO PRINCIPAL DE CLASSIFICAÇÃO
 * Classifica automaticamente o gênero baseado no artista e título
 */
function classifyGenre(artist, title = '') {
    if (!artist) {
        return {
            genre: 'outros',
            confidence: 0,
            method: 'default',
            details: 'Artista não fornecido'
        };
    }
    
    // Normalizar nome do artista
    const normalizedArtist = normalizeArtistName(artist);
    
    // 1. Buscar no mapeamento direto de artistas (normalizar chaves também)
    for (const [mappedArtist, genre] of Object.entries(ARTIST_GENRE_MAP)) {
        if (normalizeArtistName(mappedArtist) === normalizedArtist) {
            return {
                genre: genre,
                confidence: 95,
                method: 'artist_direct_match',
                details: `Artista encontrado no mapeamento: ${mappedArtist}`
            };
        }
    }
    
    // 2. Buscar variações do nome do artista
    const artistVariations = generateArtistVariations(normalizedArtist);
    for (const variation of artistVariations) {
        if (ARTIST_GENRE_MAP[variation]) {
            return {
                genre: ARTIST_GENRE_MAP[variation],
                confidence: 85,
                method: 'artist_variation_match',
                details: `Variação encontrada: ${variation}`
            };
        }
    }
    
    // 3. Classificar por palavras-chave no título
    const keywordResult = classifyByKeywords(title);
    if (keywordResult.genre !== 'outros') {
        return keywordResult;
    }
    
    // 4. Classificar por padrões do artista
    const patternResult = classifyByArtistPatterns(normalizedArtist);
    if (patternResult.genre !== 'outros') {
        return patternResult;
    }
    
    // 5. Retorno padrão
    return {
        genre: 'outros',
        confidence: 0,
        method: 'no_match',
        details: 'Nenhum padrão identificado'
    };
}

/**
 * 🔧 NORMALIZAR NOME DO ARTISTA
 * Remove acentos, converte para minúsculas e padroniza
 */
function normalizeArtistName(artist) {
    return artist
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
}

/**
 * 🔄 GERAR VARIAÇÕES DO NOME DO ARTISTA
 * Cria variações comuns (& vs e, feat., etc.)
 */
function generateArtistVariations(artist) {
    const variations = [artist];
    
    // Trocar & por e
    if (artist.includes('&')) {
        variations.push(artist.replace(/&/g, 'e'));
    }
    
    // Trocar e por &
    if (artist.includes(' e ')) {
        variations.push(artist.replace(/ e /g, ' & '));
    }
    
    // Remover feat., ft., featuring
    const featRegex = /\s*(feat\.|ft\.|featuring)\s*.*/i;
    if (featRegex.test(artist)) {
        variations.push(artist.replace(featRegex, '').trim());
    }
    
    return variations;
}

/**
 * 🔍 CLASSIFICAR POR PALAVRAS-CHAVE
 * Analisa o título da música em busca de palavras-chave
 */
function classifyByKeywords(title) {
    if (!title) {
        return {
            genre: 'outros',
            confidence: 0,
            method: 'no_title',
            details: 'Título não fornecido'
        };
    }
    
    const normalizedTitle = title.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
    
    for (const [genre, keywords] of Object.entries(GENRE_KEYWORDS)) {
        for (const keyword of keywords) {
            if (normalizedTitle.includes(keyword.toLowerCase())) {
                return {
                    genre: genre,
                    confidence: 60,
                    method: 'keyword_match',
                    details: `Palavra-chave encontrada: "${keyword}"`
                };
            }
        }
    }
    
    return {
        genre: 'outros',
        confidence: 0,
        method: 'no_keyword_match',
        details: 'Nenhuma palavra-chave encontrada'
    };
}

/**
 * 🎨 CLASSIFICAR POR PADRÕES DO ARTISTA
 * Identifica padrões comuns nos nomes dos artistas
 */
function classifyByArtistPatterns(artist) {
    if (!artist) {
        return {
            genre: 'outros',
            confidence: 0,
            method: 'no_artist',
            details: 'Artista não fornecido'
        };
    }
    
    const lowerArtist = artist.toLowerCase();
    
    // Padrões de MC (Funk)
    if (lowerArtist.startsWith('mc ')) {
        return {
            genre: 'funk',
            confidence: 40,
            method: 'artist_pattern',
            details: 'Padrão MC detectado'
        };
    }
    
    // Padrões de duplas sertanejas
    if (lowerArtist.includes(' & ') || lowerArtist.includes(' e ')) {
        // Verificar se não é pagode (grupos como "Grupo Revelação")
        if (!lowerArtist.includes('grupo')) {
            return {
                genre: 'sertanejo',
                confidence: 40,
                method: 'artist_pattern',
                details: 'Padrão de dupla sertaneja detectado'
            };
        }
    }
    
    // Padrões de grupos de pagode
    if (lowerArtist.includes('grupo ') || lowerArtist.includes('raca ')) {
        return {
            genre: 'pagode',
            confidence: 40,
            method: 'artist_pattern',
            details: 'Padrão de grupo de pagode detectado'
        };
    }
    
    return {
        genre: 'outros',
        confidence: 0,
        method: 'no_pattern_match',
        details: 'Nenhum padrão de artista identificado'
    };
}

/**
 * 📊 CORRIGIR GÊNEROS EM LOTE
 * Função para corrigir gêneros de múltiplas músicas
 */
function correctGenresInBatch(songs) {
    const corrections = [];
    
    for (const song of songs) {
        const currentGenre = song.genre || 'outros';
        const suggestedGenre = classifyGenre(song.artist, song.title);
        
        if (currentGenre !== suggestedGenre) {
            corrections.push({
                id: song.id,
                title: song.title,
                artist: song.artist,
                currentGenre: currentGenre,
                suggestedGenre: suggestedGenre,
                confidence: calculateConfidence(song.artist, song.title, suggestedGenre)
            });
        }
    }
    
    return corrections;
}

/**
 * 🎯 CALCULAR CONFIANÇA DA CLASSIFICAÇÃO
 * Retorna um score de confiança (0-100) para a classificação
 */
function calculateConfidence(artist, title, suggestedGenre) {
    let confidence = 0;
    
    // Alta confiança se artista está no mapeamento direto
    if (ARTIST_GENRE_MAP[normalizeArtistName(artist)]) {
        confidence = 95;
    }
    // Média confiança se encontrou por variação do artista
    else if (generateArtistVariations(normalizeArtistName(artist)).some(v => ARTIST_GENRE_MAP[v])) {
        confidence = 85;
    }
    // Baixa confiança se classificou por palavras-chave
    else if (classifyByKeywords(title) === suggestedGenre) {
        confidence = 60;
    }
    // Muito baixa confiança se classificou por padrão do artista
    else if (classifyByArtistPattern(normalizeArtistName(artist)) === suggestedGenre) {
        confidence = 40;
    }
    
    return confidence;
}

/**
 * 📈 ESTATÍSTICAS DE GÊNEROS
 * Gera estatísticas dos gêneros encontrados
 */
function generateGenreStats(songs) {
    const stats = {};
    
    for (const song of songs) {
        const genre = song.genre || 'outros';
        stats[genre] = (stats[genre] || 0) + 1;
    }
    
    return Object.entries(stats)
        .sort(([,a], [,b]) => b - a)
        .map(([genre, count]) => ({ genre, count }));
}

// Exportar funções para uso em outros arquivos
if (typeof module !== 'undefined' && module.exports) {
    // Node.js
    module.exports = {
        classifyGenre,
        correctGenresInBatch,
        calculateConfidence,
        generateGenreStats,
        ARTIST_GENRE_MAP,
        GENRE_KEYWORDS
    };
} else {
    // Browser - tornar funções globais
    window.classifyGenre = classifyGenre;
    window.correctGenresInBatch = correctGenresInBatch;
    window.calculateConfidence = calculateConfidence;
    window.generateGenreStats = generateGenreStats;
    window.ARTIST_GENRE_MAP = ARTIST_GENRE_MAP;
    window.GENRE_KEYWORDS = GENRE_KEYWORDS;
}