import { useEffect, useMemo, useState } from "react";
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

const COLORS = {
  background: "#F5F7FB",
  card: "#FFFFFF",
  text: "#111827",
  muted: "#6B7280",
  border: "#E5E7EB",
  primary: "#4F46E5",
  success: "#16A34A",
} as const;

function formatTime(date: Date) {
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

export default function UseEffectPage() {
  const [counter, setCounter] = useState(0);
  const [tick, setTick] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTick(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (counter === 0) return;
    console.log("counter mudou:", counter);
  }, [counter]);

  const status = useMemo(() => {
    if (counter === 0) return "Comece clicando em +1";
    return counter % 2 === 0 ? "Número par" : "Número ímpar";
  }, [counter]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>useEffect</Text>
          <Text style={styles.subtitle}>Exemplos: efeito ao montar, dependências e cleanup</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={styles.row}>
              <View style={styles.avatar}>
                <EvilIcons name="clock" size={28} color={COLORS.primary} />
              </View>
              <View style={styles.stack}>
                <Text style={styles.cardTitle}>Relógio (cleanup)</Text>
                <Text style={styles.cardHint}>Atualiza a cada 1s e limpa ao desmontar</Text>
              </View>
            </View>
            <Text style={styles.time}>{formatTime(tick)}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={styles.stack}>
              <Text style={styles.cardTitle}>Contador (dependências)</Text>
              <Text style={styles.cardHint}>Loga no console sempre que o contador muda</Text>
            </View>
            <View style={styles.pill}>
              <Text style={styles.pillText}>{status}</Text>
            </View>
          </View>

          <View style={styles.counterArea}>
            <Text style={styles.counterValue}>{counter}</Text>
            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.button, styles.buttonGhost]}
                onPress={() => setCounter(0)}
                activeOpacity={0.9}
              >
                <Text style={[styles.buttonText, styles.buttonGhostText]}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => setCounter((v) => v + 1)} activeOpacity={0.9}>
                <Text style={styles.buttonText}>+1</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <EvilIcons name="question" size={20} color={COLORS.muted} />
          <Text style={styles.footerText}>Abra o console para ver o efeito rodando ao mudar o contador.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
    paddingBottom: 32,
    gap: 14,
  },
  header: {
    gap: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.text,
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.muted,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    gap: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 10 },
      },
      android: {
        elevation: 3,
      },
      default: {},
    }),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  stack: {
    gap: 2,
    flexShrink: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
  },
  cardHint: {
    fontSize: 13,
    color: COLORS.muted,
  },
  time: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.text,
    fontVariant: ["tabular-nums"],
  },
  pill: {
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#BBF7D0",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    flexShrink: 0,
  },
  pillText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.success,
  },
  counterArea: {
    gap: 12,
  },
  counterValue: {
    fontSize: 44,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: 0.4,
    textAlign: "center",
    fontVariant: ["tabular-nums"],
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonGhost: {
    backgroundColor: "#EEF2FF",
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
  },
  buttonGhostText: {
    color: COLORS.primary,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  footerText: {
    fontSize: 13,
    color: COLORS.muted,
    flex: 1,
  },
});
