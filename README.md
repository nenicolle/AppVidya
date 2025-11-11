# AppVidya

Um aplicativo mobile completo para **gestão de clientes, produtos e pedidos**, desenvolvido com **React Native CLI**, **TypeScript**, **Realm** como banco local e **Redux Toolkit** para gerenciamento de estado.

## Funcionalidades

- Cadastro, listagem e edição de **Clientes**
- Cadastro, listagem e edição de **Produtos**
- Criação e gerenciamento de **Pedidos** com seleção de cliente e itens
- Interface moderna com componentes reutilizáveis
- Validação de formulários com **Yup + React Hook Form**
- Armazenamento offline com **Realm Database**
- Navegação fluida com **React Navigation**
- Ícones bonitinhos com **Lucide React Native**

# Estrutura do Projeto

```
AppVidya/

│
├── android/
│   ├── app/
│   │   ├── build.gradle
│   │   ├── src/
│   │   │   └── main/
│   │   │       ├── AndroidManifest.xml
│   │   │       ├── java/
│   │   │       └── res/
│   │   └── ...
│   ├── build.gradle
│   ├── gradle/
│   └── settings.gradle
│
├── src/
│   ├── database/
│   │   ├── index.ts
│   │   ├── realmInstance.ts
│   │   └── schemas/
│   │       ├── ClientSchema.ts
│   │       ├── Order.ts
│   │       ├── OrderItem.ts
│   │       └── Product.ts
│   │
│   ├── navigation/
│   │   └── AppNavigator.tsx
│   │
│   ├── realm/
│   │   └── config.ts
│   │
│   ├── screens/
│   │   ├── Clients/
│   │   │   ├── ClientDetails.tsx
│   │   │   ├── ClientList.tsx
│   │   │   ├── ClientScreen.tsx
│   │   │   └── CreateClient.tsx
│   │   │
│   │   ├── Orders/
│   │   │   ├── CreateOrder.tsx
│   │   │   ├── OrderDetails.tsx
│   │   │   ├── OrderScreen.tsx
│   │   │   ├── OrdersList.tsx
│   │   │   └── SelectClient.tsx
│   │   │
│   │   ├── Products/
│   │   │   ├── CreateProduct.tsx
│   │   │   ├── ProductDetails.tsx
│   │   │   └── ProductsScreen.tsx
│   │   │
│   │   └── HomeScreen.tsx
│   │
│   ├── store/
│   │   └── ClientState.ts
│   │
│   ├── types/
│   │   ├── Client.ts
│   │   ├── navigation.ts
│   │   ├── Order.ts
│   │   └── Products.ts
│   │
│   ├── UI/
│   │   ├── Buttons/
│   │   │   └── index.tsx
│   │   ├── Header/
│   │   │   └── Header.tsx
│   │   └── NavigationBar.tsx
│   │
│   └── utils/
│       └── imageCard.ts
│
├── App.tsx
├── app.json
├── babel.config.js
├── index.js
├── jest.config.js
├── metro.config.js
├── package.json
├── tsconfig.json
└── README.md
```

## Tecnologias Utilizadas

| Categoria          | Tecnologia                           |
| ------------------ | ------------------------------------ |
| **Framework**      | React Native CLI (`0.82.1`)          |
| **Linguagem**      | TypeScript                           |
| **Banco de Dados** | Realm (`@realm/react`)               |
| **Estado Global**  | Redux Toolkit + React Redux          |
| **Navegação**      | React Navigation (`native-stack`)    |
| **Formulários**    | React Hook Form + Yup                |
| **UI**             | Styled Components, Lucide Icons, SVG |
| **Imagens**        | React Native Image Picker            |
| **Máscaras**       | React Native Mask Text               |

### Pré-requisitos

- Node.js (v18 ou superior)
- Yarn ou NPM
- React Native CLI
- Android Studio (para Android)
- Xcode (para iOS - apenas macOS)
- Dispositivo ou emulador configurado

## Descrição das Pastas Principais

### `/src/database`

Contém a configuração do banco de dados Realm, incluindo a instância do banco e os schemas que definem a estrutura dos dados (Clientes, Pedidos, Itens de Pedido e Produtos).

### `/src/screens`

Organiza as telas da aplicação por módulos funcionais:

- **Clients**: Gerenciamento de clientes (listagem, criação, detalhes)
- **Orders**: Gerenciamento de pedidos (criação, listagem, detalhes, seleção de cliente)
- **Products**: Gerenciamento de produtos (criação, listagem, detalhes)

### `/src/UI`

Componentes de interface reutilizáveis como botões, cabeçalhos e barras de navegação.

### `/src/types`

Definições de tipos TypeScript para garantir type-safety em toda a aplicação.

### `/src/store`

Gerenciamento de estado global usando Redux Toolkit.

### `/src/navigation`

Configuração do sistema de navegação da aplicação usando React Navigation.

### `/src/utils`

Funções auxiliares e utilitários compartilhados.

### Passo a Passo

# 1. Clone o repositório

git clone https://github.com/seu-usuario/AppVidya.git
cd AppVidya

# 2. Instale as dependências

npm install

# 3. Inicie o Metro Bundler

npx react-native start
