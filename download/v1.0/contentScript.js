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

Panel.prototype.translate = function (raw,pos) {
    if(pos){
        this.setPos(pos)
    }
    this.container.classList.add('show');
    this.container.querySelector('.source .content').innerText = raw;
    fetch(`https://translate.googleapis.com/translate_a/single?
client=gtx&sl=en&tl=zh&dt=t&q=${raw}`)
        .then(res => res.json())
        .then(result => {
            this.container.querySelector('.dest .content').innerText = result[0][0][0];
        })
};
Panel.prototype.setPos = function (pos) {
    this.container.style.top = pos.y + 'px';
    this.container.style.left = pos.x + 'px';
};
let panel = new Panel();



document.onclick = function (e) {
    var selectStr = window.getSelection().toString().trim();
    if (selectStr === '') return;
    panel.translate(selectStr,{x:e.clientX,y:e.clientY});
};