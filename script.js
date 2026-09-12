//TODO add functionality to collapse sections
/*const menuButton = document.querySelector('.menu-button');
const siteNav = document.querySelector('.site-nav');

menuButton.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});*/

document.querySelector('.contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const email = form.elements.email.value.trim();
  const subject = form.elements.subject.value.trim();
  const message = form.elements.message.value.trim();
  const body = `From: ${email}\n\n${message}`;

  window.location.href = `mailto:micsmi8944@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

//THE BELOW IS FOR THE MATRIX/HACKER EFFECT ON SECTION HEADERS
//shamelessly stolen from Hyperplexed on youtube, who stole it from awwwards.com site of the month, JAN 2023
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const activeIntervals = new WeakMap();

function interval(event){
  const element = event.currentTarget;
  let iterations = 0;

  //check and clear the interval attached to this element so it can rerun from 0
  const existingInterval = activeIntervals.get(element);

  if (existingInterval) {
    clearInterval(existingInterval);
  }

  const timer = setInterval(() => {
  //get each letter in the innerText, split it into an array of individual letters, then
  //randomize all letters except the first X, where X is how many times you've randomized, then
  //rejoin the letters
  element.innerText = element.innerText.split("")
  .map((letter, index) => {
    if(index<iterations){
      return element.dataset.value[index];
    }
    return letters[Math.floor(Math.random() * 26)]})
    .join("");

    //increase iterations var to affect new letters, check against the max length of innerText, clear existing intervals if done
    iterations+= 1 / 3 ;
    if(iterations>element.dataset.value.length){
      clearInterval(timer);
      activeIntervals.delete(element);
      return 0;
    }

}, 60);
  //link active interval to the current element
  activeIntervals.set(element, timer);
}

document.querySelectorAll(".hero-heading").forEach((element) => {
  element.addEventListener("mouseover", interval);
});

//adds a listener for each nav-button that runs interval() on the target heading
document.querySelectorAll(".nav-button").forEach((element) => {
  element.addEventListener("click", function (event) {
    const targetSection = document.querySelector(event.currentTarget.getAttribute("href"));
    const targetHeader = targetSection?.querySelector(".section-heading .hero-heading");

    if (targetHeader) {
      interval({ currentTarget: targetHeader });
    }
  });
});

/*
//DECIDED AGAINST ADDING THIS TO BUTTONS FOR CLARITY
document.querySelectorAll(".nav-button").forEach((element) => {
  element.addEventListener("mouseover", interval);
});
}*/