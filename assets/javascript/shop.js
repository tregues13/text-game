class Shop{
    constructor(coinEl,sectionWindons,buyEl){
        this.coinEl = coinEl;
        this.buyEl = buyEl;
        this.sectionW = sectionWindons;
    }

    update(){
        shop.coinEl = playerOne.coin;
    }

    section(data,element){
        
        switch(data){
            case "weapon":
                this.sectionW.style.transform = 'translateX(0vw)'
                element.classList.add('select');
            break;
            
            case "several":
                this.sectionW.style.transform = 'translateX(-300px)'
                element.classList.add('select');
            break;

            case "improvements":
                this.sectionW.style.transform = 'translateX(-600px)'
                element.classList.add('select');
            break;
        }
    }

    buy(element){
        action.forEach(button =>{
            let dataB = button.dataset.item;
            let dataEl = element.dataset.buy

            if(dataB === dataEl){
                button.style.display = "flex";
            }
    })}
}