
let select = document.querySelector('#select');

chrome.storage.sync.get(['switch'], function(result) {
    if(result.switch) {
        select.value = result.switch
    }
});


select.onchange = function() {
    chrome.storage.sync.set({'switch': this.value});
    chrome.tabs.query({active: true, currentWindow: true}, (tabs)=> {
        chrome.tabs.sendMessage(tabs[0].id, { switch: this.value}, function(response) {

        })
    })
};