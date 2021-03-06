firebase.initializeApp(config);
const formMessage = firebase.database().ref(`formMessages`)
let formMessageObj = {};

// SELECT BUTTONS MENU
const navMenu = document.getElementsByTagName('nav');
const recentWorksLink = document.querySelector('#recent-works-links');
// EVENT CLICK OF NAV MENU
navMenu[0].addEventListener('click' , e => {
  if (window.innerWidth > 1040){
    e.preventDefault();
    const { target } = e;
    let targetClick = target.parentNode.getAttribute('href');
    if(targetClick){
      animateNavs(targetClick)
    }
  }
})
// ANIMATION SECTIONS IN STAGE
const animateNavs = (targetClick) => {  
  // ANCHOR LINK
  if (targetClick === '#works') {
    fadeInWorks('all')
  }
  const linkedTargets = document.querySelectorAll('.navItem')
  elAnchors = Array.prototype.map.call(linkedTargets,
    linkedEl => {
      linkedEl.classList.remove('selected');
      if(linkedEl.getAttribute('href') == targetClick){
        linkedEl.classList.add('selected');
      }
    });
  // SECTIONS TARGETS
  const secciones = document.querySelectorAll('.seccionInfo')
  elsecciones = Array.prototype.map.call(secciones,
    sectionHide => {
      if(sectionHide.getAttribute('id') == targetClick.replace('#' , '')){
        sectionHide.classList.add('view')
      }else{
        sectionHide.classList.remove('view')
      }
    });
}
// RECENT WORKS EVENTS
recentWorksLink.addEventListener('click',(e) => {
  const { target } = e;
  targetsArr = Array.prototype.map.call(target.parentNode.children,
    targetList => {
      targetList.classList.remove('selectedWork')
    }
  )
  target.classList.add('selectedWork')
  dataSelect = target.dataset.select;
  if (dataSelect) {
    fadeInWorks(dataSelect)
  }
})
// ANIMATE IN ITEMWORKS
const fadeInWorks = (dataSelect) => {
  fadeOutWorks();
  if(dataSelect !== 'all') {
    filter = `[data-type='${dataSelect}']`
  } else {
    filter = `.workItem`
  }
  const worksSelected = document.querySelectorAll(filter)
  worksArray = Array.prototype.map.call(worksSelected,
    workItem => {
      workItem.classList.add('active')
    }
  )
}
// ANIMATE OUT ITEMWORKS
const fadeOutWorks = () =>{
  const worksSelected = document.querySelectorAll(`.workItem`)
  worksArray = Array.prototype.map.call(worksSelected,
    workItem => {
      workItem.classList.remove('active')
    }
  )
}
// SENDING EMAIL FORM
const form = document.querySelector("#form");
const button = document.querySelector('#sendMsg')
let responseContiner = document.querySelector('.response')
form.addEventListener("submit", (e) => {
  e.preventDefault()
  formMessageObj = {
    name: getInputValues('name'),
    email: getInputValues('email'),
    message: getInputValues('message')
  }  
  button.disabled = true;
  saveMessage(formMessageObj)
  .then(()=>{
    responseContiner.innerHTML = "";
    const prg = document.createElement("p");
    prg.innerHTML = "You´re Message is been receved"
    responseContiner.appendChild(prg)
    form.reset()
    setTimeout(() => {
      responseContiner.innerHTML = ""
      button.removeAttribute("disabled");
    }, 2000);
  })
});

const getInputValues = (id) =>{
  return document.querySelector(`#${id}`).value
}
const saveMessage = (msgObj) => {
  return new Promise((response , reject)=>{
    const newMesg = formMessage.push()
    response(newMesg.set(msgObj))
  })
}
// VALIDATE EMAIL INPUT
const email = document.querySelector("#email");
email.addEventListener("input", (event) => {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("Please enter you´re Email");
  } else {
    email.setCustomValidity("");
  }
});

// VALIDATE NAME INPUT
const name = document.querySelector("#name");
name.addEventListener("input", (event) => {
  format = /[!@#$%^&*(),.?":{}|<>]/;
  if (format.test(name.value)) {
    name.setCustomValidity("Please enter you´re Name");
  } else {
    name.setCustomValidity("");
  }
});
