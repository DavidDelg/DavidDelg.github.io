//Codigo de menu lateral cuando la pantalla es para movil
const btnMenu = document.getElementById('btn-menu');
const sidebar = document.querySelector('.sidebar');

if (btnMenu && sidebar) {
  btnMenu.addEventListener('click', (e) => {
    sidebar.classList.toggle('activo');
    e.stopPropagation();
  });

  // Delegacion de eventos: un solo listener en el documento en lugar de uno
  // por enlace. passive:true indica al navegador que no se cancelara el
  // comportamiento por defecto, evitando bloquear el hilo principal.
  document.addEventListener('click', (e) => {
    if (e.target === btnMenu || sidebar.contains(e.target)) return;
    sidebar.classList.remove('activo');
  }, { passive: true });
}

//Codigo del contador y promedio
let numeros = [];
let pares = [];
let impares = [];
let sumaPares = 0;    // Acumuladores en cache: evitan recorrer los arrays con
let sumaImpares = 0;  // reduce() en cada numero -> calculo de promedio en O(1)

function agregarNumero(){
  const campo = document.getElementById("numero");
  const num = parseFloat(campo.value);
  const lista = document.getElementById("lista");
  const promedios = document.getElementById("promedios");

  if (isNaN(num)) {
    lista.textContent = 'Por favor ingrese un numero válido';
    lista.style.color = 'red'; // antes: red sin comillas (ReferenceError)
    return;
  }
  numeros.push(num);
//clasificar numero
  if(Number.isInteger(num)){
    if(num % 2 === 0){
      pares.push(num);
      sumaPares += num;
    }else{
      impares.push(num);
      sumaImpares += num;
    }
  }
//Mostrar lista acumulada
lista.textContent = `Numeros ingresados: ${numeros.join(", ")}`;

//Calcular promedios (O(1) gracias a los acumuladores en cache)
let promedioPares = pares.length > 0 ? (sumaPares / pares.length).toFixed(2) : 0;
let promedioImpares = impares.length > 0 ? (sumaImpares / impares.length).toFixed(2) : 0;

promedios.textContent = `Promedio pares: ${promedioPares} | Promedio impares: ${promedioImpares}`;

// Limpiar el campo y devolver el foco para captura rapida
campo.value = '';
campo.focus();
}
