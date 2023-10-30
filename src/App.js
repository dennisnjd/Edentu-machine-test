import './App.css';
import {RouterProvider} from "react-router-dom";

import router from './PageRouter';
import { AuthProvider } from './AuthContext';



function App() {
  return (
    <AuthProvider>
    <div className="App">
      <RouterProvider router={router} />
    </div>
    </AuthProvider>
  );
}

export default App;
