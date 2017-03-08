'use strict'

//  默认配置
const _default = {
    bgColor: ['#f3f3f3', '#dfdfdf'],
    snakeColor: '#2980b9',  //  蛇颜色
    barrierColor: '#333',   //  障碍物颜色
    appleColor: '#d71345',  //  果子颜色
    cardinalNumber: 10,     //  躲避模式障碍物数量基数
    startCb: null,          //  游戏开始回调
    stopCb: null,           //  游戏结束回调
    pauseBegin: null,       //  游戏暂停回调
    pauseEnd: null          //  游戏继续回调
}

//  初始化游戏数据
const _init = {
    rows: 20, //  行数
    cols: 20, //  列数
    size: 30, //  每一块的大小
    barrier: [],  //  障碍物数组
    dir: 'right',  //  起始方向
    body: [0, 1, 2, 3, 4],  // 起始蛇身
    speed: 150   //  默认起始速度{毫秒}
}

//  关卡配置对象
const _mode = {
    normal: {
        rows: 20,
        cols: 20,
        size: 30,
        mode: {
            speedUp: {        //  多久后加速
                time: 20000,  //  20秒加速一次
                count: 5      //  一次快5毫秒
            },
            eatApple: null
        }
    },
    custom: {
        rows: 30,
        cols: 30,
        size: 20,
        mode: {
            speedUp: null,
            eatApple: {
                cur: 0,    //  当前吃了几个
                pass: 5,   //  吃五个苹果加一级
                count: 5   //  一级快5毫秒
            }
        }
    },
    elude: {
        rows: 25,
        cols: 25,
        size: 24,
        mode: {
            speedUp: null,
            eatApple: {
                cur: 0,       //  当前吃了几个
                pass: 10,     //  吃十个苹果进入下一关
                custom: true  //  关卡模式
            }
        }
    }
}

//  对立方向对象
const dirMap = {
    left: 'right',
    right: 'left',
    top: 'bottom',
    bottom: 'top'
}

export default class Snake {
    constructor(id, option) {
        Object.assign(this, _default, _init, option)
        this.canvas = document.getElementById(id)
        this.cxt = this.canvas.getContext('2d')
        this.init()
    }
    //  游戏初始化
    init() {
        this.isAnimate = false  //  是否游戏中
        this.isPlaying = false  //  是否已经开始游戏（就算暂停也是true）
        this.custom = 1     //  当前关卡，躲避模式用的
        this.events = []    //  事件队列，避免玩家手速过快，蛇皮没移动就被下一个动作覆盖
        this.createStaticCanvas()
        this.createStat()
        this.setSize()
        this.getMaps()
        this.bindEvent()
        this.render()
    }
    //  生成一个静态的canvas【放背景，格子等的静态画布】
    createStaticCanvas() {
        this.static_canvas = document.createElement('canvas')
        this.static_cxt = this.static_canvas.getContext('2d')

        this.canvas.style.cssText = `
            position: relative;
            z-index: 1;
        `
        this.static_canvas.style.cssText = `
            position: absolute;
            left: 0;
            top: 0;
        `

        let parent = this.canvas.parentElement
        parent.style.position = 'relative'
        parent.appendChild(this.static_canvas)
    }
    //  生成右上角数据展示 （监听速度，长度等）
    createStat() {
        this.stat = document.createElement('DIV')
        this.stat.style.cssText = `
            position: absolute;
            right: 0;
            top: -20px;
            font-size: 16px;
        `
        this.observer('speed', (val) => this.stat.textContent = `速度：${val}`)
        let parent = this.canvas.parentElement
        parent.appendChild(this.stat)
    }
    //  监听数据变化
    observer(key, cb) {
        let val = this[key]
        console.log(val)
		Object.defineProperty(this, key, {
			get: () => {
				return val
			},
			set: (newValue) => {
				cb(newValue)
				val = newValue
			},
			enumerable: true,
			configurable: true
		})
    }
    //  初始化尺寸
    setSize() {
        this.width = this.cols * this.size
        this.height = this.rows * this.size
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.static_canvas.width = this.width
        this.static_canvas.height = this.height
    }
    //  获得方向对应的数值 (我在你下面，那我的索引就比你多this.cols，在你右边那就是1)
    getMaps() {
        this.maps = {
            top: -this.cols,
            bottom: this.cols,
            left: -1,
            right: 1
        }
    }
    //  绑定事件
    bindEvent() {
        document.addEventListener('keydown', this.getKeyCode.bind(this))
    }
    //  获得键盘操作
    getKeyCode(e) {
        switch (e.keyCode) {
            case 87:
            case 38:
                this.events.push(() => this.setDir('top'))
                break
            case 65:
            case 37:
                this.events.push(() => this.setDir('left'))
                break
            case 39:
            case 68:
                this.events.push(() => this.setDir('right'))
                break
            case 40:
            case 83:
                this.events.push(() => this.setDir('bottom'))
                break
            case 32:
                return this.switchGameStatus()
                break
            default:
                return false
        }
    }
    //  执行队列中的事件
    execQueue() {
        if (this.events.length) {
            (this.events.shift())()
        }
    }
    //  游戏开始
    start(mode) {
        Object.assign(this, _init, _mode[mode])
        this.dir = 'right'
        this.barrier = []
        this.events = []
        mode === 'elude' && this.createBarrier()
        this.startCb && this.startCb()
        this.gameRest()
        this.gameTime = 0
        this.gameStart()
    }
    //  生成障碍物 （关卡决定数量）
    createBarrier() {
        for (let i = 0; i < (this.custom * this.cardinalNumber); i++) {
            let barrier = this.body[0]
            //  随机到非第一行的地方
            while (barrier <= this.cols) {
                barrier = this.getRandom()
            }
            this.barrier.push(barrier)
        }
    }
    //  游戏重置
    gameRest() {
        this.setSize()
        this.getMaps()
        this.renderBg()
        this.renderBarrier()
        this.renderGrid()
        this.addApple()
    }
    //  开始渲染
    gameStart() {
        this.isAnimate = true

        const timer = () => {
            setTimeout(() => {
                if (!this.isAnimate) {
                    return false
                }
                this.gameTime += this.speed
                if (this.mode.speedUp && this.gameTime >= this.mode.speedUp.time) {
                    this.gameTime = 0
                    this.speed -= this.mode.speedUp.count
                }
                this.cxt.clearRect(0, 0, this.width, this.height)
                this.execQueue()
                this.update()
                this.render()
                timer()
            }, this.speed)
        }
        timer()
    }
    //  暂停游戏
    stop() {
        this.stopCb && this.stopCb()
        this.isAnimate = false
    }
    //  暂停/开始游戏
    switchGameStatus() {
        if (!this.isPlaying) {
            return false
        }

        if (this.isAnimate) {
            this.pauseBegin && this.pauseBegin()
            this.isAnimate = false
        }
        else {
            this.pauseEnd && this.pauseEnd()
            this.gameStart()
        }
    }
    //  游戏结束
    gameover() {
        this.stop()
        this.render()
    }
    //  渲染
    render() {
        this.renderSnake()
        this.renderApple()
    }
    //  画障碍物
    renderBarrier() {
        this.static_cxt.fillStyle = this.barrierColor
        Array.from(this.barrier, (pos, i) => {
            let { x, y } = this.getCoord(pos)
            this.static_cxt.fillRect(x * this.size, y * this.size, this.size, this.size)
        })
    }
    //  画条蛇
    renderSnake() {
        this.cxt.fillStyle = this.snakeColor
        Array.from(this.body, (pos, i) => {
            let { x, y } = this.getCoord(pos)
            this.cxt.fillRect(x * this.size, y * this.size, this.size, this.size)
        })
    }
    //  画格子
    renderGrid() {
        this.static_cxt.strokeStyle = '#ccc'
        this.static_cxt.lineWidth = 1
        for (let x = 0; x < this.rows; x++) {
            this.static_cxt.moveTo(x * this.size, 0)
            this.static_cxt.lineTo(x * this.size, this.rows * this.size)
            this.static_cxt.stroke()
        }
        for (let y = 0; y < this.cols; y++) {
            this.static_cxt.moveTo(0, y * this.size)
            this.static_cxt.lineTo(this.cols * this.size, y * this.size)
            this.static_cxt.stroke()
        }
    }
    //  画背景
    renderBg() {
        for (let x = 0; x < this.rows; x++) {
            for (let y = 0; y < this.cols; y++) {
                this.static_cxt.fillStyle = (x + y)%2 === 0 ? this.bgColor[0] : this.bgColor[1]
                this.static_cxt.fillRect(x * this.size, y * this.size, this.width, this.height)
            }
        }
    }
    //  画个苹果
    renderApple() {
        if (this.apple) {
            let { x, y } = this.getCoord(this.apple)
            this.cxt.fillStyle = this.appleColor

            this.cxt.beginPath()
            this.cxt.arc(x * this.size + this.size / 2, y * this.size + this.size / 2, this.size / 2, 0, 2 * Math.PI, true)
            this.cxt.closePath()

            this.cxt.fill()
        }
    }
    //  根据索引获得坐标
    getCoord(index) {
        return {
            x: index % this.cols,
            y: ~~(index / this.cols)
        }
    }
    //  设置方向
    setDir(dir) {
        //  同方向或者相反方向就算了
        if (dir === this.dir || dir === dirMap[this.dir]) {
            return false
        }
        this.dir = dir
    }
    //  是不是出界了
    isFailed(index) {
        let { x, y } = this.getCoord(index)
        //  靠左边且左转就gameover了，下面三个同理
        if (x === 0 && this.dir === 'left') {
            this.gameover()
            return true
        }
        if (x === (this.cols - 1) && this.dir === 'right') {
            this.gameover()
            return true
        }
        if (y === 0 && this.dir === 'top') {
            this.gameover()
            return true
        }
        if (y === (this.rows - 1) && this.dir === 'bottom') {
            this.gameover()
            return true
        }
    }
    //  两点确定方向 【根据差值对照maps对象得到方向】
    getSelfDir(pos1, pos2) {
        let d = pos2 - pos1
        for (let dir in this.maps) {
            if (d === this.maps[dir]) {
                return dir
            }
        }
    }
    //  渲染更新
    update() {
        let { body, barrier } = this
        //  头部
        let head = body[body.length - 1]
        //  尾部
        let tail = body[0]
        //  头部的下一个方位
        let nextHead = head + this.maps[this.dir]

        //  头部要超出边界 或者 撞到自己 或者撞到障碍物
        if (this.isFailed(head) || body.indexOf(nextHead) > -1 || barrier.indexOf(nextHead) > -1) {
            return this.gameover()
        }

        //  除了头部的其他 身体块 按 紧接着的下一块身体块 移动
        this.body = Array.from(this.body, (pos, i) => {
            if (i === body.length - 1) {
                return nextHead
            }
            else {
                return pos + this.maps[this.getSelfDir(pos, body[i + 1])]
            }
        })
        //  是不是吃到苹果呀
        if (nextHead === this.apple) {
            this.apple = null
            this.body.unshift(tail)  //  身体 + 1 尾部添加

            //  根据游戏模式做出不同处理
            if (this.mode.eatApple) {
                this.mode.eatApple.cur++

                //  吃够了
                if (this.mode.eatApple.cur === this.mode.eatApple.pass) {
                    this.mode.eatApple.cur = 0

                    //  躲避模式
                    if (this.mode.eatApple.custom) {
                        this.custom++
                        this.gameover()
                        setTimeout(() => alert('你通关了，继续玩躲避模式进行下一关'))
                        return false
                    }
                    //  通关模式
                    this.speed -= this.mode.eatApple.count
                }
            }
            //  吃完苹果加个苹果
            this.addApple()
        }
    }
    //  随机一个数字
    getRandom() {
        return ~~(Math.random() * this.cols * this.rows)
    }
    //  加个果子
    addApple() {
        let apple = this.body[0]
        //  随机到非身体or障碍物位置的地方添加个果子
        while (this.body.indexOf(apple) > -1 || this.barrier.indexOf(apple) > -1) {
            apple = this.getRandom()
        }
        this.apple = apple
    }
}