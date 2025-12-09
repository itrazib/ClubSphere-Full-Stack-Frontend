import HeroSection from './HeroSection';
import HowItWorks from './HowItWorks';
import PopularCategories from './PopularCategories';

const Home = () => {
    return (
        <div className='max-w-7xl mx-auto'>
           <HeroSection/>
           <HowItWorks/>
           <PopularCategories/>
        </div>
    );
};

export default Home;