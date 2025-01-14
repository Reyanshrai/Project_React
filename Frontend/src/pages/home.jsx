
import { Navbar, Footer,Carousoul} from "../components";
import {Contact,Timetable} from  './index';
 

const Home = () => {
  return (
    <>
      <Navbar></Navbar>
      <Carousoul></Carousoul>
      
      <Timetable/>
      <Contact/>
      <Footer></Footer>
    </>
  );
};
export default Home;
