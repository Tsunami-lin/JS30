/*
 * @Author: lenovor7000 2393392925@qq.com
 * @Date: 2025-03-07 08:19:43
 * @LastEditors: lenovor7000 2393392925@qq.com
 * @LastEditTime: 2025-03-10 22:32:59
 * @FilePath: \hcj\js2025\javascript30\vcd\scripts.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const player = document.querySelector('.player')
// 播放视频
const viewer = player.querySelector('.viewer')
//进度条
const progress = player.querySelector('.progress')
const progress_filled = player.querySelector('.progress__filled')
// 开始暂停按钮
const toggle = player.querySelector('.toggle')
// 速率，音量
const range = player.querySelectorAll('.player__slider')
// 跳播
const skip = player.querySelectorAll('[data-skip]')


console.log(viewer);


//paused 用于知道视频的播放状态
function togglePlay() {
    console.log('toggle');
    viewer[viewer.paused ? 'play' : 'pause']()
}

function updateButton() {
    toggle.innerHTML = `${this.paused ? '►' : '❚ ❚'}`
}

function updateskip() {
    console.log(viewer.currentTime);
    viewer.currentTime += parseFloat(this.dataset.skip)
}

function handRang() {
    viewer[this.name] = this.value
}

function handPro() {
    progress_filled.style.flexBasis = `${(viewer.currentTime / viewer.duration) * 100}%`
}

function scurb(e) {
    const trueTime = (e.offsetX / progress.offsetWidth) * viewer.duration
    viewer.currentTime = trueTime
}



let mousedown = false


progress.addEventListener('click', scurb)
progress.addEventListener('mousemove', () => mousedown && scurb)
progress.addEventListener('mousedown', () => mousedown = false)
progress.addEventListener('mouseip', () => mousedown = true)






viewer.addEventListener('timeupdate', handPro)

range.forEach(item => item.addEventListener('input', handRang))

skip.forEach(item => item.addEventListener('click', updateskip))

viewer.addEventListener('click', togglePlay)
toggle.addEventListener('click', togglePlay)
viewer.addEventListener('play', updateButton)
viewer.addEventListener('pause', updateButton)
