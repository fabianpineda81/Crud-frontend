import React from 'react'
import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

const ModalCliente = ({ mostrar, setmostrar, modificar,datos,setdatos,actualizar_informacion,buscar_clientes }) => {
  
 
    const reiniciarValores=()=>{
      setdatos({
        cedula: "",
        nombre: "",
        apellido: "",
        apellido2: "",
        direccion: "",
        telefono: "",
        nacionalidad: "colombiana",
        correo: "",
        cedula_modificar:""
    })
    }
    
    

  const ingresarUsuario =async () => {
    let form= new FormData();
    form.append("informacion",JSON.stringify(datos))
    console.log(form.get("informacion"))
    let response =await fetch("http://localhost/crud/clientes/clientes.php",{
      method:"POST",
      body:form
    })
    let json = await response.json()

    if(json.error==false){
      alert("insertado correctamente")
      console.log(json.data)
      buscar_clientes()
      setmostrar(false)
      reiniciarValores()
      
    }else{
      alert(json.error);
    }

  }

  const modificarUsuario =async () => {
    let form= new FormData();
    
    form.append("informacion",JSON.stringify(datos))
    console.log(form.get("informacion"))
    let response =await fetch("http://localhost/crud/clientes/clientes.php",{
      method:"POST",
      body:form,
      

    })
    let json = await response.json()

    if(json.error==false){
      alert(json.mensaje)
      console.log(json.data)
      buscar_clientes()
      setmostrar(false)
      reiniciarValores();
    }else{
      alert(json.error);
    }
  }
  const realizarOperacion = () => {
    if (modificar === true) {
      
      modificarUsuario()
      
    } else {
      ingresarUsuario()
      
    }
  }



  return (
    <>
      <Modal show={mostrar} onHide={() => {setmostrar(false);reiniciarValores()}}>
        <Modal.Header closeButton>
          <Modal.Title>{modificar ? "Modificar Modificar" : "Insertar Cliente"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div class="row">
            <div class="col-6 pt-4">
              <input type="number" class="form-control" placeholder="Cedula" name="cedula" value={datos.cedula} onChange={actualizar_informacion} aria-label="First name" />
              
            </div>

            <div class="col-6">
              <label>Pais</label>
              <select class="form-select" aria-label="Default select example" name="nacionalidad" value={datos.nacionalidad} onChange={actualizar_informacion}>
                <option value="colombiana">Colombia</option>
                <option value="argentina">Argentina</option>
                <option value="española">España</option>
                <option value="ecuatoriana">Ecuador</option>
              </select>
            </div>
            

          </div>

          <div class="row mt-4">
            <div class="col-4">
              <input type="text" class="form-control" placeholder="Nombre" name="nombre" value={datos.nombre} onChange={actualizar_informacion} aria-label="First name" />
            </div>
            <div class="col-4">
              <input type="text" class="form-control" placeholder="Primer apellido" name="apellido" value={datos.apellido} onChange={actualizar_informacion} aria-label="Last name" />
            </div>
            <div class="col-4">
              <input type="text" class="form-control" placeholder="Segundo apellido" name="apellido2" value={datos.apellido2} onChange={actualizar_informacion} aria-label="Last name" />
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-4">
              <input type="text" class="form-control" placeholder="direccion" name="direccion" value={datos.direccion} onChange={actualizar_informacion} aria-label="First name" />
            </div>
            <div class="col-4">
              <input type="text" class="form-control" placeholder="telefono " name="telefono" value={datos.telefono} onChange={actualizar_informacion} aria-label="Last name" />
            </div>
            <div class="col-4">
              <input type="text" class="form-control" placeholder="Correo" name="correo" value={datos.correo} onChange={actualizar_informacion} aria-label="Last name" />
            </div>
          </div>



        </Modal.Body>




        <Modal.Footer>
          <Button variant="primary" onClick={realizarOperacion}>
            {modificar ? "Modificar" : "Agregar"}
          </Button>
          <Button variant="secondary" onClick={() => { setmostrar(false) }}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalCliente
