// Cena do Menu Principal
class MenuScene extends Phaser.Scene {
	constructor() {
		super('MenuScene');
	}
	create() {
		this.add.text(400, 120, 'Super Fábio', { fontSize: '48px', color: '#fff' }).setOrigin(0.5);
		this.menuOptions = [
			this.add.text(400, 220, 'Start', { fontSize: '32px', color: '#0f0' }).setOrigin(0.5),
			this.add
				.text(400, 280, 'Instruções', { fontSize: '28px', color: '#ff0' })
				.setOrigin(0.5),
			this.add.text(400, 340, 'Créditos', { fontSize: '28px', color: '#0ff' }).setOrigin(0.5),
		];
		this.selectedIndex = 0;
		this.updateMenuSelection();
		this.menuOptions[0].setInteractive().on('pointerdown', () => this.selectOption(0));
		this.menuOptions[1].setInteractive().on('pointerdown', () => this.selectOption(1));
		this.menuOptions[2].setInteractive().on('pointerdown', () => this.selectOption(2));
		this.input.keyboard.on('keydown-UP', this.moveUp, this);
		this.input.keyboard.on('keydown-DOWN', this.moveDown, this);
		this.input.keyboard.on('keydown-ENTER', this.confirmSelection, this);
	}
	updateMenuSelection() {
		this.menuOptions.forEach((option, idx) => {
			if (idx === this.selectedIndex) {
				option.setStyle({ color: '#222' });
				option.setScale(1.1);
				option.setTint(0xffffff, 0xffffff, 0xffffff, 0xffffff);
				option.setStroke('#fff', 8);
				option.setShadow(2, 2, '#fff', 2, true, true);
			} else {
				let originalColor = '#0f0';
				if (idx === 1) originalColor = '#ff0';
				if (idx === 2) originalColor = '#0ff';
				option.setStyle({ color: originalColor });
				option.setScale(1);
				option.setStroke();
				option.setShadow();
			}
		});
	}
	moveUp() {
		this.selectedIndex =
			(this.selectedIndex + this.menuOptions.length - 1) % this.menuOptions.length;
		this.updateMenuSelection();
	}
	moveDown() {
		this.selectedIndex = (this.selectedIndex + 1) % this.menuOptions.length;
		this.updateMenuSelection();
	}
	confirmSelection() {
		this.selectOption(this.selectedIndex);
	}
	selectOption(index) {
		switch (index) {
			case 0:
				this.scene.start('GameScene');
				break;
			case 1:
				this.scene.start('InstructionsScene');
				break;
			case 2:
				this.scene.start('CreditsScene');
				break;
		}
	}
}
