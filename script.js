// aqui colocamos la logica 


document.addEventListener("DOMContentLoaded",buscar) 
const URL_API = 'https://localhost:7113/api/'
function iniciar(){
    buscar()
}

function agregar(){
    limpiarFormulario()
    abrirFormulario();

}

//funcion para listar todos los clientes
async function buscar() {
    var url = URL_API + 'customer'
    var response =  await fetch(url, {
       "method": 'GET',
        "headers": {
            "Content-Type": 'application/json'
        }
    })
   
   customers = await response.json()
    var html = ''
    for (customer of customers) {
        
        var row = `
        <tr>
            <td>${customer.firstName}</td>
            <td>${customer.lastName}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.address}</td>
            <td>
                <a href="#" onclick="editar(${customer.id})" class="myButton">Editar</a>
                <a href="#" onclick="eliminar(${customer.id})" class="btndelete">Eliminar</a>
            </td>
        </tr>`

        html = html + row   
    }
    document.querySelector("#customers > tbody").outerHTML = html
}


function editar(id){
   abrirFormulario();
   var customer = customers.find(x => x.id == id)
   document.getElementById('id').value = customer.id;
   document.getElementById('nombre').value = customer.firstName;
   document.getElementById('apellido').value = customer.lastName;
   document.getElementById('email').value = customer.email;
   document.getElementById('telefono').value = customer.phone;
   document.getElementById('direccion').value = customer.address;
}

 function limpiarFormulario(){
    document.getElementById('id').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('direccion').value = '';
 }

 // funcion para agregar nuevos clientes y actualizarlos
async function agregarCustomer(){
   var id = document.getElementById('id').value
     var data =  {
        "firstName":document.getElementById('nombre').value,
        "lastName":document.getElementById('apellido').value ,
        "email":document.getElementById('email').value,
        "phone":document.getElementById('telefono').value,
        "address":document.getElementById('direccion').value
    }
    if (id != '') {
        data.id = id
    }

    var url = URL_API + 'customer'
     await fetch(url, {
       "method":  data.id = id ? 'PUT' : 'POST',
       "body" : JSON.stringify(data),
       "headers": {
        "Content-Type": 'application/json'
    },
   
})
window.location.reload() 
   
   
}

//funcion para eliminar clientes
async function eliminar(id){
    respuesta = confirm('¿Esta seguro  de eliminarlo ?')
    if (respuesta) {
        var url = URL_API + 'customer/' + id
         await fetch(url, {
           "method": 'DELETE',
           "headers": {
            "Content-Type": 'application/json'
        },
    })
    window.location.reload() 
    }
}



