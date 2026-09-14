import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CursosPage from './pages/CursosPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CursosPage />} />
        <Route path="/cursos" element={<CursosPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
