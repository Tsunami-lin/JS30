//视频资源
const video = document.querySelector('.player')
//画布建设与部署
const canvas = document.querySelector('.photo')
const ctx = canvas.getContext('2d')
//执行脚本
const strip = document.querySelector('.strip')
//声音资源
const snap = document.querySelector('.snap')



//附加内容
//本来就是字符串
// 箭头函数导致的this偏差
document.querySelectorAll(".rgb input").forEach((item => {
    item.addEventListener('input', (e) => {
        const inputname = e.target.name
        const inputvalue = e.target.value
        const span = document.querySelector(`.v-${inputname}`)
        if (span) {
            span.textContent = inputvalue
        }
    })
}))


//导入视频资源
function getVideo() {
    //navigator 现成的对象集合 需要什么求什么
    // 获取到的是摄像头的流
    navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((localmediaStream) => {
        console.log(localmediaStream);
        // 这个东西好像不能使用了
        // video.src = window.URL.createObjectURL(localmediaStream)
        video.srcObject = localmediaStream
        video.play()
    }).catch(err => {
        console.log('不是哥们~');
    })
}


//视频流填装成图片流 ， 时间间隔16ms
function putToCanvas() {

    // video.addEventListener("loadedmetadata", () => {
    //     const width = video.videoWidth
    //     const height = video.videoHeight
    //     console.log(width, height);
    //     canvas.width = width
    //     canvas.height = height
    //     setInterval(() => {
    //         ctx.drawImage(video, 0, 0, width, height)
    //     }, 16)
    // })

    const width = video.videoWidth
    const height = video.videoHeight
    console.log(width, height);
    canvas.width = width
    canvas.height = height
    setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height)
        let pixels = ctx.getImageData(0, 0, width, height)
        // console.log(typeof (pixels))
        // pixels = changeLens(pixels)
        pixels = greenScreen(pixels)
        ctx.putImageData(pixels, 0, 0)
    }, 16)
    console.dir(ctx)

}


function greenScreen(pixels) {
    const greenLimit = {}
    // 这里使用的是快捷对象赋值而不是对象解构
    document.querySelectorAll(".rgb input").forEach((item) => {
        greenLimit[item.name] = item.value
    })
    const rmin = document.querySelectorAll(".rgb rmin")
    const rmax = document.querySelectorAll(".rgb rmax")


    for (let i = 0; i <= pixels.data.length; i += 4) {
        const red = pixels.data[i + 0]
        const green = pixels.data[i + 1]
        const bule = pixels.data[i + 2]
        // let alpha = pixels.data[i + 3]

        if (red >= greenLimit.rmin
            && green >= greenLimit.gmin
            && bule >= greenLimit.bmin
            && red <= greenLimit.rmax
            && green <= greenLimit.gmax
            && bule <= greenLimit.bmax

        ) {
            pixels.data[i + 3] = 0
        }

    }
    return pixels
    console.log(greenLimit);

}




function changeLens(pixels) {
    for (let i = 0; i <= pixels.data.length; i += 4) {
        const avg = (pixels.data[i] + pixels.data[i + 1] + pixels.data[i + 2]) / 3;
        pixels.data[i + 0] = avg;
        pixels.data[i + 1] = avg;
        pixels.data[i + 2] = avg;
    }
    return pixels
}



function takePhoto() {
    snap.currentTime = 0
    snap.play()

    //设置图片的规格
    // 画布转换成图片
    // 此时获取的，仅仅只是数据，如果直接输出，会获得base64的数据串
    const imgdata = canvas.toDataURL('image/jpeg')
    // 创建a标签
    const link = document.createElement('a')
    //链接标签填入资源
    // 如果我在里面填入的是一张普通图片会怎么样？？？
    link.href = imgdata

    //a 标签的一些内容 
    link.setAttribute('download', 'human')
    // link.textContent = 'Download Image'
    link.innerHTML = `<img src="${imgdata} alt = "">`

    //把图片放进去
    strip.insertBefore(link, strip.firstChild)
}



video.addEventListener('canplay', putToCanvas)
// window.addEventListener('click', takePhoto)

// 获取资源需要时间
getVideo()

