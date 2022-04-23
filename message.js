class Message {
  domElement = null

  constructor() {
    this.domElement = document.getElementById('message')
    this.updateMessage('The game has started!')
  }

  updateMessage(message) {
    this.emptyDomElement()
    const newContent = document.createTextNode(message)
    this.domElement.appendChild(newContent)
  }

  emptyDomElement() {
    while (this.domElement.firstChild) {
      this.domElement.removeChild(this.domElement.firstChild)
    }
    this.hidden = true
  }
}