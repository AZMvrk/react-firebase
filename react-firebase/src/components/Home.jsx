import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { signOut, getAuth } from "firebase/auth"
import { app } from "../firebase-config"
import NewTodo from "./NewTodo"
import Todos from "./Todos"

function Home() {
	const [run, setRun] = useState(false)
	const [user, setUser] = useState(null)
	const navigate = useNavigate()

	useEffect(() => {
		getAuth(app).onAuthStateChanged((user) => {
			if (user) {
				console.log(user)
				setUser(user)
			} else {
				console.log("not logged in")
				setUser(null)
				navigate('/login')
			}
		})
	}, [navigate])

	/* useEffect(() => {
		const token = sessionStorage.getItem('token')

		if (!token || !user) {
			console.log('redirect')
			console.log(user)
			navigate('/login')
		}
	}, [navigate, user]) */

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
			<div className="pencil-h2">
			<h2>Your To Do List</h2>
			<div className="pencil"></div>
			</div>
			{user &&
				<>
					<NewTodo setRun={setRun} user={user} />
					<Todos run={run} setRun={setRun} user={user} />
				</>
			}

			<button className="logout-button" onClick={handleLogout}>logout</button>
		</div>
	)
}

export default Home