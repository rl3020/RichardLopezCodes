
// Initiate the observers for the transitions on scroll
let pageAnimation = new PageAnimations();

const itemsToFadeIn = document.querySelectorAll(".fade-in");
const portfolioContainers = document.querySelectorAll(".portfolio-section");
console.log("portfolio containers: ", portfolioContainers);

const fadeInAnimationOptions = {
    threshold: .25, 
    rootMargin: "0px 0px -90px 0px"
};

const portfolioContainerAnimationOptions = {
    threshold: .5, 
    rootMargin: "0px 0px -150px 0px"
};

pageAnimation.createObserver(itemsToFadeIn, fadeInAnimationOptions); 
pageAnimation.createObserver(portfolioContainers, portfolioContainerAnimationOptions); 


const projects= document.getElementById("projects");
const about = document.getElementById("about-me");
const contact = document.getElementById("contact-me");
const navElements = [projects, about, contact];
const navOptions = {
    threshold: .25, 
    rootMargin: "0px 0px -50px 0px"
};
pageAnimation.initiateScroll(navElements, navOptions); 



const submit = document.getElementById("submit-button");
submit.onclick = async function(){
    const nameInput = document.getElementById("name-input"); 
    const emailInput = document.getElementById("email-input");
    const inquiry = document.getElementById("inquiry");

    if(nameInput.value.length === 0 || 
        emailInput.value.length === 0 || 
            inquiry.value.length === 0 ||
                !emailInput.value.includes('@') ){
            let errorMessage = document.getElementById("input-error");
            errorMessage.style.display = "block"; 
    }
    else{
        //remove any previous error messages
        let errorMessage = document.getElementById("input-error");
        errorMessage.style.display = "none";
        
        //payload for server
        const email = {
            "sender-name": nameInput.value,
            "sender-email" : emailInput.value, 
            "body": inquiry.value
        };

        //settings for payload
        const settings = {
            method: "POST", 
            body: JSON.stringify(email), 
            headers: {
                "Content-Type": "application/json"
            }

        };


        let buttonContainer = document.getElementById("press-button-to-submit");
        buttonContainer.style.display = "none";

        let load = document.getElementById("load");
        load.style.display = "block";

        let result = await fetch("https://richard-lopez-codes.herokuapp.com/send_email/", settings);
        load.style.display = "none";

        let sendSuccess = document.getElementById("send-success");
        sendSuccess.style.display = "flex";
        
    }

}







// Introduction phrases
const intro1 = "Hi, my name is Richard Lopez  and I’m an aspiring Full Stack Software Engineer";
const intro2 = "With a passion for programming and an eagerness to create,  ";
const intro3 = "I frequently practice and use technologies like . . . ";
let sequence = [ intro1 , intro2, intro3];


document.addEventListener("DOMContentLoaded", initialize);
async function initialize(){
    //run through each phrase above
    for(let i = 0; i < sequence.length; i++){
        let speed = 60;
        let writer;
        let isLastComment;

        //Is it the last sequence of words?
        if( i === sequence.length - 1){
            isLastComment = true;
            writer = new TypeWriter(sequence[i], speed, isLastComment);
            writer.typeSentence();
        }else{
            isLastComment = false;
            writer = new TypeWriter(sequence[i], speed, isLastComment);
            await writer.typeSentence();
        }
    }//end of for loop
}




