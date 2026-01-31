import axios from "axios";
import Chatbot from "./components/Chatbot";


export default App;

const api = axios.create({
  baseURL: "http://127.0.0.1:5000",
  headers: {
    "Content-Type": "application/json",
  },
});


function App() {
  return (
    <div>
      <Chatbot />
    </div>
  );
}

export const sendChatMessage = async (message: string) => {
  const response = await api.post("/chat", {
    message,
  });
  return response.data;
};

export default api;
