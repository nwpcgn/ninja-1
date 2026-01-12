import * as ROT from 'rot-js'
import { symbols, parseKey, getKey } from './atlas'
const noreplace = ['.', '/', '+', 'S', '?', 'M']
function getDungeonMap(
	width = 40,
	height = 20,
	type = 'Uniform',
	options = {}
) {
	const digger = new ROT.Map[type](width, height, options)
	const map: string[][] = Array.from({ length: height }, () =>
		Array(width).fill(' ')
	)
	const rooms: string[][] = Array.from({ length: height }, () =>
		Array(width).fill(0)
	)
	const freeCells = []
	const zeroCells = []
	// const randIndex = (arr) => Math.floor(ROT.RNG.getUniform() * arr.length)
	const digCallback = (x, y, value) => {
		map[y][x] = value ? symbols.blank : symbols.floor
		const key = getKey(x, y)

		if (!value) {
			freeCells.push(key)
		} else {
			zeroCells.push(key)
		}
	}
	const roomCallback = () => {
		const rs = digger.getRooms()
		rs.forEach((room, roomId) => {
			for (let y = room._y1; y <= room._y2; y++) {
				for (let x = room._x1; x <= room._x2; x++) {
					rooms[y][x] = roomId + 1
				}
			}

			const l = room.getLeft() - 1
			const r = room.getRight() + 1
			const t = room.getTop() - 1
			const b = room.getBottom() + 1
			map[t][l] = symbols.wall
			map[t][r] = symbols.wall
			map[b][l] = symbols.wall
			map[b][r] = symbols.wall
			for (let x = l + 1; x < r; x++) {
				if (!noreplace.includes(map[t][x])) {
					map[t][x] = symbols.wall
				}
				if (!noreplace.includes(map[b][x])) {
					map[b][x] = symbols.wall
				}
			}
			for (let y = t + 1; y < b; y++) {
				if (!noreplace.includes(map[y][l])) map[y][l] = symbols.wall
				if (!noreplace.includes(map[y][r])) map[y][r] = symbols.wall
			}
			const doors = Object.keys(room._doors).map((key) => {
				const [x, y] = parseKey(key)
				map[y][x] = symbols.door
				rooms[y][x] = roomId + 1
				return { x, y }
			})

			// const [centerX, centerY] = room.getCenter()
			// delete room._doors
			// const roomObj = { ...room, centerX, centerY, roomId, doors }
			// rooms.push(roomObj)

			// ADD WALLS AROUND ROOM
			// addRoomWalls(roomObj)
		})
	}
	// -------------------------
	// START PROCEDURE
	// -------------------------
	digger.create(digCallback)
	roomCallback()

	return { map, rooms, freeCells, zeroCells }
}

export default getDungeonMap
