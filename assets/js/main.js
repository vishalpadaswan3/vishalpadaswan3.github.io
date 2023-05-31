
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Intro type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()



let formcontact = document.getElementById('formcontact');
let name = document.getElementById('name');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let message = document.getElementById('message');
let submit = document.getElementById('submit');


formcontact.addEventListener('submit', function (e) {
  e.preventDefault();
  let payload = {
    name: name.value,
    email: email.value,
    subject: subject.value,
    message: message.value
  }

  submit.innerText = 'Sending...';

  fetch('http://localhost:3000/sendmail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then((response) => {
    return response.json();
  }
).then((data) => {
    console.log(data);
    if (data.msg == 'success') {
      swal(`🤝`, "Thank you for your message. I will get back to you soon.", "success");
      submit.innerText = 'Send Message';
      formcontact.reset();
    } else {
      swal(`😥`, "Something went wrong. Please try again.", "error");
      submit.innerText = 'Send Message';
    }
  }).catch(function (error) {
    console.log(error);
    swal(`😥`, "Something went wrong. Please try again.", "error");
    submit.innerText = 'Send Message';
  
  })

})



new GitHubCalendar(".calender", "vishalpadaswan3");


let calender = document.querySelector('.calender');
console.log(calender);
let githubinfo = document.getElementById("githubinfo")

// when someone hover on github calender make an alert

githubinfo.addEventListener('mouseover', function () {
  calender.style.display = "block";
  githubinfo.style.display = "none";
})

calender.addEventListener('mouseleave', function () {
  calender.style.display = "none";
  githubinfo.style.display = "block";
}
)


let myreshere = document.getElementById('myreshere');
myreshere.addEventListener("click", () => {
  // window.location.assign("https://drive.google.com/file/d/15CTVzRjLYV5Wz-K3_MbijdmL2joEGZO3/view?usp=share_link")
  window.open('https://drive.google.com/file/d/15CTVzRjLYV5Wz-K3_MbijdmL2joEGZO3/view?usp=share_link', '_blank');
})


let myreshere2 = document.getElementById('myreshere2');
myreshere2.addEventListener("click", () => {
  // window.location.assign("https://drive.google.com/file/d/15CTVzRjLYV5Wz-K3_MbijdmL2joEGZO3/view?usp=share_link")
  window.open('https://drive.google.com/file/d/15CTVzRjLYV5Wz-K3_MbijdmL2joEGZO3/view?usp=share_link', '_blank');
})