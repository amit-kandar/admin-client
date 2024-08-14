import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './router';
import Navbar from "./components/Navbar"

export default function App() {
  return (
    <Router>
      <Navbar />
      <main className='pt-20'>
        <AppRouter />
      </main>
    </Router>
  )
}