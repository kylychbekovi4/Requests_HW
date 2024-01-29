import { useState, useEffect } from "react";
import Modal from "./components/modal/Modal";
import scss from "./App.module.scss";
import axios from "axios";
import {Random} from './components/random/Random.jsx'

const App = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [todo, setTodo] = useState([]);
	const [input, setInput] = useState("");
	const [isedit, setisEdit] = useState(false);
	const [editeridToDo, setediteridToDo] = useState(null);
	const [editInputValue, seteditInputValue] = useState("");
	const [select, setSelect] = useState("");

	const handleAdd = async () => {
		const newData = {
			name: input,
			text: select,
		};
		// ! POST
		const response = await axios.post(
			`https://elchocrud.vercel.app/api/v1/59ea28295747ee79b319410eb4873a52/reguests`,
			newData
		);
		console.log(response.data);
		setTodo(response.data);
		setInput("");
	};

	// ! GET
	const getTodo = async () => {
		const response = await axios.get(
			`https://elchocrud.vercel.app/api/v1/59ea28295747ee79b319410eb4873a52/reguests`
		);
		console.log(response.data);
		setTodo(response.data);
	};

	// ! DELETE
	const deleteTodo = async (id) => {
		const response = await axios.delete(
			`https://elchocrud.vercel.app/api/v1/59ea28295747ee79b319410eb4873a52/reguests/${id}`
		);
		console.log(response.data);
		setTodo(response.data);
	};

	// ! DELETE ALL
	const deleteAllTodo = async () => {
		const response = await axios.delete(
			`https://elchocrud.vercel.app/api/v1/59ea28295747ee79b319410eb4873a52/reguests`
		);
		console.log(response.data || []);
		setTodo(response.data || []);
	};

	// ! PUT 
	const putToDo = async (id) => {
		const updateData = {
			name: editInputValue,
		};
		const response = await axios.put(
			`https://elchocrud.vercel.app/api/v1/59ea28295747ee79b319410eb4873a52/reguests/${id}`,
			updateData
		);
		console.log(response.data);
		setTodo(response.data);
	};

	// ! USE_EFFECT
	useEffect(() => {
		getTodo();
	}, []);

	const openModal = () => setModalOpen(true);
	const closeModal = () => setModalOpen(false);
	return (
		<>
			<div className={scss.parent}>
				<Modal isOpen={modalOpen} onClose={closeModal}>
					<div className={scss.father}>
						<input
							className={scss.input}
							type="text"
							placeholder="Напишите вопросы"
							value={input}
							onChange={(e) => setInput(e.target.value)}
						/>
						<button onClick={handleAdd}>Add</button>
						<button onClick={deleteAllTodo}>DeleteAll</button>

						<div>
							<select
								className={scss.select}
								value={select}
								onChange={(e) => setSelect(e.target.value)}>
								<option value={"Html"}>HTML</option>
								<option value={"JavaScript"}>JavaScript</option>
								<option value={"React"}>React</option>
							</select>
						</div>
					</div>
				</Modal>
			</div>
			<div className={scss.parrent_2}>
				{/* //! MAP */}
				{todo.map((item) => (
					<div className={scss.h1_h2} key={item._id}>
						<h1>{item.name}</h1>
						<h2>{item.text}</h2>
						<button
							onClick={() => {
								setisEdit(true);
								setediteridToDo(item._id);
								seteditInputValue(item.name);
							}}>
							Edit
						</button>
						<button
							onClick={() => {
								deleteTodo(item._id);
							}}>
							delete
						</button>
						{isedit && editeridToDo === item._id ? (
							<div>
								<input
									value={editInputValue}
									type="text"
									onChange={(e) => {
										seteditInputValue(e.target.value);
									}}
								/>
								<button
									onClick={() => {
										putToDo(item._id);
										setisEdit(false);
									}}>
									Save
								</button>
							</div>
						) : null}
					</div>
				))}
			</div>
			<div className={scss.modal_open}>
				<button onClick={openModal}>Open Modal</button>
			</div>
			<Random/>
		</>
	);
};

export default App;
