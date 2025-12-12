import HeroSection from './HeroSection';
import HowItWorks from './HowItWorks';
import PopularCategories from './PopularCategories';
import UpcommingEvents from './UpcommingEvents';

const Home = () => {
    return (
        <div className='max-w-7xl mx-auto'>
           <HeroSection/>
           <UpcommingEvents></UpcommingEvents>
           <HowItWorks/>
           <PopularCategories/>
        </div>
    );
};

export default Home;