import {Routes,Route} from 'react-router-dom'
import {Home,About,Login, Register} from './pages'

const App = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/about' element={<About></About>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/register' element={<Register></Register>}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App;