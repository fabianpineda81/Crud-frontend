import React,{useState} from 'react'
import { Modal, Button } from 'react-bootstrap'

const ModalOrdnes = ({ mostrar, setmostrar, modificar,datos,setdatos,actualizar_informacion,buscar_clientes,Clientes,buscar_ordenes}) => {
    const reiniciarValores=()=>{
        setdatos({
            id_cliente: "",
        })
        setdatosItem([])
      }


      const [datosItem, setdatosItem] = useState([])

    
      

  const ingresarOrden =async () => {
      setmostrar(true)
    let form= new FormData();
    let datos_orden = datos
    datos.items=datosItem


    form.append("informacion",JSON.stringify(datos))
    console.log(form.get("informacion"))
    let response =await fetch("http://localhost/crud/ordenes/ordenes.php",{
      method:"POST",
      body:form
    })
    let json = await response.json()

    if(json.error==false){
      alert(json.mensaje)
      buscar_ordenes()
      setmostrar(false)
      reiniciarValores()
      
    }else{
      alert(json.error);
    }

  }
  const agregarItem=()=>{
      //console.log(datosItem)
      setdatosItem([...datosItem,{
        ancho: 0,
        largo: 0,
        precio: 0,
        cantidad: 0
      }])
  }
  const actualizar_informacion_item=(pos,event)=>{
    let tmpitems=datosItem
     let item= tmpitems[pos]
    item={...item,[event.target.name]:event.target.value}
    tmpitems[pos]=item 
    

    setdatosItem(tmpitems)
    console.log(datosItem)

  }
  const quitar_item=(pos)=>{
    let tmpitems=[...datosItem]
      tmpitems.splice(pos,1)
    
    setdatosItem(tmpitems)
    

  }
      
    return (
        <>
        <Modal  size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered show={mostrar} onHide={() => {setmostrar(false);reiniciarValores()}}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar orden</Modal.Title>
          </Modal.Header>
          <Modal.Body>
  
            <div class="row">
              
  
              <div class="col-6 offset-3">
                <label>CLiente</label>
                <select class="form-select" aria-label="Default select example" name="id_cliente"  onChange={actualizar_informacion}>
                <option value="">Seleccionar</option>
                {Clientes.map((cliente,key)=>{
                    return <option value={cliente.id}>{cliente.cedula}-{cliente.nombre} </option>
                })}
                </select>

            
              </div>
              
  
            </div>

            {
                datosItem.map((datos,key)=>{
                    console.log(key)
                   return  <div class="row mt-4" key={key}>
                    <div class="col-3">
                      <input type="number" class="form-control" placeholder="largo" name="largo" value={datosItem.largo} onChange={(event)=>{actualizar_informacion_item(key,event)}} aria-label="First name" />
                    </div>
                    <div class="col-3">
                      <input type="number" class="form-control" placeholder="ancho" name="ancho" value={datosItem.ancho} onChange={(event)=>{actualizar_informacion_item(key,event)}} aria-label="Last name" />
                    </div>
                    <div class="col-3">
                      <input type="number" class="form-control" placeholder="precio" name="precio" value={datosItem.precio} onChange={(event)=>{actualizar_informacion_item(key,event)}} aria-label="Last name" />
                    </div>
                    <div class="col-2">
                      <input type="number" class="form-control" placeholder="cantidad" name="cantidad" value={datosItem.cantidad} onChange={(event)=>{actualizar_informacion_item(key,event)}} aria-label="Last name" />
                    </div>
                    <div class="col-1">
                      <button className="btn btn-danger" onClick={()=>{quitar_item(key)}}>X </button>
                    </div>
                  </div>
                })
            }

            <button className="btn btn-primary mt-3" onClick={agregarItem}>Agregar item</button>
           
  
          
  
            
  
  
  
          </Modal.Body>
  
  
  
  
          <Modal.Footer>
            <Button variant="primary" onClick={ingresarOrden}>
              {modificar ? "Modificar" : "Agregar"}
            </Button>
            <Button variant="secondary" onClick={() => { setmostrar(false);reiniciarValores()}}>
              Close
            </Button>
  
          </Modal.Footer>
        </Modal>
      </>
    )
}

export default ModalOrdnes
