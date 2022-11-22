import React,{useState} from "react";
import axios from 'axios'
import './styles.css'
import "bootstrap/dist/css/bootstrap.min.css"

export default function Upload() {
    const [uploaded_file, setUploadedFile] = useState(null)

    const changeHandler = async(event) =>{
        setUploadedFile(event.target.files[0])
    }

    const handleInsecureSubmission = async(event) =>{
        event.preventDefault()
        const formData = new FormData();
        formData.append("file", uploaded_file);
        try {
            await axios.post("/api/insecure/upload",formData);
          } catch(error) {
            console.log(error)
          }
    }

    const handleSecureSubmission = async(event) =>{
        event.preventDefault()
        const formData = new FormData();
        formData.append("file", uploaded_file);
        try {
            await axios.post("/api/secure/upload",formData);
          } catch(error) {
            console.log(error)
          }
    }


    return(

        <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <input style={{textAlign:'center'}} type="file" name="file" onChange={changeHandler} />
            <div className="d-grid gap-2 mt-3">
              <button type="button" className="btn btn-primary" style={{backgroundColor: '#FF0000', borderColor: '#FF0000'}} onClick={handleInsecureSubmission}>
              Insecure Submit
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSecureSubmission}>
                Submit Securely
              </button>
            </div>
          </div>
        </form>
      </div>  
    )
}
