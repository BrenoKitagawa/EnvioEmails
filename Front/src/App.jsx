import { ToastContainer } from 'react-toastify'
import Form from './components/Form'

function App() {

  return (
    <>  
      <div className='flex justify-center items-center h-screen  bg-zinc-900'>
        <ToastContainer/>
        <Form />
      </div>
    </>
  )
}

export default App
