import React,{useEffect} from "react";
import axios from 'axios'

const App = () => {
    useEffect( () => { 
        async function fetchData() {
            try {
                  const params = new URLSearchParams({username:'test',password:'test'});

                  let url = `http://localhost:5000/api/login?${params.toString()}`
                  const res = await axios.post(url); 
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);
    return (
        <div>
        </div>
        )
}

export default App