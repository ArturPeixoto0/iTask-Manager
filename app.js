"use strict";
class Tarefa {
    titulo;
    descricao;
    horario;
    constructor(tituloTarefa, horarioCriacao = new Date, descricaoTarefa) {
        this.titulo = tituloTarefa;
        this.descricao = descricaoTarefa;
        this.horario = horarioCriacao;
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
const btn = document.getElementById('addBtn');
btn.addEventListener('click', () => {
    const inputT = document.getElementById('tituloInput');
    const inputD = document.getElementById('descricaoInput');
    const agora = new Date;
    let novaTarefa = new Tarefa("", agora); //se for consts ela n muda
    if (inputT.value === "")
        return;
    if (inputD.value === "") {
        novaTarefa = new Tarefa(inputT.value, agora);
    }
    else {
        novaTarefa = new Tarefa(inputT.value, agora, inputD.value);
    }
    document.getElementById('listaTarefas')?.appendChild(novaTarefa.criaTarefa());
});
