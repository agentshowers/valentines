export enum HexagonState {
  Empty,
  Filled,
  Hidden,
  Placeable,
}

export enum GameState {
  RollOrBuy,
  TileSelection,
  TilePlacement,
  TileReward,
  RegionReward,
}

export enum Reward {
  Silver,
  Workers,
  Memory,
}

const REWARDS: Record<string, Reward> = {
  blue: Reward.Memory,
  yellow: Reward.Silver,
  green: Reward.Workers,
}

const REGIONS: Array<Array<number>> = [
  [0, 1, 3, 4],
  [2, 5, 6, 10],
  [7, 8, 12, 16],
  [9, 13, 14],
  [11, 15, 17, 18],
]

const INDEX_COLORS: Record<number, string> = {
  1: 'yellow',
  2: 'blue',
  3: 'green',
  4: 'yellow',
  5: 'blue',
  6: 'green',
}

const minTransformations = function (roll: number, index: number): number {
  return Math.min(Math.abs(roll - index), 6 - Math.abs(roll - index))
}

export class Hexagon {
  color: string
  filled: boolean

  displayState(selectedColor?: string) {
    if (selectedColor) {
      if (this.filled || this.color !== selectedColor) {
        return HexagonState.Hidden
      } else {
        return HexagonState.Placeable
      }
    }
    if (this.filled) {
      return HexagonState.Filled
    }
    return HexagonState.Empty
  }

  constructor(color: string, filled: boolean = false) {
    this.color = color
    this.filled = filled
  }
}

export class Game {
  hexagons: Hexagon[]
  workers: number = 2
  silvers: number = 4
  dice: number = 6
  selectedColor?: string
  state: GameState = GameState.RollOrBuy
  reward?: Reward
  regionCompleted: boolean = false

  constructor(hexagons: Hexagon[]) {
    this.hexagons = hexagons
  }

  colorAvailable(color: string): boolean {
    return this.hexagons.some((hex) => hex.color === color && !hex.filled)
  }

  rollDice() {
    this.dice = Math.floor(Math.random() * 6) + 1
    console.log('rolled a', this.dice)
    this.state = GameState.TileSelection
  }

  canBuy(color: string): boolean {
    return this.silvers >= 2 && this.colorAvailable(color)
  }

  buyTile(color: string) {
    this.silvers -= 2
    this.selectedColor = color
    this.state = GameState.TilePlacement
  }

  canPick(index: number): boolean {
    const color = INDEX_COLORS[index]
    if (!this.colorAvailable(color)) {
      return false
    }
    return minTransformations(this.dice, index) <= this.workers
  }

  pickTile(index: number) {
    this.selectedColor = INDEX_COLORS[index]
    this.workers -= minTransformations(this.dice, index)
    this.state = GameState.TilePlacement
  }

  placeTile(index: number) {
    const hex = this.hexagons[index]
    hex.filled = true
    this.selectedColor = undefined
    this.state = GameState.TileReward
    this.reward = REWARDS[hex.color]
    const region = REGIONS.find((region) => region.includes(index))
    if (region!.every((i) => this.hexagons[i].filled)) {
      this.regionCompleted = true
    }
  }

  acceptTileReward() {
    if (this.reward === Reward.Workers) {
      this.workers += 2
    } else if (this.reward === Reward.Silver) {
      this.silvers += 1
    } else if (this.reward === Reward.Memory) {
      console.log('Memory reward')
    }
    this.reward = undefined
    if (this.regionCompleted) {
      this.state = GameState.RegionReward
    } else {
      this.state = GameState.RollOrBuy
    }
  }

  acceptRegionReward() {
    this.regionCompleted = false
    this.state = GameState.RollOrBuy
  }

  static newGame() {
    return new Game([
      new Hexagon('blue'),
      new Hexagon('blue'),
      new Hexagon('yellow'),
      new Hexagon('blue'),
      new Hexagon('blue'),
      new Hexagon('yellow'),
      new Hexagon('yellow'),
      new Hexagon('yellow'),
      new Hexagon('yellow'),
      new Hexagon('green', true),
      new Hexagon('yellow'),
      new Hexagon('blue'),
      new Hexagon('yellow'),
      new Hexagon('green', true),
      new Hexagon('green'),
      new Hexagon('blue'),
      new Hexagon('yellow'),
      new Hexagon('blue'),
      new Hexagon('blue'),
    ])
  }
}
