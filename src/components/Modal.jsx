import CerrarBtn from '../img/cerrar.svg'
import { useState } from 'react'
import Mensaje from './Mensaje'

const Modal = ({setModal,  aniomarModal,setAnimarModal, guardarGasto}) => {
  const [mensaje, setMensaje] = useState('')
  const [nombre, setNombre] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [categoria, setCategoria] = useState('')

  const handleSubmit= (e) =>{
    e.preventDefault()

    if([nombre, cantidad, categoria].includes('')) {
      setMensaje('Todos los campos son obligatorios')
      setTimeout(() => {
        setMensaje('')
      }, 3000);
      return;
    }
    //llama a Guardargasto
    
    guardarGasto({nombre,cantidad,categoria})
  }

  const cerrarModal= ()=>{
   
    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500);
    
  }


  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img src={CerrarBtn}
              alt="cerrar ventana"
              onClick={cerrarModal}
              />
        </div>

        <form className={`formulario ${aniomarModal ? "animar" : "cerrar"  }`}
          onSubmit={handleSubmit}>
          <legend>Nuevo Gasto</legend>
          {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
          <div className='campo'>
            <label htmlFor='nombre'>Nombre Gasto</label>
            <input type='text'
                id="nombre"
                value= {nombre}
                placeholder='Añade el nombre del Gasto'
                onChange={ e => setNombre(e.target.value)}
            />
          </div>
          <div className='campo'>
            <label htmlFor='cantidad'>Cantidad</label>
            <input type='number'
                id="cantidad"
                value= {cantidad}
                placeholder='Añade el monto del Gasto'
                onChange={ e => setCantidad(Number(e.target.value))}
            />
          </div>
          <div className='campo'>
            <label htmlFor='categoria'>Categoria</label>
            <select id="categoria" 
                 value= {categoria}
                 onChange={ e => setCategoria(e.target.value)} >
              <option value="">-- Seleccione --</option>
              <option value="ahorro">Ahorro</option>
              <option value="comida">Comida</option>
              <option value="casa">Casa</option>
              <option value="gastos">Gastos varios</option>
              <option value="ocio">Ocio</option>
              <option value="salud">Salud</option>
              <option value="suscripciones">Suscripciones</option>

            </select>
          </div>

          <input type='submit'
                value="Añadir Gasto"

            />
            
        </form>
    </div>
  )
}

export default Modal