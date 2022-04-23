class Score {
  domElement = null

  constructor() {
    this.domElement = document.getElementById('score')
    this.updateScore(0)
  }

  updateScore(score) {
    this.emptyDomElement()
    const newContent = document.createTextNode(score)
    this.domElement.appendChild(newContent)
  }

  emptyDomElement() {
    while (this.domElement.firstChild) {
      this.domElement.removeChild(this.domElement.firstChild)
    }
    this.hidden = true
  }
}