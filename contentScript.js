function Panel() {
    this.create();
    this.bind()
}
Panel.prototype.create = function () {
    let html = `
        <div class="_panel_header">谷歌翻译<span class="close">X</span></div>
        <div class="_panel_main">
            <div class="source">
                <div class="title">英语</div>
                <div class="content"></div>
            </div>
            <div class="dest">
                <div class="title">简体中文</div>
                <div class="content">...</div>
            </div>
        </div>`;
    let container = document.createElement('div');
    container.innerHTML = html;
    container.classList.add('_panel');
    document.body.appendChild(container);

    this.container = container

};
Panel.prototype.bind = function () {
    this.container.querySelector('.close').onclick =  () => {
        this.container.classList.remove('show')
    };
};



Panel.prototype.translate = function(raw, pos) {
  if(pos) {
    this.setPos(pos)
  }

  let slValue = 'en'
  let tlValue = 'zh-CN'

  this.container.querySelector('.source .content').innerText = raw;
  chrome.storage.sync.get(['sl', 'tl'], (result)=> {
    console.log(this.container.querySelector('.source .title'));
    console.log(result.sl,result.tl);
    if(result.sl) {
      slValue = result.sl.value;
      console.log(result.sl.key);
      this.container.querySelector('.source .title').innerText = result.sl.key
    }
    if(result.tl) {
      tlValue = result.tl.value
      this.container.querySelector('.dest .title').innerText = result.tl.key
    }
    fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${slValue}&tl=${tlValue}&dt=t&q=${raw}`)
    .then(res => res.json())
    .then(result => {
      this.container.querySelector('.dest .content').innerText = result[0][0][0]
    })
  });
  this.container.classList.add('show')


};


Panel.prototype.setPos = function (pos) {
    this.container.style.top = pos.y + 'px';
    this.container.style.left = pos.x + 'px';
};

let panel = new Panel();


let panelSwitch = 'off';

chrome.storage.sync.get(['switch'], function(result) {
    console.log('Value currently is ' + result.switch);
    if(result.switch) {
        panelSwitch = result.switch
    }
  })





document.onclick = function (e) {
    var selectStr = window.getSelection().toString().trim();
    if (selectStr === '') return;
    if(panelSwitch === 'off') return;
    panel.translate(selectStr,{x:e.clientX,y:e.clientY});
};