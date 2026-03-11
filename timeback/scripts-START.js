
const dashboardTime = document.querySelector('.display__time-left')
const dashboardEndtime = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('[data-time]')

let timer
function countdown(sec) {
    clearInterval(timer)
    const endTime = Date.now() + sec * 1000
    displayEndtime(endTime)
    // console.log(endTime);
    timer = setInterval(() => {
        const lifeTime = Math.round(((endTime - Date.now() > 0) ? endTime - Date.now() : 0) / 1000)
        if (lifeTime === 0) {
            clearInterval(timer)
            displayTime(0)
            return
        }
        displayTime(lifeTime)
    }, 1000)
}


function displayTime(sec) {
    const fmin = Math.floor(sec / 60)
    const fsec = sec % 60
    dashboardTime.textContent = `${fmin}:${fsec < 10 ? 0 : ''}${fsec}`
}


function displayEndtime(time) {
    const endDate = new Date(time)
    //padStart 补零
    const hours = String(endDate.getHours()).padStart(2, '0');
    const minutes = String(endDate.getMinutes()).padStart(2, '0');
    dashboardEndtime.textContent = `将于 ${hours}:${minutes} 结束倒计时`;

}


function startCountdown() {
    // 字符串装换
    const fsec = parseInt(this.dataset.time)
    countdown(fsec)
}

buttons.forEach(item => item.addEventListener('click', startCountdown))

document.customForm.addEventListener('submit', function (e) {
    e.preventDefault()
    const fmin = this.minutes.value
    countdown(fmin * 60)
    this.reset()

})



