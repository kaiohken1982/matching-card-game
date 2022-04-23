class App {
  game = null

  constructor() {
    this.game = new Game()
  }

  bootstrap() {
    this.game.start()
  }
}

const app = new App()
app.bootstrap()