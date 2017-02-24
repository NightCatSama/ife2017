function createCard(obj) {
	return `
<div class="card">
	<img class="img" src="https://ww3.sinaimg.cn/large/006tNbRwly1fcr5jmrmujg30cj06xqv5.gif" alt="" />
	<p>
		题目：
		<a href="${obj.topic_site}" class="topic">${obj.name}</a>
	</p>
	<p>
		完成作品：
		<a href="${obj.href}" class="link">Demo</a>
	</p>
</div>
`
}

function loadList(list) {
	let html = ''
	let container = document.body

	Array.from(list, (obj) => {
		html += createCard(obj)
		container.innerHTML = html
	})
}

window.onload = () => {
	const products = [{
		name: '有趣的鼠标悬浮模糊效果',
		href: 'views/mouseOverhang.html',
		topic_site: 'http://ife.baidu.com/course/detail/id/14'
	}]

	loadList(products)
}