import { PHOTOS, VIDEOS } from './memories'

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
  GameOver,
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

export const INDEX_COLORS: Record<number, string> = {
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

const openURL = function (url: string): void {
  const w = window.open(url, '_blank')
  if (w) {
    w.focus()
  }
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

export function loadGame(): Game | undefined {
  try {
    const game = localStorage.getItem('game')
    if (game) {
      const {
        hexagons,
        workers,
        silvers,
        dice,
        selectedColor,
        state,
        reward,
        regionCompleted,
        photosUnlocked,
        videosUnlocked,
        daresCompleted,
        questionsCompleted,
      } = JSON.parse(game)
      return new Game(
        hexagons.map(
          ({ color, filled }: { color: string; filled: boolean }) => new Hexagon(color, filled),
        ),
        workers,
        silvers,
        dice,
        selectedColor,
        state,
        reward,
        regionCompleted,
        photosUnlocked,
        videosUnlocked,
        daresCompleted,
        questionsCompleted,
      )
    }
    return undefined
  } catch (error) {
    console.error('failed loading game', error)
    return undefined
  }
}

export class Game {
  hexagons: Hexagon[]
  workers: number
  silvers: number
  dice: number
  selectedColor?: string
  state: GameState
  reward?: Reward
  regionCompleted: boolean
  photosUnlocked: number
  videosUnlocked: number
  daresCompleted: number
  questionsCompleted: number

  constructor(
    hexagons: Hexagon[],
    workers: number = 2,
    silvers: number = 2,
    dice: number = 6,
    selectedColor: string | undefined = undefined,
    state: GameState = GameState.RollOrBuy,
    reward: Reward | undefined = undefined,
    regionCompleted: boolean = false,
    photosUnlocked: number = 0,
    videosUnlocked: number = 0,
    daresCompleted: number = 0,
    questionsCompleted: number = 0,
  ) {
    this.hexagons = hexagons
    this.workers = workers
    this.silvers = silvers
    this.dice = dice
    this.selectedColor = selectedColor
    this.state = state
    this.reward = reward
    this.regionCompleted = regionCompleted
    this.photosUnlocked = photosUnlocked
    this.videosUnlocked = videosUnlocked
    this.daresCompleted = daresCompleted
    this.questionsCompleted = questionsCompleted
  }

  colorAvailable(color: string): boolean {
    return this.hexagons.some((hex) => hex.color === color && !hex.filled)
  }

  rollDice() {
    this.dice = Math.floor(Math.random() * 6) + 1
    this.state = GameState.TileSelection
  }

  gainWorker() {
    this.workers += 1
    this.state = GameState.RollOrBuy
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
      this.questionsCompleted += 1
    } else if (this.reward === Reward.Silver) {
      this.silvers += 1
      this.daresCompleted += 1
    } else if (this.reward === Reward.Memory) {
      openURL(PHOTOS[this.photosUnlocked])
      this.photosUnlocked += 1
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
    openURL(VIDEOS[this.videosUnlocked])
    this.videosUnlocked += 1
    if (this.videosUnlocked === 5) {
      this.state = GameState.GameOver
    } else {
      this.state = GameState.RollOrBuy
    }
  }

  save() {
    localStorage.setItem('game', JSON.stringify(this))
  }

  static newGame(): Game {
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
      new Hexagon('green'),
      new Hexagon('yellow'),
      new Hexagon('blue'),
      new Hexagon('yellow'),
      new Hexagon('green'),
      new Hexagon('green'),
      new Hexagon('blue'),
      new Hexagon('yellow'),
      new Hexagon('blue'),
      new Hexagon('blue'),
    ])
  }
}
