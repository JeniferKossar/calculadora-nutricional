# Guia de Segurança - Calculadora Nutricional

## Proteção de Credenciais

Este projeto utiliza Firebase e contém informações sensíveis que não devem ser compartilhadas.

### ✅ Faça

- Use o arquivo `.env.example` como referência
- Crie seu próprio `.env.local` com suas credenciais
- Mantenha `.env.local` fora do repositório (já está no `.gitignore`)
- Revise sempre seus commits antes de fazer push
- Use variáveis de ambiente para todas as credenciais
- Rotacione credenciais se forem acidentalmente expostas
- Utilize o Firebase Console para gerenciar chaves de API

### ❌ Não Faça

- Nunca commite arquivos `.env`, `.env.local` ou `.env.*.local`
- Nunca compartilhe suas credenciais do Firebase em código ou mensagens
- Nunca coloque `apiKey` ou `projectId` em comentários de código
- Nunca faça push de `serviceAccountKey.json` ou arquivos similares
- Nunca copie credenciais de produção para repositórios públicos

## Estrutura de Segurança

### Variáveis de Ambiente

Todas as credenciais são carregadas via `import.meta.env.VITE_FIREBASE_*`:

```typescript
// Correto ✅
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

// Incorreto ❌
const apiKey = 'AIzaSyDxxx...';
```

### Firestore Rules

As regras no `firestore.rules` controlam:
- Quem pode ler dados
- Quem pode escrever dados
- Quem pode deletar dados

Nunca enfraque as regras para "facilitar o desenvolvimento".

### Autenticação

- Sempre use autenticação do Firebase
- Valide perfis de usuário em `firestore.rules`
- Não confie apenas em validações do cliente

## Se Você Acidentalmente Expuser Credenciais

1. **Não panique** — O Firebase tem proteções automáticas
2. **Revogue as credenciais** no Firebase Console imediatamente
3. **Crie novas credenciais**
4. **Atualize** `.env.local` localmente
5. **Abra um issue privado** (se aplicável) documentando o incidente
6. **Nunca** tente "remover" de commits públicos — a chave já foi exposta

## Checklist antes de um Commit

- [ ] Nenhum arquivo `.env*` será commitado
- [ ] Nenhuma chave de API nos comentários
- [ ] Nenhuma credencial no código-fonte
- [ ] `.env.example` tem apenas placeholder (`...here`, `your_...`)
- [ ] Revisei `.gitignore` para arquivos sensíveis
- [ ] Nenhum `serviceAccountKey.json` ou credenciais Firebase

## Mais Informações

- [Firebase Security Best Practices](https://firebase.google.com/docs/projects/learn-more)
- [OWASP Secrets Management](https://owasp.org/www-project-secrets-management/)
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)
