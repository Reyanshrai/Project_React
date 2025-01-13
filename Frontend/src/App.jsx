import {Routes,Route} from 'react-router-dom'
import {Home,About,Services,Timetable,Trainer,Pricing,Contact,Login, Register} from './pages'

const App = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/about' element={<About></About>}></Route>
          <Route path='/services' element={<Services></Services>}></Route>
          <Route path='/timetable' element={<Timetable></Timetable>}></Route>
          <Route path='/trainer' element={<Trainer></Trainer>}></Route>
          <Route path='/pricing' element={<Pricing></Pricing>}></Route>
          <Route path='/contact' element={<Contact></Contact>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/register' element={<Register></Register>}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App;