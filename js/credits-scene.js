// Cena de Créditos
class CreditsScene extends Phaser.Scene {
	constructor() {
		super('CreditsScene');
	}
	create() {
		this.add.text(400, 120, 'Créditos', { fontSize: '40px', color: '#fff' }).setOrigin(0.5);
		this.add
			.text(400, 200, 'Desenvolvido por Denisson Chaves', { fontSize: '24px', color: '#fff' })
			.setOrigin(0.5);
		this.backBtn = this.add
			.text(400, 400, 'Voltar', { fontSize: '28px', color: '#0ff' })
			.setOrigin(0.5)
			.setInteractive();
		this.selected = true;
		this.updateBackBtn();
		this.backBtn.on('pointerdown', () => this.scene.start('MenuScene'));
		this.input.keyboard.on('keydown-UP', this.toggleSelection, this);
		this.input.keyboard.on('keydown-DOWN', this.toggleSelection, this);
		this.input.keyboard.on('keydown-ENTER', this.confirmSelection, this);
		this.input.keyboard.on('keydown-ESC', this.goBack, this);
	}
	goBack() {
		this.scene.start('MenuScene');
	}
	updateBackBtn() {
		if (this.selected) {
			this.backBtn.setStyle({ color: '#222' });
			this.backBtn.setScale(1.1);
			this.backBtn.setStroke('#fff', 8);
			this.backBtn.setShadow(2, 2, '#fff', 2, true, true);
		} else {
			this.backBtn.setStyle({ color: '#0ff' });
			this.backBtn.setScale(1);
			this.backBtn.setStroke();
			this.backBtn.setShadow();
		}
	}
	toggleSelection() {
		this.selected = true;
		this.updateBackBtn();
	}
	confirmSelection() {
		if (this.selected) {
			this.scene.start('MenuScene');
		}
	}
}
