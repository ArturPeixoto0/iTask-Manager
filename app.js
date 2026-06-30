"use strict";
class Tarefa {
    titulo;
    descricao;
    constructor(tituloTarefa, descricaoTarefa) {
        this.titulo = tituloTarefa;
        this.descricao = descricaoTarefa;
    }
    criaTarefa() {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${this.titulo}</strong>`;
        if (this.descricao != undefined) {
            li.innerHTML += ` (${this.descricao})`;
        }
        return li;
    }
}
const btn = document.getElementById('addBtn');
btn.addEventListener('click', () => {
    const inputT = document.getElementById('tituloInput');
    const inputD = document.getElementById('descricaoInput');
    let novaTarefa = new Tarefa("", ""); //se for conts ela n muda
    if (inputT.value === "")
        return;
    if (inputD.value === undefined) {
        novaTarefa = new Tarefa(inputT.value);
    }
    else {
        novaTarefa = new Tarefa(inputT.value, inputD.value);
    }
    document.getElementById('listaTarefas')?.appendChild(novaTarefa.criaTarefa());
});
