# Calculadora Nutricional

## O que é a Calculadora Nutricional?

A Calculadora Nutricional é uma aplicação web inteligente desenvolvida para apoiar profissionais de nutrição clínica no atendimento hospitalar. O sistema funciona como um prescritor e prontuário eletrônico focado em agilizar e dar segurança aos cálculos de necessidades energéticas de crianças em situação hospitalar.

Ela foi pensada para ajudar na prescrição nutricional, no acompanhamento de dados clínicos e na geração de relatórios de forma organizada, segura e prática.

## Objetivo da aplicação

- Calcular necessidades energéticas com base em dados antropométricos e clínicos
- Apoiar a prescrição nutricional de pacientes hospitalizados
- Centralizar informações relevantes para nutrição clínica
- Facilitar a gestão de fórmulas, diagnósticos e autorização de acesso
- Gerar laudos para impressão e uso profissional

## Arquivos principais e sua função

### `src/App.tsx`
Arquivo principal da interface e da lógica da aplicação. Aqui ficam:
- formulários e telas da aplicação
- cálculos nutricionais
- validações clínicas
- regras de acesso por perfil
- cadastro e edição de dados
- geração do laudo final

### `src/firebase.ts`
Configura e inicializa os serviços do Firebase. Neste arquivo ficam:
- conexão com Authentication
- conexão com Firestore
- funções de leitura e gravação de dados
- integração da aplicação com o backend do Firebase

### `firestore.rules`
Define as regras de acesso ao banco de dados Firestore. Esse arquivo controla:
- quem pode ler e escrever dados
- permissões por perfil de usuário
- proteção de informações sensíveis

### `src/main.tsx`
Ponto de entrada da aplicação React. Ele monta a interface na página inicial e inicializa o app.

### `src/index.css`
Arquivo com estilos globais da aplicação, como layout, cores, fontes e apresentação visual.

### `vite.config.ts`
Configuração do Vite, ferramenta usada para executar e compilar a aplicação React.

### `package.json`
Lista as dependências do projeto e os scripts de execução, como:
- `npm run dev`
- `npm run build`

### `.env.local`
Arquivo local para armazenar variáveis de ambiente do Firebase, como chaves e identificadores do projeto. Não deve ser enviado ao repositório.

## Estrutura de dados no Firebase

A aplicação utiliza Firestore para armazenar informações como:
- `staff` — usuários e perfis de acesso
- `formulas` — catálogo de fórmulas nutricionais
- `cids` — diagnósticos e limites relacionados

## Perfis de acesso

A aplicação organiza os usuários em perfis como:
- `superadmin` — controle total e aprovação de acessos
- `admin` — gestão de dados e fórmulas
- `consultant` — uso clínico e prescrição
- `pending` — aguardando aprovação
- `disabled` — acesso bloqueado

## Como rodar o projeto

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
```

## Configuração mínima do Firebase

1. Ativar autenticação por e-mail e senha no Firebase
2. Criar a conta inicial do superadmin no Authentication
3. Criar o documento `staff/{UID}` com o papel de superadmin
4. Publicar as regras do Firestore
5. Configurar as variáveis de ambiente no `.env.local`

## Observação

Este README foi simplificado para apresentar a proposta da aplicação e a função de cada arquivo principal, sem excesso de documentação interna.

