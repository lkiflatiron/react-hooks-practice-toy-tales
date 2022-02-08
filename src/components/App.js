import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/toys')
    .then(res => res.json())
    .then(toys => setToys(toys))
  }, [])

  function onToyAdd(newToy) {
    setToys([...toys, newToy])
  }

  function onDeleteToy(deletedToy) {
    const newArr = toys.filter(toy => {
      return (toy.id !== deletedToy.id) ? toy : null 
    })
    setToys(newArr)
  }

  function onUpdateToy(updatedToy) {
    const newArr = toys.map(toy => {
      return (toy.id === updatedToy.id) ? updatedToy : toy  
    })
    setToys(newArr)
  }

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onToyAdd={onToyAdd} /> : null}
      <div className="buttonContainer">
        <button 
          onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer 
        toys={toys} 
        onDeleteToy={onDeleteToy} 
        onUpdateToy={onUpdateToy}
      />
    </>
  );
}

export default App;
