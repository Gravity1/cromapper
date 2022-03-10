import React from 'react'
import './Login.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import ForgotPass from './ForgotPass';
import GoogleLogin from 'react-google-login'


function Login() {

  // function responseGoogle(response) {
  //   console.log(response);
  //   // console.log(response.profileObj);
  // }

  const signUpDiv =
    <div style={{ marginTop: "2em" }}>
      <form
        onSubmit={handleSubmit}


      >
        <div className="form_div">
          <div><h1>Login</h1></div>
          <div style={{ textAlign: "center" }}><p>Sign in to continue</p></div>
          <div style={{ marginBottom: "2em" }, { margintTop: "2em" }}>
            <label htmlFor="email">PERSONAL/WORK EMAIL</label><br />
            <input type="email" id="email" name="email" />
          </div>

          <div style={{ marginBottom: "2em" }}>
            <label htmlFor="password">PASSWORD</label><br />
            <input type="password" id="password" name="password" />
          </div>

          <div className=""
            style=
            {
              { marginBottom: "1em" }
            }>

            <button

              style={
                { borderRadius: "0.5em" }
              }
              type="submit"
              value="submit"
              className="btn btn-light login_button">
              log in
            </button>

          </div>
          <div style={{ marginBottom: '1em' }}>
            <span id="or">
              OR
            </span>
          </div>

          <div
            style={
              { width: "100%" }
            }
          >
            <GoogleLogin
              clientId='715177264735-fq5okaiiv0r7jde23son3o5p83jb6ah0.apps.googleusercontent.com'
              buttonText='Login'
              onSuccess={(response)=>{console.log(response)}}
              onFailure={(response)=>{console.log(response)}}
              cookiePolicy={'single_host_origin'}
            />
          </div>

          <br />
          <div>
            <p>
              {/* <Link>Forgot password ?</Link> */}
              Forgot password ?
            </p>
          </div>
        </div>
      </form>
    </div>

  const fPassDiv = <ForgotPass />;


  function handleSubmit(e) {
    e.preventDefault(); console.log('You clicked submit.');
  }



  return (
    <div className="LoginApp">
      <div className="filter">

        <div>
          <nav>
            <div>
              <div id='header1'>CROMAP</div>
              <div id='header2'>Improving Farm Efficiencies</div>
            </div>
            {/* <a href="/html/">HTML</a> | */}
          </nav>

        </div>

        {signUpDiv}
        {/* {fPassDiv} */}
      </div>
    </div>)

}



export default Login