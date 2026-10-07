# iTask-Manager

Gerenciador de tarefas desenvolvido com TypeScript, criado para praticar conceitos de programação orientada a objetos, manipulação do DOM e armazenamento de dados no navegador.

## Sobre o projeto

O iTask-Manager permite que o usuário crie, visualize, conclua e exclua tarefas.

Cada tarefa possui informações como título, descrição e momento de criação. As tarefas podem ser organizadas entre tarefas pendentes e concluídas.

O projeto também utiliza o armazenamento local do navegador para manter os dados entre diferentes sessões.

## Funcionalidades

- Criação de tarefas;
- Registro do momento de criação;
- Listagem de tarefas pendentes;
- Marcação de tarefas como concluídas;
- Listagem de tarefas concluídas;
- Exclusão de tarefas;
- Exclusão de todas as tarefas;
- Persistência utilizando localStorage;
- Atualização dinâmica da interface.

## Tecnologias utilizadas

- HTML5
- CSS3
- TypeScript
- JavaScript
- DOM API
- localStorage
- Git
- GitHub

## Estrutura do projeto

Os principais arquivos do projeto são:

- `index.html`: estrutura da aplicação;
- `style.css`: estilização da interface;
- `app.ts`: implementação da lógica da aplicação;
- `app.js`: arquivo JavaScript gerado a partir da compilação do TypeScript.

## Conceitos praticados

O projeto foi desenvolvido com foco no aprendizado de:

- Classes;
- Objetos;
- Construtores;
- Métodos;
- Manipulação do DOM;
- Eventos;
- Armazenamento local;
- Tipagem com TypeScript;
- Compilação de TypeScript para JavaScript.

## Compilação

O código principal da aplicação é desenvolvido em TypeScript e posteriormente compilado para JavaScript utilizando o compilador TypeScript.

O arquivo JavaScript utilizado pelo navegador deve ser resultado da compilação do código TypeScript, evitando alterações manuais no arquivo gerado.

## Status

Em desenvolvimento.

## Melhorias previstas

- Garantir a sincronização entre os dados da aplicação, localStorage e interface;
- Corrigir o comportamento da função de exclusão de todas as tarefas;
- Melhorar a diferenciação visual entre tarefas pendentes e concluídas;
- Evitar o registro repetido de listeners de eventos;
- Aprimorar o gerenciamento da movimentação das tarefas entre estados.
