// Cena do Jogo (placeholder)
class GameScene extends Phaser.Scene {
	constructor() {
		super('GameScene');
	}
	create() {
		this.add
			.text(400, 300, 'Jogo em construção...', { fontSize: '32px', color: '#fff' })
			.setOrigin(0.5);
		const backBtn = this.add
			.text(400, 500, 'Voltar ao Menu', { fontSize: '28px', color: '#f00' })
			.setOrigin(0.5)
			.setInteractive();
		backBtn.on('pointerdown', () => this.scene.start('MenuScene'));
	}
}
