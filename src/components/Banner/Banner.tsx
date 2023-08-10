import React from 'react';
import styles from './Banner.module.scss';

const Banner = () => {
  return (
    <div className={`${styles.banner} px-3 py-3`}>
      <h2>conduit</h2>
      <p>A place to share your knowledge</p>
    </div>
  );
};

export default Banner;
