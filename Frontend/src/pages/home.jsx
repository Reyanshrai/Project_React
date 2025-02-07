import { Carosoul } from '../components';
import {About, Contact,Timetable,Trainer,Pricing,Services} from  './index';
 

const Home = () => {
  return (
    <>
      <Carosoul></Carosoul>
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