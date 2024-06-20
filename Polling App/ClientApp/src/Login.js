import './Login.css';

let adres = `http://${window.location.hostname}/php/access.php`

function Login() {
  return (
    <div>
      <header>
      </header>
      <div class="box">
            <h2>Login page</h2>
            <form action={adres} method="post">
              <div class="form-group">
                  <label for="">E-mail</label>
                  <input type="=email" name="email" id="" placeholder="Enter E Mail"></input>
              </div>

              <input type="submit" value="login"></input>
            </form>
        </div>
    </div>
  );
}

export default Login;
