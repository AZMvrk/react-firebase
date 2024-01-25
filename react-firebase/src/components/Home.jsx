import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { signOut, getAuth } from "firebase/auth"
import { app } from "../firebase-config"
import NewTodo from "./NewTodo"
import Todos from "./Todos"

function Home() {
	const [run, setRun] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		const token = sessionStorage.getItem('token')

		if (!token) {
			navigate('/login')
		}
	}, [navigate])

	const handleLogout = () => {
		const auth = getAuth(app)

		signOut(auth)
			.then(() => {
				sessionStorage.removeItem('token')
				navigate('/login')
			})
	}

	return (
		<div className="home">
			<h2>home page</h2>

			<NewTodo setRun={setRun} />
			<Todos run={run} setRun={setRun} />

			<button onClick={handleLogout}>logout</button>
		</div>
	)
}

export default Home