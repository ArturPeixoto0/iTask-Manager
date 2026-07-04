"use strict";
function RemoveDaMemoria() {
    for (let i = 0; i < Tarefas.length; i++) {
        if (Tarefas[i].deletada === true) {
            Tarefas.splice(i, 1);
            i--;
        }
        else if (Tarefas[i].completa === true) {
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
    constructor(tituloTarefa, horarioCriacao, descricaoTarefa, concluida = false, apagada = false) {
        this.titulo = tituloTarefa;
        this.horario = horarioCriacao;
        this.completa = concluida;
        this.deletada = apagada;
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
        const checkCOMPL = document.createElement('input');
        checkCOMPL.type = 'checkbox';
        checkCOMPL.addEventListener('change', () => {
            li.remove();
            this.completar();
            document.getElementById('listaConcluidas')?.appendChild(this.criaConcluida());
            Concluidas.push(this);
            localStorage.setItem("lista_concluidas", JSON.stringify(Concluidas));
            RemoveDaMemoria();
        });
        li.appendChild(checkCOMPL);
        const textoTarefa = document.createElement('span');
        textoTarefa.innerHTML = ` <strong>${this.titulo}</strong>`;
        textoTarefa.innerHTML += ` | ${this.horario}    `;
        li.appendChild(textoTarefa);
        const botaoDEL = document.createElement('button');
        botaoDEL.innerHTML += "X";
        botaoDEL.addEventListener('click', () => {
            li.remove();
            this.deletar();
            RemoveDaMemoria();
        });
        li.appendChild(botaoDEL);
        const textoDescricao = document.createElement('span');
        if (this.descricao != undefined) {
            textoDescricao.innerHTML += `<br>(${this.descricao})<br>`;
            li.appendChild(textoDescricao);
        }
        const dellALL = document.getElementById('btnDelALL');
        dellALL.addEventListener('click', () => {
            botaoDEL.click();
        });
        return li;
    }
    criaConcluida() {
        const li = document.createElement('li');
        const checkDESCOMPL = document.createElement('input');
        checkDESCOMPL.type = 'checkbox';
        checkDESCOMPL.checked = true;
        checkDESCOMPL.addEventListener('change', () => {
            li.remove();
            this.completa = false;
            document.getElementById('listaTarefas')?.appendChild(this.criaTarefa());
            Tarefas.push(this);
            localStorage.setItem("lista_tarefas", JSON.stringify(Tarefas));
            RemoveDaMemoria();
        });
        li.appendChild(checkDESCOMPL);
        const textoTarefa = document.createElement('span');
        textoTarefa.innerHTML = ` <strong>${this.titulo}</strong>`;
        textoTarefa.innerHTML += ` | ${this.horario}    `;
        li.appendChild(textoTarefa);
        const botaoDEL = document.createElement('button');
        botaoDEL.innerHTML += "X";
        botaoDEL.addEventListener('click', () => {
            li.remove();
            this.deletar();
            RemoveDaMemoria();
        });
        li.appendChild(botaoDEL);
        const textoDescricao = document.createElement('span');
        if (this.descricao != undefined) {
            textoDescricao.innerHTML += `<br>(${this.descricao})<br>`;
            li.appendChild(textoDescricao);
        }
        const dellALL = document.getElementById('btnDelALL');
        dellALL.addEventListener('click', () => {
            botaoDEL.click();
        });
        return li;
    }
}
let jsonT = JSON.parse(localStorage.getItem("lista_tarefas") || "[]");
let jsonC = JSON.parse(localStorage.getItem("lista_concluidas") || "[]");
let Tarefas = [];
for (let i = 0; i < jsonT.length; i++) {
    let auxT = new Tarefa(jsonT[i].titulo, jsonT[i].horario, jsonT[i].descricao, jsonT[i].completa, jsonT[i].deletada); //o aux é composto pelo primeiro elemento do json
    Tarefas.push(auxT);
}
let Concluidas = [];
for (let i = 0; i < jsonC.length; i++) {
    let auxC = new Tarefa(jsonC[i].titulo, jsonC[i].horario, jsonC[i].descricao, jsonC[i].completa, jsonC[i].deletada); //o aux é composto pelo elemento i do json
    Concluidas.push(auxC);
}
for (let i = 0; i < Tarefas.length; i++) {
    if (Tarefas[i].completa === false) {
        document.getElementById('listaTarefas')?.appendChild(Tarefas[i].criaTarefa());
    }
}
for (let i = 0; i < Concluidas.length; i++) {
    if (Concluidas[i].completa === true) {
        document.getElementById('listaConcluidas')?.appendChild(Concluidas[i].criaConcluida());
    }
}
const btnAdicionar = document.getElementById('addBtn');
btnAdicionar.addEventListener('click', () => {
    const inputT = document.getElementById('tituloInput');
    const inputD = document.getElementById('descricaoInput');
    const data = new Date;
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();
    const diaCZ = dia.toString().padStart(2, '0');
    const mesCZ = mes.toString().padStart(2, '0');
    const agora = `${diaCZ}/${mesCZ}/${ano} às ${data.toLocaleTimeString('pt-BR')}`;
    if (inputT.value === "") {
        return;
    }
    let novaTarefa = new Tarefa("", agora); //se for const ela nao muda
    if (inputD.value === "") {
        novaTarefa = new Tarefa(inputT.value, agora);
    }
    else {
        novaTarefa = new Tarefa(inputT.value, agora, inputD.value);
    }
    document.getElementById('listaTarefas')?.appendChild(novaTarefa.criaTarefa());
    Tarefas.push(novaTarefa);
    localStorage.setItem("lista_tarefas", JSON.stringify(Tarefas));
});
const dellALL = document.getElementById('btnDelALL');
dellALL.addEventListener('click', () => {
    let ListaT = document.getElementById('listaTarefas');
    let ListaC = document.getElementById('listaConcluidas');
    if (ListaT != null) {
        ListaT.innerHTML = "";
    }
    if (ListaC != null) {
        ListaC.innerHTML = "";
    }
});
