import { PuzzleData } from "@/types/puzzle";

// Lichess API'den rastgele bulmaca al
export const fetchRandomPuzzle = async (): Promise<PuzzleData> => {
  try {
    // Rastgele bulmaca için DB'den erişim yok, bu yüzden hardcoded örnekler vereceğiz
    // Gerçek uygulama için Lichess API kullanılabilir: https://lichess.org/api#tag/Puzzle

    // Örnek bulmacalar
    const puzzles = [
      {
        id: "P001",
        fen: "r2qk2r/pb4pp/1n2Pb2/2B2Q2/p1p5/2P5/2B2PPP/RN2R1K1 w kq - 1 0",
        moves: "c5e7 e8f7 e7c5 f7g8 c5a7 g8h8 e1e8 d8e8 f5e6",
        rating: 1500,
        themes: "mate mateIn2 short",
      },
      {
        id: "P002",
        fen: "1rb4r/pkP2ppp/1b1P4/1Q6/N3n3/8/P4PPP/R1B2RK1 w - - 0 1",
        moves: "b5d5 b6d4 a4c3 b7a6 d5a5 a6b7 a5b4 d4f6 c3e4",
        rating: 1750,
        themes: "advantage middlegame",
      },
      {
        id: "P003",
        fen: "r1bqkb1r/pp3ppp/2n1pn2/2pp4/3P4/2PBPN2/PP3PPP/R1BQK2R w KQkq - 0 1",
        moves: "d4c5 c6d4 e3d4 d5d4 c3d4",
        rating: 1200,
        themes: "opening advantage",
      },
      {
        id: "P004",
        fen: "r1bq1rk1/1p2bppp/p1n1pn2/3p4/3P4/1P2PNB1/PB1N1PPP/R2Q1RK1 w - - 0 1",
        moves: "d2c4 d5c4 b3c4 e7b4 a2a3",
        rating: 1600,
        themes: "middlegame tactical",
      },
      {
        id: "P005",
        fen: "2r1r1k1/1bqn1pbp/pp1ppnp1/8/2P1P3/2N1BP2/PB1Q2PP/R4RK1 w - - 0 1",
        moves: "f3g4 f6d7 g4b4 a6a5 b4d6",
        rating: 1900,
        themes: "advantage crushing",
      },
    ];

    // Rastgele bir bulmaca seç
    const randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];

    return randomPuzzle;
  } catch (error) {
    console.error("Bulmaca çekerken hata:", error);
    throw new Error("Bulmaca çekilemedi");
  }
};

// Gerçek uygulamada, belirli bir zorluk seviyesine göre bulmaca alabilirsiniz
export const fetchPuzzleByRating = async (
  minRating: number,
  maxRating: number
): Promise<PuzzleData> => {
  // Bu işlev Lichess API ile uygulanabilir
  // Şu an için basitlik adına rastgele bulmaca döndürüyoruz
  return fetchRandomPuzzle();
};
