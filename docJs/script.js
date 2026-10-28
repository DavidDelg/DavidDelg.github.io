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

// ============================================================
// 🕷️ "¿SABÍAS QUE…?" — datos curiosos rotativos (educativos)
// Se muestran cada 8 segundos en la caja amarilla #datoCurioso,
// si existe en la página. El texto inicial del HTML actúa como
// contenido de reserva (funciona incluso sin JavaScript).
// ============================================================
const datosAranosos = [
  '<strong>🤔 ¿Sabías que…?</strong> la seda de una araña es, kilo por kilo, más fuerte que el acero. ¡Por eso el Hombre Araña se columpia sin caerse! 🕸️',
  '<strong>🤔 ¿Sabías que…?</strong> las arañas tienen 8 patas y 8 ojos (¡casi todas!). Y 8 es un número PARI: se puede dividir entre 2 arañas sin que sobre ninguna. 🔢',
  '<strong>🤔 ¿Sabías que…?</strong> existe una araña que construye casas submarinas llenas de aire para vivir debajo del agua. ¡Se llama araña de agua! 🌊🕷️',
  '<strong>🤔 ¿Sabías que…?</strong> Peter Parker, el Hombre Araña, fue creado en 1962 por Stan Lee y Steve Ditko. ¡Más de 60 años salvando la ciudad! 🦸‍♂️',
  '<strong>🤔 ¿Sabías que…?</strong> algunas arañas pueden saltar hasta 50 veces su tamaño. ¡Eso sería como saltar un edificio de 5 pisos! 🏫',
  '<strong>🤔 ¿Sabías que…?</strong> cuando cuentas de 2 en 2 (2, 4, 6, 8…) estás contando números PARES, ¡como las patas de dos arañas caminando juntas! 👣👣',
  '<strong>🤔 ¿Sabías que…?</strong> las arañas no son insectos: son ARÁCNIDOS, y se diferencian porque los insectos tienen 6 patas y las arañas 8. 🐜 vs 🕷️',
  '<strong>🤔 ¿Sabías que…?</strong> el "sentido arácnido" existe de verdad en las arañas: sienten las vibraciones de su tela con vellos súper sensibles. ¡Tú puedes entrenar tus sentidos! 👂'
];

(function rotarDatos() {
  const caja = document.getElementById('datoCurioso');
  if (!caja) return;
  let i = Math.floor(Math.random() * datosAranosos.length);
  setInterval(() => {
    i = (i + 1) % datosAranosos.length;
    caja.style.opacity = '0';
    setTimeout(() => {
      caja.innerHTML = datosAranosos[i];
      caja.style.transition = 'opacity .5s ease';
      caja.style.opacity = '1';
    }, 300);
  }, 8000);
})();

// ============================================================
// 🔢 Laboratorio de Números PARI e IMPAR (contadorNum.html)
// Cada número atrapado sube tu "nivel de héroe" (5 arañitas 🕷️)
// ============================================================
let numeros = [];
let pares = [];
let impares = [];
let sumaPares = 0;    // Acumuladores en cache: evitan recorrer los arrays con
let sumaImpares = 0;  // reduce() en cada numero -> calculo de promedio en O(1)

// Dibuja las 5 arañitas de poder según cuántos números se han atrapado
function pintarNivelHeroe() {
  const nivel = document.getElementById('nivelHeroe');
  if (!nivel) return;
  const atrapaPoder = Math.min(numeros.length, 5); // 1 araña por número, máximo 5
  nivel.textContent = '🕷️'.repeat(atrapaPoder) + '🕸️'.repeat(5 - atrapaPoder);
  nivel.title = numeros.length >= 5
    ? '¡Misión cumplida! Eres un Héroe Arácnido completo 🦸'
    : `Atrapa ${5 - numeros.length} número(s) más para completar tu poder`;
}

function agregarNumero(){
  const campo = document.getElementById("numero");
  const num = parseFloat(campo.value);
  const lista = document.getElementById("lista");
  const promedios = document.getElementById("promedios");

  if (isNaN(num)) {
    lista.innerHTML = '🙈 <strong>¡Ups!</strong> Eso no es un número, pequeño héroe. ' +
                      'Escribe uno (por ejemplo 7 u 8) y vuelve a lanzar la telaraña 🕸️';
    lista.style.color = '#b3000d';
    campo.focus();
    return;
  }
  numeros.push(num);
//clasificar numero
  let clase = '';
  if(Number.isInteger(num)){
    if(num % 2 === 0){
      pares.push(num);
      sumaPares += num;
      clase = '🕷️ ¡ES PARI! Se divide justo entre dos arañas.';
    }else{
      impares.push(num);
      sumaImpares += num;
      clase = '🕸️ ¡ES IMPAR! Sobra una arañita solitaria.';
    }
  } else {
    clase = '🔍 Es un número decimal (tiene punto). Lo guardamos en la colección.';
  }

//Mostrar lista acumulada con explicación educativa
  lista.innerHTML =
    `✅ Atrapaste el <strong>${num}</strong>: ${clase}<br>` +
    `📥 Tus números en la red: ${numeros.join(", ")} ` +
    `(van ${numeros.length})`;
  lista.style.color = '#2b3a67';

//Calcular promedios (O(1) gracias a los acumuladores en cache)
  let promedioPares = pares.length > 0 ? (sumaPares / pares.length).toFixed(2) : 0;
  let promedioImpares = impares.length > 0 ? (sumaImpares / impares.length).toFixed(2) : 0;

  promedios.innerHTML =
    `🍪 <strong>Promedio</strong> = sumar todo ÷ cuántos hay.<br>` +
    `Pares (${pares.length}): <strong>${promedioPares}</strong> · ` +
    `Impares (${impares.length}): <strong>${promedioImpares}</strong>`;

  pintarNivelHeroe();

// Limpiar el campo y devolver el foco para captura rapida
campo.value = '';
campo.focus();
}
