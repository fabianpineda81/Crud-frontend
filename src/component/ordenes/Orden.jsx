import React from 'react'
import { useCallback } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router'

const Orden = () => {
    const [orden, setorden] = useState(null)
    let { id } = useParams();

    let buscar_orden=useCallback(
        async ()=>{
              let respuesta = await fetch(`http://localhost/crud/ordenes/ordenes.php?id=${id}`, {
                  method: "GET"
              })
      
              let json = await respuesta.json()
              if (json.error == false) {
                  setorden(json.datos)
      
              } else {
                  alert(json.error)
                  setorden(false)
                  
              }
          }
      ,[setorden])

    useEffect(async () => {
        buscar_orden()

    }, [buscar_orden])

  

    const cambiar_estado=async (id,estado)=>{
        let form= new FormData();
        let informacion={id_orden:id,estado:estado}
        form.set("informacion",JSON.stringify(informacion))
        console.log(form.get("informacion"))
        let respuesta = await fetch(`http://localhost/crud/ordenes/cambiarEstado.php`, {
            method: "POST",
            body:form
        })
        let json =await respuesta.json()
    
        if(json.error==false){
            alert(json.mensaje)
            buscar_orden()
        }else{
            alert(json.error)
        }

        
    }



    return orden !== null ? (
       
        orden===false? <h1>NO se encontro la orden</h1>:

        <div className="container">
            <div class="card col-8 offset-2">
                <div class="card-body">
                    <h4 class="card-title">Orden - {orden.id}</h4>
                    <div className="row">
                       
                        <h6 class="card-subtitle mt-3">Cedula cliente: {orden.cedula_cliente}</h6>
                        <h6 class="card-subtitle mt-3">Nombres y apellido: {orden.nombre_cliente}-{orden.apellido_cliente}</h6>
                    </div>
                    <h5 class="card-title mt-3">Items - {orden.cantidad_items}</h5>
                    
                    <table class="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Ancho</th>
                        <th scope="col">Largo</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Sub total</th>

                    </tr>
                </thead>
                <tbody>

                    {orden.items.map((items, key) => {
                        
                        return <tr key={key}>
                            <th >{items.id}</th>
                            <th >{items.ancho}</th>
                            <th >{items.largo}</th>
                            <th >{items.precio}</th>
                            <th >{items.cantidad}</th>
                            <th >{items.cantidad * items.precio}</th>
                           
                        </tr>
                    })}
                     <h5 class="card-title mt-3">total - {orden.total}</h5>


                </tbody>
                    </table>
                    <div>
                        <button className="col btn btn-primary me-5" onClick={()=>{cambiar_estado(orden.id,2)}} disabled={orden.estado==2?true:false}>Aprobar</button>
                        <button className="col btn btn-danger" onClick={()=>{cambiar_estado(orden.id,3)}} disabled={orden.estado==3?true:false} >Anular</button>
                        
                    </div>
                   
                      
                   

                </div>
            </div>
        </div>
        
    ) : (<h1>Cargando</h1>)
}

export default Orden
