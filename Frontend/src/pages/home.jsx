
import { Navbar, Footer,Carousoul} from "../components";
import {About, Contact,Timetable,Trainer} from  './index';
 

const Home = () => {
  return (
    <>
      <Navbar></Navbar>
      <Carousoul></Carousoul>
      <About/>
      <Timetable/>
      <Trainer />
      <Contact/>
      <Footer></Footer>
    </>
  );
};
export default Home;
