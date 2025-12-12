// Configuração do Phaser e criação do game
var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	backgroundColor: '#222',
	parent: 'game-container',
	scene: [MenuScene, GameScene, InstructionsScene, CreditsScene],
};

var game = new Phaser.Game(config);
