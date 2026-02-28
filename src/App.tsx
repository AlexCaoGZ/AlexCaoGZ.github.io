import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
//import Home from './pages/Home';
import Favorite from './components/Favorite';
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Layout />}>
          
          <Route index element={<Favorite />} /> 
          
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
