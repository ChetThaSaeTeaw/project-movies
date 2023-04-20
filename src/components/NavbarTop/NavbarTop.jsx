import React , { useState } from 'react';
import { APIKEY } from '../../api/MovieKey';
import MovieApi from '../../api/MovieApi';
import { Link } from 'react-router-dom';

// CSS
import "./NavbarTop.scss";

// Images
import brandLogo from '../../assets/Images/etc/Logo-1.png';

// Data
import { navbarLists } from '../../assets/Data/NavbarData';

// icons
import { BsSearch } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

function NavbarTop() {

    const [ search , setSearch ] = useState("");
    const [ subMenu , setSubmenu ] = useState(false);
    const [ searchBar , setSearchBar ] = useState(false);

    // Search Function
    async function searchContentByName () {
        try {
            let response = await MovieApi.get(`search/${search}?key=${APIKEY}`);
            window.location.href = `/${response.data.data[0].type}/${response.data.data[0].id}`;
        } catch (err) { 
            console.log("Error Search Bar :" , err);
        }
    }

  return (
    <nav className='navbar-top-container'>
       <div className='navbar-top-wrap'>
            <ul>
                <span onClick={() => setSubmenu(!subMenu)} className='submenu-bar-icon'>{!subMenu ? <FaBars /> : <MdClose  /> }</span>
                <Link to="/" className='navbar-top-logo-box'>
                    <img src={brandLogo} alt="brand-Logo" loading='lazy' />
                </Link>
                {navbarLists.map((item , index) => {
                    return (
                        <li key={index}>
                            <Link to={item.linkTo}>{item.title}</Link>
                        </li>
                    )
                })}
                <span onClick={() => setSearchBar(!searchBar)} className='search-bar-icon'>{!searchBar ? <BsSearch  /> : <MdClose /> }</span>
            </ul>
            <div className='navbar-top-search-wrap'>
                <div className='navbar-top-search-box'>
                    <input type="text" placeholder='ค้นหา...' value={search} onChange={e => setSearch(e.currentTarget.value)} />
                    {/* <span className='navbar-top-search-icon'>{!search ? <BsSearch /> : <MdClose onClick={() => setSearch("")} /> }</span> */}
                    <span className='navbar-top-search-icon' onClick={searchContentByName} ><BsSearch /></span>
                </div>
            </div>
       </div>
       <SubMenu subMenu={subMenu} searchBar={searchBar} />
    </nav>
  );
};

const SubMenu = ({ subMenu , searchBar , search , setSearch }) => {
    return (
        <nav style={!subMenu ? { display : "none" } : { display : "flex" }} className='submenu-container'>
            {!searchBar ? null : 
                <div className='submenu-search-box'>
                    <input type="text" value={search} onChange={e => setSearch(e.currentTarget.value)} placeholder='ค้นหา...' />
                    <span><BsSearch /></span>
                </div>
            }
            <ul className='submenu-wrap'>
                {navbarLists.map((item , index) => {
                    return (
                        <li key={index}>
                            <Link to={item.linkTo}>{item.title}</Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default NavbarTop;