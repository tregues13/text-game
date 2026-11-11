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
        this.fullInventory = [
            'Heh heh heh... Tá tentando ser o dono do monopólio, forasteiro? Eu já te vendi o último desse. E mesmo que eu tivesse, sua mochila biônica não aguenta carregar dois. Guarde seus créditos pra outra coisa...',
            'Ganancioso, não é? Já te passei a última unidade dessa belezinha. Guarde seus créditos pra algo que ainda não esteja pendurado nesse seu cinto tático, chapa.',
            'Acha que eu fabrico essas relíquias do velho mundo em impressora 3D? O que você tem aí é peça única no mercado agora, stranger. Escolha outra coisa.',
            'Heh heh... Seus implantes ópticos estão com falha no visor? Você já comprou isso de mim. Não faço vendas em dobro, regras do sindicato dos sucateiros.'
        ]
    }

    openToShop(){
        this.log.innerHTML = 'Heh heh heh... Bem-vindo, forasteiro. O que vai levar hoje?';
        this.update();
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
                        item.status = true;
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
                        item.status = true;
                        this.update();
                    };
                } 
            break;
        }
        
    }

    logShop(item){
        
        let number = Math.floor(Math.random() * 4);

        if(item.status == true){
            console.log('entrou')
            this.log.innerHTML = `${this.fullInventory[number]}`;
        }else if(item.descrepition !== undefined){
            this.log.innerHTML = `${item.descrepition}`;
        }else{    
            this.log.innerHTML = `${this.notCoin[number]}`;
        }
    }
}