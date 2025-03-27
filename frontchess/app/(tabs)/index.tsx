import React, { useState, useEffect } from "react";
import { StyleSheet, Alert, ActivityIndicator } from "react-native";
import { Chess } from "chess.js";

import { PuzzleChessboard } from "@/components/PuzzleChessboard";
import { PuzzleInfo } from "@/components/PuzzleInfo";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { fetchRandomPuzzle } from "@/utils/puzzleApi";
import { PuzzleData, ChessMove } from "@/types/puzzle";

export default function HomeScreen() {
  const [puzzle, setPuzzle] = useState<PuzzleData | null>(null);
  const [game, setGame] = useState<Chess | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [solved, setSolved] = useState(false);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [puzzleRating, setPuzzleRating] = useState(0);
  const [puzzleTheme, setPuzzleTheme] = useState("");

  // Yeni bulmaca yükle
  const loadNewPuzzle = async () => {
    try {
      setLoading(true);
      setSolved(false);
      setCurrentMoveIndex(0);
      setMoveHistory([]);

      const puzzleData = await fetchRandomPuzzle();
      setPuzzle(puzzleData);
      setPuzzleRating(puzzleData.rating);
      setPuzzleTheme(puzzleData.themes.split(" ")[0]);

      // Başlangıç pozisyonunu ayarla
      const chessInstance = new Chess(puzzleData.fen);

      // İlk hamleyi yap (bilgisayar hamlesi)
      const firstMove = puzzleData.moves.split(" ")[0];
      // San notasyonuna çevir (e2e4 -> e2 to e4)
      const from = firstMove.substring(0, 2);
      const to = firstMove.substring(2, 4);
      const promotion =
        firstMove.length > 4 ? firstMove.substring(4) : undefined;

      chessInstance.move({ from, to, promotion });

      setGame(chessInstance);

      // İlk bilgisayar hamlesini kaydet
      setMoveHistory([firstMove]);
      setCurrentMoveIndex(1);
      setLoading(false);
    } catch (error) {
      console.error("Bulmaca yüklenirken hata:", error);
      Alert.alert(
        "Hata",
        "Bulmaca yüklenirken bir hata oluştu. Lütfen tekrar deneyin."
      );
      setLoading(false);
    }
  };

  // Sayfa yüklendiğinde ilk bulmacayı yükle
  useEffect(() => {
    loadNewPuzzle();
  }, []);

  // Kullanıcı hamlesi
  const handleUserMove = (move: any) => {
    if (!game || solved) return false;

    const expectedMove = puzzle?.moves.split(" ")[currentMoveIndex];

    if (!expectedMove) return false;

    // Beklenen hamleyi parçalara ayır
    const expectedFrom = expectedMove.substring(0, 2);
    const expectedTo = expectedMove.substring(2, 4);

    // Kullanıcının hamlesini kontrol et
    if (move.from === expectedFrom && move.to === expectedTo) {
      // Doğru hamle
      try {
        game.move({ from: move.from, to: move.to, promotion: move.promotion });
        setGame(new Chess(game.fen()));

        // Hamleyi kaydet
        setMoveHistory([...moveHistory, expectedMove]);
        setCurrentMoveIndex(currentMoveIndex + 1);

        // Bulmaca tamamlandı mı?
        if (currentMoveIndex + 1 >= puzzle!.moves.split(" ").length) {
          // Bulmaca çözüldü
          setSolved(true);
          Alert.alert(
            "Tebrikler!",
            "Bulmacayı başarıyla çözdünüz! Yeni bir bulmaca yükleniyor...",
            [{ text: "Tamam", onPress: loadNewPuzzle }]
          );
          return true;
        }

        // Bilgisayarın sonraki hamlesini yap
        setTimeout(() => {
          if (game) {
            const nextComputerMove =
              puzzle!.moves.split(" ")[currentMoveIndex + 1];
            if (nextComputerMove) {
              const nextFrom = nextComputerMove.substring(0, 2);
              const nextTo = nextComputerMove.substring(2, 4);
              const nextPromotion =
                nextComputerMove.length > 4
                  ? nextComputerMove.substring(4)
                  : undefined;

              game.move({
                from: nextFrom,
                to: nextTo,
                promotion: nextPromotion,
              });
              setGame(new Chess(game.fen()));

              // Bilgisayar hamlesini kaydet
              setMoveHistory([...moveHistory, expectedMove, nextComputerMove]);
              setCurrentMoveIndex(currentMoveIndex + 2);
            }
          }
        }, 500);

        return true;
      } catch (error) {
        console.error("Hamle yapılırken hata:", error);
        return false;
      }
    } else {
      // Yanlış hamle
      Alert.alert("Yanlış Hamle", "Bu doğru hamle değil. Tekrar deneyin.");
      return false;
    }
  };

  if (loading || !game) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <ThemedText style={styles.loadingText}>
          Bulmaca yükleniyor...
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Satranç Bulmacası
      </ThemedText>

      <PuzzleInfo
        rating={puzzleRating}
        theme={puzzleTheme}
        moveCount={currentMoveIndex}
        totalMoves={puzzle?.moves.split(" ").length || 0}
      />

      <PuzzleChessboard
        position={game.fen()}
        onMove={handleUserMove}
        orientation={game.turn() === "w" ? "white" : "black"}
      />

      <ThemedText style={styles.instruction}>
        {solved
          ? "Tebrikler! Bulmacayı çözdünüz."
          : game.turn() === "w"
          ? "Beyaz hamle yapmalı"
          : "Siyah hamle yapmalı"}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
  },
  title: {
    marginBottom: 20,
  },
  instruction: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
});
