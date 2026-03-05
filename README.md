# Registro de Glicose

Aplicação web simples para registrar medições de glicose, salvar no `localStorage` e visualizar os registros formatados em pt-BR.

## Objetivo

Facilitar o acompanhamento pessoal de medições de glicose com uma interface leve, responsiva e sem backend.

## Funcionalidades

- Exibir formulário de medição.
- Salvar medição (`nome`, `data`, `medicao`) no `localStorage`.
- Mostrar mensagem de sucesso/erro com limpeza automática.
- Listar registros salvos.
- Formatar data e número para padrão brasileiro na visualização.
- Classificar medição em `baixo`, `normal` ou `alto`.
- Voltar para estado inicial da tela com botão `Sair`.
- Exibir assinatura e aviso no rodapé.

## Regras atuais de classificação

- `baixo`: valor `< 70`
- `normal`: valor entre `70` e `180`
- `alto`: valor `> 180`

Observação: essas faixas são referência geral para acompanhamento pessoal e não substituem orientação médica.

## Tecnologias

- HTML5
- CSS3
- JavaScript (ES Modules no navegador)
- `localStorage` para persistência local

## Documentação técnica

- API interna: `docs/API.md`

## Estrutura do projeto

```text
Registro de Glicose/
├── index.html
├── app.js
├── package.json
└── src/
    ├── controllers/
    │   ├── controllers.js
    │   └── medicaoController.js
    ├── models/
    │   └── medicaoModel.js
    └── style/
        ├── main.css
        └── variaveis.css
```

## Arquitetura (resumo)

- `Controller` (`src/controllers/controllers.js`)
  - Controla estados visuais da tela (`hero`, formulário e seção de dados).
- `MedicaoController` (`src/controllers/medicaoController.js`)
  - Lê campos do formulário.
  - Chama o model para salvar.
  - Exibe status de erro/sucesso.
  - Renderiza lista de registros.
- `MedicaoModel` (`src/models/medicaoModel.js`)
  - Valida dados básicos.
  - Salva e lista dados no `localStorage` usando a chave `medicao`.

## Como executar

Como o projeto usa `import` no navegador, abra via servidor local (não via arquivo direto `file://`).

### Opção 1: VS Code Live Server

1. Abra a pasta do projeto no VS Code.
2. Clique com botão direito em `index.html`.
3. Selecione `Open with Live Server`.

### Opção 2: servidor simples com Node

Se tiver `npx` disponível:

```bash
npx serve .
```

Depois acesse a URL exibida no terminal.

## Fluxo principal da aplicação

1. Clique em `Começar a medição`.
2. Preencha nome, data e medição.
3. Clique em `Salvar medição`.
4. Clique em `Mostrar registros` para listar os dados salvos.
5. Clique em `Sair` para voltar ao estado inicial.

## Persistência de dados

- Chave usada: `medicao`
- Tipo salvo: array de objetos JSON

Exemplo de item salvo:

```json
{
  "nome": "maria",
  "data": "2026-03-05",
  "medicao": 98.5
}
```

## Limpar dados de teste

No DevTools do navegador:

```js
localStorage.removeItem('medicao')
```

Para apagar tudo do `localStorage` do domínio atual:

```js
localStorage.clear()
```

## Aviso importante

Este projeto é para acompanhamento pessoal e educativo. Não substitui avaliação, diagnóstico ou orientação de profissionais de saúde.
