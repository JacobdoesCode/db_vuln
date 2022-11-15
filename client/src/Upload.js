import React,{useState,useEffect} from "react";
import axios from 'axios'
import './styles.css'
import "bootstrap/dist/css/bootstrap.min.css"

export default function Upload() {
    const [uploaded_file, setUploadedFile] = useState(null)

    const changeHandler = async(event) =>{
        setUploadedFile(event.target.files[0])
    }

    const handleSubmission = async(event) =>{
        event.preventDefault()
        const formData = new FormData();
        formData.append("file", uploaded_file);
        try {
            const response = await axios.post("/api/insecure/upload",formData);
          } catch(error) {
            console.log(error)
          }
        console.log(uploaded_file)
        console.log("submission")
    }

    return(
        <div>
            <input type="file" name="file" onChange={changeHandler} />
            <div>
                <button onClick={handleSubmission}>Submit</button>
            </div>
        </div>    
    )
}
