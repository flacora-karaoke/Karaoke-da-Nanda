// BANCO EXPANDIDO DE MÚSICAS - SISTEMA DE POPULAÇÃO CONTROLADA
// Este arquivo contém centenas de músicas diferentes das que já existem no banco atual

const EXPANDED_MUSIC_DATABASE = [
    // === POP NACIONAL EXPANDIDO ===
    { title: "Coração Cigano", artist: "Luan Santana", genre: "Pop Nacional", searchTerm: "Coração Cigano Luan Santana" },
    { title: "Meteoro", artist: "Luan Santana", genre: "Pop Nacional", searchTerm: "Meteoro Luan Santana" },
    { title: "Chuva de Arroz", artist: "Luan Santana", genre: "Pop Nacional", searchTerm: "Chuva de Arroz Luan Santana" },
    { title: "Garotas Não Merecem Chorar", artist: "Luan Santana", genre: "Pop Nacional", searchTerm: "Garotas Não Merecem Chorar Luan Santana" },
    { title: "Escreve Aí", artist: "Luan Santana", genre: "Pop Nacional", searchTerm: "Escreve Aí Luan Santana" },
    
    { title: "Morena", artist: "Vitor Kley", genre: "Pop Nacional", searchTerm: "Morena Vitor Kley" },
    { title: "Farol", artist: "Vitor Kley", genre: "Pop Nacional", searchTerm: "Farol Vitor Kley" },
    { title: "Adrenalina", artist: "Vitor Kley", genre: "Pop Nacional", searchTerm: "Adrenalina Vitor Kley" },
    { title: "Pupila", artist: "Vitor Kley", genre: "Pop Nacional", searchTerm: "Pupila Vitor Kley" },
    { title: "Bicicleta", artist: "Vitor Kley", genre: "Pop Nacional", searchTerm: "Bicicleta Vitor Kley" },
    
    { title: "Coração Gelado", artist: "Zé Felipe", genre: "Pop Nacional", searchTerm: "Coração Gelado Zé Felipe" },
    { title: "Senta Danada", artist: "Zé Felipe", genre: "Pop Nacional", searchTerm: "Senta Danada Zé Felipe" },
    { title: "Malokera", artist: "Zé Felipe", genre: "Pop Nacional", searchTerm: "Malokera Zé Felipe" },
    { title: "Virgínia", artist: "Zé Felipe", genre: "Pop Nacional", searchTerm: "Virgínia Zé Felipe" },
    { title: "Felicidade", artist: "Zé Felipe", genre: "Pop Nacional", searchTerm: "Felicidade Zé Felipe" },

    // === SERTANEJO EXPANDIDO ===
    { title: "Facas", artist: "Bruno e Marrone", genre: "Sertanejo", searchTerm: "Facas Bruno e Marrone" },
    { title: "Choram as Rosas", artist: "Bruno e Marrone", genre: "Sertanejo", searchTerm: "Choram as Rosas Bruno e Marrone" },
    { title: "Ligação Urbana", artist: "Bruno e Marrone", genre: "Sertanejo", searchTerm: "Ligação Urbana Bruno e Marrone" },
    { title: "Amor de Ping Pong", artist: "Bruno e Marrone", genre: "Sertanejo", searchTerm: "Amor de Ping Pong Bruno e Marrone" },
    { title: "Será", artist: "Bruno e Marrone", genre: "Sertanejo", searchTerm: "Será Bruno e Marrone" },
    
    { title: "Evidências", artist: "Chitãozinho e Xororó", genre: "Sertanejo", searchTerm: "Evidências Chitãozinho e Xororó" },
    { title: "Fio de Cabelo", artist: "Chitãozinho e Xororó", genre: "Sertanejo", searchTerm: "Fio de Cabelo Chitãozinho e Xororó" },
    { title: "Sinônimos", artist: "Chitãozinho e Xororó", genre: "Sertanejo", searchTerm: "Sinônimos Chitãozinho e Xororó" },
    { title: "Página de Amigos", artist: "Chitãozinho e Xororó", genre: "Sertanejo", searchTerm: "Página de Amigos Chitãozinho e Xororó" },
    { title: "Cowboy do Asfalto", artist: "Chitãozinho e Xororó", genre: "Sertanejo", searchTerm: "Cowboy do Asfalto Chitãozinho e Xororó" },
    
    { title: "Coração Bobo", artist: "Zezé Di Camargo e Luciano", genre: "Sertanejo", searchTerm: "Coração Bobo Zezé Di Camargo e Luciano" },
    { title: "Pra Não Pensar em Você", artist: "Zezé Di Camargo e Luciano", genre: "Sertanejo", searchTerm: "Pra Não Pensar em Você Zezé Di Camargo e Luciano" },
    { title: "Teorias", artist: "Zezé Di Camargo e Luciano", genre: "Sertanejo", searchTerm: "Teorias Zezé Di Camargo e Luciano" },
    { title: "Dois Corações", artist: "Zezé Di Camargo e Luciano", genre: "Sertanejo", searchTerm: "Dois Corações Zezé Di Camargo e Luciano" },
    { title: "Flores em Vida", artist: "Zezé Di Camargo e Luciano", genre: "Sertanejo", searchTerm: "Flores em Vida Zezé Di Camargo e Luciano" },

    // === FUNK EXPANDIDO ===
    { title: "Baile de Favela", artist: "MC João", genre: "Funk", searchTerm: "Baile de Favela MC João" },
    { title: "Aquecimento da Penha", artist: "MC João", genre: "Funk", searchTerm: "Aquecimento da Penha MC João" },
    { title: "Mundo da Ostentação", artist: "MC João", genre: "Funk", searchTerm: "Mundo da Ostentação MC João" },
    { title: "Vou Jogar pra Geral", artist: "MC João", genre: "Funk", searchTerm: "Vou Jogar pra Geral MC João" },
    { title: "Baile do Helipa", artist: "MC João", genre: "Funk", searchTerm: "Baile do Helipa MC João" },
    
    { title: "Créu", artist: "MC Créu", genre: "Funk", searchTerm: "Créu MC Créu" },
    { title: "Dança do Créu", artist: "MC Créu", genre: "Funk", searchTerm: "Dança do Créu MC Créu" },
    { title: "Tá Tranquilo, Tá Favorável", artist: "MC Bin Laden", genre: "Funk", searchTerm: "Tá Tranquilo, Tá Favorável MC Bin Laden" },
    { title: "Bololo Haha", artist: "MC Bin Laden", genre: "Funk", searchTerm: "Bololo Haha MC Bin Laden" },
    { title: "Passinho do Romano", artist: "MC Livinho", genre: "Funk", searchTerm: "Passinho do Romano MC Livinho" },

    // === ROCK NACIONAL EXPANDIDO ===
    { title: "Pais e Filhos", artist: "Legião Urbana", genre: "Rock Nacional", searchTerm: "Pais e Filhos Legião Urbana" },
    { title: "Será", artist: "Legião Urbana", genre: "Rock Nacional", searchTerm: "Será Legião Urbana" },
    { title: "Faroeste Caboclo", artist: "Legião Urbana", genre: "Rock Nacional", searchTerm: "Faroeste Caboclo Legião Urbana" },
    { title: "Índios", artist: "Legião Urbana", genre: "Rock Nacional", searchTerm: "Índios Legião Urbana" },
    { title: "Geração Coca-Cola", artist: "Legião Urbana", genre: "Rock Nacional", searchTerm: "Geração Coca-Cola Legião Urbana" },
    
    { title: "Ideologia", artist: "Cazuza", genre: "Rock Nacional", searchTerm: "Ideologia Cazuza" },
    { title: "Brasil", artist: "Cazuza", genre: "Rock Nacional", searchTerm: "Brasil Cazuza" },
    { title: "Codinome Beija-Flor", artist: "Cazuza", genre: "Rock Nacional", searchTerm: "Codinome Beija-Flor Cazuza" },
    { title: "Preciso Dizer Que Te Amo", artist: "Cazuza", genre: "Rock Nacional", searchTerm: "Preciso Dizer Que Te Amo Cazuza" },
    { title: "Pro Dia Nascer Feliz", artist: "Cazuza", genre: "Rock Nacional", searchTerm: "Pro Dia Nascer Feliz Cazuza" },
    
    { title: "Comida", artist: "Titãs", genre: "Rock Nacional", searchTerm: "Comida Titãs" },
    { title: "Epitáfio", artist: "Titãs", genre: "Rock Nacional", searchTerm: "Epitáfio Titãs" },
    { title: "Flores", artist: "Titãs", genre: "Rock Nacional", searchTerm: "Flores Titãs" },
    { title: "Sonífera Ilha", artist: "Titãs", genre: "Rock Nacional", searchTerm: "Sonífera Ilha Titãs" },
    { title: "Polícia", artist: "Titãs", genre: "Rock Nacional", searchTerm: "Polícia Titãs" },

    // === MPB EXPANDIDO ===
    { title: "Águas de Março", artist: "Elis Regina", genre: "MPB", searchTerm: "Águas de Março Elis Regina" },
    { title: "Como Nossos Pais", artist: "Elis Regina", genre: "MPB", searchTerm: "Como Nossos Pais Elis Regina" },
    { title: "Atrás da Porta", artist: "Elis Regina", genre: "MPB", searchTerm: "Atrás da Porta Elis Regina" },
    { title: "Madalena", artist: "Elis Regina", genre: "MPB", searchTerm: "Madalena Elis Regina" },
    { title: "Fascinação", artist: "Elis Regina", genre: "MPB", searchTerm: "Fascinação Elis Regina" },
    
    { title: "Construção", artist: "Chico Buarque", genre: "MPB", searchTerm: "Construção Chico Buarque" },
    { title: "Apesar de Você", artist: "Chico Buarque", genre: "MPB", searchTerm: "Apesar de Você Chico Buarque" },
    { title: "Roda Viva", artist: "Chico Buarque", genre: "MPB", searchTerm: "Roda Viva Chico Buarque" },
    { title: "Cálice", artist: "Chico Buarque", genre: "MPB", searchTerm: "Cálice Chico Buarque" },
    { title: "Cotidiano", artist: "Chico Buarque", genre: "MPB", searchTerm: "Cotidiano Chico Buarque" },
    
    { title: "Aquarela", artist: "Toquinho", genre: "MPB", searchTerm: "Aquarela Toquinho" },
    { title: "Tarde em Itapoã", artist: "Toquinho", genre: "MPB", searchTerm: "Tarde em Itapoã Toquinho" },
    { title: "Samba da Benção", artist: "Toquinho", genre: "MPB", searchTerm: "Samba da Benção Toquinho" },
    { title: "Que Maravilha", artist: "Toquinho", genre: "MPB", searchTerm: "Que Maravilha Toquinho" },
    { title: "Acuarela", artist: "Toquinho", genre: "MPB", searchTerm: "Acuarela Toquinho" },

    // === PAGODE EXPANDIDO ===
    { title: "Deixa a Vida Me Levar", artist: "Zeca Pagodinho", genre: "Pagode", searchTerm: "Deixa a Vida Me Levar Zeca Pagodinho" },
    { title: "Lá Vem a Baiana", artist: "Zeca Pagodinho", genre: "Pagode", searchTerm: "Lá Vem a Baiana Zeca Pagodinho" },
    { title: "Verdade", artist: "Zeca Pagodinho", genre: "Pagode", searchTerm: "Verdade Zeca Pagodinho" },
    { title: "Camarão que Dorme a Onda Leva", artist: "Zeca Pagodinho", genre: "Pagode", searchTerm: "Camarão que Dorme a Onda Leva Zeca Pagodinho" },
    { title: "Quando a Gira Girou", artist: "Zeca Pagodinho", genre: "Pagode", searchTerm: "Quando a Gira Girou Zeca Pagodinho" },
    
    { title: "Coração em Desalinho", artist: "Grupo Revelação", genre: "Pagode", searchTerm: "Coração em Desalinho Grupo Revelação" },
    { title: "Deixa Acontecer", artist: "Grupo Revelação", genre: "Pagode", searchTerm: "Deixa Acontecer Grupo Revelação" },
    { title: "Tá Escrito", artist: "Grupo Revelação", genre: "Pagode", searchTerm: "Tá Escrito Grupo Revelação" },
    { title: "Velocidade da Luz", artist: "Grupo Revelação", genre: "Pagode", searchTerm: "Velocidade da Luz Grupo Revelação" },
    { title: "Grades do Coração", artist: "Grupo Revelação", genre: "Pagode", searchTerm: "Grades do Coração Grupo Revelação" },
    
    { title: "Amor de Chocolate", artist: "Negritude Jr", genre: "Pagode", searchTerm: "Amor de Chocolate Negritude Jr" },
    { title: "Beijo Gelado", artist: "Negritude Jr", genre: "Pagode", searchTerm: "Beijo Gelado Negritude Jr" },
    { title: "Tanajura", artist: "Negritude Jr", genre: "Pagode", searchTerm: "Tanajura Negritude Jr" },
    { title: "Jeito de Seduzir", artist: "Negritude Jr", genre: "Pagode", searchTerm: "Jeito de Seduzir Negritude Jr" },
    { title: "Você Vai Ver", artist: "Negritude Jr", genre: "Pagode", searchTerm: "Você Vai Ver Negritude Jr" },

    // === GOSPEL EXPANDIDO ===
    { title: "Deus Cuida de Mim", artist: "Kleber Lucas", genre: "Gospel", searchTerm: "Deus Cuida de Mim Kleber Lucas" },
    { title: "Aos Pés da Cruz", artist: "Kleber Lucas", genre: "Gospel", searchTerm: "Aos Pés da Cruz Kleber Lucas" },
    { title: "Mais que Amigos", artist: "Kleber Lucas", genre: "Gospel", searchTerm: "Mais que Amigos Kleber Lucas" },
    { title: "Deus Tem o Melhor", artist: "Kleber Lucas", genre: "Gospel", searchTerm: "Deus Tem o Melhor Kleber Lucas" },
    { title: "Comunhão", artist: "Kleber Lucas", genre: "Gospel", searchTerm: "Comunhão Kleber Lucas" },
    
    { title: "Vaso Novo", artist: "Cassiane", genre: "Gospel", searchTerm: "Vaso Novo Cassiane" },
    { title: "Todo Poderoso", artist: "Cassiane", genre: "Gospel", searchTerm: "Todo Poderoso Cassiane" },
    { title: "A Ele a Glória", artist: "Cassiane", genre: "Gospel", searchTerm: "A Ele a Glória Cassiane" },
    { title: "Amigo Espírito Santo", artist: "Cassiane", genre: "Gospel", searchTerm: "Amigo Espírito Santo Cassiane" },
    { title: "Com Cristo é Vencer", artist: "Cassiane", genre: "Gospel", searchTerm: "Com Cristo é Vencer Cassiane" },
    
    { title: "Deus Está Aqui", artist: "Thalles Roberto", genre: "Gospel", searchTerm: "Deus Está Aqui Thalles Roberto" },
    { title: "Arde Outra Vez", artist: "Thalles Roberto", genre: "Gospel", searchTerm: "Arde Outra Vez Thalles Roberto" },
    { title: "Porque Ele Vive", artist: "Thalles Roberto", genre: "Gospel", searchTerm: "Porque Ele Vive Thalles Roberto" },
    { title: "Casa do Pai", artist: "Thalles Roberto", genre: "Gospel", searchTerm: "Casa do Pai Thalles Roberto" },
    { title: "Filho Amado", artist: "Thalles Roberto", genre: "Gospel", searchTerm: "Filho Amado Thalles Roberto" },

    // === INTERNACIONAL EXPANDIDO ===
    { title: "Shape of You", artist: "Ed Sheeran", genre: "Internacional", searchTerm: "Shape of You Ed Sheeran" },
    { title: "Perfect", artist: "Ed Sheeran", genre: "Internacional", searchTerm: "Perfect Ed Sheeran" },
    { title: "Thinking Out Loud", artist: "Ed Sheeran", genre: "Internacional", searchTerm: "Thinking Out Loud Ed Sheeran" },
    { title: "Photograph", artist: "Ed Sheeran", genre: "Internacional", searchTerm: "Photograph Ed Sheeran" },
    { title: "Castle on the Hill", artist: "Ed Sheeran", genre: "Internacional", searchTerm: "Castle on the Hill Ed Sheeran" },
    
    { title: "Blinding Lights", artist: "The Weeknd", genre: "Internacional", searchTerm: "Blinding Lights The Weeknd" },
    { title: "Can't Feel My Face", artist: "The Weeknd", genre: "Internacional", searchTerm: "Can't Feel My Face The Weeknd" },
    { title: "Starboy", artist: "The Weeknd", genre: "Internacional", searchTerm: "Starboy The Weeknd" },
    { title: "The Hills", artist: "The Weeknd", genre: "Internacional", searchTerm: "The Hills The Weeknd" },
    { title: "Earned It", artist: "The Weeknd", genre: "Internacional", searchTerm: "Earned It The Weeknd" },
    
    { title: "Watermelon Sugar", artist: "Harry Styles", genre: "Internacional", searchTerm: "Watermelon Sugar Harry Styles" },
    { title: "Adore You", artist: "Harry Styles", genre: "Internacional", searchTerm: "Adore You Harry Styles" },
    { title: "Golden", artist: "Harry Styles", genre: "Internacional", searchTerm: "Golden Harry Styles" },
    { title: "Sign of the Times", artist: "Harry Styles", genre: "Internacional", searchTerm: "Sign of the Times Harry Styles" },
    { title: "As It Was", artist: "Harry Styles", genre: "Internacional", searchTerm: "As It Was Harry Styles" },

    // === MAIS SERTANEJO UNIVERSITÁRIO ===
    { title: "Largado às Traças", artist: "Zé Neto e Cristiano", genre: "Sertanejo", searchTerm: "Largado às Traças Zé Neto e Cristiano" },
    { title: "Ferida Curada", artist: "Zé Neto e Cristiano", genre: "Sertanejo", searchTerm: "Ferida Curada Zé Neto e Cristiano" },
    { title: "Mulher Maravilha", artist: "Zé Neto e Cristiano", genre: "Sertanejo", searchTerm: "Mulher Maravilha Zé Neto e Cristiano" },
    { title: "Deu Moral", artist: "Zé Neto e Cristiano", genre: "Sertanejo", searchTerm: "Deu Moral Zé Neto e Cristiano" },
    { title: "Estado Decadente", artist: "Zé Neto e Cristiano", genre: "Sertanejo", searchTerm: "Estado Decadente Zé Neto e Cristiano" },
    
    { title: "Meu Coração Pede Carona", artist: "Henrique e Juliano", genre: "Sertanejo", searchTerm: "Meu Coração Pede Carona Henrique e Juliano" },
    { title: "Flor e o Beija-Flor", artist: "Henrique e Juliano", genre: "Sertanejo", searchTerm: "Flor e o Beija-Flor Henrique e Juliano" },
    { title: "Cuida Bem Dela", artist: "Henrique e Juliano", genre: "Sertanejo", searchTerm: "Cuida Bem Dela Henrique e Juliano" },
    { title: "Vidinha de Balada", artist: "Henrique e Juliano", genre: "Sertanejo", searchTerm: "Vidinha de Balada Henrique e Juliano" },
    { title: "Até Você Voltar", artist: "Henrique e Juliano", genre: "Sertanejo", searchTerm: "Até Você Voltar Henrique e Juliano" },

    // === MAIS POP NACIONAL ===
    { title: "Coração", artist: "Maluma", genre: "Pop Nacional", searchTerm: "Coração Maluma" },
    { title: "11 e Pouco", artist: "Maluma", genre: "Pop Nacional", searchTerm: "11 e Pouco Maluma" },
    { title: "Felices los 4", artist: "Maluma", genre: "Pop Nacional", searchTerm: "Felices los 4 Maluma" },
    { title: "Chantaje", artist: "Shakira ft Maluma", genre: "Pop Nacional", searchTerm: "Chantaje Shakira Maluma" },
    { title: "Sobrio", artist: "Maluma", genre: "Pop Nacional", searchTerm: "Sobrio Maluma" },
    
    { title: "Despacito", artist: "Luis Fonsi ft Daddy Yankee", genre: "Internacional", searchTerm: "Despacito Luis Fonsi Daddy Yankee" },
    { title: "Mi Gente", artist: "J Balvin", genre: "Internacional", searchTerm: "Mi Gente J Balvin" },
    { title: "Con Altura", artist: "Rosalía ft J Balvin", genre: "Internacional", searchTerm: "Con Altura Rosalía J Balvin" },
    { title: "Reggaetón", artist: "J Balvin", genre: "Internacional", searchTerm: "Reggaetón J Balvin" },
    { title: "Que Tire Pa Lante", artist: "Daddy Yankee", genre: "Internacional", searchTerm: "Que Tire Pa Lante Daddy Yankee" },

    // === MAIS ROCK NACIONAL ===
    { title: "Tempo Perdido", artist: "Legião Urbana", genre: "Rock Nacional", searchTerm: "Tempo Perdido Legião Urbana" },
    { title: "Há Tempos", artist: "Legião Urbana", genre: "Rock Nacional", searchTerm: "Há Tempos Legião Urbana" },
    { title: "Meninos e Meninas", artist: "Legião Urbana", genre: "Rock Nacional", searchTerm: "Meninos e Meninas Legião Urbana" },
    { title: "Perfeição", artist: "Legião Urbana", genre: "Rock Nacional", searchTerm: "Perfeição Legião Urbana" },
    { title: "Soldados", artist: "Legião Urbana", genre: "Rock Nacional", searchTerm: "Soldados Legião Urbana" },
    
    { title: "Admirável Gado Novo", artist: "Zé Ramalho", genre: "Rock Nacional", searchTerm: "Admirável Gado Novo Zé Ramalho" },
    { title: "Bicho de Sete Cabeças", artist: "Zé Ramalho", genre: "Rock Nacional", searchTerm: "Bicho de Sete Cabeças Zé Ramalho" },
    { title: "Chão de Giz", artist: "Zé Ramalho", genre: "Rock Nacional", searchTerm: "Chão de Giz Zé Ramalho" },
    { title: "Avohai", artist: "Zé Ramalho", genre: "Rock Nacional", searchTerm: "Avohai Zé Ramalho" },
    { title: "Frevo Mulher", artist: "Zé Ramalho", genre: "Rock Nacional", searchTerm: "Frevo Mulher Zé Ramalho" },

    // === MAIS FUNK ===
    { title: "Bum Bum Tam Tam", artist: "MC Fioti", genre: "Funk", searchTerm: "Bum Bum Tam Tam MC Fioti" },
    { title: "Vai Malandra", artist: "Anitta", genre: "Funk", searchTerm: "Vai Malandra Anitta" },
    { title: "Sua Cara", artist: "Anitta ft Pabllo Vittar", genre: "Funk", searchTerm: "Sua Cara Anitta Pabllo Vittar" },
    { title: "Paradinha", artist: "Anitta", genre: "Funk", searchTerm: "Paradinha Anitta" },
    { title: "Bang", artist: "Anitta", genre: "Funk", searchTerm: "Bang Anitta" },
    
    { title: "Olha a Explosão", artist: "MC Kevinho", genre: "Funk", searchTerm: "Olha a Explosão MC Kevinho" },
    { title: "Papum", artist: "MC Kevinho", genre: "Funk", searchTerm: "Papum MC Kevinho" },
    { title: "Vem pra Base", artist: "MC Kevinho", genre: "Funk", searchTerm: "Vem pra Base MC Kevinho" },
    { title: "Encaixa", artist: "MC Kevinho", genre: "Funk", searchTerm: "Encaixa MC Kevinho" },
    { title: "O Grave Bater", artist: "MC Kevinho", genre: "Funk", searchTerm: "O Grave Bater MC Kevinho" }
];

// Função para obter lotes de músicas
function getMusicBatch(batchNumber, batchSize = 100) {
    const startIndex = batchNumber * batchSize;
    const endIndex = startIndex + batchSize;
    return EXPANDED_MUSIC_DATABASE.slice(startIndex, endIndex);
}

// Função para obter total de músicas disponíveis
function getTotalAvailableMusic() {
    return EXPANDED_MUSIC_DATABASE.length;
}

// Função para obter total de lotes possíveis
function getTotalBatches(batchSize = 100) {
    return Math.ceil(EXPANDED_MUSIC_DATABASE.length / batchSize);
}

console.log(`📊 BANCO EXPANDIDO CARREGADO: ${EXPANDED_MUSIC_DATABASE.length} músicas disponíveis`);
console.log(`📦 Total de lotes possíveis (100 músicas cada): ${getTotalBatches()}`);