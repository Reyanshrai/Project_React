
import { Carousoul} from "../components";
import {About, Contact,Timetable,Trainer,Pricing} from  './index';
 

const Home = () => {
  return (
    <>
      {/* <Navbar></Navbar> */}
      <Carousoul></Carousoul>
      <About/>
      <Timetable/>
      <Trainer />
      <Pricing />
      <Contact/>

      {/* <Footer></Footer> */}
    </>
  );
};
export default Home;
