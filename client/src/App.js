import React,{useState,useEffect} from "react";
import axios from 'axios'

const App = () => {
    const [login,setLogin] = useState({username:'',password:''})
    const [login_info,setLoginInfo] = useState()
    const [is_visible,set_is_visible] = useState(false)

    const onChangeHandler = (e) => {
       const name = e.target.name
       const value = e.target.value
       
       setLogin({...login, [name]:value})
    }

    async function fetchData() {
        try {
            //test';-- 
            const params = new URLSearchParams({username:login.username,password:login.password});
            let url = `http://localhost:5000/api/login?${params.toString()}`
            const res = await axios.post(url); 
            setLoginInfo(res)
            } 
            catch (err) 
            {
                console.log(err);
            }
        }

    useEffect(()=>{
        console.log(login)
    },[login])

    return (
        <div className="container">
            <label><b>Username</b></label>
            <input type='text' name="username" placeholder="Enter Username" onChange={onChangeHandler}/>
            
            <label><b>Password</b></label>
            <input type='text' name="password" placeholder="Enter Password" onChange={onChangeHandler}/>
            <button type='button' name="submit" onClick={fetchData}>Submit</button>
        </div>
        )
}

export default App