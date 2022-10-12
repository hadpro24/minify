import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GoogleLogin } from "react-google-login";
import { useMainStore } from "../context/MainStorePrivider";

export default function LoginPage() {
  const { accessToken, updateTokens } = useMainStore();
  const router = useRouter();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [attemptingToLogin, setAttemptingToLogin] = useState(false);
  const [url_auth, setUrl_token] = useState(
    "http://auth.dev.com:5000/authorize/?response_type=code&client_id=aorF1PBeUTI5n26ItF92JLgUfR304ahB14xMlvFo&redirect_uri=http://dev.com:3000/retreive_access_token"
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const openLogin = () => {
    let popup = window.open({ url_auth }, "popup", "width=600,height=600");

    const timer = setInterval(function () {
      if (popup.closed) {
        clearInterval(timer);
      }
    }, 1000);
  };

  const responseGoogle = (response) => {
    updateTokens({
      accessToken: response["tokenId"],
    });
  };

  const responseErrorGoogle = (error) => {
    console.log(error);
  };

  const onLogin = async (e) => {
    e.preventDefault();
    setAttemptingToLogin(true);

    const res = await fetch("http://api.dev.com:7000/v1/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: inputs.email,
        password: inputs.password,
      }),
    });
    const auth = await res.json();
    console.log(auth);
    updateTokens({
      accessToken: auth["access"],
      refreshToken: auth["refresh"],
    });
  };

  useEffect(() => {
    console.log({ loginToken: accessToken });
    if (accessToken) {
      router.replace("/");
    }
  }, [accessToken]);

  return (
    <div className="container" style={{ marginTop: "30px" }}>
      <div className="row-fluid">
        <div
          className="well"
          style={{ width: "320px", marginLeft: "auto", marginRight: "auto" }}
        >
          <div className="row-fluid">
            <div>
              <h1 className="text-center mb-4">Minifly</h1>
              <form onSubmit={onLogin}>
                <div id="div_id_username" className="clearfix control-group">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      className="form-control"
                      type="text"
                      name="email"
                      id="email"
                      placeholder="Saisissez votre mail"
                      value={inputs.email}
                      onChange={handleInputChange}
                      required
                      style={{ height: 48 }}
                    />
                  </div>
                </div>

                <div id="div_id_password" className="clearfix control-group ">
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Saisissez votre passe"
                      value={inputs.password}
                      onChange={handleInputChange}
                      required
                      style={{ height: 48 }}
                    />
                  </div>
                </div>

                <input
                  type="submit"
                  value="Log in"
                  className="btn btn-primary btn-block btn-lg"
                />
              </form>
              <div className="loginBtn">
                <a
                  target="popup"
                  href={url_auth}
                  className="btn btn-light form-control"
                  onClick={openLogin}
                  style={{ height: 48, paddingTop: 14 }}
                >
                  Login with Server Auth
                </a>
              </div>
              <div className="loginBtn">
                <GoogleLogin
                  clientId="586928544873-5qsiohp1cppcmp7cjnj2sv9br3qh3l1k.apps.googleusercontent.com"
                  redirectUri="http://dev.com:3000/retreive_access_token"
                  buttonText="Google Login"
                  onSuccess={responseGoogle}
                  onFailure={responseErrorGoogle}
                  className="google-btn"
                  cookiePolicy={"single_host_origin"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
