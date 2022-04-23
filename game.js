class Game {
  firstCard = null
  secondCard = null 
  score = 0
  cardList = []
  cardsEntities = []
  domContainer = null
  cardOnAxisX = 8
  cardOnAxisY = 3
  pointsForMatch = 100
  pointsForMiss = -5
  scoreManager = null
  messageManager = null
  gameIsOver = false

  start() {
    const cardValues = this.generateCardValues(this.cardOnAxisX, this.cardOnAxisY)
    this.cardsEntities = this.generateCardList(this.cardOnAxisX, this.cardOnAxisY, cardValues)
    this.domContainer = document.getElementById('container')
    this.renderCards()
    this.scoreManager = new Score()
    this.messageManager = new Message()
    console.log(this)
  }

  generateCardValues(boardWidth, boardHeight) {
    let cardValues = []
    const totalValues = (boardWidth * boardHeight) / 2
    for(let i = 0; i < totalValues; i++) {
      cardValues.push(i)
      cardValues.push(i)
    }

    return cardValues
  }

  generateCardList(boardWidth, boardHeight, cardValues) {
    let cards = []
    for(let x = 0; x < boardWidth; x++) { 
      for(let y = 0; y < boardHeight; y++) { 
        let card = new Card()
        card.setValue(this.extractRandomCardValue(cardValues))
        card.setGameInstance(this)
        cards.push(card)
      }
    }

    return cards
  }

  extractRandomCardValue(cardValues) {
    let cardValue
    let randomIndex = Math.floor(Math.random()*cardValues.length)
    const randomValue = cardValues[randomIndex]
    cardValues.splice(randomIndex,1)

    return randomValue
  }

  clickManager(card) {

    if(this.gameIsOver) {
      this.messageManager.updateMessage('This game ended. Refresh for a new game')
    } else if(card.isAlreadyMatched()) {
      this.messageManager.updateMessage('Card already matched')
    } else if (null === this.firstCard) {
      this.firstCard = card 
      card.show()
    } else if (card == this.firstCard) {
      // this.firstCard = null
      // card.hide()
      this.messageManager.updateMessage('This is the first card, click another')
    } else if (null === this.secondCard) {
      this.secondCard = card
      card.show()

      if (this.firstCard.getValue() == this.secondCard.getValue()) {
        this.firstCard.setMatched(true)
        this.secondCard.setMatched(true)
        this.firstCard = null
        this.secondCard = null
        this.cardsLeft-= 2
        this.score += this.pointsForMatch
        const cardLeft = this.calculateCardLeft()
        
        this.messageManager.updateMessage('You matched!')

        if(0 == cardLeft) {
          this.gameIsOver = true
          this.messageManager.updateMessage('You matched all couples, gameover')
        }
      } else { // starting to pick another pair 
        this.score += this.pointsForMiss
        this.messageManager.updateMessage('You miss!')

        setTimeout(() => {
          this.firstCard.hide()
          this.secondCard.hide()
          this.firstCard = null
          this.secondCard = null
          this.messageManager.updateMessage('Please make the selection')
        }, 1000)
      } 
    } else {
      this.messageManager.updateMessage('Hey wait a moment!!')
    }

    this.scoreManager.updateScore(this.score)
  }

  calculateCardLeft() {
    return this.cardsEntities.reduce((reducer, card) => {
      if(!card.isAlreadyMatched()) {
        reducer++
      }

      return reducer
    }, 0)
  }

  renderCards() {
    this.cardsEntities.forEach(cardEntity => {
      this.domContainer.appendChild(cardEntity.getDomElement())
    })
  }
}