new Vue({
    el: "#app",
    data: {
        isGameStarted: false,
        monsterHealth: 100,
        playerHealth: 100,
        moves: []
    },
    methods: {
        startGame() {
            this.isGameStarted = true;            
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.moves = [];
        },
        onAttack() {
            this.getAttactImpact(3, 10);
            this.checkWinner();
        },
        onSpecialAttack() {
            this.getAttactImpact(5, 20);
            this.checkWinner();
        },
        onHeal() {
            const heal = Math.floor(Math.random() * 10);
            if (this.playerHealth + heal ) {
                const monsterAttack = this.getDamage(3, 10);
                this.playerHealth = this.playerHealth + heal - monsterAttack;
                this.moves.unshift({
                    winsHealth: true,
                    player: this.playerHealth,
                    monster: monsterAttack
                });
                return;
            }
            this.onHeal();
        },
        onGiveUp(){
            this.startGame();
        },
        checkWinner(){
            if (this.monsterHealth <= 0) {
                if (confirm('You won. Do you want to play again?')){
                    this.startGame();
                    return;
                } else {
                    this.isGameStarted = false;
                    this.moves = [];
                }
            } else if (this.playerealth <= 0) {
                if (confirm('Monster won. Do you want to play again?')){
                    this.startGame();
                    return;
                } else {
                    this.isGameStarted = false;
                    this.moves = [];
                }
            } 
        },
        getAttactImpact(min, max) {
            const monsterAttack = this.getDamage(min, max);
            const playerAttack = this.getDamage(min, max);
            this.moves.unshift({
                player: playerAttack,
                monster: monsterAttack
            });
            this.monsterHealth -= playerAttack;
            this.playerHealth -= monsterAttack;
        },
        getDamage(min, max) {
            return Math.max(Math.floor(Math.random() * max), min);
        }
    }
})