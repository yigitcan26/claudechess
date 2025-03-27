// Satranç bulmacası veri yapısı
export interface PuzzleData {
  id: string;
  fen: string; // Başlangıç pozisyonu (FEN formatında)
  moves: string; // Hamlelerin listesi (örn. "e2e4 e7e5 g1f3")
  rating: number; // Zorluk derecesi puanı
  themes: string; // Bulmacanın temaları (örn. "mate middlegame")
}

// Hamle yapısı
export interface ChessMove {
  from: string; // Başlangıç karesi (örn. "e2")
  to: string; // Bitiş karesi (örn. "e4")
  promotion?: string; // Terfi harfi (örn. "q" - vezir) (isteğe bağlı)
}
