
import { Navbar, Footer,Carousoul} from "../components";
import {About, Contact,Timetable} from  './index';
 

const Home = () => {
  return (
    <>
      <Navbar></Navbar>
      <Carousoul></Carousoul>
      <About/>
      <Timetable/>
      <Contact/>
      <Footer></Footer>
    </>
  );
};
export default Home;
