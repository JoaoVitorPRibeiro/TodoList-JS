'use strict';

const GetBanco = () => JSON.parse (localStorage.getItem('ToDoList')) ?? [];
const SetBanco = (banco) => localStorage.setItem('ToDoList', JSON.stringify(banco));


const CriarItem = (tarefa, status = "", indice) => {
    const Item = document.createElement('label');
    Item.classList.add('ToDo_Item');
    Item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    `
    document.getElementById('ToDoList').appendChild(Item);
}

const LimparTarefas = () => {
    const ToDoList = document.getElementById("ToDoList");
    while (ToDoList.firstChild) {
        ToDoList.removeChild(ToDoList.lastChild);
    }
}

const AtualizarTela = () => {
    LimparTarefas();
    const banco = GetBanco();
    banco.forEach( (Item, indice) => CriarItem(Item.tarefa, Item.status, indice));
}


const InserirItem = (evento) => {
    const Tecla = evento.key;
    const Texto = evento.target.value;
    if (Tecla === 'Enter') {
        const banco = GetBanco();
        banco.push( {'tarefa': Texto, 'status': ''});
        SetBanco(banco);
        AtualizarTela();
        evento.target.value = ''; // Limpar a tarefa
    }
}

const removerItem = (indice) => {
    const banco = GetBanco();
    banco.splice (indice,1);
    SetBanco(banco);
    AtualizarTela();
}
const AtualizarItem = (indice) => {
    const banco = GetBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    SetBanco(banco);
    AtualizarTela();
}
const ClickItem = (evento) => {
    const Elemento = evento.target;
    if (Elemento.type === 'button') {
        const indice = Elemento.dataset.indice;
        removerItem(indice);
    } else if (Elemento.type === "checkbox") {
        const indice = Elemento.dataset.indice;
        AtualizarItem (indice);
    }
}

document.getElementById('NewItem').addEventListener('keypress',InserirItem);
document.getElementById('ToDoList').addEventListener('click', ClickItem);
AtualizarTela();