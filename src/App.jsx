import { useEffect, useState } from "react";

const initialArticlesData = {

  title: "",
  author: "",
  content: "",
  image: "",
  available: false,
}


function App() {
  const [activeArticles, setActiveArticles] = useState([]);
  const [availableMessage, setAvailableMessage] = useState("");
  const [initialArticles, setInitialArticles] = useState(initialArticlesData);

  useEffect(() => {
    if (initialArticles.available) {
      
      setAvailableMessage("attenzione, l'articolo sarà visibile");
    } else {
      
      setAvailableMessage("attenzione, l'articolo sarà nascosta");
    }
  }, [initialArticles.available]);

  const handleArticlesForm = (event) => {

    event.preventDefault()


      const newArticle = {
        ...initialArticles,
        id: Date.now(),
      };
      const newArray = [...activeArticles, newArticle];

      setActiveArticles(newArray);

     setInitialArticles(initialArticlesData);
    }


  
  const removeElem = (toRemove) => {
    const newArray1 = activeArticles.filter((curItem) => curItem.id !== toRemove.id)
    setActiveArticles(newArray1)
  }
  const handleInputChange = (event) => {
    const keyToChange = event.target.name;
    // Se l'input è checkbox,
    //    allora il value da inserire sarà true o false, preso da target.checked
    let newValue;

    if (event.target.type === "checkbox") {
      newValue = event.target.checked;
    } else {
      newValue = event.target.value;
    }

    const newData = {
      ...initialArticles,
      [keyToChange]: newValue,
    };

    setInitialArticles(newData);
  };

  return (
    <>
      <div className="container">
        <h2>I nostri articoli</h2>
        {activeArticles.length > 0 ? (
          <div >
            {
              activeArticles.map((curItem) => (<div key={curItem.id}>
                <h4>{curItem.title}</h4>
                <p>{curItem.author}</p>
                <button onClick={() => { removeElem(curItem) }}>🗑️</button>
              </div>
              ))
            }
          </div>
        ) : (
          <p>nessun articolo inserito</p>
        )
        }

        <h2>Aggiungi articolo</h2>
        <form action="" onSubmit={handleArticlesForm}>
          <div className="mb-3">
            <label htmlFor="titolo">Inserire titolo </label>
            <input className="form-control" id="titolo" type="text" value={initialArticles.title} onChange={handleInputChange} name="title" />
          </div>

          <div>
            <label htmlFor="autore">Inserire autore</label>
            <input type="text" id="autore" className="form-control" value={initialArticles.author}
              onChange={handleInputChange} name="author" />
          </div>
          <div>
            <label htmlFor="content">Inserire contenuto</label>
            <input type="text" id="content" className="form-control" value={initialArticles.content}
              onChange={handleInputChange} name="content" />
          </div>
          <div>
            <label htmlFor="image">Inserire immagine</label>
            <input type="text" id="image" className="form-control" value={initialArticles.image}
              onChange={handleInputChange} name="image" />
          </div>
          <div className="my-3">
              <label htmlFor="available">Disponibile</label>
              <input
                id="available"
                type="checkbox"
                name="available"
                checked={initialArticles.available}
                onChange={handleInputChange}
              />
              <div>{availableMessage}</div>
            </div>


          <button type="submit" className="btn btn-primary">Salva</button>
        </form>
      </div>
    </>
  )
}

export default App
