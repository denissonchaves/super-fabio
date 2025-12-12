// Cena de Instruções
class InstructionsScene extends Phaser.Scene {
	constructor() {
		super('InstructionsScene');
	}
	create() {
		this.add.text(400, 120, 'Instruções', { fontSize: '40px', color: '#fff' }).setOrigin(0.5);
		this.add
			.text(400, 200, 'Use as setas para mover e espaço para pular.', {
				fontSize: '24px',
				color: '#fff',
			})
			.setOrigin(0.5);
		this.backBtn = this.add
			.text(400, 400, 'Voltar', { fontSize: '28px', color: '#ff0' })
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
			this.backBtn.setStyle({ color: '#ff0' });
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
