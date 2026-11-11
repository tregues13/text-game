class Windon{
    constructor(window){
        this.windowEl = window;
        this.version = 'v1.0.0';
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
                    shop.openToShop();
                }
            }            
        });
    }
}