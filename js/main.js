/*--------------- navigation menu ----------------- */
(() => {
    const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = navMenu.querySelector(".close-nav-menu");

    hamburgerBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu);

    function showNavMenu(){
        navMenu.classList.toggle("open");
        fadeOutEffect();
    }

    function hideNavMenu(){
        navMenu.classList.remove("open");
        fadeOutEffect();
        bodyScrollingToggle();
    }

    function fadeOutEffect(){
        document.querySelector(".fade-out-effect").classList.add("active");
        bodyScrollingToggle();
        setTimeout(() => {
            document.querySelector(".fade-out-effect").classList.remove("active");
        }, 300);
    }

    /*----------- attach an event handler to document  ---------- */
    document.addEventListener("click", (event) =>{
        if(event.target.classList.contains('link-item')){
            // make sure event.target.hash has a value before overridding default behavior
            if(event.target.hash !== ""){
                // prevemnt defaul anchor click behavior 
                event.preventDefault();
                const hash = event.target.hash;
                // deactivate existing active 'section'
                document.querySelector(".section.active").classList.add(".hide");
                document.querySelector(".section.active").classList.remove("active");
                // active new 'section';
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");
                // deactivate existing active navigation menu 'link-item'
                navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active", "inner-shadow");
                // if clicked 'link-item' is contained within the navigation menu 
                if(navMenu.classList.contains("open")){
                    // activate new navigation menu 'link-item'
                    event.target.classList.add("active", "inner-shadow");
                    event.target.classList.remove("outer-shadow", "hover-in-shadow");
                    // hide navigation manu 
                    hideNavMenu();
                }
                else{
                    let navItems = navMenu.querySelectorAll(".link-item");
                    navItems.forEach((item) =>{
                        if(hash === item.hash){
                            // activate new navigation menu 'link-item'
                            item.classList.add("active", "inner-shadow");
                            item.classList.remove("inner-shadow", "hover-in-shadow");
                        }
                    })
                    fadeOutEffect();
                }
                window.location.hash = hash;
            }
        }
    })
})();

// about tab 
(() => {
    const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event) => {
        if(event.target.classList.contains("tab-item") && !event.target.classList.contains("active")){
            const target = event.target.getAttribute("data-target");
            tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            event.target.classList.add("active", "outer-shadow")
            aboutSection.querySelector(".tab-content.active").classList.remove("active");
            aboutSection.querySelector(target).classList.add("active");
        }
    })
    
})();

function bodyScrollingToggle() {

}

window.addEventListener("load", () =>{
    // preload
    document.querySelector(".preloader").classList.add("fade-out");
    setTimeout(() =>{
        document.querySelector(".preloader").style.display = "none";
    }, 600)
})
const form = document.querySelector(".main-contact-form");
const fullName = document.getElementById("name");
const email = document.getElementById("sender");
const subject = document.getElementById("subject");
const mess = document.getElementById("user_dtls");

function sendEmail() {
  const bodyMessage = `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9;">
    <div style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <div style="background-color: #007bff; color: #ffffff; border-radius: 10px 10px 0 0; padding: 20px;">
        <h2 style="margin: 0;">Contact Form Submission</h2>
      </div>
      <div style="padding: 20px;">
        <p style="margin-bottom: 10px;"><strong>Full Name:</strong> ${fullName.value}</p>
        <p style="margin-bottom: 10px;"><strong>Email:</strong> ${email.value}</p>
        <p style="margin-bottom: 10px;"><strong>Subject:</strong> ${subject.value}</p>
        <p style="margin-bottom: 10px;"><strong>Message:</strong> ${mess.value}</p>
      </div>
      <div style="background-color: #007bff; color: #ffffff; border-radius: 0 0 10px 10px; padding: 10px;">
      <span style="margin: 0;">&copy;Ankit Raj</span>
    </div>
    </div>
  </div>
`;

  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "ankitgame09@gmail.com",
    Password: "3B90AA843D8DCA9333F0808C684A7F36C4F9",
    To: 'ankitgame09@gmail.com',
    From: "ankitgame09@gmail.com",
    Subject: subject.value,
    Body: bodyMessage
  }).then(
    message => {
      if (message == "OK") {
        Swal.fire({
          title: "Success!",
          text: "Message sent successfully!",
          icon: "success"
        });
        form.reset();
      }
      else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      }
    }
  );
}
form.addEventListener("submit", (e) => {
  e.preventDefault();

  sendEmail();
});
