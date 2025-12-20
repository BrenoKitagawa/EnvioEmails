import React, { useEffect, useRef } from 'react'
import { api } from '../services/api'

const Form = () => {

  const refInput = useRef(null)

  function sendFile(e){
    e.preventDefault()
    const file = refInput.current.files[0];

  if (!file) {
    alert("Selecione um arquivo");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

    api.post("/upload",formData,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  }
   

  return (
    <div className='w-250 h-150 rounded-3xl flex justify-between items-center'>
      <div className='w-125 size-full bg-amber-200 pt-8 rounded-bl-3xl rounded-tl-3xl flex flex-col items-center'>
        <h1 className='text-1xl font-bold'>Envio de emails</h1>
      </div>
      <div className='w-125 bg-amber-400 size-full pt-8 rounded-br-3xl rounded-tr-3xl flex flex-col items-center'>
        <h1 className='text-1xl font-bold'>Arquivo</h1>
        <form onSubmit={sendFile} enctype="multipart/form-data" className='flex flex-col gap-5 pt-10'> 
                <input ref={refInput} type="file" name="Arquivo" id="Arquivo" />
                <button type='submit'>Enviar</button>
        </form>

        
      </div>
    </div>
  )
}

export default Form
