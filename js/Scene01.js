class Scene01 extends Phaser.Scene {
	constructor() {
		super({ key: 'Scene01' });
	}

	preload() {
		this.load.image('background', 'assets/sprites/background-game.png');

		this.load.image('ground', 'assets/sprites/chao.png');
		this.load.image('platformSmall', 'assets/sprites/plataforma-p.png');
		this.load.image('platformMedium', 'assets/sprites/plataforma-m.png');
		this.load.image('platformLarge', 'assets/sprites/plataforma-g.png');

		this.load.image('produto', 'assets/sprites/produto.png');
		this.load.image('desenvolvimento', 'assets/sprites/desenvolvimento.png');
		this.load.image('suporte', 'assets/sprites/suporte.png');
		this.load.image('cloudInfra', 'assets/sprites/cloud-infra.png');
		this.load.image('marketing', 'assets/sprites/marketing.png');
		this.load.image('comercial', 'assets/sprites/comercial.png');
		this.load.image('financeiro', 'assets/sprites/financeiro.png');
		this.load.image('implantacao', 'assets/sprites/implantacao.png');
		this.load.image('ecossistema', 'assets/sprites/ecossistema.png');
		this.load.image('iopa', 'assets/sprites/iopa.png');
		this.load.image('cs', 'assets/sprites/cs.png');
		this.load.image('sdr', 'assets/sprites/sdr.png');

		this.load.spritesheet('player', 'assets/sprites/player-parado.png', {
			frameWidth: 105,
			frameHeight: 198,
		});
		this.load.spritesheet('playerRunning', 'assets/sprites/player-correndo.png', {
			frameWidth: 164,
			frameHeight: 198,
		});
	}

	create() {
		this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);

		this.player = this.physics.add
			.sprite(50, 50, 'player')
			.setCollideWorldBounds(true)
			.setScale(0.5);
		// .setBounce(0.2); // kickback when landing

		this.player.canJump = true;

		this.anims.create({
			key: 'idle',
			frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
			frameRate: 8,
			repeat: -1,
		});

		this.anims.create({
			key: 'run',
			frames: this.anims.generateFrameNumbers('playerRunning', { start: 0, end: 8 }),
			frameRate: 16,
			repeat: -1,
		});

		this.anims.create({
			key: 'jump',
			frames: this.anims.generateFrameNumbers('playerRunning', { start: 3, end: 3 }),
			frameRate: 8,
			repeat: -1,
		});
		this.player.anims.play('idle');

		this.control = this.input.keyboard.createCursorKeys();

		this.wasd = this.input.keyboard.addKeys({
			up: Phaser.Input.Keyboard.KeyCodes.W,
			left: Phaser.Input.Keyboard.KeyCodes.A,
			down: Phaser.Input.Keyboard.KeyCodes.S,
			right: Phaser.Input.Keyboard.KeyCodes.D,
			space: Phaser.Input.Keyboard.KeyCodes.SPACE,
		});

		this.grounds = this.physics.add.staticGroup();
		this.platformsSmall = this.physics.add.staticGroup();
		this.platformsMedium = this.physics.add.staticGroup();
		this.platformsLarge = this.physics.add.staticGroup();

		this.movingPlatform = this.physics.add
			.image(200, 350, 'platformMedium')
			.setImmovable(true)
			.setVelocityX(100); // velocidade inicial
		this.movingPlatform.body.allowGravity = false;

		this.physics.add.collider(this.player, this.movingPlatform);

		this.produto = this.physics.add.image(600, 100, 'produto');

		this.grounds.create(0, 600, 'ground').setScale(2, 1).setOrigin(0, 1).refreshBody();
		this.grounds.create(800, 600, 'ground').setScale(2, 1).setOrigin(0, 1).refreshBody();

		this.platformsSmall.create(350, 450, 'platformSmall').refreshBody();
		this.platformsSmall.create(700, 450, 'platformSmall').refreshBody();
		this.platformsLarge.create(400, 300, 'platformLarge').refreshBody();
		this.platformsLarge.create(600, 150, 'platformLarge').refreshBody();

		this.physics.add.collider(this.player, this.grounds);
		this.physics.add.collider(this.player, this.platformsSmall);
		this.physics.add.collider(this.player, this.platformsMedium);
		this.physics.add.collider(this.player, this.platformsLarge);

		this.physics.add.collider(this.produto, this.grounds);
		this.physics.add.collider(this.produto, this.platformsSmall);
		this.physics.add.collider(this.produto, this.platformsMedium);
		this.physics.add.collider(this.produto, this.platformsLarge);

		this.physics.world.bounds.width = this.background.width;
		this.physics.world.bounds.height = this.background.height;
		this.cameras.main.setBounds(0, 0, this.background.width, this.background.height);
		this.cameras.main.startFollow(this.player);

		// Textos para cada seta
		const textosSetas = [
			'Texto 1',
			'Texto 2',
			'Texto 3',
			'Texto 4',
			'Texto 5',
			'Texto 6',
			'Texto 7',
			'Texto 8',
			'Texto 9',
			'Texto 10',
			'Texto 11',
			'Texto 12',
		];

		this.setas = this.physics.add.group();

		for (let i = 0; i < 12; i++) {
			// Crie a seta
			const seta = this.setas.create(200 + i * 50, 200, 'seta');
			seta.texto = textosSetas[i];

			// Adicione o texto acima da seta
			seta.label = this.add
				.text(seta.x, seta.y - 40, seta.texto, {
					font: '16px Arial',
					fill: '#fff',
					align: 'center',
				})
				.setOrigin(0.5);

			// Opcional: mantenha referência para atualizar a posição do texto junto com a seta
			seta.updateLabel = () => seta.label.setPosition(seta.x, seta.y - 40);
		}

		// Colisor entre player e setas
		this.physics.add.overlap(this.player, this.setas, this.coletarSeta, null, this);
	}

	update() {
		const left = this.control.left.isDown || this.wasd.left.isDown;
		const right = this.control.right.isDown || this.wasd.right.isDown;
		const up = this.control.up.isDown || this.wasd.up.isDown;
		const space = this.control.space.isDown || this.wasd.space.isDown;

		if (left) {
			this.player.setVelocityX(-200);
			this.player.setFlipX(true);
		} else if (right) {
			this.player.setVelocityX(200);
			this.player.setFlipX(false);
		} else {
			this.player.setVelocityX(0);
		}

		if (up && this.player.canJump && this.player.body.touching.down) {
			this.player.setVelocityY(-575);
			this.player.canJump = false;
		}

		if (!up && !this.player.canJump && this.player.body.touching.down) {
			this.player.canJump = true;
		}

		if (space) {
			// Lógica para atirar
		}

		if (!this.player.body.touching.down) {
			if (this.player.anims.currentAnim && this.player.anims.currentAnim.key !== 'jump') {
				this.player.anims.play('jump');
			}
		} else if (left || right) {
			if (this.player.anims.currentAnim && this.player.anims.currentAnim.key !== 'run') {
				this.player.anims.play('run');
			}
		} else {
			if (this.player.anims.currentAnim && this.player.anims.currentAnim.key !== 'idle') {
				this.player.anims.play('idle');
			}
		}

		if (this.movingPlatform.x >= 600) {
			this.movingPlatform.setVelocityX(-100);
		} else if (this.movingPlatform.x <= 200) {
			this.movingPlatform.setVelocityX(100);
		}
        
		this.setas.children.iterate((seta) => {
			if (seta && seta.updateLabel) seta.updateLabel();
		});
	}
}
