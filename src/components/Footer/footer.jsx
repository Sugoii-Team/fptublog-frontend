import React from 'react';
import PropTypes from 'prop-types';

Footer.propTypes = {};

function Footer(props) {
  return (
    <div>
      <footer>
        <div className="p-10 text-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap2">
              <div className='nb-5'>
                ABOUT US: 
              </div>
              <div className='nb-5'>
                Back-end: 
              </div>
              <div className='nb-5'>
                Le Quang Ky
              </div>
              <div className='nb-5'>
                Dang Xuan Dat
              </div>
              <div className='nb-5'>
                Pham Vo Ngoc Tam
              </div>
              
              <div className='nb-5'>
                Font-end: 
              </div>
              <div className='nb-5'>
                Phan Phuoc Thanh
              </div>
              <div className='nb-5'>
                Dang Dong Quan
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;