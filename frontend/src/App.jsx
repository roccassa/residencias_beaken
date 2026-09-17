import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CursosPage from './pages/CursosPage'
import TalleresPage from './pages/TalleresPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CursosPage />} />
        <Route path="/cursos" element={<CursosPage />} />
        <Route path="/talleres" element={<TalleresPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
