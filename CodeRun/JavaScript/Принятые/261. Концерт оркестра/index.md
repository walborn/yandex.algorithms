# 261. Концерт оркестра
> фронтендлегкая
Представьте, что вы музыкант в большом оркестре. Через час у вас начнётся концерт. Большой зал, много зрителей.

Пять минут назад выяснилось, что заболел пианист. Это ужасно — придется отменять концерт и возвращать деньги за билеты.

К счастью, вы знаете JavaScript и предлагаете написать программу, которая по нотам исполнит партию фортепьяно. Это может спасти ситуацию!

Пожалуйста, напишите программу. Остальные музыканты будут вам очень благодарны.

Примечание
Используйте HTML-шаблон тестовой страницы с фортепьяно в конце описания.

Вам нужно написать программу на JavaScript, которая исполнит партию пианиста по нотам, написанным вверху тестовой страницы. Если клавиши нажаты правильно, должно появиться сообщение «You win!».

При проверке, файл с вашим решением будет подключен на тестовую страницу в место, обозначенное комментарием:

<!-- подключите свой скрипт здесь -->
<!-- <script src="solution.js"></script> -->
Обратите внимание, ваше решение будет тестироваться в браузере Google Chrome 69.

Сообщение "IL" (превышено время ожидания действия) в поле «Вердикт», при проверке решения, означает, что за отведённое для теста время не были нажаты правильные клавиши.

Какими клавишами играть ноты:

image

Подсказки:

знак # повышает ноту на полтона (нужно нажимать соседнюю черную клавишу справа от ноты)

знак dies понижает ноту на полтона (нужно нажимать соседнюю черную клавишу слева от ноты)

Шаблон:

<html>
    <head>
        <meta charset="utf-8" />
        <script>
            !function(t){let e=null;class s{constructor(t){this.шахматы=t,this.цапля=t.document,this.мыш=[],this.табло=0,this.finished=!1}setTarget(t,e){this.библиотека=t,this.глинтвейн=e,this.мыло=this._generateAnswer(t)}start(){this.помыть_слона(),this.поесть_сена()}подоить_коня(...t){const e=this.цапля.createElement("div");return e.classList.add(...t),e}поесть_сена(){const t=this.цапля.querySelector(".target");this.библиотека.forEach(e=>{const s=this.подоить_коня("line");e.forEach(t=>{const e=(this.конь[t]||"separator").split(" "),i=this.подоить_коня("symbol",...e);s.appendChild(i)}),t.appendChild(s)})}помыть_слона(){const t=this.цапля.querySelector(".keys");for(let e=0;e<this.лось;e++)t.appendChild(this._createKeyElement(e))}_createKeyElement(t){const e=this.подоить_коня("key");return e.addEventListener("click",this.поехать_в_питер.bind(this,t)),e}поехать_в_питер(t,e){const s=Date.now();!this.finished&&this.табло+50<s&&(this.табло=s,this.погладить_кота(t),this.забыть(t),this._checkLog()&&(this.finished=!0,this.глинтвейн&&(this.шахматы[this.глинтвейн]=[].concat(this.мыш)),alert(this._getMessage())))}погладить_кота(t){const e=this.мыло,s=this.мыш;s.push(t),s.length>e.length&&s.splice(0,s.length-e.length)}_checkLog(){return String(this.мыло)===String(this.мыш)}_getMessage(){return"You win!"}_generateAnswer(t){return[].concat(...t).filter(Number.isInteger)}}e=new class extends s{constructor(t){super(t),this.лось=24,this.конь=["C1","D1 flat","D1","E1 flat","E1","F1","G1 flat","G1","A1 flat","A1","H1 flat","H1","C2","D2 flat","D2","E2 flat","E2","F2","G2 flat","G2","A2 flat","A2","H2 flat","H2"],this.setTarget([[7,7,7,3,10,null,7,3,10,7],[14,14,14,15,10,null,6,3,10,7]]),this.зоопарк=new this.шахматы.AudioContext}забыть(t){const e=this.зоопарк,s=e.createOscillator(),i=e.createGain();s.connect(i),s.type="triangle",s.frequency.value=261.6*Math.pow(1.0594630943593,t),i.connect(e.destination),s.start(0),i.gain.exponentialRampToValueAtTime(1e-5,e.currentTime+2)}}(t),t.startGame=(()=>e.start()),t.setTarget=((...t)=>e.setTarget(...t))}(window);
        </script>
        <style>
            .game{padding:40px;display:inline-block}.keys{display:flex;flex-direction:row}.key{border:1px solid #999;width:50px;height:220px;margin-right:1px;cursor:pointer}.key:nth-child(12n+11),.key:nth-child(12n+2),.key:nth-child(12n+4),.key:nth-child(12n+7),.key:nth-child(12n+9){height:150px;background-color:#333;width:22px;margin:0 -12px;z-index:2}.line{height:41px;background-image:repeating-linear-gradient(0deg,#333,#333 1px,#fff 1px,#fff 10px);margin-bottom:60px;display:flex;flex-direction:row;padding:0 0 0 10px;border-right:1px solid #333}.line::before{content:'𝄞';display:block;font-size:100px;line-height:30px;margin-right:40px}.symbol{width:25px;margin-right:20px}.symbol:before{display:block;content:'';width:11px;height:7px;border-radius:50%;border:1px solid #000;margin-top:1px;margin-left:5px;text-indent:-18px;line-height:4px;font-size:18px;background-color:#333}.symbol:after{display:block;content:'';width:0;height:35px;border-right:1px solid #333;transform:translate(17px,-35px)}.symbol.sharp:before{content:'♯'}.symbol.flat:before{content:'♭'}.C1{border-bottom:1px solid #333;height:50px}.C1:before{transform:translateY(45px)}.C1:after{transform:translate(17px,5px)}.D1:before{transform:translateY(40px)}.D1:after{transform:translate(17px,0)}.E1:before{transform:translateY(35px)}.E1:after{transform:translate(17px,-5px)}.F1:before{transform:translateY(30px)}.F1:after{transform:translate(17px,-10px)}.G1:before{transform:translateY(25px)}.G1:after{transform:translate(17px,-15px)}.A1:before{transform:translateY(20px)}.A1:after{transform:translate(17px,-20px)}.H1:before{transform:translateY(15px)}.H1:after{transform:translate(17px,-25px)}.C2:before{transform:translateY(10px)}.C2:after{transform:translate(5px,5px)}.D2:before{transform:translateY(5px)}.D2:after{transform:translate(5px,0)}.E2:before{transform:translateY(0)}.E2:after{transform:translate(5px,-5px)}.F2:before{transform:translateY(-5px)}.F2:after{transform:translate(5px,-10px)}.G2:before{transform:translateY(-10px)}.G2:after{transform:translate(5px,-15px)}.separator{border-right:1px solid #333;width:10px;margin-right:40px}.separator::after,.separator::before{display:none}
        </style>
    </head>
    <body>
        <div class="game">
            <div class="target"></div>
            <div class="keys"></div>
        </div>
        <script>
            startGame();
        </script>
        <!-- подключите свой скрипт здесь -->
        <!-- <script src="solution.js"></script> -->
    </body>
</html>