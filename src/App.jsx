import { useState , useEffect} from 'react'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'

import {generarId} from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {
  const [presupuesto, setPresupuesto] = useState(0)
  const [isValidPresupuesto,setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [aniomarModal, setAnimarModal] = useState(false)
  const [gastos,setGastos] = useState([])
  const [gastoEditar, setGastoEditar] = useState({})

  const handleNuevoGasto = ()=>{
    setModal(true)
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  const guardarGasto = gasto =>{
    if(!gasto.id){
      gasto.fecha = Date.now()
      gasto.id= generarId()
      setGastos([...gastos, gasto])
    }
    else
    {
      const gastosActualiado = gastos.map((gastoItem)=>
        gastoItem.id === gasto.id ? gasto : gastoItem)
      setGastos(gastosActualiado)
      setGastoEditar({})
    }
    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500);
  }
  
  const eliminarGasto =(id)=>{
    var gastosActualizado = gastos.filter(gastosState => gastosState.id !== id)
    setGastos(gastosActualizado)
    
  }
  useEffect(()=>{
    if(Object.keys(gastoEditar).length>0){
      setModal(true)
      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
    }
  },[gastoEditar])

  return (
    
     <div className={modal ? 'fijar' : ''}>
        <Header
         presupuesto = {presupuesto} 
         setPresupuesto = {setPresupuesto}
         isValidPresupuesto={isValidPresupuesto}
         setIsValidPresupuesto= {setIsValidPresupuesto}
         gastos={gastos}
          
        />
        {isValidPresupuesto && (
         <>
            <main>
               <ListadoGastos
                  gastos={gastos}
                  setGastoEditar={setGastoEditar}
                  eliminarGasto ={eliminarGasto}
               />
                
            </main>
            <div className='nuevo-gasto'>
                <img  
                  src={IconoNuevoGasto}
                  alt = 'Nuevo gasto'
                  onClick={handleNuevoGasto}
                />
              </div>
          </>
        )}

        {modal && <Modal
            setModal={setModal}
            aniomarModal={aniomarModal}
            setAnimarModal={setAnimarModal}
            guardarGasto = {guardarGasto}
            gastoEditar={gastoEditar}
            setGastoEditar={setGastoEditar}
          />}
    </div>
   
  )
}

export default App
