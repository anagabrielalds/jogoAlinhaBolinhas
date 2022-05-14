let todosPotes = 0;
let idTodasCores = [];
let quantidadeBolinhas = 30;
let totalPotes = 5;
let potesConluidos = 0;
let QUANTIDADE_BOLINHAS_POTE = 6;
let nivel = 1;

//tom verde claro
let corPotesNivel1 = "#cfebdb"; //esse não está sendo usado, porque carrega o padrão do style .pote
let corPotesPreenchidosNivel1 = "#1e665f";

//tom azul
let corPotesNivel2 = "#8573f4";
let corPotesPreenchidosNivel2 = "#4B0082";

//tom vermelho
let corPotesNivel3 = "#d83d3d";
let corPotesPreenchidosNivel3 = "#75041b";

//tom roxo
let corPotesNivel4 = "#EE82EE";
let corPotesPreenchidosNivel4 = "#8B008B";

//tom amarelo
let corPotesNivel5 = "#eded75";
let corPotesPreenchidosNivel5 = "yellow";

//verde escuro
let corPotesNivel6 = "#7CFC00";
let corPotesPreenchidosNivel6 = "#066006";

//verde escuro
let corPotesNivelDefault = "black";
let corPotesPreenchidosNivelDefault = "white";

let pote1 = document.getElementById("pote1");
let pote2 = document.getElementById("pote2");
let pote3 = document.getElementById("pote3");
let pote4 = document.getElementById("pote4");
let pote5 = document.getElementById("pote5");
let pote6 = document.getElementById("pote6");
let pote7 = document.getElementById("pote7");


function gerarCores() {
    gerarCoresAleatorias();
    adicionandoCoresAsBolinhas();
    adicionandoEventoAoPote();
}

function gerarCoresAleatorias() {
    for (let index = 0; index < quantidadeBolinhas; index++) {
        let novoId = Math.floor(Math.random() * (quantidadeBolinhas)) + 1;

        while (coresJaForamGeradas(novoId)) { // Enquanto o numero já existir, escolher outro
            novoId = Math.floor(Math.random() * (quantidadeBolinhas)) + 1;
        }
        idTodasCores.push(novoId);
    }
}

function adicionandoCoresAsBolinhas() {
    for (let index = 1; index <= quantidadeBolinhas; index++) {
        if (index <= 6) {
            adicionadoCorEventoArrastar(idTodasCores[index - 1], 'color1');
        }
        if (index >= 7 && index <= 12) {
            adicionadoCorEventoArrastar(idTodasCores[index - 1], 'color2');
        }
        if (index >= 13 && index <= 18) {
            adicionadoCorEventoArrastar(idTodasCores[index - 1], 'color3');
        }
        if (index >= 19 && index <= 24) {
            adicionadoCorEventoArrastar(idTodasCores[index - 1], 'color4');
        }
        if (index >= 25 && index <= 30) {
            adicionadoCorEventoArrastar(idTodasCores[index - 1], 'color5');
        }
    }
    idTodasCores = [];
}

function coresJaForamGeradas(id) {
    return idTodasCores.indexOf(id) >= 0;
}

function verificandoPoteTemMesmaCor(pote) {
    //verificar se todas as cores das bolinhas são as mesmas
    //caso seja, bloquear a função de arrastar
    var todasCoresDessePote = [];
    let todasBolinhasDessePote = pote.querySelectorAll("div");

    let primeriaCor = todasBolinhasDessePote[0].className;

    if (todasBolinhasDessePote.length == 6) {
        for (let index = 0; index < 6; index++) {
            todasCoresDessePote.push(todasBolinhasDessePote[index].className);
        }
        let algumaCorDiferente = true;
        var item = todasCoresDessePote.filter(i => i == primeriaCor);

        if (item.length == 6) {
            //aqui todos itens são iguais
            retirandoEventoArrastar(pote);
            potesConluidos++;
            pote.style.backgroundColor = getCorPotesPreenchidos();
        }
        setTimeout(() => {
            console.log("Delayed for 1 second.");
            verificarFimJogo();
        }, "1000");

    }

}

function adicionadoCorEventoArrastar(num, cor) {
    var bolinha = document.getElementById("bolinha" + num);
    bolinha.classList.add(cor);
    bolinha.draggable = "true"
    bolinha.ondragstart = onDragStart;
}

function adicionandoEventoAoPote() {

    pote1.ondragover = onDragOver;
    pote1.ondrop = onDrop;
    pote2.ondragover = onDragOver;
    pote2.ondrop = onDrop;
    pote3.ondragover = onDragOver;
    pote3.ondrop = onDrop;
    pote4.ondragover = onDragOver;
    pote4.ondrop = onDrop;
    pote5.ondragover = onDragOver;
    pote5.ondrop = onDrop;
    pote6.ondragover = onDragOver;
    pote6.ondrop = onDrop;
    pote7.ondragover = onDragOver;
    pote7.ondrop = onDrop;

}

function retirandoEventoArrastar(pote) {
    pote.ondragover = "";
    pote.ondrop = "";

    let todasBolinhas = pote.querySelectorAll("div");

    for (let index = 0; index < todasBolinhas.length; index++) {
        todasBolinhas[index].draggable = false;
        todasBolinhas[index].ondragstart = "";
    }
}

//função de arrastar
function onDragStart(event) {
    let poteItem = event.path[1];
    //verificação se esse a bolinha é a primeira do pote, se não for não permitir arrastar

    let idPrimeiraBolinhaPote = poteItem.firstElementChild.id;
    let idItemDoEvento = event.target.id;
    if (idPrimeiraBolinhaPote == idItemDoEvento)
        event
        .dataTransfer
        .setData('text/plain', idItemDoEvento);
}
//função de soltar
function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    debugger
    const id = event
        .dataTransfer
        .getData('text');

    const draggableElement = document.getElementById(id);

    //verificar se o bloco não tem 6, se tiver não permitir adicionar

    const dropzone = event.target;
    //acrescentando o  nosso elemento draggable ao menu dropzone:
    //adicionar acima do primeiro elemento e não no final
    var quantidadeFilhosNoPoteDestino = event.currentTarget.children.length;

    if (quantidadeFilhosNoPoteDestino != QUANTIDADE_BOLINHAS_POTE) {
        var firstChild = dropzone.firstChild;

        //não permitir que colocoque uma bolinha dentro da outra
        if (!(dropzone.className.includes("color") && draggableElement.className.includes("color"))) {
            dropzone.insertBefore(draggableElement, firstChild);
            adicionandoEfeitoQuicar(draggableElement);
            //dropzone.appendChild(draggableElement);
        }

    }
    //Reinicie nosso objeto dataTransfer:
    event.dataTransfer.clearData();

    verificandoPoteTemMesmaCor(dropzone);
}

function verificarFimJogo() {
    if (potesConluidos == totalPotes) {
        alert("Parabéns, você venceu !!");
        potesConluidos = 0;
        nivel++;
        gerarCoresAleatorias();
        limpandoClassesBolinhas();
        adicionandoCoresAsBolinhas();
        adicionandoEventoAoPote();
    }
}

function adicionandoEfeitoQuicar(bolinha) {
    bolinha.style.animation = "quica .4s cubic-bezier(.53, -0.03, .67, 1.06)";
    bolinha.style.animationDirection = "alternate";
}

function limpandoClassesBolinhas() {
    for (let index = 1; index <= quantidadeBolinhas; index++) {
        let bolinha = document.getElementById("bolinha" + index);
        bolinha.classList = "";

        colocandoNoBlocoCorreto(bolinha, index);
        alterandoCorPotes();
    }
}

function colocandoNoBlocoCorreto(bolinha, index) {

    if (index <= 6) {
        pote1.appendChild(bolinha);
    }
    if (index >= 7 && index <= 12) {
        pote2.appendChild(bolinha);
    }
    if (index >= 13 && index <= 18) {
        pote3.appendChild(bolinha);
    }
    if (index >= 19 && index <= 24) {
        pote4.appendChild(bolinha);
    }
    if (index >= 25 && index <= 30) {
        pote5.appendChild(bolinha);
    }
}

function alterandoCorPotes() {
    let cor = getCorPotesNaoPreenchidos();
    pote1.style.backgroundColor = cor;
    pote2.style.backgroundColor = cor;
    pote3.style.backgroundColor = cor;
    pote4.style.backgroundColor = cor;
    pote5.style.backgroundColor = cor;
    pote6.style.backgroundColor = cor;
    pote7.style.backgroundColor = cor;
}

function getCorPotesNaoPreenchidos() {
    switch (nivel) {
        case 1:
            return corPotesNivel1;
        case 2:
            return corPotesNivel2;
        case 3:
            return corPotesNivel3;
        case 4:
            return corPotesNivel4;
        case 5:
            return corPotesNivel5;
        case 6:
            return corPotesNivel6;

        default:
            return corPotesNivelDefault;
            break;
    }

}

function getCorPotesPreenchidos() {
    switch (nivel) {
        case 1:
            return corPotesPreenchidosNivel1;
        case 2:
            return corPotesPreenchidosNivel2;
        case 3:
            return corPotesPreenchidosNivel3;
        case 4:
            return corPotesPreenchidosNivel4;
        case 5:
            return corPotesPreenchidosNivel5;
        case 6:
            return corPotesPreenchidosNivel6;

        default:
            return corPotesPreenchidosNivelDefault;
            break;
    }

}