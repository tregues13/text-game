class Windon{
    constructor(window){
        this.windowEl = window;
    }

    window(data){
        this.windowEl.forEach(element => {
            element.style.display = 'none';
            let dataEl = element.dataset.area;
            if(data === dataEl){
                
                element.style.display = 'flex';

                if(dataEl === 'game-area'){
                    stage.startGame();
                }
                else if(dataEl === 'shop'){
                    shop.update();
                }
            }            
        });
    }
}