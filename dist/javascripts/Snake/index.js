!function(t,e){if("function"==typeof define&&define.amd)define(["exports"],e);else if("undefined"!=typeof exports)e(exports);else{var i={exports:{}};e(i.exports),t.index=i.exports}}(this,function(t){"use strict";function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),s={bgColor:["#f3f3f3","#dfdfdf"],snakeColor:"#2980b9",barrierColor:"#333",appleColor:"#d71345",appleScore:100,cardinalNumber:10,startCb:null,stopCb:null,pauseBegin:null,pauseEnd:null},r={rows:20,cols:20,size:30,barrier:[],dir:"right",body:[0,1,2,3,4],speed:150},n={normal:{rows:20,cols:20,size:30,mode:{speedUp:{time:2e4,count:5},eatApple:null}},custom:{rows:20,cols:20,size:30,mode:{speedUp:null,eatApple:{cur:0,pass:5,count:5}}},elude:{rows:20,cols:20,size:30,mode:{speedUp:null,eatApple:{cur:0,pass:10,custom:!0}}}},a={left:"right",right:"left",top:"bottom",bottom:"top"},h=function(){function t(i,n){e(this,t),Object.assign(this,s,r,n),this.canvas=document.getElementById(i),this.parent=this.canvas.parentElement,this.cxt=this.canvas.getContext("2d"),this.init()}return i(t,[{key:"init",value:function(){this.isAnimate=!1,this.isPlaying=!1,this.custom=1,this.score=0,this.events=[],this.createStaticCanvas(),this.createStat(),this.setSize(),this.getMaps(),this.bindEvent(),this.render()}},{key:"createStaticCanvas",value:function(){this.static_canvas=document.createElement("canvas"),this.static_cxt=this.static_canvas.getContext("2d"),this.canvas.style.cssText="\n            position: relative;\n            z-index: 1;\n        ",this.static_canvas.style.cssText="\n            position: absolute;\n            left: 0;\n            top: 0;\n        ",this.parent.style.position="relative",this.parent.appendChild(this.static_canvas)}},{key:"createStat",value:function(){var t=this;this.stat=document.createElement("DIV"),this.speedBlock=document.createElement("DIV"),this.scoreBlock=document.createElement("DIV"),this.stat.style.cssText="\n            position: absolute;\n            right: 0;\n            bottom: 100%;\n            font-size: 16px;\n        ",this.observer("speed",function(e){return t.speedBlock.textContent="速度："+e+"ms/格"}),this.observer("score",function(e){return t.scoreBlock.textContent="得分："+e}),this.stat.appendChild(this.speedBlock),this.stat.appendChild(this.scoreBlock),this.parent.appendChild(this.stat)}},{key:"observer",value:function(t,e){var i=this[t];Object.defineProperty(this,t,{get:function(){return i},set:function(t){e(t),i=t},enumerable:!0,configurable:!0})}},{key:"setSize",value:function(){this.width=this.cols*this.size,this.height=this.rows*this.size,this.canvas.width=this.width,this.canvas.height=this.height,this.static_canvas.width=this.width,this.static_canvas.height=this.height}},{key:"getMaps",value:function(){this.maps={top:-this.cols,bottom:this.cols,left:-1,right:1}}},{key:"bindEvent",value:function(){document.addEventListener("keydown",this.getKeyCode.bind(this))}},{key:"getKeyCode",value:function(t){var e=this;switch(t.keyCode){case 87:case 38:this.events.push(function(){return e.setDir("top")});break;case 65:case 37:this.events.push(function(){return e.setDir("left")});break;case 39:case 68:this.events.push(function(){return e.setDir("right")});break;case 40:case 83:this.events.push(function(){return e.setDir("bottom")});break;case 32:return this.switchGameStatus();default:return!1}}},{key:"execQueue",value:function(){this.events.length&&this.events.shift()()}},{key:"start",value:function(t){Object.assign(this,r,n[t]),this.dir="right",this.barrier=[],this.events=[],"elude"===t&&this.createBarrier(),this.score="elude"===t?(this.custom-1)*this.mode.eatApple.pass*this.appleScore:0,this.startCb&&this.startCb(),this.gameRest(),this.gameTime=0,this.gameStart()}},{key:"createBarrier",value:function(){for(var t=0;t<this.custom*this.cardinalNumber;t++){for(var e=this.body[0];e<=this.cols;)e=this.getRandom();this.barrier.push(e)}}},{key:"gameRest",value:function(){this.setSize(),this.getMaps(),this.renderBg(),this.renderBarrier(),this.renderGrid(),this.addApple()}},{key:"gameStart",value:function(){var t=this;this.isAnimate=!0;var e=function i(){setTimeout(function(){return!!t.isAnimate&&(t.gameTime+=t.speed,t.mode.speedUp&&t.gameTime>=t.mode.speedUp.time&&(t.gameTime=0,t.speed-=t.mode.speedUp.count),t.cxt.clearRect(0,0,t.width,t.height),t.execQueue(),t.update(),t.render(),void i())},t.speed)};e()}},{key:"stop",value:function(){this.stopCb&&this.stopCb(),this.isAnimate=!1}},{key:"switchGameStatus",value:function(){return!!this.isPlaying&&void(this.isAnimate?(this.pauseBegin&&this.pauseBegin(),this.isAnimate=!1):(this.pauseEnd&&this.pauseEnd(),this.gameStart()))}},{key:"gameover",value:function(){this.stop(),this.render()}},{key:"render",value:function(){this.renderSnake(),this.renderApple()}},{key:"renderBarrier",value:function(){var t=this;this.static_cxt.fillStyle=this.barrierColor,Array.from(this.barrier,function(e,i){var s=t.getCoord(e),r=s.x,n=s.y;t.static_cxt.fillRect(r*t.size,n*t.size,t.size,t.size)})}},{key:"renderSnake",value:function(){var t=this;this.cxt.fillStyle=this.snakeColor,Array.from(this.body,function(e,i){var s=t.getCoord(e),r=s.x,n=s.y;t.cxt.fillRect(r*t.size,n*t.size,t.size,t.size)})}},{key:"renderGrid",value:function(){this.static_cxt.strokeStyle="#ccc",this.static_cxt.lineWidth=1;for(var t=0;t<this.rows;t++)this.static_cxt.moveTo(t*this.size,0),this.static_cxt.lineTo(t*this.size,this.rows*this.size),this.static_cxt.stroke();for(var e=0;e<this.cols;e++)this.static_cxt.moveTo(0,e*this.size),this.static_cxt.lineTo(this.cols*this.size,e*this.size),this.static_cxt.stroke()}},{key:"renderBg",value:function(){for(var t=0;t<this.rows;t++)for(var e=0;e<this.cols;e++)this.static_cxt.fillStyle=(t+e)%2===0?this.bgColor[0]:this.bgColor[1],this.static_cxt.fillRect(t*this.size,e*this.size,this.width,this.height)}},{key:"renderApple",value:function(){if(this.apple){var t=this.getCoord(this.apple),e=t.x,i=t.y;this.cxt.fillStyle=this.appleColor,this.cxt.beginPath(),this.cxt.arc(e*this.size+this.size/2,i*this.size+this.size/2,this.size/2,0,2*Math.PI,!0),this.cxt.closePath(),this.cxt.fill()}else this.addApple(),this.renderApple()}},{key:"getCoord",value:function(t){return{x:t%this.cols,y:~~(t/this.cols)}}},{key:"setDir",value:function(t){return t!==this.dir&&t!==a[this.dir]&&void(this.dir=t)}},{key:"isFailed",value:function(t){var e=this.getCoord(t),i=e.x,s=e.y;return 0===i&&"left"===this.dir?(this.gameover(),!0):i===this.cols-1&&"right"===this.dir?(this.gameover(),!0):0===s&&"top"===this.dir?(this.gameover(),!0):s===this.rows-1&&"bottom"===this.dir?(this.gameover(),!0):void 0}},{key:"getSelfDir",value:function(t,e){var i=e-t;for(var s in this.maps)if(i===this.maps[s])return s}},{key:"update",value:function(){var t=this,e=this.body,i=this.barrier,s=e[e.length-1],r=e[0],n=s+this.maps[this.dir];if(this.isFailed(s)||e.indexOf(n)>-1||i.indexOf(n)>-1)return this.gameover();if(this.body=Array.from(this.body,function(i,s){return s===e.length-1?n:i+t.maps[t.getSelfDir(i,e[s+1])]}),n===this.apple&&(this.apple=null,this.score+=this.appleScore,this.body.unshift(r),this.mode.eatApple&&(this.mode.eatApple.cur++,this.mode.eatApple.cur===this.mode.eatApple.pass))){if(this.mode.eatApple.cur=0,this.mode.eatApple.custom)return this.custom++,this.gameover(),setTimeout(function(){return alert("你通关了，继续玩躲避模式进行下一关")}),!1;this.speed-=this.mode.eatApple.count}}},{key:"getRandom",value:function(){return~~(Math.random()*this.cols*this.rows)}},{key:"addApple",value:function(){for(var t=this.getRandom();this.body.indexOf(t)>-1||this.barrier.indexOf(t)>-1;)t=this.getRandom();this.apple=t}}]),t}();t["default"]=h});