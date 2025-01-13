const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex justify-center items-center">
        <div className="bg-slate-50 p-6 rounded-lg shadow-xl relative overflow-y-auto overflow-x-auto max-w-lg w-full max-h-full mx-4 sm:mx-0">
          <button
            className="absolute top-3 right-3 text-2xl text-blue-500 cursor-pointer p-1 hover:text-blue-700 duration-300"
            onClick={onClose}
          >
            ×
          </button>
          <div>{children}</div>
        </div>
      </div>
    );
  };
  
  export default Modal;  