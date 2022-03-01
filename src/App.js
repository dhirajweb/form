import "./App.css";
import Form from "./Components/Form";
import { ToastProvider } from "react-toast-notifications";

function App() {
  return (
    <div className="App">
      <ToastProvider
        placement="top-center"
        autoDismissTimeout={3000}
        autoDismiss
      >
        <Form />
      </ToastProvider>
    </div>
  );
}

export default App;
