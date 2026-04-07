
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




