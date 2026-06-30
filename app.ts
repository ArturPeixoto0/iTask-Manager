class Tarefa{
    titulo: string;
    descricao?: string;
    horario: Date;

    constructor(tituloTarefa: string, horarioCriacao:Date = new Date, descricaoTarefa?:string) {
        this.titulo = tituloTarefa;
        this.descricao = descricaoTarefa;
        this.horario = horarioCriacao;
    }

    criaTarefa() {
        const li = document.createElement('li');
        li.innerHTML=`<strong>${this.titulo}</strong>`
        if (this.descricao != undefined){
            li.innerHTML += ` (${this.descricao})`
        }
        li.innerHTML += ` | ${this.horario}`
        return li;
    }
}


const btn = document.getElementById('addBtn') as HTMLButtonElement;
btn.addEventListener('click', () => {
    const inputT = document.getElementById('tituloInput') as HTMLInputElement;
    const inputD = document.getElementById('descricaoInput') as HTMLInputElement;
    const agora: Date = new Date;
    let novaTarefa = new Tarefa("", agora); //se for consts ela n muda
    if (inputT.value === "" ) return; 
    if (inputD.value === ""){ 
        novaTarefa = new Tarefa(inputT.value, agora);
    }
    else {
        novaTarefa = new Tarefa(inputT.value, agora, inputD.value);
    }

    document.getElementById('listaTarefas')?.appendChild(novaTarefa.criaTarefa());
})
