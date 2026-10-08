class Stage{

    constructor(enemyLifeEl,logEl,restartEl,itemsEl,reloadEl,finalbattleEl,actionEl,panelEl){
        this.button = null;
        this.weapon = null; 
        this.enEl = enemyLifeEl;
        this.lEl = logEl;
        this.restartEl = restartEl;
        this.items = itemsEl;
        this.reload = reloadEl;
        this.finalbattle = finalbattleEl;
        this.attackM = actionEl;
        this.panel = panelEl;
        this.count; 
        this.allItems = {
            pistol,
            shotgun,
            knife,
            machineGun,
            precisionRifle,
            medic,
            stimulating,
            defense
        };
    };

    number(){
        return Math.floor(Math.random() * 10);
    }

    startGame(){
        stage.number();
        stage.createEnemy();
        stage.upDate(); 
    };

    upDate(){
       
        if(playerOne._life <= 0){
            this.panel.style.display = 'none';
            this.restartEl.style.display = 'flex';
        }
        
        this.items.forEach(element => {

            let dataEl = element.dataset.stats;
            let item = this.allItems[dataEl];

            if(dataEl in pistol){
                element.innerHTML = pistol[dataEl];
            }
            if(dataEl in this.allItems){
                element.innerHTML = item.amount;
            }
            if(dataEl in playerOne){
                element.innerHTML = `${playerOne[dataEl]}`;
            }
        });

        this.enEl.innerHTML = `${enemyOne.life}`; 
    };

    reset(){
        playerOne.life = playerOne.maxLife;
        playerOne.coin = 0;
        playerOne.defense = playerOne.maxDefense;
        playerOne.pa = 0;
        medic.amount = 2;
        pistol.currentAmmo = pistol.maxAmmo;

        this.upDate();
        this.createEnemy();
        inventorys.reset();

        action.forEach(element => {
            let weapon = element.dataset.item;

            if(inventorys.weapons[weapon] !== undefined){
                element.classList.remove('lock');
            } else {element.classList.add('lock')};
        })

        if(playerOne._life > 0){
            this.panel.style.display = 'flex';
            this.restartEl.style.display = 'none';
            this.updatabuttons();
        }
    }

    updatabuttons(){
        if(this.weapon.name == 'pistol'){
            if(this.weapon.currentAmmo <= 0){
                this.reload.style.display = "flex";
                this.button.style.display = "none";
            } else {
                this.reload.style.display = "none";
                this.button.style.display = "flex";
            }
        }
    }
    
    createEnemy(){
        var lifenemy = (this.number() + 10) * 3;

        enemyOne = new Enemy(lifenemy,lifenemy);
        this.lEl.innerHTML = `${logbatle[this.number()]}`;
        this.enEl.innerHTML = `${enemyOne.life}`;
    };

    enemydmg(){
        if(playerOne.life > 0 && enemyOne.life > 0){
            let randomA = enemyOne.attack();

            if(playerOne.defense <= 0){
                playerOne.life -= randomA;
            }
            else{
                playerOne.defense -= randomA;
            }
            this.upDatelog(this.weapon, randomA);
        }
    }

    battle(){
        this.enemydmg();
        this.upDate();
    };

    upDatelog(name, damage){
        //verificador de vida do inimigo para determinar um valor de dano
        let porcentagem = (enemyOne.life / enemyOne.maxLife) * 100;
        let healthM = 0;

        if(porcentagem > 0 && porcentagem<= 25){healthM = 1;}
        else if(porcentagem > 25 && porcentagem <= 50){healthM = 2;}
        else if(porcentagem > 50 && porcentagem <= 75){healthM = 3;}
        else if(porcentagem > 75 && porcentagem <= 100){healthM = 4;}

        //LOGS
            
        //logs do tiro de pistola
        
        if(healthM === 1){
            log.innerHTML += `
                Você desfiriu um tiro de ${name.name} no atirador, deu ${name.damage} de dano!
                <br>
                O Atirador reage e dispara em você ${damage}.
                <br>
                O atirador esta muito ferido,você consegue ver que as balas perfuraram sua pele ele esta sangrando muito, igual uma presa
                <br> 
                ele esta com ${enemyOne.life} de vida
                <br>
                <br>
                `;
        }
        else if(healthM === 2){
            log.innerHTML +=`
            Você desfiriu um tiro revolver no atirador, deu ${name.damage} de dano!
                <br>
                O Atirador reage e dispara em você ${damage}.
                <br>
                O Atirador esta machucado, não se sabe quanto tempo ele durara.
                <br> 
                ele esta com ${enemyOne.life} de vida
                <br>
                <br>
            `;
        }
        else if(healthM === 3){
            log.innerHTML +=`
            Você desfiriu um tiro revolver no atirador, deu ${name.damage} de dano!
            <br>
            O Atirador reage e dispara em você ${damage}.
            <br>
            Voce parece o ferir ele esta perdendo a compustura que tinha antes.
            <br> 
            ele esta com ${enemyOne.life} de vida
            <br>
            <br>
                `;
        }
        else if(healthM === 4){
            log.innerHTML +=`
            Você desfiriu um tiro revolver no atirador, deu ${name.damage} de dano!
            <br>
            O Atirador reage e dispara em você ${damage}.
            <br>
            Você parece causar dano mais não o parece abalar muito.
            <br> 
            ele esta com ${enemyOne.life} de vida
            <br>
            <br>
            `;
        }
    };

    pause(){
        if(enemyOne.life <= 0){
            this.finalbattle.style.display = 'flex';
            this.attackM.style.display = 'none';
            this.reward();
        }else{
            this.finalbattle.style.display = 'none';
            this.attackM.style.display = 'flex';
        }
    }

    reward(){
        var reward = this.number() + 5
        playerOne.coin += reward;
        this.upDate();
    }

    continue(){
        this.createEnemy();
        this.updatabuttons();
        this.pause();
    }
}