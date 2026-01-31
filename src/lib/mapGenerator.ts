import * as ROT from 'rot-js'
import { game } from './game.svelte.ts'

export interface MapData {
	map: number[][]
	rooms: ROT.Map.Feature.Room[]
	startPos: { x: number; y: number }
}

export class MapGenerator {
	static generate(): MapData {
		const width = game.width
		const height = game.height

		// 1. Neues 2D-Array initialisieren
		const map: number[][] = Array.from({ length: height }, () =>
			Array(width).fill(1)
		)
		const rooms: ROT.Map.Feature.Room[] = []

		// 2. Digger-Algorithmus (erzeugt Räume und Gänge)
		const digger = new ROT.Map.Digger(width, height, {
			roomWidth: [4, 8],
			roomHeight: [4, 6],
			corridorLength: [2, 10],
			dugPercentage: 0.2
		})

		digger.create((x, y, value) => {
			if (y >= 0 && y < height && x >= 0 && x < width) {
				map[y][x] = value // 0 = Boden, 1 = Wand
			}
		})

		const drawDoor = (x: number, y: number) => {
			// display.draw(x, y, "", "", "red");
			console.log(`display.draw(x: ${x}, y: ${y}, "", "", "red")`)
		}

		// 3. Räume speichern (nützlich für Item-Spawning)
		const allRooms = digger.getRooms()

		for (let i = 0; i < allRooms.length; i++) {
			let room = allRooms[i]
			console.log(
				ROT.Util.format(
					'Room #%s: [%s, %s] => [%s, %s]',
					i + 1,
					room.getLeft(),
					room.getTop(),
					room.getRight(),
					room.getBottom()
				)
			)

			room.getDoors(drawDoor)
		}

		// 4. Startposition finden (Zentrum des ersten Raums)
		const firstRoom = allRooms[0]
		const startPos = {
			x: firstRoom.getCenter()[0],
			y: firstRoom.getCenter()[1]
		}

		return { map, rooms: allRooms, startPos }
	}
}
