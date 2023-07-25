import { Button, Table } from "reactstrap"
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TablaRegTarea = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarTarea }) => {

    const enviarDatos = (regtarea) => {
        setEditar(regtarea)
        setMostrarModal(!mostrarModal)
    }

    return (
        <Table striped responsive>
            
            <thead>
                <tr>
                    <th class="link-dark">
                        <td>
                            <i class="fa-solid fa-hashtag"></i>
                        </td>
                        <td>ID</td>
                    </th>
                    <th class="link-dark">
                        <td>
                            <i class="fa-solid fa-arrow-down-wide-short"></i>
                        </td>
                        <td>Nombre</td>
                    </th>
                    <th class="link-dark">
                        <td>
                            <i class="fa-solid fa-comment"></i>
                        </td>
                        <td>Descripción</td>
                    </th>
                    <th class="link-dark">
                        <td>
                            <i class="fa-solid fa-clipboard-check"></i>
                        </td>
                        <td>Estatus</td>
                    </th>
                    <th class="link-dark">
                        <td>
                            <i class="fa-solid fa-gear"></i>
                        </td>
                        <td>Opciones</td>
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    (data.length < 1) ? (
                        <tr>
                            <td colSpan="4">Sin registros</td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item.idTarea}>
                                <td>{item.idTarea}</td>
                                <td>{item.nombre}</td>
                                <td>{item.descripcion}</td>
                                {item.iscompleted == "Completada" ?
                                    <td>
                                        {item.iscompleted}
                                        &nbsp;
                                        <i class="fa-regular fa-circle-check"></i>
                                    </td>
                                    : <td>{item.iscompleted}
                                        &nbsp;
                                        <i class="fa-regular fa-circle-xmark"></i> </td>}
                                <td>
                                    <button className='btn btn-warning' onClick={() => enviarDatos(item)}>
                                        <i className='fa-solid fa-edit'></i>
                                    </button>
                                    &nbsp;
                                    <button className='btn btn-danger' onClick={() => eliminarTarea(item.idTarea)}>
                                        <i className='fa-solid fa-trash'></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    )
                }
            </tbody>
        </Table>
    )
}

export default TablaRegTarea;