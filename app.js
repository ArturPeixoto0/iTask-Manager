"use strict";
function RemoveDaMemoria() {
    for (let i = 0; i < Tarefas.length; i++) {
        if (Tarefas[i].deletada === true) {
            Tarefas.splice(i, 1);
            i--;
        }
    }
    localStorage.setItem("lista_tarefas", JSON.stringify(Tarefas));
    for (let i = 0; i < Concluidas.length; i++) {
        if (Concluidas[i].deletada === true) {
            Concluidas.splice(i, 1);
            i--;
        }
    }
    localStorage.setItem("lista_concluidas", JSON.stringify(Concluidas));
}
class Tarefa {
    titulo;
    horario;
    completa;
    deletada;
    descricao;
    constructor(tituloTarefa, horarioCriacao = new Date, descricaoTarefa) {
        this.titulo = tituloTarefa;
        this.horario = horarioCriacao;
        this.completa = false;
        this.deletada = false;
        this.descricao = descricaoTarefa;
    }
    completar() {
        this.completa = true;
    }
    deletar() {
        this.deletada = true;
    }
    criaTarefa() {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${this.titulo}</strong>`;
        li.innerHTML += ` | ${this.horario}  `;
        if (this.descricao != undefined) {
            li.innerHTML += `<br>(${this.descricao})<br>`;
        }
        const botaoCOMPL = document.createElement('button');
        botaoCOMPL.innerHTML += "completar";
        botaoCOMPL.addEventListener('click', () => {
            this.completar();
            this.criaConcluida();
            li.style.display = "none";
            RemoveDaMemoria();
        });
        li.appendChild(botaoCOMPL);
        li.innerHTML += `  `;
        const botaoDEL = document.createElement('button');
        botaoDEL.innerHTML += "deletar";
        botaoDEL.addEventListener('click', () => {
            li.style.display = "none";
            this.deletar();
            RemoveDaMemoria();
        });
        li.appendChild(botaoDEL);
        return li;
    }
    criaConcluida() {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${this.titulo}</strong>`;
        li.innerHTML += ` | ${this.horario}  `;
        if (this.descricao != undefined) {
            li.innerHTML += `<br>(${this.descricao})<br>`;
        }
        const botaoDEL = document.createElement('button');
        botaoDEL.innerHTML += "deletar";
        botaoDEL.addEventListener('click', () => {
            li.style.display = "none";
            this.deletar();
            RemoveDaMemoria();
        });
        li.appendChild(botaoDEL);
        return li;
    }
}
let Tarefas = [];
const jsonT = JSON.parse(localStorage.getItem("lista_tarefas") || "[]");
for (let i = 0; i < jsonT.length; i++) {
    let auxT = new Tarefa(jsonT[i].titulo, new Date(jsonT[i].horario), jsonT[i].descricao); //o aux é composto pelo primeiro elemento do json
    Tarefas.push(auxT);
}
let Concluidas = [];
const jsonC = JSON.parse(localStorage.getItem("lista_concluidas") || "[]");
for (let i = 0; i < jsonC.length; i++) {
    let auxC = new Tarefa(jsonC[i].titulo, new Date(jsonC[i].horario), jsonC[i].descricao); //o aux é composto pelo primeiro elemento do json
    Tarefas.push(auxC);
}
for (let i = 0; i < Tarefas.length; i++) {
    if (Tarefas[i].completa === false) {
        document.getElementById('listaTarefas')?.appendChild(Tarefas[i].criaTarefa());
    }
    else {
        document.getElementById('listaConcluidas')?.appendChild(Tarefas[i].criaConcluida());
    }
}
const btnAdicionar = document.getElementById('addBtn');
btnAdicionar.addEventListener('click', () => {
    const inputT = document.getElementById('tituloInput');
    const inputD = document.getElementById('descricaoInput');
    const agora = new Date;
    if (inputT.value === "")
        return;
    let novaTarefa = new Tarefa("", agora); //se for consts ela nao muda
    if (inputD.value === "") {
        novaTarefa = new Tarefa(inputT.value, agora);
    }
    else {
        novaTarefa = new Tarefa(inputT.value, agora, inputD.value);
    }
    if (novaTarefa.deletada === false && novaTarefa.completa === false) {
        document.getElementById('listaTarefas')?.appendChild(novaTarefa.criaTarefa());
        Tarefas.push(novaTarefa);
    }
    if (novaTarefa.deletada === false && novaTarefa.completa === true) {
        document.getElementById('listaConcluidas')?.appendChild(novaTarefa.criaConcluida());
        Concluidas.push(novaTarefa);
    }
});
localStorage.setItem("lista_tarefas", JSON.stringify(Tarefas));
localStorage.setItem("lista_concluidas", JSON.stringify(Concluidas));
