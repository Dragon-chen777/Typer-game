const word = document.getElementById("word")
const text = document.getElementById("text")
const scoreEl = document.getElementById("score")
const timeEl = document.getElementById("time")
const endgameEl = document.getElementById("end-game-container")
const settingsBtn = document.getElementById("settings-btn")
const settings = document.getElementById("settings")
const settingsForm = document.getElementById("settings-form")
const difficultySelect = document.getElementById("difficulty")
const reloadBtn = document.getElementById("reload")
const getScore = document.getElementById("getScore")
const btnClick = document.getElementById("btnClick")
const keydown = document.getElementById("keydown")

const words = [
	'马保国',
	'混元太极门',
	'左正蹬',
	'右刺拳',
	'窝里斗',
	'马家功夫',
	'大意了啊',
	'不讲伍德',
	'耗子尾汁',
	'接化发',
	'没有闪',
	'老同志',
	'以和为贵',
	'一键三连',
]
let randomWord = null
let score = 0
let time = 10

// 游戏难度
let difficult = localStorage.getItem('difficult') || 'medium'
difficultySelect.value = localStorage.getItem('difficulty') || 'medium';
// 一开始输入文本框自动聚焦
text.focus()
// 每秒刷新一次时间 
function getRandomWord() {
	return words[Math.random() * words.length | 0]
}

function addWordToDOM() {
	word.innerHTML = getRandomWord()
}

function updateTime() {
	time--
	timeEl.innerHTML = time + 's'
	if (time === 0) {
		clearInterval(timeInterval)
		gameOver()
	}
}
const timeInterval = setInterval(updateTime, 1000)

function updateScore() {
	score++
	scoreEl.innerHTML = score
}

function gameOver() {
	endgameEl.style.display = 'flex'
	if (score < 10) {
		endgameEl.innerHTML = `
        <h1>😫 不是很理想呢~</h1>
        <p>您最终的分数为: ${score}</p>
        <button  class="reload" onclick="location.reload()">再来一次</button>
		`
		return
	}
	if (score >= 10 && score < 20) {
		endgameEl.innerHTML = `
        <h1>😀 还不错呢~</h1>
        <p>您最终的分数为: ${score}</p>
        <button class="reload" onclick="location.reload()">再来一次</button>
		`
		return
	} 
	endgameEl.innerHTML = `
			<h1>👍 很牛逼噢~</h1>
			<p>您最终的分数为: ${score}</p>
			<button class="reload" id="reload" onclick="location.reload()">再来一次</button>
	`
	
}
addWordToDOM()
// 打字判断
text.addEventListener('input', e => {
	if (e.target.value !== randomWord) return

	getScore.play()
	setTimeout(() => e.target.value = '', 100)
	addWordToDOM()
	updateScore()
	if (difficulty === 'hard') time += 1
	else if (difficulty === 'medium') time += 2
	else time += 3
	updateTime()
})

settingsBtn.addEventListener('click', () => {
	settings.classList.toggle('hide')
	btnClick.play()
})
settingsForm.addEventListener('change', e => {
	btnClick.play()
	difficulty = e.target.value
	localStorage.setItem('difficulty', difficulty)
})
text.onkeydown = () => keydown.play()
