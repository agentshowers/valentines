export enum HexagonState {
  Empty,
  Filled,
  Hidden,
  Placeable,
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

export enum GameState {
  RollOrBuy,
  TileSelection,
  TilePlacement,
  TileReward,
}

export class Game {
  hexagons: Hexagon[]
  workers: number = 0
  coins: number = 4
  dice: number = 6
  selectedColor?: string
  state: GameState = GameState.RollOrBuy
  rewardAction?: () => void

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
    this.hexagons[index].filled = true
    this.selectedColor = undefined
    this.state = GameState.TileReward
    this.rewardAction = () => {
      console.log('you got a prize!')
    }
  }

  acceptReward() {
    this.rewardAction!()
    this.rewardAction = undefined
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
