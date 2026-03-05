# API Técnica (Projeto Registro de Glicose)

Documentação rápida das classes e métodos usados na aplicação.

## `Controller`
Arquivo: `src/controllers/controllers.js`

Responsável por controlar estado visual das seções da página.

### `ativarFormulario(mostrarDiv)`

- Parâmetros:
  - `mostrarDiv: HTMLElement`
- Efeito:
  - Define `mostrarDiv.hidden = false`.

### `desativarDisplayInicial(devInicial)`

- Parâmetros:
  - `devInicial: HTMLElement`
- Efeito:
  - Define `devInicial.hidden = true`.

### `resetarTelaInicial(hero, secaoFormulario, secaoDados, status)`

- Parâmetros:
  - `hero: HTMLElement`
  - `secaoFormulario: HTMLElement`
  - `secaoDados: HTMLElement`
  - `status: HTMLElement | null`
- Efeito:
  - Volta a tela para o estado inicial:
    - `hero.hidden = false`
    - `secaoFormulario.hidden = true`
    - `secaoDados.hidden = true`
  - Limpa mensagem de status e remove classe de erro.

## `MedicaoModel`
Arquivo: `src/models/medicaoModel.js`

Responsável por validação básica e persistência local.

### Propriedade

- `chave = 'medicao'`

Chave usada no `localStorage`.

### `salvar({ nome, data, medicao })`

- Parâmetros:
  - `nome: string`
  - `data: string` (`YYYY-MM-DD`)
  - `medicao: number`
- Retorno:
  - Erro de validação:
    - `{ ok: false, erro: string }`
  - Sucesso:
    - `{ ok: true, dados: { nome, data, medicao } }`
- Efeito:
  - Lê os registros atuais.
  - Adiciona nova medição.
  - Salva novamente no `localStorage`.

### `listar()`

- Retorno:
  - `Array<{ nome: string, data: string, medicao: number }>`
- Efeito:
  - Lê os dados da chave `medicao` no `localStorage`.
  - Se não houver dados, retorna `[]`.

## `MedicaoController`
Arquivo: `src/controllers/medicaoController.js`

Responsável por integrar formulário, model e renderização na UI.

### `constructor(model)`

- Parâmetros:
  - `model: MedicaoModel`
- Efeito:
  - Injeta dependência para salvar/listar medições.

### `enviarFormulario(event)`

- Parâmetros:
  - `event: SubmitEvent`
- Efeito:
  - Cancela submit padrão (`preventDefault`).
  - Lê e normaliza dados do formulário.
  - Chama `model.salvar(...)`.
  - Exibe status de erro/sucesso.
  - Limpa mensagem com `setTimeout`.
  - Reseta formulário em sucesso.

### `classificarMedicao(valor)`

- Parâmetros:
  - `valor: number`
- Retorno:
  - `'baixo' | 'normal' | 'alto'`
- Regra:
  - `< 70` -> `baixo`
  - `> 180` -> `alto`
  - caso contrário -> `normal`

### `mostrarRegistros()`

- Efeito:
  - Busca dados com `model.listar()`.
  - Renderiza itens em `#lista`.
  - Formata:
    - data: `toLocaleDateString('pt-BR')`
    - medição: `toLocaleString('pt-BR')`
  - Exibe seção `#mostrar-dados`.

## `app.js` (orquestração)
Arquivo: `app.js`

Responsável por iniciar objetos e vincular eventos DOM.

### Instâncias

- `displayForm = new Controller()`
- `model = new MedicaoModel()`
- `controllers = new MedicaoController(model)`

### Eventos principais

- `#mostrar-formulario` (`click`)
  - Exibe formulário e oculta seção inicial.
- `.form` (`submit`)
  - Chama `controllers.enviarFormulario(event)`.
- `#mostrar-registros` (`click`)
  - Chama `controllers.mostrarRegistros()`.
- `#sair` (`click`)
  - Chama `displayForm.resetarTelaInicial(...)`.

