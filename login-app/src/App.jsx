import { useState } from 'react'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessages, setErrorMessages] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username || !password) {
      setErrorMessages("Username dan password tidak boleh kosong");
      return;
    }
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password }),
      })
      const result = await response.json()
      if (!result.ok) {
        throw new Error(result.message)
      }
      alert("Login berhasil")
    } catch (error) {
      setErrorMessages(error.message)
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
      {errorMessages && <div style={{ color: "red" }}>{errorMessages}</div>}
    </div>
  );
}

export default Login;