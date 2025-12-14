class Scene01 extends Phaser.Scene {
	constructor() {
		super({ key: 'Scene01' });
	}
	preload() {
		// Carregue assets aqui
	}
	create() {
		this.add.text(100, 100, 'Jogo iniciado!', { font: '16px Arial', fill: '#fff' });
	}
}
