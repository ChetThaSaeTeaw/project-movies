import React , { useState } from 'react';
import "./BannerFix.scss";

// Images
import giftPic from '../../../assets/Images/Banner/gift-box.png';

// Icons
import { MdOutlineClose } from 'react-icons/md';

// Data
import { homeData } from '../../../assets/Data/HomeData';

function BannerFix() {

    const [ hideBanner , setHideBanner ] = useState(false);

  return (
    <section>
        {!hideBanner ?
        <div className='banner-bottom-content-box' onClick={() => setHideBanner(true)}>
            <span><MdOutlineClose /></span>
            <a href='/'>
                <img src={homeData.bannerLists[0].images} alt="banner-pic" loading='lzay' />
            </a>
        </div>
        : 
        <div className='banner-bottom-button-box' onClick={() => setHideBanner(false)}>
            <img src={giftPic} alt="Gift-Pic" loading='lazy' />
        </div>
        }
    </section>
  );
};

export default BannerFix;