class Shop{
    constructor(coinEl,sectionWindons,buyEl,arrowEl,descreptionEl,verifyEl){
        this.coinEl = coinEl;
        this.buyEl = buyEl;
        this.sectionW = sectionWindons;
        this.arrow = arrowEl;
        this.desc = descreptionEl;
        this.verifyEl = verifyEl;
        this.price = 0;
    }

    update(){
        shop.coinEl.innerText = `${playerOne.coin}`;
        this.verifyEl.forEach( (element,index) =>{
            
            let buyBtn = this.buyEl[index];

            this.price = Number(element.innerText.replace(/\D/g, ''));
            
            if(playerOne.coin >= this.price){
                element.style.color = '#0f0';
                buyBtn.style.background = '#0f0';
            } else{
                element.style.color = '#f00';
                buyBtn.style.background = '#f00'
            };})
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
        
        let dataEl = element.dataset.buy;
        let dataType = element.dataset.type;

        switch(dataType){
            case 'weapon':
                if(!inventorys.weapons[dataEl]){
            
                    let weapon = stage.allItems[dataEl];

                    if(playerOne.coin >= weapon.price){

                        playerOne.coin -= weapon.price;
                        
                        
                        action.forEach(button =>{
                            let dataB = button.dataset.item;

                            if(dataB === dataEl){
                                button.classList.remove('lock');
                                inventorys.addInventory(dataB);
                            }
                    })
                    this.update();
                    }
                }
            break;

            case 'several':
                let item = stage.allItems[dataEl];
                if(playerOne.coin >= item.price){
                    playerOne.coin -= item.price
                    item.amount++;
                    this.update();
                }
            break;

            case 'improvements':
                let ability = playerOne.Ability[dataEl];
                if(ability.status != true){
                    if(playerOne.coin > ability.cust) {
                        playerOne.coin -= ability.cust
                        ability.upgrades(dataEl);
                        this.update();
                    };
                }
            break;
        }
    }
}