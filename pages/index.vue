<template>
<div>
  <body>
    <section class="header-area header-one">
      <div class="navbar-area navbar-one navbar-transparent">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <nav class="navbar navbar-expand-lg">
                <a class="navbar-brand" href="#">
                  <img src="../assets/site/images/logowhite.png" alt="Logo" class="logo" />
                </a>

                <button
                  class="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarOne"
                  aria-controls="navbarOne"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="toggler-icon"></span>
                  <span class="toggler-icon"></span>
                  <span class="toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse sub-menu-bar" id="navbarOne">
                  <ul class="navbar-nav m-auto">
                    <li class="nav-item">
                      <a class="active" href="#about">ABOUT</a>
                    </li>
                    <li class="nav-item">
                      <a href="#features">FEATURES</a>
                    </li>
                    <li class="nav-item">
                      <a href="#pricing">PRICING</a>
                    </li>
                    <li class="nav-item">
                      <a href="#faq">FAQ</a>
                    </li>
                  </ul>
                </div>

                <div class="navbar-btn d-none d-sm-inline-block">
                  <ul>
                    <li>
                      <a class="light" href="https://github.com/ezDevs/ez-notify">Contribute</a>
                    </li>
                    <li>
                      <a class="solid" href="#" @click="goTo('/app/login')">Sign in</a>
                    </li>
                  </ul>
                </div>
              </nav>
              <!-- navbar -->
            </div>
          </div>
          <!-- row -->
        </div>
        <!-- container -->
      </div>

      <div class="header-content-area d-flex align-items-center main-content">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="header-wrapper">
                <div class="header-content">
                  <h3 class="header-title">Best way to send messages in Slack</h3>
                  <p class="text">
                    Open source slack message scheduling software, schedule occasional or
                    recurring messages.
                  </p>
                  <div class="header-btn rounded-buttons">
                    <a class="main-btn rounded-one" href="#">START NOW</a>
                  </div>
                </div>
                <!-- header content -->

                <div class="header-image d-none d-lg-block">
                  <div class="image">
                    <img src="../assets/site/images/messages.svg" alt="Header" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- row -->
        </div>
        <!-- container -->
        <div class="header-shape">
          <img src="../assets/site/images/header/header-shape-2.svg" alt="shape" />
        </div>
        <!-- header-shape -->
      </div>
      <!-- header content area -->
    </section>

    <section class="services-area services-two d-lg-flex align-items-center bg-white" id="about">
      <div class="container">
        <div class="row justify-content-end">
          <div class="col-lg-6">
            <div class="image">
              <img src="../assets/site/images/messages2.svg" alt="Services" />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="services-content">
              <h5 class="sub-title">improve your communcation</h5>
              <h3 class="services-title">Ideal for remote team work</h3>
              <p class="text">
                Schedule one time or recurring messages and maintain close communication with
                your team, without worry.
              </p>
            </div>
            <!-- services content -->
          </div>
        </div>
        <!-- row -->
      </div>
      <!-- container -->

      <!-- <div class="services-image d-flex align-items-center">
         
      </div>-->
      <!-- services image -->
    </section>

    <section class="services-area services-one" id="features">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <div class="section-title pb-10">
              <h4 class="title">Features</h4>
              <!-- <p class="text">Stop wasting time and money designing and managing a website that doesn’t get
              results. Happiness guaranteed!</p>-->
            </div>
            <!-- section title -->
          </div>
        </div>
        <!-- row -->
        <div class="row">
          <div class="col-lg-7">
            <div class="row">
              <div class="col-md-6">
                <div class="services-content mt-40 d-sm-flex">
                  <div class="services-icon">
                    <i class="lni-package"></i>
                  </div>
                  <div class="services-content media-body">
                    <h4 class="services-title">One time messages</h4>
                    <!-- <p class="text">Short description for the ones who look for something new.</p> -->
                  </div>
                </div>
                <!-- services content -->
              </div>
              <div class="col-md-6">
                <div class="services-content mt-40 d-sm-flex">
                  <div class="services-icon">
                    <i class="lni-reload"></i>
                  </div>
                  <div class="services-content media-body">
                    <h4 class="services-title">Schedule messages</h4>
                    <!-- <p class="text">Short description for the ones who look for something new.</p> -->
                  </div>
                </div>
                <!-- services content -->
              </div>
              <div class="col-md-6">
                <div class="services-content mt-40 d-sm-flex">
                  <div class="services-icon">
                    <i class="lni-lock"></i>
                  </div>
                  <div class="services-content media-body">
                    <h4 class="services-title">User access management</h4>
                    <!-- <p class="text">Short description for the ones who look for something new.</p> -->
                  </div>
                </div>
                <!-- services content -->
              </div>
              <!-- <div class="col-md-6">
                            <div class="services-content mt-40 d-sm-flex">
                                <div class="services-icon">
                                    <i class="lni-laptop-phone"></i>
                                </div>
                                <div class="services-content media-body">
                                    <h4 class="services-title">App Development</h4>
                                    <p class="text">Short description for the ones who look for something new.</p>
                                </div>
                            </div> 
              </div>-->
            </div>
            <!-- row -->
          </div>
        </div>
        <!-- row -->
      </div>
      <!-- container -->
      <div class="services-image d-lg-flex align-items-center">
        <div class="image">
          <img src="../assets/site/images/services/services.png" alt="Services" />
        </div>
      </div>
      <!-- services image -->
    </section>

    <section class="pricing-area pb- mt-50" id="pricing">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="about-title text-center pb-20">
              <h2 class="title">PRICING</h2>
            </div>
          </div>
        </div>
        <!-- row -->
        <div class="row justify-content-center">
          <div class="col-lg-4 col-md-7 col-sm-9">
            <div class="pricing-style-twelve mt-40">
              <div class="pricing-icon text-center">
                <img src="../assets/site/images/pricing/basic.svg" alt />
              </div>
              <div class="pricing-header text-center">
                <h5 class="sub-title">Self-hosted</h5>
                <span class="price">U$ 0</span>
                <p class="year">per month</p>
                <p class="workspace">per workspace</p>
              </div>
              <div class="pricing-list">
                <ul>
                  <li>
                    <i class="lni-check-mark-circle"></i> Host your own instaces
                  </li>
                  <li>
                    <i class="lni-check-mark-circle"></i> Unlimited messages
                  </li>
                  <li>
                    <i class="lni-check-mark-circle"></i> Open Source
                  </li>
                  <li>
                    <i class="lni-check-mark-circle"></i> Send on demand messages
                  </li>
                  <li>
                    <i class="lni-check-mark-circle"></i> Send schedule messages
                  </li>
                  <li>
                    <i class="lni-check-mark-circle"></i> Community support
                  </li>
                </ul>
              </div>
              <div class="pricing-btn rounded-buttons text-center">
                <a
                  class="main-btn rounded-two"
                  href="https://github.com/ezDevs/ez-notify"
                >GET STARTED</a>
              </div>
            </div>
            <!-- single pricing -->
          </div>

          <div class="col-lg-4 col-md-7 col-sm-9">
            <div class="pricing-style-twelve mt-40">
              <div class="pricing-icon text-center">
                <img src="../assets/site/images/pricing/pro.svg" alt />
              </div>
              <div class="pricing-header text-center">
                <h5 class="sub-title">Pro</h5>
                <span class="most-popular">Most popular</span>
                <span class="price">U$ 4</span>
                <p class="year">per month</p>
                <p class="workspace">per workspace</p>
              </div>
              <div class="pricing-list">
                <ul>
                  <li>
                    <i class="lni-check-mark-circle"></i> SaaS offering host by us
                  </li>
                  <li>
                    <i class="lni-check-mark-circle"></i> Up to 1000 messages per month
                  </li>
                  <li>
                    <i class="lni-check-mark-circle"></i> Get all updates
                  </li>
                  <li>
                    <i class="lni-check-mark-circle"></i> Send on demand messages
                  </li>
                  <li>
                    <i class="lni-check-mark-circle"></i> Send schedule messages
                  </li>
                  <li>
                    <i class="lni-check-mark-circle"></i> Community support
                  </li>
                </ul>
              </div>
              <div class="pricing-btn rounded-buttons text-center">
                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
                  <input type="hidden" name="cmd" value="_s-xclick">
                  <input type="hidden" name="hosted_button_id" :value="plan4">
                  <input type="submit" class="main-btn rounded-three" border="0" value="Subscribe">
                </form>
              </div>
            </div>
            <!-- single pricing -->
          </div>

          <div class="col-lg-4 col-md-7 col-sm-9">
            <div class="pricing-style-twelve mt-40">
              <div class="pricing-icon text-center">
                <img src="../assets/site/images/pricing/vip.svg" alt />
              </div>
              <div class="pricing-header text-center">
                <h5 class="sub-title">Enterprise</h5>
                <span class="price">U$ 8</span>
                <p class="year">per month</p>
                <p class="workspace">per workspace</p>
              </div>
              <div class="pricing-list">
                <ul>
                  <li>
                    <i class="lni-check-mark-circle"></i> SaaS offering host by us
                  </li>
                  <li>
                    <i class="lni-check-mark-circle"></i> Unlimited messages
                  </li>
                  <li>
                    <i class="lni-check-mark-circle"></i> Get all updates
                  </li>
                  <li>
                    <i class="lni-check-mark-circle"></i> Send on demand messages
                  </li>
                  <li>
                    <i class="lni-check-mark-circle"></i> Send schedule messages
                  </li>
                  <li>
                    <i class="lni-check-mark-circle"></i> VIP support
                  </li>
                </ul>
              </div>
              <div class="pricing-btn rounded-buttons text-center">
                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
                  <input type="hidden" name="cmd" value="_s-xclick">
                  <input type="hidden" name="hosted_button_id" :value="plan8">
                  <input type="submit" class="main-btn rounded-two" border="0" value="Subscribe">
                </form>
              </div>
            </div>
            <!-- single pricing -->
          </div>
        </div>
        <!-- row -->
        <div class="row">
          <div class="single-alerts-message mt-30 mb-30 ezgreen">
            <div class="alerts-message-content">
              <h4 class="message-title">Condições espeiciais para Brasileiros</h4>
              <p class="text">
                Se você é brasileiro, temos uma condição de preço especial para você em R$.
                Entre em contato via eznotify@ezdevs.com.br com o assunto, "Quero assinar - BR".
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- container -->
    </section>

    <footer class="footer-area footer-one">
      <div class="footer-widget">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="footer-logo-support d-md-flex align-items-end justify-content-between">
                <div class="footer-logo">
                  <a class="mt-30" href="index.html">
                    <img src="../assets/site/images/logowith-text.png" alt="Logo" class="logo-colored" />
                  </a>
                </div>
                <!-- footer logo -->
              </div>
              <!-- footer logo support -->
            </div>
          </div>
          <!-- row -->
          <div class="row">
            <div class="col-xl-6 col-lg-4 col-sm-12">
              <div class="footer-support">
                <span class="number">An open source initiative.</span>
                <span class="mail">contact@ezdevs.com.br</span>
              </div>
            </div>
            <div class="col-xl-2 col-lg-2 col-sm-4">
              <div class="footer-link">
                <h6 class="footer-title">ez.devs</h6>
                <ul>
                  <li>
                    <a href="https://ezdevs.com.br/en/what-we-do">What we do</a>
                  </li>
                  <li>
                    <a href="https://ezdevs.com.br/en/cases">Cases</a>
                  </li>
                  <li>
                    <a href="https://ezdevs.com.br/en/insights">Insights</a>
                  </li>
                  <li>
                    <a href="https://ezdevs.com.br/en/contact">Contact</a>
                  </li>
                </ul>
              </div>
              <!-- footer link -->
            </div>
            <div class="col-xl-2 col-lg-3 col-sm-4">
              <div class="footer-link">
                <h6 class="footer-title">ez.notify</h6>
                <ul>
                  <li>
                    <a href="#about">About</a>
                  </li>
                  <li>
                    <a href="#">Features</a>
                  </li>
                  <li>
                    <a href="#">Pricing</a>
                  </li>
                  <li>
                    <a href="#">FAQ</a>
                  </li>
                </ul>
              </div>
              <!-- footer link -->
            </div>
          </div>
          <!-- row -->
        </div>
        <!-- container -->
      </div>
      <!-- footer widget -->

      <div class="footer-copyright">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div
                class="copyright text-center d-md-flex justify-content-between align-items-center"
              >
                <p class="text">Mande with ❤️ by ez.devs © 2020 ez.notify. All Rights Reserved</p>
                <ul class="social">
                  <li>
                    <a href="https://facebook.com/ezdevs">
                      <i class="lni-facebook-filled"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/ezdevs">
                      <i class="lni-twitter-original"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://instagram.com/ez.devs">
                      <i class="lni-instagram-original"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://linkedin.com/company/ez-devs">
                      <i class="lni-linkedin-original"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <!-- copyright -->
            </div>
          </div>
          <!-- row -->
        </div>
        <!-- container -->
      </div>
      <!-- footer copyright -->
    </footer>
  </body>
</div>
</template>

<script>
import bootstrap from '../assets/site/css/bootstrap.min.module.css'
import lineIcons from '../assets/site/css/LineIcons.module.css'
import stylesDefault from '../assets/site/css/default.module.css'
import styles from '../assets/site/css/style.module.css'

export default {
  layout: "login",
  data() {
    return {
      plan4: process.env.PAYPAL_PLAN4,
      plan8: process.env.PAYPAL_PLAN8
    }
  },
  methods: {
    goTo(route) {
      this.$router.push(route);
    }
  }
};
</script>
