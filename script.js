let numbers = document.getElementsByClassName(`number`)
let youParagraph = document.getElementById(`youParagraph`)
let taxmanParagraph = document.getElementById(`taxmanParagraph`)
let messageParagraph = document.getElementById(`messageParagraph`)

let yourTotal = 0
let taxmanTotal = 0

for (let number of numbers) {
  number.addEventListener(`click`, clickNumber)
}

function clickNumber() {
  if (!this.classList.contains(`noFactor`) &&
      !this.classList.contains(`you`) &&
      !this.classList.contains(`taxman`)) {
    this.classList.add(`you`)

    let selectedValue = Number(this.innerHTML) 
    yourTotal += selectedValue
    youParagraph.innerHTML = `You: ${yourTotal}`

    addTaxmanTotal(selectedValue)
    disableNoFactors()
    checkGameOver()
  }
}

function addTaxmanTotal(selectedValue) {
  for (let number of numbers) {
    let numberValue = Number(number.innerHTML)

    if (!number.classList.contains(`you`) &&
        !number.classList.contains(`taxman`) &&
        selectedValue % numberValue == 0) {
      number.classList.add(`taxman`)

      taxmanTotal += numberValue
      taxmanParagraph.innerHTML = `Taxman: ${taxmanTotal}`
    }
  }
}

function disableNoFactors() {
  for (let number of numbers) {
    if (!hasFactor(number)) {
      number.classList.add(`noFactor`)
    }
  }
}

function hasFactor(number) {
  let numberValue = Number(number.innerHTML)

  for (let otherNumber of numbers) {
    let otherNumberValue = Number(otherNumber.innerHTML)

    if (otherNumber != number &&
        !otherNumber.classList.contains(`you`) &&
        !otherNumber.classList.contains(`taxman`) &&
        numberValue % otherNumberValue == 0) {
      return true
    }
  }

  return false
}

function checkGameOver() {
  if (isGameOver()) {
    addTaxmanGameOver()

    if (yourTotal > taxmanTotal) {
      messageParagraph.innerHTML = `You win`
    }
    else if (taxmanTotal > yourTotal) {
      messageParagraph.innerHTML = `Taxman wins`
    }
    else {
      messageParagraph.innerHTML = `Tie game`
    }
  }
}

function isGameOver() {
  for (let number of numbers) {
    if (!number.classList.contains(`noFactor`) &&
        !number.classList.contains(`you`) &&
        !number.classList.contains(`taxman`)) {
      return false
    }
  }

  return true
}

function addTaxmanGameOver() {
  for (let number of numbers) {
    if (!number.classList.contains(`you`) &&
        !number.classList.contains(`taxman`)) {
      number.classList.add(`taxman`)
      taxmanTotal += Number(number.innerHTML)  
    }
  }

  taxmanParagraph.innerHTML = `Taxman: ${taxmanTotal}`
}