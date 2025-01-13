import {Routes,Route} from 'react-router-dom'
import {Home,About,Login,Register,ForgotPassword} from './pages'

const App = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/about' element={<About></About>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/register' element={<Register></Register>}></Route>
          <Route path='/forgotpassword' element={<ForgotPassword></ForgotPassword>}></Route>          
        </Routes>
      </div>
    </>
  )
}

export default App;