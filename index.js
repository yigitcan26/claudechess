// index.js
import { registerRootComponent } from "expo";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator, Alert } from "react-native";
import { Chess } from "chess.js";

// Şimdi oluşturacağımız satranç tahtası bileşeni ve yardımcı işlevler
function App() {
  const [game, setGame] = useState(new Chess());
  const [loading, setLoading] = useState(false);

  // Basit bir FEN pozisyonu
  const testPosition =
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

  useEffect(() => {
    // Uygulama başladığında satranç motorunu başlat
    const chessInstance = new Chess(testPosition);
    setGame(chessInstance);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Satranç Bulmaca</Text>
      <Text style={styles.subtitle}>Başlangıç pozisyonu yüklendi</Text>

      {/* Satranç tahtası burada olacak */}
      <View style={styles.boardPlaceholder}>
        <Text>Satranç tahtası buraya gelecek</Text>
        <Text style={styles.positionText}>
          Pozisyon: {game ? game.fen() : "Yükleniyor..."}
        </Text>
      </View>

      <Text style={styles.instructions}>
        Satranç tahtası bileşenini eklemek için bir sonraki adıma geçeceğiz.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: "#555",
  },
  boardPlaceholder: {
    width: 300,
    height: 300,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#888",
    marginVertical: 20,
  },
  positionText: {
    marginTop: 10,
    fontSize: 12,
    color: "#666",
  },
  instructions: {
    textAlign: "center",
    color: "#333",
    marginTop: 10,
  },
});

registerRootComponent(App);
