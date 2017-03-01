'use strict'

const _default = {
    bg_texture: '../dist/images/wood.png',
    rows: 20,
    cols: 20,
    size: 30,
    dir: 'bottom',
    body: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    speed: 100
}

const dirMap = {
    left: 'right',
    right: 'left',
    top: 'bottom',
    bottom: 'top'
}

export default class Snake {
	constructor(id, option) {
		Object.assign(this, _default, option)
		this.canvas = document.getElementById(id)
		this.cxt = this.canvas.getContext('2d')
		this.isAnimate = false
		this.init()
	}
    //  游戏初始化
	init() {
        this.width = this.cols * this.size
        this.height = this.rows * this.size
		this.setSize()
        this.getMaps()
        this.bindEvent()
        this.loadBgImg(this.start)
	}
    //  获得方向对应的数值
    getMaps() {        
        this.maps = {
            top: -this.cols,
            bottom: this.cols,
            left: -1,
            right: 1
        }
    }
    //  一切都完了
	destory() {
		this.cxt.clearRect(0, 0, this.width, this.height)
		this.stop()
	}
    //  绑定事件
	bindEvent() {
		document.addEventListener('keydown', this.getKeyCode.bind(this))
		this.canvas.addEventListener('mousemove', this.getMousePos.bind(this))
	}
    //  获得键盘操作
    getKeyCode(e) {
        switch(e.keyCode){
            case 87:
            case 38:
                return this.setDir('top')//w
                break
            case 65:
            case 37:
                return this.setDir('left')//a
                break
            case 39:
            case 68:
                return this.setDir('right')//d
                break
            case 40:
            case 83:
                return this.setDir('bottom')//s
                break
            default:
                return false
        }
    }
    //  得到鼠标位置，没什么卵用的样子
	getMousePos(e) {
	    this.mx = e.clientX - this.bounds.left
		this.my = e.clientY - this.bounds.top
	}
    //  初始化尺寸
	setSize() {
		this.canvas.width = this.width
		this.canvas.height = this.height
        this.bounds = this.canvas.getBoundingClientRect()
	}
    //  开始游戏
	start() {
		this.isAnimate = true

        this.addApple()
		const timer = () => {
            setTimeout(() => {
                if (!this.isAnimate) {
                    return false
                }
                this.cxt.clearRect(0, 0, this.width, this.height)
                this.render()
                this.update()
                timer()
            }, this.speed)
        }
        timer()
		// const step = () => {
		// 	if (!this.isAnimate) return false
		// 	this.render()
		// 	this.update()
		// 	requestAnimationFrame(step)
		// }
		// requestAnimationFrame(step)
	}
    //  暂停游戏
	stop() {
		this.isAnimate = false
	}
    //  游戏结束
    gameover() {
        this.stop()
        this.renderBg()
        this.renderSnake('#999')
    }
    //  渲染
    render() {
        this.renderBg()
        this.renderSnake()
        this.renderApple()
    }
    //  加载背景
    loadBgImg(callback) {
		this.image = new Image()
		this.image.onload = () => {
            callback.apply(this)
		}
		this.image.src = this.bg_texture
    }
    //  画背景
    renderBg() {
        this.cxt.fillStyle = this.cxt.createPattern(this.image, 'repeat')
        this.cxt.fillRect(0, 0, this.width, this.height)
    }
    //  画个苹果
    renderApple() {
        if (this.apple) {
            let { x, y } = this.getCoord(this.apple)
            this.cxt.fillStyle = '#d71345'

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
    //  画条蛇
	renderSnake(color = '#000') {
		this.cxt.fillStyle = color
		Array.from(this.body, (pos, i) => {
            let { x, y } = this.getCoord(pos)
            this.cxt.fillRect(x * this.size, y * this.size, this.size, this.size)
		})
	}
    //  是不是出界了
    isFailed(index) {
        let { x, y } = this.getCoord(index)
        if (x === 0 && this.dir === 'left') {
            this.gameover()
            return true
        }
        if (x === this.cols - 1 && this.dir === 'right') {
            this.gameover()
            return true
        }
        if (y === 0 && this.dir === 'top') {
            this.gameover()
            return true
        }
        if (y === this.rows - 1 && this.dir === 'bottom') {
            this.gameover()
            return true
        }
    }
    //  两点确定方向
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
        let { body } = this
        let head = body[body.length - 1]
        let tail = body[0]
        let nextHead = head + this.maps[this.dir]
        if(this.isFailed(head) || body.indexOf(nextHead) > -1) {
            return this.gameover()
        }
        this.body = Array.from(this.body, (pos, i) => {
            if (i === body.length - 1) {
                return nextHead
            }
            else {
                return pos + this.maps[this.getSelfDir(pos, body[i + 1])]
            }
		})
        if (nextHead === this.apple) {
            this.apple = null
            this.body.unshift(tail)
            this.speed -= 1
            setTimeout(() => {
                this.addApple()
            }, 1000)
        }
	}
    //  随机一个数字
    getRandom() {
        return ~~(Math.random() * this.cols * this.rows)
    }
    //  加个果子
    addApple() {
        let apple = this.body[0]
        while(this.body.indexOf(apple) > -1) {
            apple = this.getRandom()
        }
        this.apple = apple
    }
}