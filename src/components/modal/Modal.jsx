import { useState, useEffect } from "react";
import  ReactDOM  from "react-dom";
import scss from "./Modal.module.scss";

const Modal = ({ isOpen, onClose, children }) => {
	const [isBrowser, setIsBrowser] = useState(false);

	useEffect(() => {
		setIsBrowser(true);
	}, []);

	const modalContent = isOpen && (
		<div className={scss.container}>
			<div className={scss.content}>
				<button onClick={onClose}>Close</button>
				{children}
			</div>
		</div>
	);

	return isBrowser
		? ReactDOM.createPortal(modalContent, document.getElementById("root"))
		: null;
};

export default Modal;
