import React from 'react';
import {Card} from 'material-ui/Card';
import BaseContainer from './BaseContainer';
/**
* Represents the view logic of adding new blogs functionality
*/
class AboutUs extends BaseContainer {
/**
* Describes the elements on the About Us page
* @return {String} HTML elements
*/
  render() {
    return (
      <div>
        <Card>
          <section id="global-header">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="block">
                    <h1>It’s time to get more from what you read.</h1>
                    <p>Find and share real perspectives about topics that matter today</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>
        <Card>
          <section id="intro">
            <div className="container">
              <div className="row">
                <div className="col-md-7 col-sm-12">
                  <div className="block">
                    <div className="section-title">
                      <h2>About Us</h2>
                      <p>Promote your business, showcase your art, set up an online shop or just test out new ideas</p>
                    </div>
                    <p>It’s time to get more from what you read.Share perspectives about topics that matter today </p>
                  </div>
                </div>
                <div className="col-md-5 col-sm-12">
                  <div className="block">
                    <img className="wrapper" alt="Img"/>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>
        <section id="portfolio-work">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="block">
                  <div className="portfolio-menu">
                    <ul>
                      <li className="filter" data-filter="all">Everything</li>
                      <li className="filter" data-filter=".Branding">Branding</li>
                      <li className="filter" data-filter=".Websites">Websites</li>
                      <li className="filter" data-filter=".Graphic">Graphic</li>
                      <li className="filter" data-filter=".design">design</li>
                      <li className="filter" data-filter=".Video">Video</li>
                    </ul>
                  </div>
                  <div className="portfolio-contant">
                    <ul id="portfolio-contant-active">
                      <li className="mix Branding">
                        <a href="#">
                          <img src="img/portfolio/work1.jpg" alt=""/>
                          <div className="overly">
                            <div className="position-center">
                              <h2>Tesla Motors</h2>
                              <p>Labore et dolore magna aliqua. Ut enim ad </p>

                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="mix Websites">
                        <a href="#">
                          <img src="img/portfolio/work1.jpg" alt=""/>
                          <div className="overly">
                            <div className="position-center">
                              <h2>Tesla Motors</h2>
                              <p>Labore et dolore magna aliqua. Ut enim ad </p>

                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="mix Graphic">
                        <a href="#">
                          <img src="img/portfolio/work1.jpg" alt=""/>
                          <div className="overly">
                            <div className="position-center">
                              <h2>Tesla Motors</h2>
                              <p>Labore et dolore magna aliqua. Ut enim ad </p>

                            </div>
                          </div>

                        </a>
                      </li>
                      <li className="mix design">
                        <a href="#">
                          <img src="img/portfolio/work1.jpg" alt=""/>
                          <div className="overly">
                            <div className="position-center">
                              <h2>Tesla Motors</h2>
                              <p>Labore et dolore magna aliqua. Ut enim ad </p>

                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="mix Video">
                        <a href="#">
                          <img src="img/portfolio/work1.jpg" alt=""/>
                          <div className="overly">
                            <div className="position-center">
                              <h2>Tesla Motors</h2>
                              <p>Labore et dolore magna aliqua. Ut enim ad </p>

                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="mix Graphic">
                        <a href="#">
                          <img src="img/portfolio/work1.jpg" alt=""/>
                          <div className="overly">
                            <div className="position-center">
                              <h2>Tesla Motors</h2>
                              <p>Labore et dolore magna aliqua. Ut enim ad </p>

                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default AboutUs;
