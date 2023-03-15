function toggleMenu() {
    var menu = document.getElementById("menu");
    menu.classList.toggle("active");
    menu.style.backgroundImage = "linear-gradient(to right, #1295dc , #4fd6e8)";

    var toggle = document.querySelector(".navbar-toggle");
    toggle.classList.toggle("active");
}

const links = document.querySelectorAll('.navbar a');

// add a click event listener to each link
links.forEach(link => {
    link.addEventListener('click', e => {
        // prevent the default behavior (scrolling)
        e.preventDefault();
        var menu = document.getElementById("menu");
        menu.classList.toggle("active");
        var toggle = document.querySelector(".navbar-toggle");
        toggle.classList.toggle("active");
        // get the target section (based on the href attribute)
        const target = document.querySelector(link.getAttribute('href'));

        // scroll to the target section using smooth scrolling
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

let append_onebyone = document.getElementById("append_onebyone");


let arr = ["Problem Solver ", "Coder", "Developer", "Designer", "Learner", "Innovator"];
function appendonebyone5secIntervelTime(arr) {
    var i = 0;
    var interval = setInterval(function () {
        append_onebyone.innerHTML = arr[i];
        i++;
        if (i >= arr.length) {
            i = 0;
        }
    }, 5000);
}

appendonebyone5secIntervelTime(arr);