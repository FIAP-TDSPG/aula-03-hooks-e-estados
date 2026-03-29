# Aula 03 — Hooks e Estados (React Native + Expo)

Projeto de exemplos para praticar hooks no React Native (Expo).

## Objetivo da aula

- Entender como o `useState` guarda e atualiza estado no React.
- Praticar atualização de arrays/objetos de forma imutável (sem `push` no estado).
- Entender como o `useEffect` roda em momentos específicos (montagem, dependências) e como fazer cleanup.

## Como rodar

```bash
npm install
npm run start
```

Outros comandos:

```bash
npm run android
npm run ios
npm run web
```

## Aulas / Telas

- useState: [src/01-useState/index.tsx](src/01-useState/index.tsx)
- useEffect: [src/02-useEffect/index.tsx](src/02-useEffect/index.tsx)

## O que cada tela demonstra

### 1) useState (formulário + lista)

Arquivo: [src/01-useState/index.tsx](src/01-useState/index.tsx)

- Estados simples (`nome`, `email`, `idade`) com `useState("")`.
- Validações no submit:
  - campos obrigatórios
  - idade mínima (>= 18)
- Lista de cadastrados (`cadastros`) guardada em estado como array.
- Inserção no array de forma imutável:
  - `setCadastros(prev => [...prev, novoCadastro])`
- Remoção por `onLongPress` (segurar no item):
  - `setCadastros(prev => prev.filter((_, i) => i !== index))`

### 2) useEffect (montagem, dependências e cleanup)

Arquivo: [src/02-useEffect/index.tsx](src/02-useEffect/index.tsx)

- Efeito ao montar (executa 1x): cria um `setInterval` que atualiza um relógio.
- Cleanup (ao desmontar): limpa o intervalo com `clearInterval`.
- Efeito com dependência: loga no console sempre que o contador muda.

## Alternar a tela exibida

Edite o [App.tsx](App.tsx) e deixe apenas **uma** tela renderizando por vez.

Exemplo (useState):

```tsx
import UseStatePage from "./src/01-useState";

export default function App() {
  return <UseStatePage />;
}
```

Exemplo (useEffect):

```tsx
import UseEffectPage from "./src/02-useEffect";

export default function App() {
  return <UseEffectPage />;
}
```

Se você renderizar as duas telas ao mesmo tempo, elas vão disputar espaço na tela e a UI fica difícil de visualizar.
