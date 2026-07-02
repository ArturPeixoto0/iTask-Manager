"use strict";
class Tarefa {
    titulo;
    horario;
    completa;
    descricao;
    constructor(tituloTarefa, horarioCriacao = new Date, tarefaCompleta, descricaoTarefa) {
        this.titulo = tituloTarefa;
        this.horario = horarioCriacao;
        this.completa = tarefaCompleta;
        this.descricao = descricaoTarefa;
    }
    criaTarefa() {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${this.titulo}</strong>`;
        if (this.descricao != undefined) {
            li.innerHTML += ` (${this.descricao})`;
        }
        li.innerHTML += ` | ${this.horario}`;
        return li;
    }
}
let Tarefas = [];
const json = JSON.parse(localStorage.getItem("lista_tarefas") || "[]");
for (let i = 0; i < json.length; i++) {
    let aux = new Tarefa(json[i].titulo, new Date(json[i].horario), json[i].completa, json[i].descricao); //o aux é composto pelo primeiro elemento do json
    Tarefas.push(aux);
}
for (let i = 0; i < Tarefas.length; i++) {
    document.getElementById('listaTarefas')?.appendChild(Tarefas[i].criaTarefa());
}
const btnAdicionar = document.getElementById('addBtn');
btnAdicionar.addEventListener('click', () => {
    const inputT = document.getElementById('tituloInput');
    const inputD = document.getElementById('descricaoInput');
    const agora = new Date;
    let novaTarefa = new Tarefa("", agora, false); //se for consts ela n muda
    if (inputT.value === "")
        return;
    if (inputD.value === "") {
        novaTarefa = new Tarefa(inputT.value, agora, false);
    }
    else {
        novaTarefa = new Tarefa(inputT.value, agora, false, inputD.value);
    }
    document.getElementById('listaTarefas')?.appendChild(novaTarefa.criaTarefa());
    Tarefas.push(novaTarefa);
    localStorage.setItem("lista_tarefas", JSON.stringify(Tarefas));
});
//localStorage.setItem("lista_tarefas", JSON.stringify(Tarefas));
