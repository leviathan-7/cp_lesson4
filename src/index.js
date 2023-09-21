import {MiniMaple} from "./miniMaple";

document.addEventListener('DOMContentLoaded',setup)

function setup() {
    document.getElementById('demoButton').onclick = addDiv;
}

function addDiv(){
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('result');
    
    const MM = new MiniMaple()
    text_of_function = document.getElementById('function').value
    text_of_variable = document.getElementById('variable').value
    
    result = MM.diff(text_of_function,text_of_variable)
    resultDiv.innerHTML = text_of_function + ', '+ text_of_variable + ' // => ' + result;

    const container = document.getElementById('container');
    container.appendChild(resultDiv);
}