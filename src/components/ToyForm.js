import React, {useState} from "react";

function ToyForm({onToyAdd}) {

  const [toyData, setToyData] = useState({
    name: "",
    image: "",
    likes: 0
  })

  function handleOnSubmit(e) {
    e.preventDefault()
    fetch('http://localhost:3001/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        name: toyData.name,
        image: toyData.image,
        likes: toyData.likes
      })
    })
    .then(res=> res.json())
    .then((newToy) => onToyAdd(newToy))

    e.target.reset()
  }

  function handleOnChange(e) {
    setToyData({
      ...toyData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleOnSubmit}>
        <h3>Create a toy!</h3>
        <input
          onChange={handleOnChange}
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
        />
        <br />
        <input
          onChange={handleOnChange}
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
