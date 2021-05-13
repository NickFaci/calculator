const callback = (res) => {
  document.getElementById("messageTitle").innerHTML = res.success ? "OK" : "ERROR"
  document.getElementById("messageBody").innerHTML = res.message
}

const init = () => {
  let numbers = Array.prototype.map.call(document.getElementsByClassName("numberInput"), (input) => input.value)

  const xhr = new XMLHttpRequest()
  const url = "/init"
  xhr.open("POST", url, true)
  xhr.setRequestHeader("Content-Type", "application/json")
  xhr.responseType = 'json';
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      callback(xhr.response)
    }
  }
  var data = JSON.stringify({
    pin: document.getElementById("pin").value,
    numbers
  })
  xhr.send(data)
}

const play = () => {
  const xhr = new XMLHttpRequest()
  const url = "/play"
  xhr.open("POST", url, true)
  xhr.responseType = 'json';
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      callback(xhr.response)
    }
  }
  xhr.send()
}

const stop = () => {
  const xhr = new XMLHttpRequest()
  const url = "/stop"
  xhr.open("POST", url, true)
  xhr.responseType = 'json';
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      callback(xhr.response)
    }
  }
  xhr.send()
}

const addNumberInput = (value) => {
  document.getElementById("numbersContainer").innerHTML += 
    "<input class='numberInput' "
    + (value ? "value='" + value + "'" : "placeholder='Matricola'") 
    + "/><br>"
}

const onload = () => {
  const xhr = new XMLHttpRequest()
  const url = "/getDefaultNumbers"
  xhr.open("GET", url, true)
  xhr.responseType = 'json';
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (!xhr.response.success) {
        return callback(xhr.response)
      }

      for (let n of xhr.response.message.numbers) {
        addNumberInput(n);
      }
    }
  }
  xhr.send()

  checkBotIsRunning()
  setInterval(checkBotIsRunning, 5000)
}

const checkBotIsRunning = () => {
  const xhr = new XMLHttpRequest()
  const url = "/isBotRunning"
  xhr.open("GET", url, true)
  xhr.responseType = 'json';
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      document.getElementById("botRunningMessage").innerHTML = 
        `Answering bot is ${(xhr.response.message.running ? `` : `not`)} running`
    }
  }
  xhr.send()
}
