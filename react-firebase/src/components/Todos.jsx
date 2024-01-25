import { collection, deleteDoc, doc, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../firebase-config"

function Todos({ run, setRun }) {
	const [todos, setTodos] = useState(null)

	useEffect(() => {
		const todosCollection = collection(db, "todos")
		console.log("fetching todos")

		getDocs(todosCollection)
			.then(querySnapshot => {
				const todosData = querySnapshot.docs.map(doc => ({
					...doc.data(),
					id: doc.id
				}))
				setTodos(todosData)
			})
	}, [run])

	const handleDelete = (id) =>{
		const docRef = doc(db, "todos", id)
		
		deleteDoc(docRef)
			.then(() => {
				console.log(id, " has been deleted")
				setRun(currentState => !currentState)
			})
			.catch((err) => console.log(err))
	}

	return (
		<div className="todos">
			{todos
				?
				todos.map((todoData, index) => 
					<p key={index}>
						{todoData.todo}
						<button onClick={() => handleDelete(todoData.id)}>X</button>
					</p>
				)
				:
				"loading..."
			}
			<button onClick={() => setRun(currentState => !currentState)}>fetch todos</button>
		</div>
	)
}

export default Todos