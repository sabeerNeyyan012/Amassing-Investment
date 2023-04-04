import React from 'react';
import BullImg from '../Common/Images/404.jpeg';
import { Link } from 'react-router-dom';
import InvexRoutes from '../../InvexRoutes';

const NotFound = () => {
  return (
    <div className='main pagenotfound_sec'>
      <section>
        <div className='container'>
          <div className='pagenotfound text-center'>
            <img src={BullImg} className='img-fluid' alt='Page Not Found' />
            <h3 className='title'>Something went wrong</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna
              maecenas sed sed id purus interdum aliquam cras in. Hendrerit id
              magna maecenas turpis sed egestas eu. Pulvinar condimentum donec
              in tincidunt.
            </p>
            <Link to={InvexRoutes.Home.path} className='btn btn-outline-dark'>
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
