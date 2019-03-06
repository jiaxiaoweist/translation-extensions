
let fromSelect = document.querySelector('#from')
let toSelect = document.querySelector('#to')

chrome.storage.sync.get(['sl', 'tl'], function(result) {
  console.log(result)
  if(result.sl) {
  	fromSelect.value = result.sl.value
  }
  if(result.tl) {
  	toSelect.value = result.tl.value
  }
})


      


fromSelect.onchange = function() {
	console.log(this.value)
	let key = this.selectedOptions[0].getAttribute('data-key')
	chrome.storage.sync.set({'sl': {key: key, value: this.value}})
}

toSelect.onchange = function() {
	console.log(this.value)
	let key = this.selectedOptions[0].getAttribute('data-key')
	chrome.storage.sync.set({'tl': {key: key, value: this.value}})
}