import React, { useEffect, useState, useCallback } from 'react'
import ModalCliente from './ModalCliente'

const Clientes = () => {
    const [clientes, setclientes] = useState([])
    const [mostrar, setmostrar] = useState(false)
    const [modificar, setmodificar] = useState(false)
    const [datos, setdatos] = useState({
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
    const actualizar_informacion = (event) => {

        setdatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }


    const buscar_clientes = useCallback(
        async () => {
            let respuesta = await fetch("http://localhost/crud/clientes/clientes.php", {
                method: "GET",

            })
            let json = await respuesta.json()
            console.log(json)
            if (json.error == false) {
                setclientes(json.datos)
            } else {
                alert(json.mensaje)
            }

        }
        , [setclientes])

    useEffect(() => {
        buscar_clientes()
    }, [buscar_clientes])

    const insertar = () => {
        setmostrar(true)
        setmodificar(false)
    }

    const accionModificar = async (cedula) => {
        setmostrar(true)
        setmodificar(true)
        let respuesta = await fetch(`http://localhost/crud/clientes/clientes.php?cedula=${cedula}`, {
            method: "GET"

        })
        let json = await respuesta.json()
        if (json.error == false) {

            
            setdatos({...json.datos,
                cedula_modificar:json.datos.cedula
            })
        } else {
            alert(json.error)
        }



    }

    const eliminar = async (cedula) => {
        console.log(cedula)
        let form = new FormData();
        console.log(form.get("informacion"));
        let respuesta = await fetch(`http://localhost/crud/clientes/clientes.php?cedula=${cedula}`, {
            method: "DELETE"

        })
        let json = await respuesta.json()
        if (json.error == false) {
            alert(json.mensaje)
            buscar_clientes()

        } else {
            alert(json.error)
        }

    }


    return (
        <div className="container">
            <h1>Clientes</h1>
            <button className="btn btn-primary" onClick={insertar}  >Agregar cliente</button>

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Cedula</th>
                        <th scope="col">nombre</th>
                        <th scope="col">apellidos</th>
                        <th scope="col">Direccion</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Nacionalidad</th>
                        <th scope="col">Correo</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>

                    {clientes.map((usuario, key) => {
                        return <tr key={key}>
                            <th >{usuario.id}</th>
                            <th >{usuario.cedula}</th>
                            <th >{usuario.nombre}</th>
                            <th >{usuario.apellido} - {usuario.apellido2}</th>
                            <th >{usuario.direccion}</th>
                            <th >{usuario.telefono}</th>
                            <th >{usuario.nacionalidad}</th>
                            <th >{usuario.correo}</th>
                            <th ><button className="btn btn-warning" onClick={() => accionModificar(usuario.cedula)}>Modificar</button></th>
                            <th ><button className="btn btn-danger" onClick={() => eliminar(usuario.cedula)}>Eliminar</button></th>
                        </tr>
                    })}



                </tbody>
            </table>
            <ModalCliente
                mostrar={mostrar} setmostrar={setmostrar} modificar={modificar} buscar_clientes={buscar_clientes}
                datos={datos} setdatos={setdatos} actualizar_informacion={actualizar_informacion}
            />

        </div>
    )
}

export default Clientes