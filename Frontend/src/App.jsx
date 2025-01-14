import {Routes,Route} from 'react-router-dom'
import { Home, About, Services, Timetable, Trainer, Pricing, Contact, Login, Register, ForgotPassword } from './pages';
const App = () => {
  return (
    <>
      <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/timetable' element={<Timetable />} />
        <Route path='/trainer' element={<Trainer />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
      </Routes>
      </div>
    </>
  )
}

export default App;