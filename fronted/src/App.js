
import { useState, useEffect } from "react";
import './App.css';
import ArticleList from "./Components/ArticleList";
import Form from "./Components/Form";
function App() {

  const [articles, setArticles] = useState([])
  const [editedArticle, setEditedArticles] = useState(null)

  useEffect(() => {
    fetch("http://127.0.0.1:5000/get", {
      'methods': 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(resp => setArticles(resp))
      .catch(error => console.log(error))
  },
    [])

  const editArticle = (article) => {
    console.log("hello")
    setEditedArticles(article)
  }


  const updatedData = (article) => {
    const new_article = articles.map(my_article => {
      if (my_article.id === article.id) {
        return article
      }
      else {
        return my_article
      }
    })
    setArticles(new_article)
  }

  const openForm = () => {
    setEditedArticles({ title: '', body: '' })
  }

  const InsertedArticle=(article)=>{
    const new_articles =[...articles, article]
    setArticles(new_articles)
  
  }

  return (
    <div className="App">
      <div className="row">
        <div className="col">
          <h1>React Js+Flask(API) Application</h1>

        </div>
        <div className="col">
          <button className="btn btn-outline-light" onClick={openForm} >InsertArticle</button>
        </div>

      </div>

      <ArticleList articles={articles} editArticle={editArticle} />
      {editedArticle ? <Form article={editedArticle} updatedData={updatedData} InsertedArticle={InsertedArticle} /> : null}

    </div>
  );
}

export default App;
