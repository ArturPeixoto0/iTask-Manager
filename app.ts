class Tarefa{
    titulo: string;
    descricao?: string;

    constructor(tituloTarefa: string) {
        this.titulo = tituloTarefa;
    }

    criaTarefa() {
        const li = document.createElement('li');
        li.innerHTML=`${this.titulo}`
        return li;
    }
}

/*
const btn = document.getElementById('addBtn') as HTMLButtonElement;
btn.addEventListener('click', () => {
    const input = document.getElementById('tituloInput') as HTMLInputElement;



})
*/