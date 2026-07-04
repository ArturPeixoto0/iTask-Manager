function RemoveDaMemoria() {
    for (let i =0; i<Tarefas.length; i++){
        if (Tarefas[i].deletada === true){
            Tarefas.splice(i, 1);
            i--;
        }
        else if (Tarefas[i].completa === true){
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
    horario: string;
    completa: boolean;
    deletada: boolean;
    descricao?: string;

    constructor(tituloTarefa: string, horarioCriacao:string, descricaoTarefa?:string, concluida: boolean = false,apagada: boolean = false) {
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

        const checkCOMPL = document.createElement('input') as HTMLInputElement;
        checkCOMPL.type = 'checkbox';
        checkCOMPL.addEventListener('change', () => {
            li.remove();
            this.completar();
            document.getElementById('listaConcluidas')?.appendChild(this.criaConcluida());
            Concluidas.push(this);
            localStorage.setItem("lista_concluidas", JSON.stringify(Concluidas));
            RemoveDaMemoria();
        })
        li.appendChild(checkCOMPL);

        const textoTarefa = document.createElement('span');

        textoTarefa.innerHTML=` <strong>${this.titulo}</strong>`

        textoTarefa.innerHTML += ` | ${this.horario}    `

        li.appendChild(textoTarefa);

        const botaoDEL = document.createElement('button') as HTMLButtonElement;
        botaoDEL.innerHTML += "X";
        botaoDEL.addEventListener('click', () => {
            li.remove(); 
            this.deletar();
            RemoveDaMemoria();
        })
        li.appendChild(botaoDEL);


        const textoDescricao = document.createElement('span');
        if (this.descricao != undefined){
            textoDescricao.innerHTML += `<br>(${this.descricao})<br>`
            li.appendChild(textoDescricao);
        }



        const dellALL = document.getElementById('btnDelALL') as HTMLButtonElement;
        dellALL.addEventListener('click', () => {
            botaoDEL.click();            
        })

        return li;
    }

    criaConcluida(){
        const li = document.createElement('li') as HTMLLIElement;

        const checkDESCOMPL = document.createElement('input') as HTMLInputElement;
        checkDESCOMPL.type = 'checkbox';
        checkDESCOMPL.checked = true;
        checkDESCOMPL.addEventListener('change', () => {
            li.remove();
            this.completa = false;
            document.getElementById('listaTarefas')?.appendChild(this.criaTarefa());
            Tarefas.push(this);
            localStorage.setItem("lista_tarefas", JSON.stringify(Tarefas));
            RemoveDaMemoria();
        })
        li.appendChild(checkDESCOMPL);


        const textoTarefa = document.createElement('span');

        textoTarefa.innerHTML=` <strong>${this.titulo}</strong>`

        textoTarefa.innerHTML += ` | ${this.horario}    `

        li.appendChild(textoTarefa);

        const botaoDEL = document.createElement('button') as HTMLButtonElement;
        botaoDEL.innerHTML += "X";
        botaoDEL.addEventListener('click', () => {
            li.remove(); 
            this.deletar();
            RemoveDaMemoria();
        })
        li.appendChild(botaoDEL);


        const textoDescricao = document.createElement('span');
        if (this.descricao != undefined){
            textoDescricao.innerHTML += `<br>(${this.descricao})<br>`
            li.appendChild(textoDescricao);
        }



        const dellALL = document.getElementById('btnDelALL') as HTMLButtonElement;
        dellALL.addEventListener('click', () => {
            botaoDEL.click();            
        })

        return li;
    }

}

let jsonT = JSON.parse(localStorage.getItem("lista_tarefas") || "[]");
let jsonC = JSON.parse(localStorage.getItem("lista_concluidas") || "[]");

let Tarefas: Tarefa[] = [];

for (let i = 0; i<jsonT.length; i++){
    let auxT = new Tarefa(
    jsonT[i].titulo,
    jsonT[i].horario,
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
    jsonC[i].horario,
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
    const data: Date = new Date;
    const agora: string = `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()} às ${data.toLocaleTimeString('pt-BR')}`;

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








