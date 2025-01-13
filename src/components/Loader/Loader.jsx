const Loader = () => {
    return (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-white">
        <div className="w-12 h-12 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-xl text-slate-900">Loading...</p>
      </div>
    );
  };
  
  export default Loader;