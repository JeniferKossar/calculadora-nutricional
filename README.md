# Calculadora Nutricional - DietCalc Pro

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
Arquivo local para armazenar variáveis de ambiente do Firebase. **Nunca deve ser enviado ao repositório.**

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

## Segurança

- Todas as credenciais do Firebase são carregadas de variáveis de ambiente
- O arquivo `.env.local` está listado no `.gitignore` para proteção
- As regras do Firestore garantem autorização por perfil de usuário
- Validações são aplicadas tanto no cliente quanto no servidor (Firestore rules)

## Contribuindo

Se você está trabalhando neste projeto:

1. Nunca commite arquivos `.env.local`, `.env` ou qualquer arquivo com credenciais
2. Use sempre `.env.example` como referência para configuração local
3. Revise o `.gitignore` antes de fazer push
4. Proteja dados pessoais e clínicos em commits e PRs

## Licença

Este projeto é privado e de uso restrito.
