import { useState } from "react"
import { app } from "../firebase-config"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from "react-router-dom"

function Form({ title }) {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const navigate = useNavigate()

	const handleAction = () => {
		const auth = getAuth(app)

		if (title === "login") {
			signInWithEmailAndPassword(auth, email, password)
				.then(res => {
					sessionStorage.setItem('token', res._tokenResponse.refreshToken)
					navigate('/')
				})
		} else if (title === "register") {
			createUserWithEmailAndPassword(auth, email, password)
				.then(res => {
					sessionStorage.setItem('token', res._tokenResponse.refreshToken)
					navigate('/')
				})
		}
	}

	return (
		<div className="login-register">
			<form>
				<h3>{title} form</h3>

				<input type="text" autoComplete="off" placeholder="e-mail" onChange={event => setEmail(event.target.value)} />
				<input type="password" autoComplete="off" placeholder="password" onChange={event => setPassword(event.target.value)} />

				<button type="button" onClick={handleAction}>{title}</button>
			</form>

			{/* <button onClick={() => {
				if (title === "login") navigate('/register')
				else navigate('/login')
			}}>{title === "login" ? "go to registration" : "go to login"}</button> */}

			{title === "login" 
				? 
					<button onClick={() => navigate('/register')}>go to register</button>
				:
					<button onClick={() => navigate('/login')}>go to login</button>
			}
		</div>
	)
}

export default Form