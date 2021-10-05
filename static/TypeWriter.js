
// Uses class Animate to assist with animating typing
class TypeWriter{
    constructor(sentence, speed, lastComment=false){
        this.sentence = sentence;
        this.speed = speed;
        this.isLastComment = lastComment;
    }

    animateSentence = async function(str){
        
        let animation = new Animate();
        
        if(str === this.sentence){
            //If it is complete
            let waitTime = 3500;
            animation.typeNextLetter(str);
            if(this.isLastComment){
                await animation.blinkCursor(waitTime, true);
            }else{
                await animation.blinkCursor(waitTime, false);
            }
            
            animation.done(str);

        }else{
            //If it is not complete
            animation.typeNextLetter(str);
            await animation.stall(this.speed);
        }

    }

    typeSentence = async function(){
        for(let i = 0; i < this.sentence.length + 1; i ++){
            await this.animateSentence(this.sentence.substring(0, i));
        }
    }


}