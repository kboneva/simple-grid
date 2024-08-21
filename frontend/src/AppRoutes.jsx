import { Route, Routes, useNavigate } from "react-router-dom"
import ButtonForm from "./pages/ButtonForm"
import Dashboard from "./pages/Dashboard"
import NotFound from "./pages/NotFound"
import { createButton, editButton } from "./services/buttonService"

export default function AppRoutes() {
  const navigate = useNavigate();

  const handleCreate = async (button) => {
    try {
      await createButton(button);
      navigate('/');
    } catch (error) {
      console.error('Error creating button:', error);
    }
  }

  const handleEdit = async (id, button) => {
    try {
      await editButton(id, button);
      navigate('/');
    } catch (error) {
      console.error('Error updating button:', error);
    }
  }

  return (
    <Routes>
      <Route path='/' element={<Dashboard/>} />
      <Route path='/create' element={<ButtonForm handleSubmit={handleCreate}/>} />
      <Route path='/edit/:id' element={<ButtonForm handleSubmit={handleEdit}/>} />
      <Route path='*' element={<NotFound/>} />
    </Routes>
  )
}
