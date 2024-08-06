import ReactDOM from "react-dom";

function Modal({ isOpen, onClose, onHandleDeleteComment }) {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed top-0 w-full min-h-[100vh] z-40">
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50"></div>
            <div className="flex flex-col justify-between absolute p-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md max-w-[365px] w-[345px] h-[220px] bg-white">
                <h3 className="text-xl font-medium">Delete comment</h3>
                <p className="text-Grayish_Blue">
                    Are you sure you want to delete this comment? This will
                    remove the comment and can't be undone
                </p>
                <div className="flex justify-between">
                    <button
                        onClick={onClose}
                        className="bg-Grayish_Blue rounded-md font-medium text-white px-5 py-3"
                    >
                        NO, CANCEL
                    </button>
                    <button
                        onClick={onHandleDeleteComment}
                        className="bg-Soft_Red rounded-md font-medium text-white px-5 py-3"
                    >
                        YES, DELETE
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default Modal;
