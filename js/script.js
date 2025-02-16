/*========================Animação========================*/
var typed = new Typed(".typing",{
    strings:["","Software Developer","Programador","Estudante de TI","Fullstack", "Apaixonado pela Computação", "Let's code"],
    typeSpeed:100,
    BackSpeed:60,
    loop:true
})

/*========================Aside Barra de Nav========================*/
const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    allSection = document.querySelectorAll(".section"),
    totalNavList = navList.length;
    for (let i = 0; i < totalNavList; i++)
    {
        const  a = navList[i].querySelector("a");
        a.addEventListener("click", function()
        {
            for(let j = 0; j < totalNavList; j++)
            {
                navList[j].querySelector("a").classList.remove("active")
            }
            this.classList.add("active");
            showSection(this);
            if(window.innerwidth < 1200)
            {
                asideSectionTogglerbtn();
            }
        })
    }
    function showSection(element){
        for(let i= 0; i < totalSection; i++){
            allSection[i].classList.remove("active")
        }
        const target = element.getAttribute("href").split("#")[1];
        document.querySelector("#" + target).classList.add("active")
    }

    /*========================Botão hamburger========================*/
    const navTogglerBtn = document.querySelector(".nav-toggler"),
    aside = document.querySelector(".aside");
    navTogglerBtn.addEventListener("click", () =>{
        asideSectionTogglerBtn();
    })
    function asideSectionTogglerBtn(){
        aside.classList.toggle("open");
        navTogglerBtn.classList.toggle("open");
        for(let i= 0; i< totalSection; i++)
        {
            allSection[i].classList.toggle("open");
        }
    }
    