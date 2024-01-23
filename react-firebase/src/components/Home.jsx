import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { signOut, getAuth } from "firebase/auth"
import { app } from "../firebase-config"

function Home() {
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
			home page

			sensitive content

			<button onClick={handleLogout}>logout</button>
		</div>
	)
}

export default Home