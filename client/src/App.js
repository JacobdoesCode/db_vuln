import React,{useState,useEffect} from "react";
import axios from 'axios'
import './styles.css'
import "bootstrap/dist/css/bootstrap.min.css"
import Banner from './components/Banner'

const App = () => {
    const [login,setLogin] = useState({username:'',password:''})
    const [login_info,setLoginInfo] = useState()
    const [error,setError] = useState(false)
    const [is_visible,set_is_visible] = useState(false)

    const onChangeHandler = (e) => {
       const name = e.target.name
       const value = e.target.value
       
       setLogin({...login, [name]:value})
    }


    async function submitInsecure() {
        try{
            setError(false)
            //test';-- 
            const params = new URLSearchParams({username:login.username,password:login.password});
            let url = `http://localhost:5000/api/insecure/login?${params.toString()}`
            const res = await axios.post(url); 
            console.log(res.status)
            setLoginInfo(res.data[0].username)
        }
        catch(error){
            setError(true)
            setLoginInfo(error.response.data)
        } 
        set_is_visible(true)  

        }


    async function submitSecure() {
        try{
            setError(false)
            const params = new URLSearchParams({username:login.username,password:login.password});
            let url = `http://localhost:5000/api/secure/login?${params.toString()}`
            const res = await axios.post(url); 
            setLoginInfo(res.data[0].username)

        }
        catch(error){
            setError(true)
            setLoginInfo(error.response)
        } 
        set_is_visible(true)  
        }

        useEffect(()=>{
            console.log(login_info)
        },[login_info])

    return (
        <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <Banner login_info={login_info} is_visible={is_visible} error={error}/>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                name="username"
                type="text"
                className="form-control mt-1"
                placeholder="Enter Username"
                onChange={onChangeHandler}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                name="password"
                type="text"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={onChangeHandler}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="button" className="btn btn-primary" style={{backgroundColor: '#FF0000', borderColor: '#FF0000'}} onClick={submitInsecure}>
                Submit Insecurely
              </button>
              <button type="button" className="btn btn-primary" onClick={submitSecure}>
                Submit Securely
              </button>
            </div>
          </div>
        </form>
      </div>
        )
}

export default App