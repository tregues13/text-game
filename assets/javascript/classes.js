//instanciando classes

const manipulationArea = new Windon(
    document.querySelectorAll('.windons'),
)

const pistol = new weapon('pistol',5,6,6,0.15,2);
const inventorys = new inventory();

const playerOne = new Player('cypher');

const stage = new Stage(
    document.querySelector('.enemyhealth'),
    document.querySelector('#log'),
    document.querySelector('.restart'),
    document.querySelectorAll('.item'),
    document.querySelector('.reload'),
    document.querySelector('#menu-batlle'),
    document.querySelector('.buttons')
);

const shop = new Shop(
    document.querySelector('.bateryshop'),
    document.querySelector('.slider'),
    document.querySelectorAll('.buy'),
    document.querySelectorAll('.arrow'),
    document.querySelectorAll('.description')
);

let enemyOne;

const action = document.querySelectorAll('.button');
const section = document.querySelectorAll(".section")
const logbatle = [
"O vento levanta a poeira da estrada enquanto sua mão repousa sobre o cabo da arma. O desconhecido à sua frente cospe no chão e sorri de lado. Ninguém diz uma palavra. O próximo som pode ser um tiro.",
"O silêncio das montanhas é quebrado por um estalo metálico. Antes que você consiga reagir, sombras surgem entre as rochas. Armas são apontadas em sua direção. Você caiu numa emboscada.",
"As engrenagens do braço mecânico do inimigo rangem enquanto ele avança. Seus olhos brilhantes analisam cada movimento seu. Ele não veio negociar. Veio caçar.",
"O trem abandonado geme sobre os trilhos enferrujados. De repente, uma figura salta de um vagão destruído, seguida por outras. O cheiro de pólvora invade o ar. O combate começou.",
"O copo se despedaça contra a parede. Cadeiras são empurradas para trás e revólveres surgem das bainhas. Em poucos segundos, o saloon se transforma em um campo de batalha.",
"Uma tempestade de areia cobre o horizonte. Entre os grãos avermelhados, silhuetas armadas se aproximam. Você mal consegue enxergar, mas sabe que não está sozinho.",
"Vapor escapa das juntas metálicas da criatura à sua frente. O mecanismo gira lentamente até travar em você. Um apito estridente ecoa pelo deserto. A máquina entrou em modo de combate.",
"O ranger das carroças para abruptamente. Homens armados surgem dos arbustos e bloqueiam o caminho. O líder deles aponta a arma para você e sorri. -Entregue tudo... ou morra.",
"O caçador de recompensas retira um cartaz amassado do bolso. Seu rosto está estampado nele. Sem hesitar, ele guarda o papel e saca o revólver. — Vivo ou morto. Tanto faz.",
"Velhos canhões enferrujados cercam o campo devastado. O inimigo emerge da fumaça carregando cicatrizes de batalhas esquecidas. O passado está morto. Mas a guerra ainda não acabou.",
];

document.querySelector('.reload').addEventListener('click',() => {
    stage.weapon.reloading();
    stage.enemydmg();
    stage.updatabuttons();
    stage.upDate();
});

document.querySelectorAll('.pause').forEach(element => {
    element.addEventListener('click', () => {
        let pause = element.dataset.pause;

        switch(pause){
            case 'continue':
                stage.continue();
            break;

            case 'healing':
                playerOne.healing();
            break;
            
            default:
                manipulationArea.window(pause)
            break;
        }
    })
})

action.forEach(element => {
    element.addEventListener('click',() => {
        let weapon = inventorys.weapons[element.dataset.item];
        
        stage.button = element;
        stage.weapon = weapon;

        playerOne.shot();
        stage.updatabuttons();
        stage.pause();
    })
});

section.forEach(element =>{
    element.addEventListener("click", () =>{
        let data = element.dataset.section;
        shop.section(data,element);
    })
})

shop.buyEl.forEach(element => {
    element.addEventListener('click', () => shop.update (element));
})

document.querySelectorAll(".items-content").forEach(element => {
    element.addEventListener("click", () => shop.products(element))
})