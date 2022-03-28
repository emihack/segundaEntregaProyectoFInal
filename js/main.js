
// Cotizador Constructor
//constructor para seguro

class Seguro {
    constructor(vehiculo, anio, tipo){
        this.vehiculo = vehiculo;
        this.anio = anio;
        this.tipo = tipo;
    }
    cotizarSeguro() {
        /*
            1 = auto 1.15
            2 = moto 0.5
            3 = camioneta 1.45
        */
        let cantidad;
        const base = 1000;
    
        switch(this.vehiculo){
            case '1':
                cantidad = base * 1.15;
                break;
            case '2':
                cantidad = base * 0.5;
                break;
            case '3':
                cantidad = base * 1.45;
                break;
        }
        
    
        // leer el año
        const diferencia = new Date().getFullYear() - this.anio;
        // cada año de diferencia hay que reducir 3% el valor de seguro
        cantidad -= ((diferencia * 3) * cantidad) / 100;
        /*
            Si el seguro es sin grúa se multiplica por 30% mas
            Si el seguro es con grúa 50% mas
        */
       if(this.tipo === 'sin grúa') {
           cantidad *= 1.30;
       }else {
           cantidad *= 1.50;
       }
       console.log ("El precio del seguro a contratar es de $ ", cantidad)
       return cantidad;
        
    
    }
}

// Todo lo que se muestra
class Interfaz{

    // mensaje que se imprime en el html
    mostrarMensaje(mensaje, tipo) {
        const div = document.createElement('div');
    
        if(tipo == 'error') {
            div.classList.add('mensaje', 'error');
        } else {
            div.classList.add('mensaje', 'correcto')
        }
        div.innerHTML = `${mensaje}`;
        formulario.insertBefore(div, document.querySelector('.form-group'))
    
        setTimeout(function() {
            document.querySelector('.mensaje').remove();
        }, 3000)
    }

    // Imprime el resultado de la cotizacion
    mostrarResultado(seguro, total) {
        const resultado = document.getElementById('resultado');
        let marca;
        switch(seguro.marca) {
            case 'Auto':
                vehiculo = 'Auto';
                break;
            case 'Moto':
                vehiculo = 'Moto';
                break;
            case 'Camioneta':
                vehiculo = 'Camioneta';
                break;
        }
        //Crear un div
        const div = document.createElement('div');
        //insertar la informacion
        div.innerHTML = `
            <p class="header">Tu resumen:</p>
            <p>Vehículo: ${seguro.vehiculo}</p>
            <p>Año: ${seguro.anio}</p>
            <p>Tipo: ${seguro.tipo}</p>
            <p>Total: ${total}</p>
        `;
        const spinner = document.querySelector('#cargando img');
        spinner.style.display = 'block'
        setTimeout(function() {
            
            spinner.style.display = 'none'
            resultado.appendChild(div);
            
        },3000)
    
        setTimeout(function() {
            resultado.remove();
        },60000)
    
    }
}



// EventListener
const formulario = document.getElementById('cotizar-seguro')

formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    // leer el vehículo seleccionado del select
    const vehiculo = document.getElementById('vehiculo');
    const vehiculoSeleccionado = vehiculo.options[vehiculo.selectedIndex].value

    // leer el año seleccionado del select
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value

    //lee el valor del radio button
    const tipo = document.querySelector('input[name="tipo"]:checked').value

    // crear instancia de interfaz
    const interfaz = new Interfaz();

    // Revisamos que los campos esten vacios
    if(vehiculoSeleccionado === '' || anioSeleccionado === '' || tipo === '' ){
        //Interfaz imprimiendo un error
        console.log('Faltan datos');

        interfaz.mostrarMensaje('Faltan datos, revisá el formulario y probá de nuevo', 'error');

    } else {
        //Limpiar resultados anteriores
        const resultados = document.querySelector('#resultado div');
        if(resultados != null) {
            resultados.remove();
        }
        //Instanciar seguro y mostrar interfaz
        const seguro = new Seguro(vehiculoSeleccionado, anioSeleccionado, tipo);

        //Cotizar el seguro
        const cantidad = seguro.cotizarSeguro();
        // mostrar el resultado
        interfaz.mostrarResultado(seguro, cantidad);

        interfaz.mostrarMensaje('Buscando el mejor precio....', 'correcto');

    }

});


const max = new Date().getFullYear(),
    min = max - 30;


// imprimir select de años
const selectAnios = document.getElementById('anio');
for(let i = max; i > min; i-- ) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option)
}
