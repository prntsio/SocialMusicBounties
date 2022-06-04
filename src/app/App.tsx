import React from "react";
import "./App.css";
import AppContainer from "./containers/AppContainer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

function App(){

  const dismissAll = () =>  toast.dismiss();

  const loading = () => {toast.loading("Loading"); // same as toast(message, {type: "info"});

}

const error = () => {
  toast.dismiss()
  toast.error("Error")  ; // same as toast(message, {type: "info"});

}

const success = () => {
  toast.dismiss()
  toast.success("Success"); // same as toast(message, {type: "info"});

}


  return (
    <div>
      <button onClick={loading}>Loading !</button>
      <button onClick={dismissAll}>Stop Loading !</button>
      <button onClick={error}>Error !</button>
      <button onClick={success}>Success !</button>
      <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
      <AppContainer />
    </div>
  );
}

export default App;
