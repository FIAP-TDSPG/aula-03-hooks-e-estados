import { useState } from "react"
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { EvilIcons } from "@expo/vector-icons";

interface IFormData {
  nome: string;
  email: string;
  idade: string;
}

const COLORS = {
  background: "#F5F7FB",
  card: "#FFFFFF",
  text: "#111827",
  muted: "#6B7280",
  border: "#E5E7EB",
  inputBg: "#F9FAFB",
  primary: "#4F46E5",
  danger: "#DC2626",
} as const;

export default function UseStatePage() {
  const [cadastros, setCadastros] = useState<Array<IFormData>>([]);

  const [valor, setValor] = useState(0);
  //       ⬆      ⬆.         ⬆
  //    Atual,  FN p/mudar   inicial

  function handleSomaValor(value: number) {
    setValor(value + 1)
  }

  // 1 forma de usar formulario
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState("");

  function submit() {
    if (nome === "" || email === "" || idade === "") {
      alert("Prencha todos os campos!");
      return;
    }

    if (Number.parseInt(idade) < 18) {
      alert("Idade não permitida!");
      return;
    }

    // Versao longa
    // const copia = [...cadastros]
    // copia.push({
    //   nome,
    //   email,
    //   idade
    // })
    // setCadastros(copia)

    // Versao curta
    setCadastros(prev => [...prev, {
      nome,
      email,
      idade
    }])

    // cadastros.push({
    //   nome,
    //   email,
    //   idade
    // })

    alert("Sucesso!")
    setNome("");
    setEmail("");
    setIdade("");
  }

  // 2 forma de usar formulario
  const [form, setForm] = useState({} as IFormData);

  function newSubmit() {
    if (!Object.hasOwn(form, "nome")) {
      alert("Prencha o nome!");
      return;
    }

    if (!Object.hasOwn(form, "email")) {
      alert("Prencha o email!");
      return;
    }

    if (!Object.hasOwn(form, "idade")) {
      alert("Prencha o idade!");
      return;
    }

    if (Number.parseInt(form.idade) < 18) {
      alert("Idade não permitida!");
      return;
    }

    console.log(form)
    alert("Sucesso!")
  }

  function deleteUser(index: number) {
    console.log("OnLongPress")

    // Versao longa
    // const copia = [...cadastros]
    // const copiaFiltrada = copia.filter((_, prevIndex) => prevIndex !== index);
    // setCadastros(copiaFiltrada)

    // Versao curta
    setCadastros(prev => prev.filter((_, prevIndex) => prevIndex !== index))
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Cadastro</Text>
          <Text style={styles.subtitle}>Preencha os campos e toque em Enviar</Text>
        </View>
        {/* ===== Versão Simples ===== */}
        {/* <Text>Valor atual: {valor}</Text>

      <TouchableOpacity
        onPress={() => handleSomaValor(valor)}
        style={{
          borderWidth: 1,
          borderColor: "#000",
          padding: 9,
          borderRadius: 9
        }}
      >
        <Text>Me aperte</Text>
      </TouchableOpacity> */}

        {/* ===== Versão Formulario ===== */}
        {/* Form */}

        <View style={styles.card}>
          <View style={styles.field}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={(text) => setNome(text)}
              placeholderTextColor={COLORS.muted}
              placeholder="Digite seu nome"
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={COLORS.muted}
              placeholder="Digite seu email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Idade</Text>
            <TextInput
              style={styles.input}
              value={idade}
              onChangeText={(text) => setIdade(text)}
              placeholderTextColor={COLORS.muted}
              placeholder="Digite sua idade"
              keyboardType="number-pad"
            />
          </View>

          <TouchableOpacity onPress={submit} style={styles.button} activeOpacity={0.9}>
            <Text style={styles.buttonText}>Enviar</Text>
            <EvilIcons name="arrow-right" size={26} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>Cadastrados</Text>
          <Text style={styles.sectionHint}>
            {cadastros.length > 0 ? "Segure um item para remover" : "Nenhum cadastro ainda"}
          </Text>
        </View>

        <View style={styles.list}>
          {cadastros.map((cadastro, index) => (
            <TouchableOpacity
              key={index}
              style={styles.listItem}
              onLongPress={() => deleteUser(index)}
              onPress={() => console.log("onPress")}
              onPressIn={() => console.log("onPressIn")}
              onPressOut={() => console.log("onPressOut")}
              activeOpacity={0.85}
            >
              <View style={styles.avatar}>
                <EvilIcons name="user" size={28} color={COLORS.primary} />
              </View>

              <View style={styles.listItemContent}>
                <Text style={styles.listItemName} numberOfLines={1}>
                  {cadastro.nome}
                </Text>
                <Text style={styles.listItemMeta} numberOfLines={1}>
                  {cadastro.email}
                </Text>
                <Text style={styles.listItemMeta}>Idade: {cadastro.idade}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
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
  field: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
  },
  input: {
    width: "100%",
    backgroundColor: COLORS.inputBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.text,
  },
  button: {
    marginTop: 4,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  listHeader: {
    marginTop: 6,
    gap: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  sectionHint: {
    fontSize: 13,
    color: COLORS.muted,
  },
  list: {
    gap: 10,
  },
  listItem: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  listItemContent: {
    flex: 1,
    gap: 2,
  },
  listItemName: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
  },
  listItemMeta: {
    fontSize: 13,
    color: COLORS.muted,
  },
});
