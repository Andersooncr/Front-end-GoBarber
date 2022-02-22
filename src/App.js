import React, {useState, useEffect} from "react";
import Header from "./components/Header";
import "./App.css";
import api from './services/api'

function App(){

    const [projects, setProjects] = useState([]);

    useEffect(()=>{
        api.get('projects').then(res =>{
            setProjects(res.data)
        });
    },[]);

    async function handleAddProject(){
        const response = await api.post('projects',{
            title:"Mobile com React Native",
            owner:"Anderson"
        })

        const project  = response.data

        setProjects([...projects, project]);
    }


    return (
        <>
            <Header title = "Homepage"/>

            <div className="card">
                <div className="card-body"> 
                    <ul>
                        {projects.map(el=> <li key={el.id}>{el.title}</li>)}
                    </ul>
                </div> 
            </div>  
            <div className="card">
                <div className="card-body">
                    <label htmlFor="name">Title:</label>
                        <br />
                            <input type="text" id="title" name="title" className="form-control"/>
                        <br />
                    <label htmlFor="name">Owner:</label>
                        <br />
                            <input type="text" id="owner" name="owner" className="form-control"/>
                        <br />
                </div>
            </div>

            <button type="button" onClick={handleAddProject}>Add project</button>
        </>
    );
}

export default App