import {guardar, obtenerall, eliminar, obtenerUno, editar} from './config.js' 


let id = ''
let editStatus = false

let Fn = {
   
    validaRut : function (rutCompleto) {
        if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
            return false;
        var tmp     = rutCompleto.split('-');
        var digv    = tmp[1]; 
        var rut     = tmp[0];
        if ( digv == 'K' ) digv = 'k' ;
    
        return (Fn.dv(rut) == digv );
    },
    dv : function(T){
        var M=0,S=1;
        for(;T;T=Math.floor(T/10))
            S=(S+T%10*(9-M++%6))%11;
        return S?S-1:'k';
    }
}

function validaEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}


document.querySelectorAll('.limpiar').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.getElementById('form').reset()
    })
})

document.getElementById('form').addEventListener('submit',(e) => {
    
    e.preventDefault()

    const run = document.getElementById('run').value
    const nombre = document.getElementById('nombre').value
    const email = document.getElementById('email').value
    const telefono = document.getElementById('telefono').value
    const cargo = document.getElementById('cargo').value

    if(!editStatus){
        if((run != '' && nombre != '' && email != '' && telefono != '' && cargo != '' && validaEmail(email) && Fn.validaRut(run) )){
            
            guardar(run, nombre, email, telefono, cargo)
            Swal.fire({
                icon: 'success',
                title: 'Postulante agregado',
                showConfirmButton: false,
                timer: 1500
              })
            document.getElementById('form').reset()
        
            
        }else{
            
            if(run == '' || Fn.validaRut(run) == false){
                document.getElementById('run').style.borderColor = 'red'
            }else{
                document.getElementById('run').style.borderColor.reset()
            }
            if(nombre == ''){
                document.getElementById('nombre').style.borderColor = 'red'
            }else{
                document.getElementById('nombre').style.borderColor.reset()
            }
            if(email == '' || Fn.validaEmail(email) == false){
                document.getElementById('email').style.borderColor = 'red'
            }else{
                document.getElementById('email').style.borderColor.reset()
            }
            if(telefono == ''){
                document.getElementById('telefono').style.borderColor = 'red'
            }else{
                document.getElementById('telefono').style.borderColor.reset()
            }
            if(cargo == ''){
                document.getElementById('cargo').style.borderColor = 'red'
            }else{
                document.getElementById('cargo').style.borderColor.reset()
            }

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Revise los campos vacios o incorrectos'
              })
        }
        
    }else{
        Swal.fire({
            title: '¿Estás seguro de editar?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, editalo!'
            }).then((result) => {
            if (result.isConfirmed) {
                editar(id, {
                    run: run,
                    nombre: nombre,
                    email: email,
                    telefono: telefono,
                    cargo: cargo
                })
                Swal.fire(
                    '¡Editado!',
                    'El postulante ha sido editado.',
                    'success'
                )
      
                editStatus = false
                id = ''
                document.getElementById('form').reset()
            }
            })
    }
})


window.addEventListener('DOMContentLoaded', async () =>{
    obtenerall((querySnapshot) => { 
        let tabla = ''
        querySnapshot.forEach((doc) =>{
            const postulante = doc.data()
            tabla += ` 
                <tr>
                    <td>${postulante.run}</td>
                    <td>${postulante.nombre}</td>
                    <td>${postulante.email}</td>
                    <td>${postulante.telefono}</td>
                    <td>${postulante.cargo}</td>
                    <td>
                        <button class="btn btn-danger btn-sm eliminar" id="${doc.id}">Eliminar</button>
                        <button class="btn btn-warning btn-sm editar" id="${doc.id}">Editar</button>
                    </td>
                </tr>
            `
        })
        document.getElementById('tbody').innerHTML = tabla


        document.querySelectorAll('.eliminar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                Swal.fire({
                    title: '¿Estás seguro?',
                    text: "¡No podrás revertir esto!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '¡Sí, bórralo!'
                  }).then((result) => {
                    if (result.isConfirmed) {
                        eliminar(e.target.id)
                        Swal.fire(
                            '¡Eliminado!',
                            'El postulante ha sido eliminado.',
                            'success'
                        )
                    }
            })
        })

        document.querySelectorAll('.editar').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const postulantes = await obtenerUno(e.target.id)
                const registro = postulantes.data()

                document.getElementById('run').value = registro.run
                document.getElementById('nombre').value = registro.nombre
                document.getElementById('email').value = registro.email
                document.getElementById('telefono').value = registro.telefono
                document.getElementById('cargo').value = registro.cargo
                
                
                editStatus = true
                id = postulantes.id
            
            })
        })
    })
    })
    
    
})
