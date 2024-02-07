import React from 'react'
import Banner from '../../components/Banner.jsx';
import Categories from './Categories.jsx';
import OurServices from './OurServices.jsx';
import Testimonials from './Testimonials.jsx';
import SpecialProduct from './SpecialProduct.jsx';

const Home = () => {
  return (
    <div>
        <Banner />
        <Categories/>
        <SpecialProduct/>
        <Testimonials/>
        <OurServices/>
    </div>
  )
}

export default Home