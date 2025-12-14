class Scene01 extends Phaser.Scene {
	constructor() {
		super({ key: 'Scene01' });
	}

	preload() {
		this.load.image('background', 'assets/sprites/background-game.png');
		this.load.image('ground', 'assets/sprites/chao.png');
		this.load.image('platform', 'assets/sprites/plataforma.png');
		this.load.image('brickPlatformSmall', 'assets/sprites/plataforma-tijolo-p.png');
		this.load.image('brickPlatformMedium', 'assets/sprites/plataforma-tijolo-m.png');
		this.load.image('brickPlatformLarge', 'assets/sprites/plataforma-tijolo-g.png');
		this.load.spritesheet('player', 'assets/sprites/player-parado.png', {
			frameWidth: 164,
			frameHeight: 198,
		});
	}

	create() {
		this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);

		this.player = this.physics.add.sprite(50, 50, 'player');
		this.player.setCollideWorldBounds(true).setScale(0.5);

		this.player.canJump = true;

		this.anims.create({
			key: 'idle',
			frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
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
		this.platforms = this.physics.add.staticGroup();
		this.brickPlatformsSmall = this.physics.add.staticGroup();
		this.brickPlatformsMedium = this.physics.add.staticGroup();
		this.brickPlatformsLarge = this.physics.add.staticGroup();

		this.grounds.create(0, 600, 'ground').setScale(2, 1).setOrigin(0, 1).refreshBody();

		this.brickPlatformsSmall.create(400, 450, 'brickPlatformSmall');
		this.brickPlatformsSmall.create(700, 450, 'brickPlatformSmall');
		this.brickPlatformsLarge.create(400, 300, 'brickPlatformLarge');
		this.brickPlatformsLarge.create(600, 150, 'brickPlatformLarge');

		this.physics.add.collider(this.player, this.grounds);
		this.physics.add.collider(this.player, this.platforms);
		this.physics.add.collider(this.player, this.brickPlatformsSmall);
		this.physics.add.collider(this.player, this.brickPlatformsMedium);
		this.physics.add.collider(this.player, this.brickPlatformsLarge);

		this.physics.world.bounds.width = this.background.width;
		this.physics.world.bounds.height = this.background.height;
		this.cameras.main.setBounds(0, 0, this.background.width, this.background.height);
		this.cameras.main.startFollow(this.player);
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
	}
}
