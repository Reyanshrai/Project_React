
import { Carousoul} from "../components";
import {About, Contact,Timetable,Trainer,Pricing, Services} from  './index';
 

const Home = () => {
  return (
    <>
      <Carousoul></Carousoul>
      <About/>
      <Services/>
      <Timetable/>
      <Trainer />
      <Pricing />
      <Contact/>
    </>
  );
};
export default Home;
