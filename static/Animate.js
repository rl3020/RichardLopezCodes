class Animate{
    constructor(){
        this.wordContainer = document.getElementById("text-container");
    }

    stall = async function(time){
        return new Promise( resolve => {
            setTimeout( function(){
                resolve();
            }, 
            time);
        });
    }

    typeNextLetter = function(str){
        this.wordContainer.innerHTML = `<span class="text-styling">${str} </span>`;
    }

    blinkCursor = async function(waitTime, isLastComment){
        var stallPerBlink = 500;  
        var numBlinks = Math.floor(waitTime/(2*stallPerBlink));
        var blinker = document.getElementsByClassName("text-styling")[0];
        

        if(isLastComment){
            //in the last comment display the rotating languages
            setTimeout(function(){
                let rotate = document.getElementById("rotating-div");
                rotate.style.display = "block";   
            }, 200);

            while(true){
                blinker.style.cssText  = "border-right: none;";
                await this.stall(stallPerBlink);
                blinker.style.cssText  = "border-right: 3px solid grey;";
                await this.stall(stallPerBlink);
            }

        }else{
            for(let i = 0; i < numBlinks - 1; i++){

                await this.stall(stallPerBlink);
                blinker.style.cssText  = "border-right: none;";
                
                await this.stall(stallPerBlink);
                blinker.style.cssText  = "border-right: 3px solid grey;";
            }
            blinker.style.cssText = "background-color: #7dc4ff;";
            await this.stall(stallPerBlink + 30);
       
            
        }
    }

    done = function(str){
        //start flashing the cursor
        // and then fade out to next sentence
        console.log("DONE");
        console.log(str);
        return;
    }

}