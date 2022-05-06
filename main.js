
// Obtencion de elementos
const container = document.getElementById('flex-container');
const initGame = document.querySelector('.init-game');
const gameContainer = document.querySelector('.game-container');
const outputMessage = document.querySelector('.message-output');
const displayHP = document.querySelector('.hp');
const inventoryButton = document.querySelector('.inventory');
const attackButton = document.querySelector('.attack');
const healButton = document.querySelector('.heal');
const forwardButton = document.querySelector('.forward');
const inventoryMenu = document.querySelector('.inventory-menu');
const showItems = document.querySelector('.swords');
const showItem1 = document.getElementsByClassName('.sword1');
const showItem2 = document.getElementsByClassName('.sword2');
const showItem3 = document.getElementsByClassName('.sword3');
const backButton = document.querySelector('.back');
const debugMode = document.querySelector('.debug');


// Iniciar juego
initGame.addEventListener('click', () => {
	initGame.classList.toggle('started');
	gameContainer.classList.toggle('active');
});

// Inventario
inventoryButton.addEventListener('click', () => {
	gameContainer.classList.toggle('active');
	inventoryMenu.classList.toggle('active');
});

// Salir del inventario
backButton.addEventListener('click', () => {
	gameContainer.classList.toggle('active');
	inventoryMenu.classList.toggle('active');
});


// Creacion de clases
class Enemy {
	constructor(hp, damage) {
		this.hp = hp;
		this.damage = damage;
	}
	// Ataque
	attack(player) {
		player.hp -= this.damage;
	}
}

class Sword {
	constructor(name, damage) {
		this.name = name;
		this.damage = damage;
	}
	// Ataque
	attack(enemy) {
		enemy.hp -= this.damage;
	}
}

class Heal {
	constructor(health, name) {
		this.health = health;
		this.name = name;
	}
	// Curacion
	heal(player) {
		player.hp += this.health;
	}
}

// Aplicacion de polimorfismo
class SuperSword extends Sword {
	constructor(name, damage) {
		super(name, damage);
	}
	// Habilidad de quemar
	burn(enemy) {
		const randomDamage = Math.round(Math.random() * 5);
		const burnMessage = `Quemas al enemigo, el fuego le quita ${randomDamage} de HP`;
		enemy.hp -= damage + randomDamage;
	}
}

class SuperHeal extends Heal {
	constructor(health, name) {
		super(health, name);
	}
	superHeal(player) {
		const randomHealth = Math.round(Math.random() * 5);
		const healMessage = `La super curacion te curo ${randomHealth}HP de mas`;
		player.hp += health + randomHealth;
	}
}



// Creacion del jugador, enemigos, espadas, curaciones y mensajes
const swords = {
	sword1: new Sword('Espada de piedra', 2),
	sword2: new Sword('Espada de hierro', 3),
	sword3: new Sword('Espada de diamante', 4),
	sword4: new SuperSword('Espada de fuego', 5)
}

const healings = {
	healing1: new Heal(4, 'Curacion de nivel 2'),
	healing2: new Heal(7, 'Curacion de nivel 3'),
	healing3: new SuperHeal(10, 'Super curacion de nivel 2'),
	healing4: new SuperHeal(14, 'Super curacion de nivel 3')
}

const enemies = {
	enemy1: new Enemy(2, 1),
	enemy2: new Enemy(2, 1),
	enemy3: new Enemy(3, 2),
	enemy4: new Enemy(3, 2),
	enemy5: new Enemy(4, 4),
	enemy6: new Enemy(5, 4),
	enemy7: new Enemy(6, 6),
	enemy8: new Enemy(7, 6),
	enemy9: new Enemy(9, 8),
	finalBoss: new Enemy(15, 10)
};

const player = {
	// Vida
	hp: 20,
	// Arma
	sword: new Sword('Espada de madera', 1),
	// Habilidad de curacion
	healAbility: 3,
	// Equipar/Usar items
	useItem: () => {
	
	},
	// Avanzar
	forward: () => {

	}
};


// Mensajes a mostrar en la salida
const messagesShown = {
	// Mensaje que se muestra cuando el HP llega a 0
	gameOverMessage: 'Te has quedado sin HP, fin del juego.', 
	// Mensaje que se muestra cuando entras al modo de depuracion
	debugModeMessage: 'Entraste al modo de depuracion.',
	// Mensaje que se muestra cuando ganas el juego
	finishedGameMessage: 'Has ganado el juego.'
}


// Creacion de turnos
var turn = 0;

// Trayectoria del juego
const roadMap = {
	tile1: 'Avanzas 1 metro',
	tile2: 'Avanzas otro metro',
	tile3: 'Avanzas otro metro mas',
	tile4: 'Te has encontrado con un enemigo de nivel 1',
	tile5: 'Te has encontrado con otro enemigo de nivel 2',
	tile6: 'Avanzas 1 metro',
	tile7: `Has encontrado una ${swords.sword1.name}`,
	tile8: 'Avanzas 1 metro',
	tile9: 'Te has encontrado con un enemigo de nivel 3',
	tile10: `Has encontrado una ${healings.healing1.name}`,
	tile11: 'Te has encontrado con un enemigo de nivel 3',
	tile12: 'Avanzas 1 metro',
	tile13: `Has encontrado una ${swords.sword2.name}`,
	tile14: 'Te has encontrado con un enemigo de nivel 4',
	tile15: 'Te has encontrado con un enemigo de nivel 4',
	tile16: 'Te has encontrado con un enemigo de nivel 5',
	tile17: 'Avanzas 1 metro',
	tile18: 'Avanzas otro metro',
	tile19: `Has encontrado una ${swords.sword2.name}`,
	tile20: 'Avanzas 1 metro',
	tile21: 'Te has encontrado un enemigo de nivel 5',
	tile22: 'Te has encontrado un enemigo de nivel 6',
	tile23: 'Avanzas 1 metro',
	tile24: 'Avanzas otro metro',
	tile25: `Has encontrado una ${healings.healing3.name}`,
	tile26: 'Avanzas 1 metro',
	tile27: 'Te has encontrado un enemigo de nivel 7',
	tile28: 'Avanzas 1 metro',
	tile29: 'Avanzas otro metro',
	tile30: 'Avanzas otro metro mas',
	tile31: 'Te has encontrado un enemigo de nivel 7',
	tile32: 'Te has encontrado un enemigo de nivel 8',
	tile33: 'Avanzas 1 metro',
	tile34: 'Avanzas otro metro',
	tile35: `Has encontrado un ${swords.sword3.name}`,
	tile36: 'Avanzas 1 metro',
	tile37: 'Te has encontrado un enemigo de nivel 9',
	tile38: 'Avanzas 1 metro',
	tile39: `Has encontrado un ${healings.healing2.name}`,
	tile40: 'Avanzas 1 metro',
	tile41: "Avanzas otro metro",
	tile42: 'Te has encontrado con un enemigo de nivel 9',
	tile43: 'Avanzas 1 metro',
	tile44: 'Avanzas otro metro',
	tile45: 'Avanzas otro metro mas',
	tile46: 'Felicidades!, ya has avanzado bastante y estas por llegar a tu destino',
	tile47: 'Frente a ti, hay un cofre, decides abrirlo y dentro habia',
	tile48: `Una ${swords.sword4.name}`,
	tile49: `y una ${healings.healing4.name}`,
	tile50: 'Ya estas frente a la puerta del castillo, decides entrar',
	tile51: 'Dentro esta el jefe final, preparate para pelear',
	tile52: 'Te has encontrado al jefe final de nivel 10',
	tile53: 'Felicidades, has vencido al jefe final!'
};

/*
	Por hacer:
	-Añadir mas mensajes
	-Hacer el modo de depuracion para pruebas
	-Hacer el sistema de turnos
*/

// Sistema de turnos
const turns = (currentTurn) => {
	for (let i = currentTurn; i <= Object.keys(roadMap).length; i++) {
		// Si el turno es par, que sea el turno del jugador
		if (currentTurn % 2 == 0) {
			const playerTurn = (action) => {

			}
		}
		// Si no, que sea turno del enemigo 
		else if (currentTurn % 2 == 1) {
			const enemyTurn = (attack) => {

			}
		}
	}
};

turns(turn);


















// Modo de depuracion que es revelado cuando se presiona Ctrl + Q
document.onkeyup = (e) => {
	if (e.ctrlKey && e.which == 81) {
		outputMessage.textContent = messagesShown.debugModeMessage;
		// Por hacer
		container.contentEditable = true;
		debugMode.classList.toggle('active');
		debugMode.textContent = ``;
  }
};