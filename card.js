class Card {
  matched = false
  hidden = true
  value = null
  domElement = null
  gameInstance = null

  setValue(value) {
    this.value = value
  }

  getValue() {
    return this.value
  }

  setGameInstance(gameInstance) {
    this.gameInstance = gameInstance
  }

  setMatched(matched) {
    this.matched = matched
  }

  getMatched() {
    return this.matched
  }

  isAlreadyMatched() {
    return true === this.matched
  }

  getDomElement() {
    if(null === this.domElement) {
      this.domElement = document.createElement("div")
      this.domElement.classList.add('card')
    }

    this.domElement.addEventListener('click', this.clickEvent.bind(this))

    return this.domElement
  }

  clickEvent() {
    this.gameInstance.clickManager(this)
  }

  show() {
    const newContent = document.createTextNode(this.value)
    this.domElement.appendChild(newContent)
    this.hidden = false
  }

  hide() {
    while (this.domElement.firstChild) {
      this.domElement.removeChild(this.domElement.firstChild)
    }
    this.hidden = true
  }
}