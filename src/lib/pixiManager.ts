import * as PIXI from 'pixi.js'

export class PixiManager {
	app: PIXI.Application
	worldContainer: PIXI.Container
	tileGraphics: PIXI.Graphics[][] = []
	playerGraphic: PIXI.Graphics

	constructor(width: number, height: number) {
		this.tileGraphics = Array.from({ length: height }, () =>
			Array(width).fill(null)
		)
		this.app = new PIXI.Application()
		this.worldContainer = new PIXI.Container()
	}

	async init(container: HTMLElement, viewWidth: number, viewHeight: number) {
		await this.app.init({
			width: viewWidth,
			height: viewHeight,
			backgroundColor: 0x000000
		})
		container.appendChild(this.app.canvas)
		this.app.stage.addChild(this.worldContainer)
	}

	createTile(x: number, y: number, isWall: boolean, tileSize: number) {
		// FEHLERBEHEBUNG: Falls die Zeile noch nicht existiert, erstelle sie
		if (!this.tileGraphics[y]) {
			this.tileGraphics[y] = []
		}

		const g = new PIXI.Graphics()

		// Zeichne das Tile
		g.rect(0, 0, tileSize, tileSize)
		g.fill(isWall ? 0x333333 : 0x111111)

		g.x = x * tileSize
		g.y = y * tileSize
		g.visible = false

		this.worldContainer.addChild(g)

		// Jetzt ist sichergestellt, dass tileGraphics[y] existiert
		this.tileGraphics[y][x] = g
	}

	// Innerhalb der Klasse PixiManager
	createPlayer(x: number, y: number, tileSize: number) {
		this.playerGraphic = new PIXI.Graphics()

		// Wir zeichnen einen Kreis als Spieler
		this.playerGraphic.circle(tileSize / 2, tileSize / 2, tileSize / 2.5)
		this.playerGraphic.fill(0x00ffcc) // Cyan

		// Initiale Position
		this.playerGraphic.x = x * tileSize
		this.playerGraphic.y = y * tileSize

		// Wichtig: Dem worldContainer hinzufügen, damit er mit der Kamera mitgeht
		this.worldContainer.addChild(this.playerGraphic)
	}

	updateCamera(
		px: number,
		py: number,
		tileSize: number,
		viewWidth: number,
		viewHeight: number
	) {
		const targetX = viewWidth / 2 - px * tileSize
		const targetY = viewHeight / 2 - py * tileSize
		// Sanfter Lerp
		this.worldContainer.x += (targetX - this.worldContainer.x) * 0.1
		this.worldContainer.y += (targetY - this.worldContainer.y) * 0.1
	}
}
