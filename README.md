# Acesso ao Firebase

O acesso usa e-mail/senha sem confirmação por e-mail. O cadastro público aceita somente endereços `@hpp.org.br` e novas contas ficam pendentes até aprovação. Sem confirmação, o domínio informado não comprova a identidade; o superadmin deve aprovar apenas profissionais que reconhece.

1. No Firebase Console, habilite **Authentication > Sign-in method > Email/Password**.
2. Crie manualmente a primeira conta superadmin em **Authentication > Users**. Ela pode usar um e-mail administrativo fora do domínio hospitalar.
3. Copie o UID dessa conta e crie no Firestore `staff/{UID}` com os campos `email` e `role: "superadmin"`. O app envia a confirmação de e-mail no primeiro login.
4. Publique as regras com `firebase deploy --only firestore:rules --project calculadora-dieta-hospitalar`.
5. Publique o app com `npm run build` e `firebase deploy --only hosting --project calculadora-dieta-hospitalar`.

Profissionais com e-mail `@hpp.org.br` podem solicitar cadastro na tela inicial. A conta fica pendente até o superadmin escolher **Admin** ou **Consultor** na aba **Acessos da equipe**. Admins podem alterar fórmulas e CIDs; consultores podem consultar os dados e usar os cálculos, mas não alterá-los. O papel superadmin inicial deve ser provisionado manualmente no Console; o app não permite autoelevação.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      # DietCalc Pro - Clínica Hospitalar

      ## Documentação acadêmica e evidências de funcionamento

      **Projeto:** Calculadora nutricional para apoio à prescrição clínica hospitalar  
      **Aplicação:** DietCalc Pro  
      **Tecnologias principais:** React, TypeScript, Vite e Firebase Authentication/Cloud Firestore

      ## 1. Introdução

      O DietCalc Pro é uma aplicação web de apoio ao cálculo de necessidades energéticas e à elaboração de prescrições nutricionais. O sistema reúne dados antropométricos e clínicos informados pelo profissional, catálogo de fórmulas e diagnósticos (CIDs), cálculos de composição nutricional e geração de relatório para impressão.

      Esta documentação apresenta as funcionalidades implementadas e relaciona, para cada uma, a lógica do código à evidência observável na interface. Os campos indicados como **[Inserir captura]** são espaços reservados para as imagens produzidas durante a demonstração.

      ## 2. Tecnologias e organização

      - **Interface:** React e TypeScript, com aplicação de página única executada pelo Vite.
      - **Autenticação:** Firebase Authentication com e-mail e senha.
      - **Persistência e autorização:** Cloud Firestore, com regras de acesso definidas em `firestore.rules`.
      - **Código principal:** `src/App.tsx` concentra os fluxos da interface, as validações e os cálculos; `src/firebase.ts` inicializa os serviços Firebase e implementa operações de dados.

      ## 3. Funcionalidades e evidências

      ### 3.1 Autenticação da equipe

      **Contexto técnico (o código).** O login envia e-mail e senha ao Firebase Authentication por `signInWithEmailAndPassword`. Um observador de estado de autenticação verifica a sessão e consulta o perfil correspondente em `staff/{uid}` no Firestore. Contas sem perfil autorizado não acessam as telas clínicas.

      **Transição para a tela (o resultado).** Na tela inicial, um profissional informa suas credenciais e seleciona **Entrar**. Após a validação, a aplicação apresenta o ambiente clínico; em caso de credenciais inválidas ou de conta não autorizada, exibe uma mensagem de erro.

      **Evidências:**
      - [Inserir captura do código: `handleSignIn` e validação do perfil em `src/App.tsx`]
      - [Inserir captura da tela: formulário de acesso e, se possível, mensagem de acesso negado]

      > **Nota de precisão:** a aplicação usa Firebase Authentication. Não há implementação própria de emissão ou validação de JWT no código apresentado; portanto, esta funcionalidade deve ser descrita como autenticação Firebase, e não como “login com JWT”.

      ### 3.2 Cadastro institucional e aprovação de conta

      **Contexto técnico (o código).** O cadastro normaliza o e-mail, aceita somente o domínio `@hpp.org.br` e exige senha com pelo menos oito caracteres. A conta é criada no Firebase Authentication e seu documento em `staff/{uid}` recebe o papel `pending`. O acesso às funções clínicas só é liberado depois que o superadministrador altera o papel.

      **Transição para a tela (o resultado).** O profissional seleciona **Criar conta institucional**, preenche e-mail e senha e solicita o cadastro. A interface informa que a solicitação está pendente e oferece a opção **Verificar aprovação**.

      **Evidências:**
      - [Inserir captura do código: validação do domínio, criação da conta e papel `pending` em `src/App.tsx`]
      - [Inserir captura da tela: formulário de cadastro e estado aguardando aprovação]

      ### 3.3 Controle de acesso por perfil

      **Contexto técnico (o código).** A aplicação diferencia os papéis `superadmin`, `admin`, `consultant`, `pending` e `disabled`. Administradores e superadministradores podem gerenciar fórmulas e CIDs; consultores podem consultar os dados e usar os cálculos. As regras em `firestore.rules` repetem essa autorização no banco: leituras exigem equipe aprovada, gravações clínicas exigem papel administrativo e apenas o superadministrador pode listar e alterar os perfis da equipe.

      **Transição para a tela (o resultado).** A aba **Acessos da equipe** é exibida somente ao superadministrador. Na área de cadastros, os controles de alteração são apresentados somente aos perfis administrativos. Uma tentativa de operação não permitida também é recusada pelas regras do Firestore.

      **Evidências:**
      - [Inserir captura do código: `canManageClinicalData` em `src/App.tsx` e regras de autorização em `firestore.rules`]
      - [Inserir captura da tela: aba de equipe no perfil superadministrador]
      - [Inserir captura da tela: visão de consultor sem controles de alteração]

      > As regras do Firestore não retornam um status HTTP 403 exibido pela interface. Em uma operação negada, o SDK retorna erro de permissão (`permission-denied`); evite documentar esse fluxo como uma página de erro 403.

      ### 3.4 Cálculo da necessidade energética (EER)

      **Contexto técnico (o código).** O cálculo da taxa metabólica basal considera peso, altura, idade convertida para anos e sexo. O código aplica equações por faixa etária (menores de 3 anos, de 3 a 10 anos e de 10 a 18 anos) e multiplica o resultado pelos fatores de estresse selecionados. O valor final é arredondado para uma casa decimal.

      **Transição para a tela (o resultado).** Na aba **Dados e EER**, o profissional informa os dados antropométricos e seleciona fatores de estresse. A interface atualiza a meta energética em kcal, utilizada pelas demais telas de prescrição.

      **Evidências:**
      - [Inserir captura do código: cálculo de `tmb` e `eer` em `src/App.tsx`]
      - [Inserir captura da tela: dados de demonstração e meta energética calculada]

      ### 3.5 Prescrição nutricional e validações clínicas

      **Contexto técnico (o código).** Os itens da prescrição são calculados a partir da quantidade prescrita em gramas e dos valores de referência cadastrados para cada fórmula. A aplicação agrega energia, proteínas, carboidratos, lipídios, micronutrientes e volume. Antes de adicionar um item, verifica limites proteicos associados ao CID e à estratégia metabólica; também alerta sobre incompatibilidade entre alergênicos cadastrados e restrições alimentares informadas.

      **Transição para a tela (o resultado).** Na aba **Prescrição Diária**, o profissional escolhe a categoria e a fórmula, informa a quantidade e adiciona o item. A tela exibe os totais calculados e impede a inclusão quando uma validação crítica é acionada; alertas de alergênicos solicitam confirmação.

      **Evidências:**
      - [Inserir captura do código: agregação nutricional, `validationAlert` e alerta de alergênicos em `src/App.tsx`]
      - [Inserir captura da tela: prescrição com totais ou alerta de validação]

      ### 3.6 Cadastro e edição de CIDs

      **Contexto técnico (o código).** O formulário permite criar diagnósticos com código, descrição e indicação de doença rara. Para doenças raras, também registra limites de proteína. A edição atualiza o documento existente no Firestore; a gravação é permitida somente a administradores e superadministradores.

      **Transição para a tela (o resultado).** Na aba **Banco de Dados > Doenças (CIDs) e Limites**, um perfil autorizado cadastra ou seleciona um CID existente para edição. A tabela apresenta os diagnósticos disponíveis aos perfis aprovados.

      **Evidências:**
      - [Inserir captura do código: `handleAddNewCid`, `handleEditCid` e operações `addCid`/`updateCid`]
      - [Inserir captura da tela: formulário e tabela de CIDs]

      ### 3.7 Manutenção e importação do catálogo de fórmulas

      **Contexto técnico (o código).** O catálogo de fórmulas é carregado do Firestore em tempo real. A tela administrativa permite exportar o catálogo CSV, baixar um modelo e importar planilhas. A importação interpreta cabeçalhos, valida campos numéricos e alergênicos, identifica atualizações pelo ID do Firebase e apresenta uma prévia; a gravação é bloqueada enquanto houver erros. A exclusão de uma fórmula em uso na prescrição ativa também é impedida.

      **Transição para a tela (o resultado).** Em **Banco de Dados > Fórmulas e Suplementos**, o administrador pode exportar, importar e revisar os registros. A prévia indica linhas novas, atualizações e erros antes de confirmar a operação.

      **Evidências:**
      - [Inserir captura do código: leitura/validação CSV, confirmação da importação e proteção contra exclusão em `src/App.tsx`]
      - [Inserir captura da tela: prévia CSV com linhas válidas e inválidas]
      - [Inserir captura da tela: catálogo de fórmulas]

      ### 3.8 Geração e impressão do relatório

      **Contexto técnico (o código).** A tela de laudo compõe os dados do paciente, a meta energética, o diagnóstico, as restrições alimentares e os itens da prescrição. Também apresenta adequação nutricional, volume por dieta e estimativa de latas por mês. O comando de impressão utiliza a função de impressão do navegador e estilos específicos para impressão.

      **Transição para a tela (o resultado).** Na aba **Laudo (Governo)**, o profissional revisa o documento e seleciona **Imprimir Relatório Oficial** para abrir o diálogo de impressão do navegador.

      **Evidências:**
      - [Inserir captura do código: composição do relatório e `handlePrint` em `src/App.tsx`]
      - [Inserir captura da tela: laudo preenchido antes da impressão]
      - [Inserir captura da visualização de impressão ou do documento gerado]

      ## 4. Procedimento sugerido para demonstração

      1. Acessar a aplicação com uma conta de demonstração autorizada.
      2. Demonstrar o cadastro institucional e o estado pendente, sem utilizar dados pessoais reais.
      3. Demonstrar a aprovação e os diferentes níveis de acesso com contas de teste.
      4. Informar dados clínicos fictícios e apresentar o cálculo energético.
      5. Montar uma prescrição de teste e demonstrar os totais e uma validação.
      6. Apresentar o cadastro/edição de CID e a prévia de importação de fórmulas.
      7. Gerar o laudo e registrar a visualização de impressão.

      As capturas devem ocultar e-mails, nomes, matrículas, diagnósticos e quaisquer outros dados pessoais ou clínicos reais. Utilize registros fictícios nas imagens da demonstração.

      ## 5. Configuração do ambiente Firebase

      1. No Firebase Console, habilite **Authentication > Sign-in method > Email/Password**.
      2. Configure as variáveis `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID` e, se utilizado, `VITE_FIREBASE_MEASUREMENT_ID`.
      3. Crie manualmente a conta inicial de superadministrador em **Authentication > Users**.
      4. Copie o UID da conta e crie no Firestore o documento `staff/{UID}` com os campos `email` e `role: "superadmin"`.
      5. Publique as regras do Firestore após revisar o projeto de destino: `firebase deploy --only firestore:rules --project <id-do-projeto>`.
      6. Gere a versão de produção com `npm run build` e publique o hosting configurado no Firebase, se aplicável.

      O cadastro público aceita endereços `@hpp.org.br` e cria perfis pendentes até a aprovação do superadministrador. Não há verificação de e-mail implementada no fluxo de cadastro; o domínio, por si só, não comprova a identidade do profissional. A aprovação deve ser feita apenas para pessoas reconhecidas pela equipe responsável.

      ## 6. Considerações sobre dados

      Os dados do paciente e a prescrição corrente são mantidos no estado da interface durante o uso. As coleções persistidas observadas neste projeto são `staff`, `formulas` e `cids`. Para demonstrações e capturas, utilize dados fictícios e não registre informações identificáveis de pacientes.
