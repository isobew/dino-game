const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;

// function click() {
//     console.log('clicou');
// } 

function handleKeyUp(event) {
    if (event.keyCode === 32 || event.keyCode === 38) {
        if(!isJumping){
            jump();
        }
    }
}

let jump = () => {
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);
            //descendo
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 10;
                    dino.style.bottom = position + 'px';
                }
            }, 20)
        } else {
            //subindo
            position += 15;
            dino.style.bottom = position + 'px';
        }

    }, 20);
}


//gerando cactus
function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1400;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(()=>{
        if (cactusPosition < -60){
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            //Game Over
            let title = document.getElementById('title')
            title.innerHTML = 'Game over!';
            title.style.color = 'red';
            clearInterval(leftInterval);
            clearTimeout(cactusRepeat);
            jump = false;
            background.style.animation = 'none';
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    //novo cactus
   let cactusRepeat = setTimeout(createCactus, randomTime);
}

createCactus();

document.addEventListener('keyup', handleKeyUp);