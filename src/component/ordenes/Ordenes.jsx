import React, { useState } from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import ModalOrdnes from './ModalOrdnes'

const Ordenes = () => {
    const [ordenes, setordenes] = useState([])
    const [Clientes, setclientes] = useState([])
    const [mostrar, setmostrar] = useState(false)
    const [modificar, setmodificar] = useState(false)


    const buscar_clientes = useCallback(
        async () => {
            let respuesta = await fetch("http://localhost/crud/clientes/clientes.php", {
                method: "GET",

            })
            let json = await respuesta.json()
            //console.log(json)
            if (json.error == false) {
                setclientes(json.datos)
            } else {
                alert(json.mensaje)
            }

        }
        , [setclientes])


    const buscar_ordenes = useCallback(
        async () => {
            let respuesta = await fetch("http://localhost/crud/ordenes/ordenes.php", {
                method: "GET"
            })
            let json = await respuesta.json()
            if (json.error == false) {
                setordenes(json.datos)
            } else {
                alert(json.mensaje)
            }

        }
        , [])



    const [datos, setdatos] = useState({
        id_cliente: "",
    })
   
    useEffect(
        () => {
            buscar_ordenes()
            buscar_clientes()
        }

        , [buscar_ordenes, buscar_clientes])

    const [items, setitems] = useState([])


    const actualizar_informacion_item = (pos, event) => {


    }
    const actualizar_informacion = (event) => {

        setdatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }





    const insertar = () => {
        setmostrar(true)
        setmodificar(false)
    }


    return (
        <div className="container">
            <h1>Ordenes</h1>
            <button className="btn btn-primary" onClick={insertar}  >Agregar Orden</button>

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Cedula</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">catidad items</th>
                        <th scope="col">total</th>

                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>

                    {ordenes.map((orden, key) => {
                        
                        return <tr key={key}>
                            <th >{orden.id}</th>
                            <th >{orden.cedula_cliente}</th>
                            <th >{orden.fecha}</th>
                            <th >{orden.cantidad_items}</th>
                            <th >{orden.total}</th>
                            <th ><Link className="btn btn-warning" to={`/orden/${orden.id}`} >Ver detalles</Link></th>
                            
                        </tr>
                    })}



                </tbody>
            </table>
              <ModalOrdnes
            mostrar={mostrar} setmostrar={setmostrar} modificar={modificar} buscar_clientes={buscar_clientes}
            datos={datos} setdatos={setdatos} actualizar_informacion={actualizar_informacion}
            Clientes={Clientes} buscar_ordenes={buscar_ordenes}
        /> 

        </div>
    )
}

export default Ordenes
