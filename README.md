# App de Metas

Este é um aplicativo de linha de comando que permite o gerenciamento de metas. Ele permite cadastrar, listar, marcar metas como concluídas, visualizar metas abertas, deletar metas e salvar os dados localmente.

## Funcionalidades

- **Cadastrar Meta**: Adiciona uma nova meta à lista.
- **Listar Metas**: Exibe todas as metas cadastradas, permitindo marcar metas como concluídas.
- **Metas Realizadas**: Mostra todas as metas que foram concluídas.
- **Metas Abertas**: Exibe todas as metas que ainda não foram concluídas.
- **Deletar Metas**: Permite excluir metas selecionadas.
- **Persistência de Dados**: As metas são salvas localmente no arquivo `metas.json`.

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado.
- Pacote [@inquirer/prompts](https://www.npmjs.com/package/@inquirer/prompts) instalado:
  ```bash npm install
   @inquirer/prompt
  
  
# Como rodar:
1. Clone o repositorio: 
   git clone https://github.com/seu-usuario/app-de-metas.git
2. Instale as dependencias:
   npm install
3. Execute o aplicativo:
   node index.js
