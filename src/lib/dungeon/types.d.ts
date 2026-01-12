export interface DungeonMap {
	map?: (string[] | null)[] | null
	rooms?: Room[] | null
	freeCells?: string[] | null
	items?: string[] | null
	enemys?: string[] | null
	position: Position
}
export interface Room {
	x1: number
	y1: number
	x2: number
	y2: number
	doors?: Position[] | null
	centerX: number
	centerY: number
	roomId: number
}
export interface Position {
	x: number
	y: number
}
export interface Config {
	width: number
	height: number
	type: string
	options: Options
}
export interface Options {
	roomWidth: [number, number] /* room minimum and maximum width */
	roomHeight: [number, number] /* room minimum and maximum height */
	roomDugPercentage: number /* we stop after this percentage of level area has been dug out by rooms */
	timeLimit: number /* we stop after this much time has passed (msec) */
}
