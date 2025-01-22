
import { Carousoul} from "../components";
import {About, Contact,Timetable,Trainer,Pricing} from  './index';
 

const Home = () => {
  return (
    <>
      <Carousoul></Carousoul>
      <About/>
      <Timetable/>
      <Trainer />
      <Pricing />
      <Contact/>
    </>
  );
};
export default Home;
