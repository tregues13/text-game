class Shop{
    constructor(coinEl,sectionWindons,buyEl,arrowEl,descreptionEl){
        this.coinEl = coinEl;
        this.buyEl = buyEl;
        this.sectionW = sectionWindons;
        this.arrow = arrowEl;
        this.desc = descreptionEl;
    }

    update(){
        shop.coinEl = playerOne.coin;
    }

    products(e){
        const targetId = e.dataset.descrepition;

        this.desc.forEach(element => {
            element.classList.remove('active');
        });
        
        this.arrow.forEach(e => {
            e.style.transform = 'rotate(0deg)';
        });

        const descID = document.querySelector(`#${targetId}`);
        const arrowID = document.querySelector(`#arrow${targetId}`);

        if(descID){
            descID.classList.add('active');
        };

        if(arrowID){
            arrowID.style.transform = 'rotate(86deg)';
        };
    }

    section(data,area){
        
        const states = () => {
            section.forEach(element => {
                element.classList.remove('select');
            })
        }

        switch(data){
            case "weapon":
                this.sectionW.style.transform = 'translateX(0vw)';
                states();
                area.classList.add('select');
            break;
            
            case "several":
                this.sectionW.style.transform = 'translateX(-300px)';
                states();
                area.classList.add('select');
            break;

            case "improvements":
                this.sectionW.style.transform = 'translateX(-600px)';
                states();
                area.classList.add('select');
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