import { useEffect, useState } from "react"
import { Text, TextInput, Touchable, TouchableOpacity, View } from "react-native"
import EvilIcons from '@expo/vector-icons/EvilIcons';

interface IFormData {
  nome: string;
  email: string;
  idade: string;
}

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
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        // backgroundColor: "#f0c",
        padding: 20
      }}
    >
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

      <View
        style={{
          // backgroundColor: "#cee710",
          // flex: 1
          width: "100%",
          gap: 10
        }}
      >
        <TextInput
          style={{
            borderColor: "#000",
            borderWidth: 1,
            width: "100%",
            backgroundColor: '#fff',
            borderRadius: 10,
          }}
          value={nome}
          onChangeText={(text) => setNome(text)}
          // value={form.nome}
          // onChangeText={(text) => setForm(anterior => ({
          //   ...anterior,
          //   nome: text
          // }))}
          placeholderTextColor="#00f"
          placeholder="Digite seu nome"
        />

        <TextInput
          style={{
            borderColor: "#000",
            borderWidth: 1,
            width: "100%",
            backgroundColor: '#fff',
            borderRadius: 10,
          }}
          value={email}
          onChangeText={(text) => setEmail(text)}
          // value={form.email}
          // onChangeText={(text) => setForm(anterior => ({
          //   ...anterior,
          //   email: text
          // }))}
          placeholderTextColor="#00f"
          placeholder="Digite seu email"
          keyboardType="email-address"
        />

        <TextInput
          style={{
            borderColor: "#000",
            borderWidth: 1,
            width: "100%",
            backgroundColor: '#fff',
            borderRadius: 10,
          }}
          value={idade}
          onChangeText={(text) => setIdade(text)}
          // value={form.idade}
          // onChangeText={(text) => setForm(anterior => ({
          //   ...anterior,
          //   idade: text
          // }))}
          placeholderTextColor="#00f"
          placeholder="Digite sua idade"
          keyboardType="decimal-pad"
        />

        <TouchableOpacity
          onPress={submit}
          // onPress={newSubmit}
          style={{
            padding: 10,
            borderRadius: 9,
            backgroundColor: '#fff',
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            borderWidth: 1,
            borderColor: "#000"
          }}
        >
          <Text
            style={{
              textAlign: "center",
            }}
          >
            Enviar
          </Text>

          <EvilIcons name="arrow-right" size={24} color="black" />

        </TouchableOpacity>
      </View>

      {/* Render */}
      <View
        style={{
          gap: 10,
          width: "100%"
        }}
      >
        {cadastros.map((cadastro, index) => (
          <TouchableOpacity
            key={index}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#000",
              alignItems: "center"
            }}
            onLongPress={() => deleteUser(index)}
            onPress={() => console.log("onPress")}
            onPressIn={() => console.log("onPressIn")}
            onPressOut={() => console.log("onPressOut")}
          >
            <Text>{cadastro.nome}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}