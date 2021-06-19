import React from 'react'
import { useState } from 'react/cjs/react.development'
import APISERVICE from './APISERVICE';
function Form(props) {

    const [title, setTitle] = useState(props.article.title)
    const [body, setBody] = useState(props.article.body)
    const UpdateArticle = () => {
        APISERVICE.UpdateArticle(props.article.id, { title, body })
            .then(resp => props.updatedData(resp))
            .then(error => console.log(error))
    }

    const InsertArticle=()=>{
        APISERVICE.InsertArticle({title,body})
        .then(resp=>props.InsertedArticle(resp))
        .catch(error=>console.log(error))
    }

    return (
        <div>
            {props.article ? (
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>

                    <input type="text" className="form-control" placeholder="Please enter Title"
                        value={title} onChange={(e) => setTitle(e.target.value)} />

                    <label htmlFor="body" className="form-label">Description</label>

                    <textarea rows="5" value={body} onChange={(e) => setBody(e.target.value)} className="form-control" placeholder="Enter your body" />

                {   props.article.id ? 
                    <button onClick={UpdateArticle} className="btn btn-success mt-3" >Update</button>
                    :
                    <button onClick={InsertArticle} className="btn btn-outline-warning mt-3" >Insert</button>
                    
                }

                </div>
            ) : null
            }
        </div>
    )
}

export default Form
