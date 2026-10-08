//Class global
class Person{

    _life = 1;
    maxLife = 1;

    constructor(id){
        this.id = id;
    }

    get life(){
        return this._life;
    }
    set life(newLife){
        this._life = newLife < 0 ? 0: newLife;
    }
};

class Player extends Person{
    constructor(id){
        super(id);
        this.life = 30;
        this.maxLife = 30;
        this.coin = 0;
        this.pa = 0;
        this.maxDefense = 25;
        this.defense = this.maxDefense;

        this.tempCritBonus = 0;
        this.stimTurns = 0;
    }

    shot(){

        let number = Math.random();
        var damageProcess;
        let multiplier;
        if(this.life > 0 && enemyOne.life > 0){
            if(stage.weapon.currentAmmo >= 1){
                if(number <= stage.weapon.criticalChance){
                    multiplier = stage.weapon.criticalMultiplier + this.tempCritBonus;
                    damageProcess = Math.round(stage.weapon.damage * multiplier);
                } else{
                    multiplier = 1 + this.tempCritBonus;
                    damageProcess = Math.round(stage.weapon.damage * multiplier);
                }
                
                switch(stage.weapon.name){
                    case 'pistol':
                        stage.weapon.currentAmmo--;
                        enemyOne.life -= damageProcess;
                        playerOne.pa ++;
                    break;
                    case 'knife':
                        enemyOne.life -= damageProcess;
                        playerOne.pa ++;
                    break;
                    case 'shotgun':
                        if(playerOne.pa >= stage.weapon.paCust){
                            enemyOne.life -= damageProcess;
                            playerOne.pa -= stage.weapon.paCust;
                        };
                    break;
                }
                
                if(this.stimTurns > 0){
                    this.stimTurns--;
                }else{
                    this.tempCritBonus = 0;
                }
                stage.battle();
            }
        } 
    }

    get def(){
        return this.defense;
    }
    set def(newDefense){
        this.defense = newDefense < 0 ? 0 : newDefense;
    }
};

class items {
    constructor(name,amount,price){
        this.name = name;
        this.amount = amount;
        this.price = price;
        this.efect = false;   
    }

    healing(){
        if(playerOne.life < playerOne.maxLife){
        this.amount --;
        playerOne.life = playerOne.maxLife;
        stage.upDate();
        }
    }

    repair(){
        if(playerOne.defense <= 0){
            this.amount --;
            playerOne.defense = playerOne.maxDefense;
            stage.upDate();
        }
    }

    useDrugs(){
        if(this.efect != true){
            this.amount --;
            playerOne.tempCritBonus = 0.35;
            playerOne.stimTurns = 2;
            this.efect = true;
        }
    }
}
class inventory {
    constructor(){
        this.weapons = {
            pistol,
            knife,
            };
    }

    addInventory(weaponR){
        this.weapons[weaponR] = stage.allWeapons[weaponR]; 
    }
    
    reset(){
        this.weapons = {
            pistol,
            knife,
            };
    }
}

class Weapon{
    constructor(name,damage,criticalChance,criticalMultiplier,price,pa,maxAmmo,currentAmmo){
        this.name = name;
        this.damage = damage;
        this.maxAmmo = maxAmmo;
        this.currentAmmo = currentAmmo;
        this.criticalChance = criticalChance;
        this.criticalMultiplier = criticalMultiplier;
        this.price = price;
        this.paCust = pa;
    }

    reloading(){
        this.currentAmmo = this.maxAmmo;
        log.innerHTML += ` Enquanto você recarregava o atirador desfiriu um tiro em você, deu ${enemyOne.pistol} de dano!`;
    }
}

class Enemy extends Person{
    constructor(life){
        super();
        this.life = life;
        this.maxLife = life;
    }

    pistol = 5;
    knife = 3;
    shotgun = 15;

    attack(){
        const availableWeapons = [this.pistol, this.knife, this.shotgun]; 
        
        const randomIndex = Math.floor(Math.random() * availableWeapons.length);
        const selectedWeapon = availableWeapons[randomIndex];

        const critical =Math.round(0.5 + Math.random()); 

        return Number((selectedWeapon * critical).toFixed(1));        
        
    }
};