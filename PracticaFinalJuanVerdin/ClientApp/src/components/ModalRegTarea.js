import { useEffect, useState } from "react"
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, ModalFooter, Button } from "reactstrap"

const modeloRegTarea = {
    idTarea: 0,
    nombre: "",
    descripcion: "",
    iscompleted: ""
}

const ModalRegTarea = ({ mostrarModal, setMostrarModal, guardarTarea, editar, setEditar, editarTarea }) => {

    const [regTarea, setTarea] = useState(modeloRegTarea);

    const actualizaDato = (e) => {
        console.log(e.target.name + " : " + e.target.value)
        setTarea(
            {
                ...regTarea,
                [e.target.name]: e.target.value
            }
        )
    }

    const enviarDatos = () => {

        if (regTarea.idTarea == 0) {
            guardarTarea(regTarea)
        } else {
            editarTarea(regTarea)
        }
    }

    useEffect(() => {
        if (editar != null) {
            setTarea(editar)
        } else {
            setTarea(modeloRegTarea)
        }


    }, [editar])

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal)
        setEditar(null)
    }
    return (
        <Modal isOpen={mostrarModal}>
            <div style={{ display: "flex" }}>
                <button style={{ marginLeft: "auto" }} type='button' className='btn-close' onClick={cerrarModal} >
                </button>
            </div>
            <ModalHeader>
                {regTarea.idTarea == 0 ? "Nueva Tarea" : "Editar Tarea"} 
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup className='input-group mb-3'>
                        <span className='input-group-text'><i class="fas fa-tasks fa-lg"></i></span>
                        <input type='text' className='form-control' placeholder='Nombre Tarea'
                            name="nombre" onChange={(e) => actualizaDato(e)} value={regTarea.nombre} >
                        </input>
                    </FormGroup>
                    <FormGroup className='input-group mb-3'>
                        <span className='input-group-text'><i className="fa-solid fa-comment"></i></span>
                        <input type='text' className='form-control' placeholder='Descripción'
                            name="descripcion" onChange={(e) => actualizaDato(e)} value={regTarea.descripcion} >
                        </input>
                    </FormGroup>
                    <FormGroup className='input-group mb-3'>
                        <span className='input-group-text'><i class="fa-solid fa-clipboard-check"></i></span>
                        <input type='text' className='form-control' placeholder='Estatus'
                            name="iscompleted" onChange={(e) => actualizaDato(e)} value={regTarea.iscompleted} >
                        </input>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <button className='btn btn-success' onClick={enviarDatos}>
                    <i className='fa-solid fa-floppy-disk'></i> Guardar
                </button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalRegTarea;