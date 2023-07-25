import React, { useEffect, useState } from "react"
import { Col, Container, Row, Card, CardHeader, CardBody, Button, input } from "reactstrap"
import ModalRegTarea from "./components/ModalRegTarea"
import TablaRegTarea from "./components/TablaRegTarea"
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const App = () => {

    const [regTareas, setRegTareas] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false)
    const [editar, setEditar] = useState(null)
    const [search, setSearch] = useState("")

    const mostrarRegTareas = async () => {
        const response = await fetch("api/regtarea/Lista");

        if (response.ok) {
            const data = await response.json();
            setRegTareas(data)
        } else {
            console.log("Error en los datos de la lista")
        }
    }

    useEffect(() => {
        mostrarRegTareas()
    }, [])

    const guardarTarea = async (regTarea) => {

        const response = await fetch("api/regtarea/Guardar", {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(regTarea)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarRegTareas();
        }
    }

    const editarTarea = async (regTarea) => {

        const response = await fetch("api/regtarea/Editar", {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(regTarea)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarRegTareas();
        }
    }

    //Se agrego
    const eliminarTarea = async (id) => {

        var respuesta = window.confirm("\u00bfDesea eliminar registro de tarea con id: " + id + "?")

        if (!respuesta) {
            return;
        }
        const response = await fetch("api/regtarea/Eliminar/" + id, {
            method: 'DELETE'
        })

        if (response.ok) {
            mostrarRegTareas();
        }
    }

    //filtrado 
    const searcher = (e) => {
        setSearch(e.target.value)
        console.log(e.target.value)
    }

    let results = []
    if (!search) {

        results = regTareas;
    } else {
        results = regTareas.filter((regTareas) =>
            regTareas.nombre.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }
  
    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h2 className="text-center link-primary" >Registro de Tareas del Alumno Juan Verdin</h2>
                        </CardHeader>
                        <CardBody>
                            <tr>
                                <button className='btn btn-dark' onClick={() => setMostrarModal(!mostrarModal)}>
                                    <i className='fa-solid fa-circle-plus'></i> Registra Nueva Tarea
                                </button>
                            </tr>
                            <hr></hr>
                            <td>
                                <input value={search} onChange={searcher} type="text" placeholder='Buscar Tarea' className='form-control' />
                            </td>
                            <hr></hr>
                            <TablaRegTarea data={results}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarModal={setMostrarModal}
                                eliminarTarea={eliminarTarea}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <ModalRegTarea
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                guardarTarea={guardarTarea}
                editar={editar}
                setEditar={setEditar}
                editarTarea={editarTarea}
            />
        </Container>

    )
}

export default App;