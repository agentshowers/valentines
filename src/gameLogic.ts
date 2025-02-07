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
  Coin,
  Workers,
  Memory,
}

const REWARDS: Record<string, Reward> = {
  blue: Reward.Memory,
  yellow: Reward.Coin,
  green: Reward.Workers,
}

const REGIONS: Array<Array<number>> = [
  [0, 1, 3, 4],
  [2, 5, 6, 10],
  [7, 8, 12, 16],
  [9, 13, 14],
  [11, 15, 17, 18],
]

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
  workers: number = 0
  coins: number = 4
  dice: number = 6
  selectedColor?: string
  state: GameState = GameState.RollOrBuy
  reward?: Reward
  regionCompleted: boolean = false

  constructor(hexagons: Hexagon[]) {
    this.hexagons = hexagons
  }

  canBuy(color: string): boolean {
    return (
      this.coins >= 2 &&
      this.hexagons.filter((hex) => hex.color === color && !hex.filled).length > 0
    )
  }

  buyTile(color: string) {
    this.coins -= 2
    this.selectedColor = color
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
    } else if (this.reward === Reward.Coin) {
      this.coins += 1
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
