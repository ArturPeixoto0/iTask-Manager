function RemoveDaMemoria() {
    for (let i =0; i<Tarefas.length; i++){
        if (Tarefas[i].deletada === true){
            Tarefas.splice(i, 1);
            i--;
        }
        if (Tarefas[i].completa === true){
            Tarefas.splice(i, 1);
            i--;
        }
    }
    localStorage.setItem("lista_tarefas", JSON.stringify(Tarefas));

    for (let i =0; i<Concluidas.length; i++){
        if (Concluidas[i].deletada === true){
            Concluidas.splice(i, 1);
            i--;
        }
    }
    localStorage.setItem("lista_concluidas", JSON.stringify(Concluidas));
}

class Tarefa{
    titulo: string;
    horario: Date;
    completa: boolean;
    deletada: boolean;
    descricao?: string;

    constructor(tituloTarefa: string, horarioCriacao:Date = new Date, descricaoTarefa?:string, concluida: boolean = false,apagada: boolean = false) {
        this.titulo = tituloTarefa;
        this.horario = horarioCriacao;
        this.completa = concluida;
        this.deletada = apagada;
        this.descricao = descricaoTarefa;
    }

    completar(){
        this.completa = true;
    }

    deletar (){
        this.deletada = true;
    }


    criaTarefa() {
        const li = document.createElement('li') as HTMLLIElement;

        li.innerHTML=`<strong>${this.titulo}</strong>`

        li.innerHTML += ` | ${this.horario}  <br>`

        if (this.descricao != undefined){
            li.innerHTML += `(${this.descricao})<br>`
        }

        const botaoCOMPL = document.createElement('button') as HTMLButtonElement;
        botaoCOMPL.innerHTML += "concluir";
        botaoCOMPL.addEventListener('click', () => {
            li.remove();
            this.completar();
            document.getElementById('listaConcluidas')?.appendChild(this.criaConcluida());
            Concluidas.push(this);
            localStorage.setItem("lista_concluidas", JSON.stringify(Concluidas));
            RemoveDaMemoria();
        })
        li.appendChild(botaoCOMPL);

        const botaoDEL = document.createElement('button') as HTMLButtonElement;
        botaoDEL.innerHTML += "deletar";
        botaoDEL.addEventListener('click', () => {
            li.remove(); 
            this.deletar();
            RemoveDaMemoria();
        })
        li.appendChild(botaoDEL);

        const dellALL = document.getElementById('btnDelALL') as HTMLButtonElement;
        dellALL.addEventListener('click', () => {
            botaoDEL.click();            
        })

        return li;
    }

    criaConcluida(){
        const li = document.createElement('li') as HTMLLIElement;

        li.innerHTML=`<strong>${this.titulo}</strong>`

        li.innerHTML += ` | ${this.horario}  <br>`

        if (this.descricao != undefined){
            li.innerHTML += `(${this.descricao})<br>`
        }

        const botaoDEL = document.createElement('button');
        botaoDEL.innerHTML += "deletar";
        botaoDEL.addEventListener('click', () => {
            li.remove(); 
            this.deletar();
            RemoveDaMemoria();
        })
        li.appendChild(botaoDEL);


        return li;
    }

}

let jsonT = JSON.parse(localStorage.getItem("lista_tarefas") || "[]");
let jsonC = JSON.parse(localStorage.getItem("lista_concluidas") || "[]");

let Tarefas: Tarefa[] = [];

for (let i = 0; i<jsonT.length; i++){
    let auxT = new Tarefa(
    jsonT[i].titulo,
    new Date(jsonT[i].horario),
    jsonT[i].descricao,
    jsonT[i].completa,
    jsonT[i].deletada,
    ) //o aux é composto pelo primeiro elemento do json
    Tarefas.push(auxT);
}

let Concluidas: Tarefa[] = [];

for (let i = 0; i<jsonC.length; i++){
    let auxC = new Tarefa(
    jsonC[i].titulo,
    new Date(jsonC[i].horario),
    jsonC[i].descricao,
    jsonC[i].completa,
    jsonC[i].deletada,
    ) //o aux é composto pelo elemento i do json
    Concluidas.push(auxC);
}

for(let i = 0; i <Tarefas.length; i++){
    if (Tarefas[i].completa === false){
        document.getElementById('listaTarefas')?.appendChild(Tarefas[i].criaTarefa());
    }
}

for(let i = 0; i <Concluidas.length; i++){
    if (Concluidas[i].completa === true){
        document.getElementById('listaConcluidas')?.appendChild(Concluidas[i].criaConcluida());
    }
}


const btnAdicionar = document.getElementById('addBtn') as HTMLButtonElement;
btnAdicionar.addEventListener('click', () => {
    const inputT = document.getElementById('tituloInput') as HTMLInputElement;
    const inputD = document.getElementById('descricaoInput') as HTMLInputElement;
    const agora: Date = new Date;

    if (inputT.value === ""){
        return; 
    }
    
    let novaTarefa = new Tarefa("", agora); //se for const ela nao muda
    
    if (inputD.value === ""){ 
        novaTarefa = new Tarefa(inputT.value, agora);
    }
    else {
        novaTarefa = new Tarefa(inputT.value, agora, inputD.value);
    }

    document.getElementById('listaTarefas')?.appendChild(novaTarefa.criaTarefa());
    Tarefas.push(novaTarefa);
    localStorage.setItem("lista_tarefas", JSON.stringify(Tarefas));
})

const dellALL = document.getElementById('btnDelALL') as HTMLButtonElement;
dellALL.addEventListener('click', () => {
    let ListaT = document.getElementById('listaTarefas') as HTMLLIElement;
    let ListaC = document.getElementById('listaConcluidas') as HTMLLIElement;

    if (ListaT != null){
        ListaT.innerHTML = "";
    }
    if (ListaC != null){
        ListaC.innerHTML = "";
    }
               
})








