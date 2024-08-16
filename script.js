

const buttonTheme = document.querySelector('.buttonOption');
const body = document.querySelector('body');


// change the thame
buttonTheme.addEventListener('click', () => {

    const option = Number(buttonTheme.children[0].className.slice(-1));
    body.className = "";
    buttonTheme.children[0].className = "";

    if(option < 3){
        body.classList.add(`theme${option + 1}`);
        buttonTheme.children[0].classList.add(`option${option + 1}`);
        return
    }

    body.classList.add(`theme1`);
    buttonTheme.children[0].classList.add(`option1`);
});



const screen = document.querySelector('.screeResult p');
const screenHiden = document.querySelector('.screeResult span');
let isKeyPressed = false;
let listOperation = [
    {
        name: "div",
        operation: "/"
    },
    {
        name: "mul",
        operation: "*"
    },
    {
        name: "sum",
        operation: "+"
    },
    {
        name: "res",
        operation: "-"
    },
    {
        name: "backspace",
        operation: "backspace"
    },
    {
        name: "enter",
        operation: "enter"
    },
    {
        name: "escape",
        operation: "escape"
    },
    {
        name: "pnt",
        operation: "."
    },
];
let lastOperation;
let continueCalculation = false;
const teclado = document.querySelector('.containerButtons');


document.addEventListener('keydown', (event) => {

    // valida si es numero
    if(event.code.slice(-1) <= 9 && event.code.slice(-1) >= 0){
        calculatorEnter(event.code.slice(-1));
        return;
    }
    
    // valida si es operacion
    listOperation.forEach(symbol => {
        if(symbol.operation == event.key.toLowerCase()){
            operationEnter(symbol);
            return
        }
    });

});


document.addEventListener('keyup', function(event) {
    if(event.code.slice(-1) <= 9 && event.code.slice(-1) >= 0){
        calculatorLeave(event.code.slice(-1));
    }

    listOperation.forEach(symbol => {
        if(symbol.operation == event.key.toLowerCase()){
            calculatorLeave(symbol.name);
            
        }
    });

});


teclado.addEventListener('mousedown', (event) => {
    
    // valida si es numero
    if(event.target.id <= 9 && event.target.id >= 0){
        calculatorEnter(event.target.id);
        return;
    }

    // valida si es operacion
    listOperation.forEach(symbol => {
        if(symbol.name == event.target.id){
            operationEnter(symbol);
            return
        }
    });

    
});

document.addEventListener('mouseup', (event) => {

    if(event.target.id <= 9 && event.target.id >= 0){
        calculatorLeave(event.target.id);
        return;
    }
    
    listOperation.forEach(symbol => {
        if(symbol.name == event.target.id){
            calculatorLeave(symbol.name);
            return
        }
    });

});










// presionar un numero
const calculatorEnter = (event) => {

    const keyNumber = document.getElementById(event);
    keyNumber.classList.add('btn_active');

    // si hay una solicitud anterior pasa el resultado a la pantalla secundaria y borra para intoducir el nuevo numero
    if(continueCalculation){
        screenHiden.innerHTML = screen.innerHTML;
        screen.innerHTML = "0";
        continueCalculation = !continueCalculation;
    }

    if(screen.innerHTML == "0"){
        screen.innerHTML = keyNumber.innerText;
    }else{
        screen.innerHTML += keyNumber.innerText;
    }


}


// presionar un simbolo
const operationEnter = (event) => {

    const keyOperation = document.getElementById(event.name);
    keyOperation.classList.add('btn_active');

    // coloca un punto y valida que no haya uno ya antes
    if(event.name == "pnt"){
        if(screen.innerHTML.indexOf(".") == -1){
            screen.innerHTML += ".";
        }
        return
    }

    // buton escape borra todo
    if(event.name == "escape"){
        screen.innerHTML = "0";
        screenHiden.innerHTML = "";
        lastOperation = "";
        return
    }

    // borra un elemento de la pantalla
    if(event.name == "backspace"){
        if( screen.innerHTML.length != 1){
            screen.innerHTML = screen.innerHTML.slice(0, screen.innerHTML.length - 1);
        } else {
            screen.innerHTML = "0";
        }
        return
    }

    // finaliza la operacion y da el resultado final
    if(event.name == "enter"){
        let calculated = `${screenHiden.innerHTML} ${lastOperation} ${screen.innerHTML} `;
        let result = new Function('return ' + calculated)();
        screen.innerHTML = result;
        screenHiden.innerHTML = "";
        lastOperation = "";
        return
    }

    // si la pantalla screen es 0 pasa el resultado principal
    // si ya  hay una operacion anterior hace el resultado y lo muestra en la pantalla
    if(screenHiden.innerHTML == "" || screenHiden.innerHTML == 0){
        screenHiden.innerHTML = screen.innerHTML;
        screen.innerHTML = "0"
    } else{
        let calculated = `${screenHiden.innerHTML} ${lastOperation} ${screen.innerHTML} `;
        let result = new Function('return ' + calculated)();
        screen.innerHTML = result;
        screenHiden.innerHTML = "";
        
        continueCalculation = !continueCalculation;
    }

    lastOperation = event.operation;   

}


// salida de boton
const calculatorLeave = (event) => {
    const keyNumber = document.getElementById(event);
    keyNumber.classList.remove('btn_active');
}