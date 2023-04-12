import {guardar, obtenerall, eliminar, obtenerUno, editar} from './config.js' 


let id = ''
let editStatus = false


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
        if(run != '' && nombre != '' && email != '' && telefono != '' && cargo != ''){
            guardar(run, nombre, email, telefono, cargo)
            Swal.fire({
                icon: 'success',
                title: 'Postulante agregado',
                showConfirmButton: false,
                timer: 1500
              })
            document.getElementById('form').reset()
        }else{
            // colorea el borde de los campos vacios.
            if(run == ''){
                document.getElementById('run').style.borderColor = 'red'
            }else{
                document.getElementById('run').style.borderColor.reset()
            }
            if(nombre == ''){
                document.getElementById('nombre').style.borderColor = 'red'
            }else{
                document.getElementById('nombre').style.borderColor.reset()
            }
            if(email == ''){
                document.getElementById('email').style.borderColor = 'red'
            }else{
                document.getElementById('email').style.borderColor.reset()
            }
            if(telefono == ''){
                document.getElementById('telefono').style.borderColor = 'red'
            }else{
                document.getElementById('telefono').style.borderColor.reset()
            }

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El faltaron datos que ingresar'
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
    //arreglo que contendrá los datos de la base de datos
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
