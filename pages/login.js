import {useState, useEffect} from 'react';
import Router from 'next/router'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { GoogleLogin } from 'react-google-login';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const access = localStorage.getItem("access_token");
        if(JSON.parse(access) != null){
            Router.push('/')
        }
    }, [])

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const [attemptingToLogin, setAttemptingToLogin] = useState(false);

    const [url_auth, setUrl_token] = useState(
        "http://auth.dev.com:5000/authorize/?response_type=code&client_id=aorF1PBeUTI5n26ItF92JLgUfR304ahB14xMlvFo&redirect_uri=http://dev.com:3000/retreive_access_token"
    );

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    };

    const openLogin = () => {
        const popup = window.open({url_auth},'popup','width=600,height=600');
        console.log(location.href);
        window.addEventListener('popstate', event => {
          console.log('*********** ', event, location.href, window.history)
          // // Only accept messages from http://example.com.
          // if (event.origin === 'http://dev.com:3000') {
          //   if (event.data === 'close') popup.close()
          // }
        })
        // window.opener.postMessage('close', 'http://dev.com:3000');
    }

    const responseGoogle = (response) => {
      console.log(response);
    }


    const onLogin = async(e) => {
        e.preventDefault();
        setAttemptingToLogin(true);

        const res = await fetch('http://api.dev.com:7000/token/', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: inputs.email, password: inputs.password
            })
        })
        const auth = await res.json()
        console.log(auth)
        localStorage.setItem("access_token", JSON.stringify(auth['access']));
        localStorage.setItem("refresh_token", JSON.stringify(auth['refresh']));
        Router.push('/')
        //remove
    };

  return (
    <div className="container" style={{marginTop: '30px'}}>
        <div className="row-fluid">
          <div className="well" style={{width: '320px', marginLeft: 'auto', marginRight: 'auto'}}>
            <div className="row-fluid">
              <div>
                <p>Please login to see this page.</p>
                <form onSubmit={onLogin}>
                  
                  <div id="div_id_username" className="clearfix control-group">
                    <div className="form-group">
                      <label htmlFor="id_username">Email:</label>
                      <input
                          className="form-control"
                          type="text"
                          name="email"
                          id="email"
                          placeholder="Saisissez votre mail"
                          required={true}
                          value={inputs.email}
                          onChange={handleInputChange} />
                      
                    </div>
                  </div>
                  
                  <div id="div_id_password" className="clearfix control-group ">
                    <div className="form-group">
                      <label htmlFor="id_password">Password:</label>
                      <input 
                         className="form-control"
                          type="password"
                          name="password"
                          id="pwd"
                          placeholder="Saisissez votre passe"
                          required={true}
                          value={inputs.password}
                          onChange={handleInputChange}
                      />
                      
                    </div>
                  </div>
                  
                  <input type="submit" value="login" className="btn btn-primary form-control"/>
                </form>
                <div className="loginBtn">
                  <a target="popup" href={url_auth} className="btn btn-default form-control" onClick={openLogin}>Login with Server Auth</a>
                </div>
                <div className="loginBtn">
                   <GoogleLogin
                        clientId="586928544873-5qsiohp1cppcmp7cjnj2sv9br3qh3l1k.apps.googleusercontent.com"
                        redirectUri="http://dev.com:3000/retreive_access_token"
                        buttonText="Google Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        className='google-btn'
                        cookiePolicy={'single_host_origin'}
                      />
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

