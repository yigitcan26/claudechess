import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Chess } from "react-native-chess"; // react-native-chess paketini kullanıyoruz
import { ThemedView } from "./ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";

interface PuzzleChessboardProps {
  position: string;
  onMove: (move: any) => boolean;
  orientation: "white" | "black";
}

export const PuzzleChessboard: React.FC<PuzzleChessboardProps> = ({
  position,
  onMove,
  orientation,
}) => {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();

  // Ekrana göre tahta boyutunu ayarla
  const boardSize = width > 500 ? 500 : width - 32;

  // Tema renklerini belirle
  const lightSquareColor = colorScheme === "dark" ? "#606060" : "#f0d9b5";
  const darkSquareColor = colorScheme === "dark" ? "#202020" : "#b58863";

  return (
    <ThemedView style={styles.container}>
      <Chess
        fen={position}
        size={boardSize}
        onMove={onMove}
        lightSquareColor={lightSquareColor}
        darkSquareColor={darkSquareColor}
        orientation={orientation}
        shouldSelectPiece={(piece) => true} // Tüm taşları seçilebilir yap
        onPromotion={() => "q"} // Terfi durumunda varsayılan olarak vezir seç
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
