import React from 'react';
import HeroBgImage from '../../Common/Images/hero_bg.png';
import StockRecImg from '../../Common/Images/stock-recommendation.svg';
import InvestingLessonImg from '../../Common/Images/investing-lessons.svg';
import StockAnaImg from '../../Common/Images/stock-analysis.svg';
import DematAccImg from '../../Common/Images/demat-account.svg';
import FinancialPlan from '../../Common/Images/financial-plan.svg';
import WhatIsInvexImg from '../../Common/Images/jpeg.jpg';
import OrdinaryInvestingImg from '../../Common/Images/ordinary-investing.svg';
import InvexAiInvestImg from '../../Common/Images/invexAI-investing.svg';
import IntroInvexImg from '../../Common/Images/jpeg-33.jpg';
import PlanImg from '../../Common/Images/planimg.png';
import YoutubeSubsImg from '../../Common/Images/youtube-subscribers.svg';
import MonthlyVisitorImg from '../../Common/Images/monthly-visitors.svg';
import PlatformUserImg from '../../Common/Images/platform-users.svg';
import SubscriberImg from '../../Common/Images/subscribers.svg';
import SocialMediaImg from '../../Common/Images/socialmedia-followers.svg';
import StartUpIndiaImg from '../../Common/Images/startupindia.png';
import Profile1Img from '../../Common/Images/profile01.png';
import InvexBWealthImg from '../../Common/Images/invex-b-wealth.png';
import Profile3Img from '../../Common/Images/profile03.png';
import Profile2Img from '../../Common/Images/profile02.png';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const Home = () => {
  return (
    <div className='main'>
      {/* Hero Section start */}
      <section className='heroSectionlight'>
        <div className='heroBackground py-5 d-flex align-items-center justify-content-center'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-5'>
                <div className='herotextbg'>
                  <h1 className='title'>
                    Your Financial <br />
                    Companion
                  </h1>
                  <p className='heroText'>
                    Amassing Investment's super abilities enable it to provide excellent
                    stocks, the ideal financial formula, and on-the-go learning
                    that is action-packed
                  </p>
                  <button className='hero-btn btn btn-dark'>Let's Begin</button>
                </div>
              </div>
              <div className='col-lg-7'>
                <div className='herorightimg'>
                  <img
                    src={HeroBgImage}
                    alt='Your Financial Companion'
                    className='img-fluid'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Hero Section end */}
      {/* met your Companion section start */}
      <section className='metcompanionsec'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-12 text-center'>
              <h1 className='primary-title'>
                Now when you've met your Companion
              </h1>
              <p className='primary-description'>What would you wish for?</p>
            </div>
            <div className='col-lg-12'>
              <div className='box-container justify-center'>
                <div className='box-item'>
                  <img
                    src={StockRecImg}
                    className='img-fluid'
                    alt='stock stock-recommendation'
                  />
                  <h3>
                    Stock
                    <br /> Recommendations
                  </h3>
                </div>
                <div className='box-item'>
                  <img
                    src={InvestingLessonImg}
                    className='img-fluid'
                    alt='Investing Lessons'
                  />
                  <h3>
                    Investing
                    <br /> Lessons
                  </h3>
                </div>
                <div className='box-item'>
                  <img
                    src={StockAnaImg}
                    className='img-fluid'
                    alt='Stock Anaylsis'
                  />
                  <h3>
                    Stock
                    <br /> Anaylsis
                  </h3>
                </div>
                {/* <div className='box-item'>
                  <img
                    src={DematAccImg}
                    className='img-fluid'
                    alt='Demat Account'
                  />
                  <h3>
                    Demat
                    <br /> Account
                  </h3>
                </div> */}
                <div className='box-item'>
                  <img
                    src={FinancialPlan}
                    className='img-fluid'
                    alt='Financial Plan'
                  />
                  <h3>
                    Financial
                    <br /> Plan
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* met your Companion section end */}
      {/* what is Amassing Investment section start */}
      <section className='whatisinvexai-sec'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-12 text-center mb-4'>
              <h1 className='primary-title'>What is Amassing Investment?</h1>
              <p className='primary-description'>
                We are building an ecosystem of everything that gets consumed in
                Personal Finance. <br />
                And making it Affordable.
              </p>
            </div>
            <div className='col-lg-6'>
              <div className='left_content'>
                <h4 className='title'>
                  Would you buy a brand new car without tyres? Or a mobile phone
                  without battery?
                </h4>
                <p>So, why do you buy half baked financial products?</p>
                <p>
                  You pay seperately for stock lessons, stock recommendations
                </p>
                <p>
                  A little extra for Options Education and Industry analysis
                </p>
                <p>And then again for stock analysis tools</p>
                <h4 className='title'>
                  Let's end this mess, Introducing Amassing Investment!
                </h4>
                <p>
                  An integrated platform that bundles Scientific financial
                  planning, Handpicked courses and business-grade stock
                  analytics into one convenient Amassing Investment Account.{' '}
                </p>
              </div>
            </div>
            <div className='col-lg-6'>
              <img
                src={WhatIsInvexImg}
                className='img-fluid'
                alt='What is Amassing Investment?'
              />
            </div>
          </div>
        </div>
      </section>
      {/* what is Amassing Investment section end */}
      {/* what's in for you section start */}
      <section className='whatsforyou-sec'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-12 text-center mb-4'>
              <h1 className='primary-title'>What's in for You?</h1>
              <p className='primary-description'>
                Whoever you are, at whatever stage you are in, there is an
                offering for you at Amassing Investment.
                <br />
                Get Started Now.
              </p>
            </div>
          </div>
          <div className='row justify-content-center'>
            <div className='col-lg-4 mb-5'>
              <div className='foryoubox wtgym'>
                <h3 className='title'>Want to grow your money?</h3>
                <p>
                  Get your perfect investment plan along with handpicked stocks
                  that's perfectly aligned with your goals.
                </p>
                <a href='#' className='btn btn-outline-dark'>
                  Get our Intro
                </a>
              </div>
            </div>
            <div className='col-lg-4 mb-5'>
              <div className='foryoubox wtbfs'>
                <h3 className='title'>Want to be financially smart?</h3>
                <p>
                  A quickest financial learning platform, Amassing Investment provides you
                  with practical courses that align with your attention span.
                </p>
                <a href='#' className='btn btn-outline-dark'>
                  Start your Courses
                </a>
              </div>
            </div>
            <div className='col-lg-4 mb-5'>
              <div className='foryoubox wtbasme'>
                <h3 className='title'>Want to be a Stock market Expert?</h3>
                <p>
                  Find your next multibagger and monitor your portfolio with us.
                </p>
                <a href='#' className='btn btn-outline-dark'>
                  Go to Screener
                </a>
              </div>
            </div>
            <div className='col-lg-4 mb-5'>
              <div className='foryoubox wftbf'>
                <h3 className='title'>Wishing Finance to be Fun?</h3>
                <p>Feed your brain with the know-how of the Financial World.</p>
                <a href='#' className='btn btn-outline-dark'>
                  Go to Blog
                </a>
              </div>
            </div>
            <div className='col-lg-4 mb-5'>
              <div className='foryoubox ntsm'>
                <h3 className='title'>New to the Stock Market?</h3>
                <p>Feed your brain with the know-how of the Financial World.</p>
                <a href='#' className='btn btn-outline-dark'>
                  Go to Blog
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* what's in for you section end */}
      {/* what we are providing section start*/}
      <section className='whatweareprovide-sec'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-12 text-center mb-4'>
              <h1 className='primary-title'>What we are providing?</h1>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-4 mb-5'>
              <div className='provideblock'>
                <div className='headtitle'>
                  <span>1</span>
                  <h4 className='title'>DCF Valuation</h4>
                </div>
                <p>
                  DCF refers to a valuation method that estimates the value of
                  an investment using its expected future cash flows.
                </p>
                <a href='#'>View Sample Valuation</a>
              </div>
            </div>
            <div className='col-lg-4 mb-5'>
              <div className='provideblock'>
                <div className='headtitle'>
                  <span>2</span>
                  <h4 className='title'>Relative Valuation</h4>
                </div>
                <p>
                  A relative valuation model is a business valuation method that
                  compares a firm's value to that of its competitors to
                  determine the firm's financial worth.
                </p>
                <a href='#'>Go to Sample Page</a>
              </div>
            </div>
            <div className='col-lg-4 mb-5'>
              <div className='provideblock'>
                <div className='headtitle'>
                  <span>3</span>
                  <h4 className='title'>Sector &amp; Industry Analysis</h4>
                </div>
                <p>
                  The analysis is an assessment of the economic and financial
                  condition of a given sector/industry of the economy. It serves
                  to provide an investor with a judgment about how well
                  companies in the sector/industry are expected to perform.
                </p>
                <a href='#'>Go to Page</a>
              </div>
            </div>
            <div className='col-lg-4 mb-5'>
              <div className='provideblock'>
                <div className='headtitle'>
                  <span>4</span>
                  <h4 className='title'>Option Analysis</h4>
                </div>
                <p>
                  DCF refers to a valuation method that estimates the value of
                  an investment using its expected future cash flows.
                </p>
                <a href='#'>Go to sample Page</a>
              </div>
            </div>
            <div className='col-lg-4 mb-5'>
              <div className='provideblock'>
                <div className='headtitle'>
                  <span>5</span>
                  <h4 className='title'>
                    Probability Based Technical Analysis
                  </h4>
                </div>
                <p>
                  Get rid of the market technical indicators using our
                  Probability based Technical Analysis.
                </p>
                <a href='#'>Go to Sample Page</a>
              </div>
            </div>
            <div className='col-lg-4 mb-5'>
              <div className='provideblock'>
                <div className='headtitle'>
                  <span>6</span>
                  <h4 className='title'>Stocks, Options and ETF Screener</h4>
                </div>
                <p>
                  Quickly sort through the myriad of 12000+ available stocks
                  using our advanced screening tools.
                </p>
                <a href='#'>Go to Screener</a>
              </div>
            </div>
            <div className='col-lg-4 mb-5'>
              <div className='provideblock'>
                <div className='headtitle'>
                  <span>7</span>
                  <h4 className='title'>
                    Categorized Financial Statistics of Company
                  </h4>
                </div>
                <p>
                  A solid understanding of statistics is crucially important in
                  helping us better understand finance. Moreover, statistics
                  concepts can help investors monitor the performance of their
                  investment portfolios, make better investment decisions and
                  understand market trends.
                </p>
                <a href='#'>Go to Sample Page</a>
              </div>
            </div>
            <div className='col-lg-4 mb-5'>
              <div className='provideblock'>
                <div className='headtitle'>
                  <span>8</span>
                  <h4 className='title'>Macroeconomic Indicators</h4>
                </div>
                <p>
                  Macroeconomic indicators are statistics or data readings that
                  reflect the economic circumstances of a particular country,
                  region or sector. They are used by analysts and governments to
                  assess the current and future health of the economy and
                  financial markets.
                </p>
                <a href='#'>Go to Page</a>
              </div>
            </div>
            <div className='col-lg-4 mb-5'>
              <div className='provideblock'>
                <div className='headtitle'>
                  <span>9</span>
                  <h4 className='title'>
                    Free Educational Videos &amp; Courses
                  </h4>
                </div>
                <p>Feed your brain with the know-how of the Financial World.</p>
                <a href='#'>Start Course</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* what we are providing section end*/}
      {/* wait more for you section start*/}
      <section className='waitmore-sec'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-12 text-center mb-4'>
              <h1 className='primary-title'>
                Wait, There's Even more for you!
              </h1>
              <p className='primary-description'>
                Something that brings a change in your investing journey.
              </p>
            </div>
            <div className='col-lg-6'>
              <div className='ordinary-investing text-end'>
                <div className='d-flex align-items-center justify-content-end mb-4'>
                  <h2 className='me-3'>Ordinary Investing</h2>
                  <img
                    src={OrdinaryInvestingImg}
                    className='img-fluid'
                    alt='Ordinary Investing'
                  />
                </div>
                <p>Biased advice</p>
                <p>Ancient courses</p>
                <p>Bookish Learning</p>
                <p>Expensive research tools</p>
                <p>Pay for individual courses</p>
                <p>Tedious Phone calls</p>
                <p>Spend $ 40-50k</p>
                <p>And a whole lot of confusion</p>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='invexai-investing text-start'>
                <div className='d-flex align-items-center justify-content-start mb-4'>
                  <img
                    src={InvexAiInvestImg}
                    className='img-fluid'
                    alt='Amassing Investment Investing'
                  />
                  <h2 className='ms-3'>Amassing Investment Investing</h2>
                </div>
                <p>Research backed recommendations</p>
                <p>Crisp video lessons</p>
                <p>User Friendly learning</p>
                <p>Affordable research tools</p>
                <p>Unlimited access</p>
                <p>100% Tech Powered</p>
                <p>Subscribe at $ 50/month</p>
                <p>And a whole lot of fun</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* wait more for you section end*/}
      {/* introducing subscribe section start */}
      <section className='introducing-sec'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6 mx-auto text-center'>
              <div className='introducing-log'>
                <h6>Introducing</h6>
                <img
                  src={IntroInvexImg}
                  className='img-fluid sub-image-section'
                  style={{}}
                  alt='introducing-invexAI'
                />
              </div>
              <h3>One changes Investing. One changes Everything.</h3>
              <p>
                A game changing subscription that gives you access to all
                financial super powers. Learning to invest, having a solid
                financial plan and being able to track your progress are all
                aligned towards the same goal - Creating Wealth
              </p>
              <a href='#' className='btn btn-dark'>
                Subscribe
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* introducing subscribe section end */}
      {/* subscription plan section start */}
      {/* <section className='oursubscription-sec'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-12 text-center mb-4'>
              <h1 className='primary-title'>Our Subscription Plan</h1>
              <p className='primary-description'>
                The materials that you get with Amassing Investment. Get Started Now.
              </p>
            </div>
          </div>
          <div className='row mt-5 mb-5 align-items-center'>
            <div className='col-lg-4'>
              <div className='subscription-plan basicplan'>
                <div className='d-flex align-items-center'>
                  <img src={PlanImg} className='img-fluid me-3' alt='Plan' />
                  <div className='plantitle'>
                    <h3 className='name'>Basic Plan</h3>
                    <p>Starter Plan</p>
                  </div>
                </div>
                <hr />
                <div className='planlisting'>
                  <ul>
                    <li>Lorem ipsum dolor sit </li>
                    <li>amet, consectetur adipiscing</li>
                    <li>elit. Odio quis montes, </li>
                    <li>eget morbi id. In </li>
                    <li>massa pellentesque </li>
                    <li>sodales blandit rhoncus lobortis.</li>
                    <li>Lorem ipsum dolor sit </li>
                    <li>amet, consectetur adipiscing</li>
                    <li>elit. Odio quis montes, </li>
                    <li>eget morbi id. In </li>
                    <li>massa pellentesque </li>
                  </ul>
                  <a href='#' className='btn btn-outline-dark d-block'>
                    Subscribe
                  </a>
                </div>
              </div>
            </div>
            <div className='col-lg-4'>
              <div className='subscription-plan goldplan'>
                <div className='d-flex align-items-center'>
                  <img src={PlanImg} className='img-fluid me-3' alt='Plan' />
                  <div className='plantitle'>
                    <h3 className='name'>
                      Gold <span className='up'>25%off</span>
                    </h3>
                    <p>Best For you</p>
                  </div>
                </div>
                <hr />
                <div className='planlisting'>
                  <ul>
                    <li>Lorem ipsum dolor sit </li>
                    <li>amet, consectetur adipiscing</li>
                    <li>elit. Odio quis montes, </li>
                    <li>eget morbi id. In </li>
                    <li>massa pellentesque </li>
                    <li>sodales blandit rhoncus lobortis.</li>
                    <li>sodales blandit rhoncus lobortis.</li>
                    <li>Lorem ipsum dolor sit </li>
                    <li>amet, consectetur adipiscing</li>
                    <li>elit. Odio quis montes, </li>
                    <li>elit. Odio quis montes, </li>
                    <li>eget morbi id. In </li>
                    <li>massa pellentesque </li>
                  </ul>
                  <a href='#' className='btn btn-dark d-block'>
                    Subscribe
                  </a>
                </div>
              </div>
            </div>
            <div className='col-lg-4'>
              <div className='subscription-plan platinumplan'>
                <div className='d-flex align-items-center'>
                  <img src={PlanImg} className='img-fluid me-3' alt='Plan' />
                  <div className='plantitle'>
                    <h3 className='name'>
                      Platinum <span className='up'>25%off</span>
                    </h3>
                    <p>Pro analysis</p>
                  </div>
                </div>
                <hr />
                <div className='planlisting'>
                  <ul>
                    <li>Lorem ipsum dolor sit </li>
                    <li>amet, consectetur adipiscing</li>
                    <li>elit. Odio quis montes, </li>
                    <li>eget morbi id. In </li>
                    <li>massa pellentesque </li>
                    <li>sodales blandit rhoncus lobortis.</li>
                    <li>Lorem ipsum dolor sit </li>
                    <li>amet, consectetur adipiscing</li>
                    <li>elit. Odio quis montes, </li>
                    <li>eget morbi id. In </li>
                    <li>massa pellentesque </li>
                  </ul>
                  <a href='#' className='btn btn-outline-dark d-block'>
                    Subscribe
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* subscription plan section end */}
      {/* made superhero section start */}
      {/* <section className='waitmore-sec'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-12 text-center mb-4'>
              <h1 className='primary-title'>You made us a Superhero.</h1>
              <p className='primary-description'>
                Overwhelming support from Amassing Investment family of investors.
              </p>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-2 col-md-4 col-6'>
              <div className='superheroblock'>
                <img src={YoutubeSubsImg} className='img-fluid' alt />
                <p>
                  30 Lakh+ <br /> Youtube Subscribers
                </p>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 col-6'>
              <div className='superheroblock'>
                <img src={MonthlyVisitorImg} className='img-fluid' alt />
                <p>
                  15 Lakh+ <br /> Monthly Visitors
                </p>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 col-6'>
              <div className='superheroblock'>
                <img src={PlatformUserImg} className='img-fluid' alt />
                <p>
                  6 Lakh+ <br />
                  Platform Users
                </p>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 col-6'>
              <div className='superheroblock'>
                <img src={SubscriberImg} className='img-fluid' alt />
                <p>
                  15K+ <br /> Subscribers
                </p>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 col-6'>
              <div className='superheroblock'>
                <img src={SocialMediaImg} className='img-fluid' alt />
                <p>
                  6 Lakh+ Social Media
                  <br /> Followers
                </p>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 col-6'>
              <div className='superheroblock'>
                <img src={YoutubeSubsImg} className='img-fluid' alt />
                <p>
                  30 K+ <br />
                  App Downloads
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* made superhero section end */}
      {/* accredited transparent section start */}
      {/* <section className='accredited-trans-sec'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-12 text-center mb-4'>
              <h1 className='primary-title'>Accredited. Transparent.</h1>
              <p className='primary-description'>
                We are a Fintech Startup and a SEBI registered Investment
                Advisor.
              </p>
            </div>
          </div>
          <div className='row d-flex align-items-center'>
            <div className='col-lg-6 text-end'>
              <img src={StartUpIndiaImg} className='img-fluid' alt />
            </div>
            <div className='col-lg-6'>
              <p>SEBI Registered Investment Advisor No INA000012218</p>
              <p>AMFI Member Code 171042</p>
              <p>BSE Star MF Member Code 28163</p>
            </div>
          </div>
        </div>
      </section> */}
      {/* accredited transparent section end */}
      {/* testimonials section start */}
      {/* <section className='testimonials-sec'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-12 text-center mb-4'>
              <h1 className='primary-title'>Trusted By Users.</h1>
              <p className='primary-description'>
                Definitely We are leading the conversations on all social media.
                <br />
                Here are some of them.
              </p>
            </div>
          </div>
          <OwlCarousel
            className='testimonial-carousel owl-theme'
            items={3}
            responsiveClass={true}
            responsive={{
              0: {
                items: 1,
                nav: true,
              },
              600: {
                items: 2,
                nav: false,
              },
              1000: {
                items: 3,
                dots: true,
                nav: false,
                loop: false,
              },
            }}
          >
            <div className='item'>
              <div className='testimoniallist'>
                <div className='d-flex align-items-center mb-3'>
                  <img
                    src={Profile1Img}
                    className='img-fluid me-3'
                    alt='testimonials'
                  />
                  <div className='titleprofile'>
                    <h6 className='name'>Name Here</h6>
                    <span className='position'>Said on: Google</span>
                  </div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sapien tempus, dictum rhoncus consequat. Quis integer felis
                  libero vitae. Elementum sit euismod arcu vivamus tempor. Ut
                  aliquet ultrices non fusceLorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Sapien tempus, dictum rhoncus
                  consequat.{' '}
                </p>
              </div>
            </div>
            <div className='item'>
              <div className='testimoniallist'>
                <div className='d-flex align-items-center mb-3'>
                  <img
                    src={Profile2Img}
                    className='img-fluid me-3'
                    alt='testimonials'
                  />
                  <div className='titleprofile'>
                    <h6 className='name'>Name Here</h6>
                    <span className='position'>Said on: Google</span>
                  </div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sapien tempus, dictum rhoncus consequat.{' '}
                </p>
              </div>
            </div>
            <div className='item'>
              <div className='testimoniallist'>
                <div className='d-flex align-items-center mb-3'>
                  <img
                    src={Profile3Img}
                    className='img-fluid me-3'
                    alt='testimonials'
                  />
                  <div className='titleprofile'>
                    <h6 className='name'>Name Here</h6>
                    <span className='position'>Said on: Google</span>
                  </div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sapien tempus, dictum rhoncus consequat. Quis integer felis
                  libero vitae. Elementum sit euismod arcu vivamus tempor.
                </p>
              </div>
            </div>
            <div className='item'>
              <div className='testimoniallist'>
                <div className='d-flex align-items-center mb-3'>
                  <img
                    src={Profile1Img}
                    className='img-fluid me-3'
                    alt='testimonials'
                  />
                  <div className='titleprofile'>
                    <h6 className='name'>Name Here</h6>
                    <span className='position'>Said on: Google</span>
                  </div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sapien tempus, dictum rhoncus consequat. Quis integer felis
                  libero vitae. Elementum sit euismod arcu vivamus tempor. Ut
                  aliquet ultrices non fusceLorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Sapien tempus, dictum rhoncus
                  consequat.{' '}
                </p>
              </div>
            </div>
          </OwlCarousel>
        </div>
      </section> */}
      {/* testimonials section end */}
    </div>
  );
};

export default Home;
