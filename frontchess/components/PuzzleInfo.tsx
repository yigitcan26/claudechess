import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { IconSymbol } from "./ui/IconSymbol";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

interface PuzzleInfoProps {
  rating: number;
  theme: string;
  moveCount: number;
  totalMoves: number;
}

export const PuzzleInfo: React.FC<PuzzleInfoProps> = ({
  rating,
  theme,
  moveCount,
  totalMoves,
}) => {
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? "light"].tint;

  // Zorluk seviyesini belirle
  const getDifficulty = (rating: number) => {
    if (rating < 1200) return { text: "Kolay", color: "#4CAF50" };
    if (rating < 1800) return { text: "Orta", color: "#FF9800" };
    if (rating < 2400) return { text: "Zor", color: "#F44336" };
    return { text: "Usta", color: "#9C27B0" };
  };

  const difficulty = getDifficulty(rating);

  // Tema adını düzenle
  const formatTheme = (theme: string) => {
    return (
      theme.charAt(0).toUpperCase() + theme.slice(1).replace(/([A-Z])/g, " $1")
    );
  };

  // İlerleme yüzdesini hesapla
  const progress = Math.floor((moveCount / totalMoves) * 100);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <IconSymbol size={16} name="chart.bar.fill" color={tintColor} />
          <ThemedText style={styles.label}>Derece:</ThemedText>
          <ThemedText style={styles.value}>{rating}</ThemedText>
        </View>

        <View style={styles.infoItem}>
          <IconSymbol size={16} name="dial.medium" color={difficulty.color} />
          <ThemedText style={styles.label}>Zorluk:</ThemedText>
          <ThemedText style={[styles.value, { color: difficulty.color }]}>
            {difficulty.text}
          </ThemedText>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <IconSymbol size={16} name="tag.fill" color={tintColor} />
          <ThemedText style={styles.label}>Tema:</ThemedText>
          <ThemedText style={styles.value}>{formatTheme(theme)}</ThemedText>
        </View>

        <View style={styles.infoItem}>
          <IconSymbol size={16} name="arrow.forward" color={tintColor} />
          <ThemedText style={styles.label}>İlerleme:</ThemedText>
          <ThemedText style={styles.value}>{progress}%</ThemedText>
        </View>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  label: {
    marginLeft: 6,
    fontSize: 14,
  },
  value: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "bold",
  },
});
