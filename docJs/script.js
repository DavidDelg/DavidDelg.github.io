
//Codigo de menu lateral cuando la pantalla es para movil
const btnMenu = document.getElementById('btn-menu');
const sidebar = document.querySelector('.sidebar');

btnMenu.addEventListener('click', (e) => {
  sidebar.classList.toggle('activo');
  e.stopPropagation();
});
document.addEventListener('click', (e) => {
  if (e.target !== sidebar && e.target !== btnMenu) {
    sidebar.classList.remove('activo');
  }
});
const links = document.querySelectorAll('.sidebar a');

links.forEach(link => {
  link.addEventListener('click', () => {
    sidebar.classList.remove('activo');
    
  });

});
//Codigo del contador y promedio
let numeros = [];
let pares = [];
let impares = [];

function agregarNumero(){
  let num = parseFloat(document.getElementById("numero").value);
  let lista = document.getElementById("lista");
  let promedios = document.getElementById("promedios");
  
  if (isNaN(num)) {
    lista.textContent = "Por favor ingrese un numero válido";
    lista.style.color = red;
    return;
  }
  numeros.push(num);
//clasificar numero
  if(Number.isInteger(num)){
    if(num % 2 === 0){
      pares.push(num);
    }else{
      impares.push(num);
    }
  }
//Mostrar lista acumulada
lista.textContent = "Numeros ingresados: ${numeros.join(", ")}";

//Calcular promedios
let promedioPares = pares.length > 0 ? (pares.reduce((a, b) => a+b, 0) / pares.length).toFixed(2) : 0;
let promedioImpares = impares.length > 0 ? (impares.reduce((a,b) => a+b, 0) / impares.length).toFixed(2) : 0;

promedios.textContent = 'Promedios pares: ${promediosPares} | Promedios impares: ${promedioImpares}';


}