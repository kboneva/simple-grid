import { Route, Routes } from "react-router-dom"
import { Grid } from "./components/Grid"
import { NotFound } from "./components/NotFound"
import { ButtonPage } from "./components/ButtonPage"

function App() {

  return (
    <Routes>
      <Route path='/' element={<Grid/>} />
      <Route path='/button/:id' element={<ButtonPage />} />
      <Route path='*' element={<NotFound/>} />
    </Routes>
  )
}

export default App
