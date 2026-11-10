class Shop{
    constructor(coinEl,sectionWindons,buyEl,arrowEl,descreptionEl,verifyEl,logEl){
        this.coinEl = coinEl;
        this.buyEl = buyEl;
        this.sectionW = sectionWindons;
        this.arrow = arrowEl;
        this.desc = descreptionEl;
        this.verifyEl = verifyEl;
        this.log = logEl;
        this.price = 0;
        this.notCoin = [
            'Heh heh heh... Faltou moeda aí, forasteiro! Volte quando os bolsos estiverem cheios',
            'Tá achando que chumbo cai do céu? Junte mais prata e a gente conversa',
            'Eu vendo armas, não faço caridade! Você precisa de mais dinheiro pra levar isso',
            'Bolsos vazios não compram sobrevivência, parceiro'
        ]
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
        let item;

        switch(dataType){
            case 'weapon':    
                item = stage.allItems[dataEl];
                this.logShop(item);
                if(!inventorys.weapons[dataEl]){
                    if(playerOne.coin >= item.price){
                        playerOne.coin -= item.price;
                        action.forEach(button =>{
                            let dataB = button.dataset.item;
                            if(dataB === dataEl){
                                button.classList.remove('lock');
                                inventorys.addInventory(dataB);
                            }
                        });
                        this.update();
                    }
                }
            break;

            case 'several':
                item = stage.allItems[dataEl];
                this.logShop(item);
                if(playerOne.coin >= item.price){
                    playerOne.coin -= item.price
                    item.amount++;
                    this.update();
                }
            break;

            case 'improvements':
                item = playerOne.ability[dataEl];
                this.logShop(item);
                if(item.status != true){
                    if(playerOne.coin >= item.price) {
                        playerOne.coin -= item.price
                        item.upgrades(dataEl);
                        this.update();
                    };
                } 
            break;
        }
        //this.logShop(item);
    }

    logShop(item){
        //Corrigir a busca se contem o item comprado para o log
        if(item.status == true || inventory.weapons[item.name] == undefined){
            this.log.innerHTML = 'Seu cavalo não aguenta carregar dois desses, forasteiro. Tente gastar sua prata com outra coisa';
        }else if(item.descrepition !== undefined){
            this.log.innerHTML = `${item.descrepition}`;
        } else{
            let number = Math.floor(Math.random() * 4);
            this.log.innerHTML = `${this.notCoin[number]}`;
        }
    }
}