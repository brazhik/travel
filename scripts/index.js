console.log('Score 100/100');

/***** BURGER MENU *****/
const burgerMenuSelectors = {
  menu: '.header-burger-menu',
  menuButton: '.header-burger-menu-button',
  closeIcon: '.header-burger-menu-close-icon',
  menuItem: '.header-burger-menu-list-item',
  accountLink: '.header-burger-menu-account-link',
  styleActive: 'header-burger-menu-active'
};

(() => {
  const burgerMenuButton = document.querySelector(burgerMenuSelectors.menuButton);
  burgerMenuButton.addEventListener('click', () => showBurgerMenu(true));

  const closeIcon = document.querySelector(burgerMenuSelectors.closeIcon);
  closeIcon.addEventListener('click', () => showBurgerMenu(false));

  const menuItems = document.querySelectorAll(burgerMenuSelectors.menuItem);
  menuItems.forEach((menuItem) => menuItem.addEventListener('click', () => showBurgerMenu(false)));

  const accountLink = document.querySelector(burgerMenuSelectors.accountLink);
  accountLink.addEventListener('click', () => showLoginWindow());

  // if click was outside menu window and not at burger menu button, then close menu window
  document.addEventListener('click', function (event) {
    if (!document.querySelector(burgerMenuSelectors.menu).contains(event.target) && !burgerMenuButton.contains(event.target)) {
      showBurgerMenu(false);
    }
  });
})();

const showBurgerMenu = (is_show) => {
  const burgerMenu = document.querySelector(burgerMenuSelectors.menu);

  if (is_show === true) {
    burgerMenu.classList.add(burgerMenuSelectors.styleActive);
  } else {
    burgerMenu.classList.remove(burgerMenuSelectors.styleActive);
  }
}

/***** LOGIN WINDOW *****/
const loginWindowSelectors = {
  loginButton: '.header-login-button',
  signInButton: '.login-window-sign-in-button',
  wrapper: '.login-window-wrapper',
  wrapperActive: 'login-window-wrapper-active',
  window: '.login-window',
  windowActive: 'login-window-active',
  email: '.login-window-input-email',
  password: '.login-window-input-password',
  register: '.login-window-register'
};

const loginWindowStateConst = {
  login: 1,
  register: 2
}

let loginWindowState = loginWindowStateConst.login;

(() => {
  const loginButton = document.querySelector(loginWindowSelectors.loginButton);
  loginButton.addEventListener('click', () => showLoginWindow());

  const wrapper = document.querySelector(loginWindowSelectors.wrapper);
  wrapper.addEventListener('click',
    (event) => {
      if (!document.querySelector(loginWindowSelectors.window).contains(event.target) &&
        !loginButton.contains(event.target)) {
        closeLoginWindow();
      }
    }
  );

  const window = document.querySelector(loginWindowSelectors.window);
  window.addEventListener('transitionend', (event) => removeLoginWindowWrapper());

  const signInButton = document.querySelector(loginWindowSelectors.signInButton);
  signInButton.addEventListener('click', () => showAlert());

  const registerLink = document.querySelector(loginWindowSelectors.register);
  registerLink.addEventListener('click', () => toggleSignInAndSignUp());
})();

const showLoginWindow = () => {
  const wrapper = document.querySelector(loginWindowSelectors.wrapper);
  const window = document.querySelector(loginWindowSelectors.window);

  wrapper.classList.add(loginWindowSelectors.wrapperActive);
  window.classList.add(loginWindowSelectors.windowActive);
}

const closeLoginWindow = () => {
  const window = document.querySelector(loginWindowSelectors.window);
  window.classList.remove(loginWindowSelectors.windowActive);
}

const removeLoginWindowWrapper = () => {
  const window = document.querySelector(loginWindowSelectors.window);
  const wrapper = document.querySelector(loginWindowSelectors.wrapper);

  if (!window.classList.contains(loginWindowSelectors.windowActive)) {
    wrapper.classList.remove(loginWindowSelectors.wrapperActive);
  }
}

const showAlert = () => {
  const email = document.querySelector(loginWindowSelectors.email);
  const password = document.querySelector(loginWindowSelectors.password);
  alert('E-mail: ' + email.value + '\n' + 'Password: ' + password.value)
}

const toggleSignInAndSignUp = () => {
  const selectors = {
    title: '.login-window>h2',
    facebook: '.login-window-facebook-button',
    google: '.login-window-google-button',
    or: '.login-window-or',
    signIn: '.login-window-sign-in-button',
    forgot: '.login-window-link-forgot-pass',
    registerText: '.login-window-register-text',
    registerLink: '.login-window-register-link'
  };

  loginWindowState = (loginWindowState === loginWindowStateConst.login) ? loginWindowStateConst.register : loginWindowStateConst.login;

  const title = document.querySelector(selectors.title);
  const facebookButton = document.querySelector(selectors.facebook);
  const googleButton = document.querySelector(selectors.google);
  const or = document.querySelector(selectors.or);
  const signInButton = document.querySelector(selectors.signIn);
  const forgot = document.querySelector(selectors.forgot);
  const registerText = document.querySelector(selectors.registerText);
  const registerLink = document.querySelector(selectors.registerLink);

  if (loginWindowState === loginWindowStateConst.login) {
    title.innerHTML = 'Log in to your account';

    facebookButton.style.display = 'flex';
    googleButton.style.display = 'flex';
    or.style.display = 'flex';

    signInButton.innerHTML = 'Sign In';
    forgot.style.display = 'block';

    registerText.innerHTML = 'Don\'t have an account?';
    registerLink.innerHTML = 'Register';
  } else {
    title.innerHTML = 'Create account';

    facebookButton.style.display = 'none';
    googleButton.style.display = 'none';
    or.style.display = 'none';

    signInButton.innerHTML = 'Sign Up';
    forgot.style.display = 'none';

    registerText.innerHTML = 'Already have an account? ';
    registerLink.innerHTML = 'Log In';
  }
}

/***** SLIDER DESKTOP *****/
const desktopSliderSelectors = {
  slider: '.destinations-slider',
  image: '.destinations-figure-img',
  circle: '.destinations-scrollbar > .destinations-scrollbar-circle',
  styleSelected: 'destinations-scrollbar-circle-selected'
};

(() => {
  const images = document.querySelectorAll(desktopSliderSelectors.image);
  images.forEach((image) => image.addEventListener('click', (event) => slide(event)));

  const scrollbar = document.querySelectorAll(desktopSliderSelectors.circle);
  scrollbar.forEach((circle) => circle.addEventListener('click', (event) => slide(event)));
})();

const slide = (event) => {
  const slider = document.querySelector(desktopSliderSelectors.slider);
  const images = slider.querySelectorAll(desktopSliderSelectors.image);

  const scrollbar = document.querySelectorAll(desktopSliderSelectors.circle);
  scrollbar.forEach((circle) => circle.classList.remove(desktopSliderSelectors.styleSelected));

  const imgWidth = Number(getComputedStyle(images[0]).width.replace('px', ''));
  const imgGap = Number(getComputedStyle(slider).gap.replace('px', ''));

  switch (event.target) {
    case images[0]:
    case scrollbar[0]:
      slider.style.transform = 'translateX(' + (imgWidth + imgGap) + 'px)';
      scrollbar[0].classList.add(desktopSliderSelectors.styleSelected);
      break;

    case images[2]:
    case scrollbar[2]:
      slider.style.transform = 'translateX(' + -(imgWidth + imgGap) + 'px)';
      scrollbar[2].classList.add(desktopSliderSelectors.styleSelected);
      break;

    default:
      slider.style.transform = 'translateX(0)';
      scrollbar[1].classList.add(desktopSliderSelectors.styleSelected);
  }
}

/***** SLIDER MOBILE *****/
const mobileSliderSelectors = {
  slider: '.destinations-slider-mobile',
  arrow: '.slider-mobile-arrow',
  leftArrow: '.destinations-left-arrow-mobile-img',
  rightArrow: '.destinations-right-arrow-mobile-img',
  circle: '.destinations-scrollbar-mobile > .destinations-scrollbar-circle',
  styleSelected: 'destinations-scrollbar-circle-selected'
};

const _100vw = document.documentElement.clientWidth;
const imgCount = 3;
let currMobSliderPos = 0;

(() => {
  const arrows = document.querySelectorAll(mobileSliderSelectors.arrow);
  arrows.forEach((arrow) => arrow.addEventListener('click', (event) => slideArrowMobile(event)));

  const scrollbar = document.querySelectorAll(mobileSliderSelectors.circle);
  scrollbar.forEach((circle) => circle.addEventListener('click', (event) => slideScrollbarMobile(event)));

  const slider = document.querySelector(mobileSliderSelectors.slider);
  slider.addEventListener('transitionend', (event) => setSliderMobileButtonsState());
})();

const slideArrowMobile = (event) => {
  const leftArrow = document.querySelector(mobileSliderSelectors.leftArrow);
  const rightArrow = document.querySelector(mobileSliderSelectors.rightArrow);

  switch (event.target) {
    case leftArrow:
      if (currMobSliderPos < 0) {
        currMobSliderPos++;
      }
      break;

    case rightArrow:
      if (currMobSliderPos > -(imgCount - 1)) {
        currMobSliderPos--;
      }
      break;
  }

  refreshMobileSlider();
}

const slideScrollbarMobile = (event) => {
  const scrollbar = document.querySelectorAll(mobileSliderSelectors.circle);

  switch (event.target) {
    case scrollbar[0]:
      currMobSliderPos = 0;
      break;

    case scrollbar[1]:
      currMobSliderPos = -1;
      break;

    case scrollbar[2]:
      currMobSliderPos = -2;
      break;
  }

  refreshMobileSlider();
}

const refreshMobileSlider = () => {
  const slider = document.querySelector(mobileSliderSelectors.slider);
  slider.style.transform = 'translateX(' + (currMobSliderPos * _100vw) + 'px)';
}

const setSliderMobileButtonsState = () => {
  const leftArrow = document.querySelector(mobileSliderSelectors.leftArrow);
  const rightArrow = document.querySelector(mobileSliderSelectors.rightArrow);
  const scrollbar = document.querySelectorAll(mobileSliderSelectors.circle);

  leftArrow.style.opacity = rightArrow.style.opacity = '30%';
  scrollbar.forEach((circle) => circle.classList.remove(mobileSliderSelectors.styleSelected));

  switch (currMobSliderPos) {
    case 0:
      rightArrow.style.opacity = '100%';
      scrollbar[0].classList.add(mobileSliderSelectors.styleSelected);
      break;

    case -1:
      leftArrow.style.opacity = rightArrow.style.opacity = '100%';
      scrollbar[1].classList.add(mobileSliderSelectors.styleSelected);
      break;

    case -2:
      leftArrow.style.opacity = '100%';
      scrollbar[2].classList.add(mobileSliderSelectors.styleSelected);
      break;
  }
}
