import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CursosPage from './pages/CursosPage'
import TalleresPage from './pages/TalleresPage'
import EventosPage from './pages/EventosPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CursosPage />} />
        <Route path="/cursos" element={<CursosPage />} />
        <Route path="/talleres" element={<TalleresPage />} />
        <Route path="/eventos" element={<EventosPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
