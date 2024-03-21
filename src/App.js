import { useState } from 'react';
import { FiSearch, FiMapPin } from 'react-icons/fi';
import './styles.css';

import api from './services/api'

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({});

  async function handleSearch() {
    // 15895000/json/

    if(input === '') {
      alert("Insira um CEP válido")
      return;
    }

    try {
      const response = await api.get(`${input}/json`)
      console.log(response.data)
      setCep(response.data)
      setInput('')

    } catch (e) {
      alert("Erro ao consultar o CEP");
      setInput('')
    }
  }

  return (
    <div className="container">
      <h1 className="title">Consulta CEP</h1>
      <div className="containerInput">
        
        <input type="text"
        placeholder="Digite o CEP"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        />
        
        <button className="buttonSearch" onClick={handleSearch}> <FiSearch size={25} color='#FFF'/> </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>{cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>

        </main> 
      )}

      <div><FiMapPin className="location-pin-icon" /></div>

    </div>
  );
}

export default App;
