
class PageAnimations{
    constructor(){
    }

    createObserver = function(elementsToObserve, options){
        
        //Create listener for scrolling behavior
        const onScroll = new IntersectionObserver(

            //callback method when the listener fires
            function(elements, onScroll){
                elements.forEach(element => {
                    if(!element.isIntersecting){
                        return; 
                    }else if(element.target.className === "portfolio-section"){
                        // for the elements with a title
                        if(Array.from(element.target.children).length > 1){
                            let title = Array.from(element.target.children)[0];
                            console.log("title: ", title);
                            title.classList.add("appear"); 
                            onScroll.unobserve(title);

                            let contentContainer = Array.from(element.target.children)[1];
                            let children = Array.from(contentContainer.children);
                            for(let i = 0; i < children.length; i ++){
                                children[i].classList.add("appear");
                                onScroll.unobserve(children[i]);
                            }
                        }else{
                            // for the elements without a title to fade-in
                            let contentContainer = Array.from(element.target.children)[0];
                            let children = Array.from(contentContainer.children);
                            for(let i = 0; i < children.length; i ++){
                                children[i].classList.add("appear");
                                onScroll.unobserve(children[i]);
                            }
                        }

                    }else{
                        element.target.classList.add("appear");
                        onScroll.unobserve(element.target);
                    }
                });
            }, 
            options);

        //Initiate the observer for each element
        elementsToObserve.forEach(element =>{
            onScroll.observe(element);
        });
    }

    initiateScroll = function(elementsToObserve, options)
    {
        var navigation = {};
        elementsToObserve.forEach( element =>{
            if(element.id === "projects"){
                let proj = document.getElementById("projects-link");
                navigation[String(element.id)] = proj;
            }
            else if(element.id === "about-me"){
                let about = document.getElementById("about-me-link");
                navigation[String(element.id)] = about;
            }
            else if(element.id === "contact-me"){
                let contact = document.getElementById("contact-me-link");
                navigation[String(element.id)] = contact;
            }
        });

        console.log("navigation: ", navigation); 
        const onScroll = new IntersectionObserver(
            function(elements, onScroll){
                elements.forEach(element => {
                    console.log("id: ",element.target);
                    if(!element.isIntersecting){
                        navigation[String(element.target.id)].style.cssText = "border: none;"; 
                        return;
                    }else{

                        //use this to clear previos
                        let keys = Object.keys(navigation);
                        keys.forEach(key =>{
                            console.log("css: ", navigation[String(key)].style.cssText); 
                            if(navigation[String(key)].style.cssText === "border-bottom: 3px solid white; padding-bottom: 10px;"){
                                navigation[String(key)].style.cssText = "border: none;"; 
                            }
                        });

                        console.log("currently on page: ",navigation[String(element.name)]);
                        navigation[String(element.target.id)].style.cssText = "border-bottom: 3px solid white; padding-bottom: 10px;";

                    }
                })
            }, options);
        
        elementsToObserve.forEach(element =>{
            onScroll.observe(element);
        });
            
    }
}