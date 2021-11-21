import { ref, onMounted, onUnmounted } from 'vue'

const containerClassName = '.dr-container' // 外层容器类名
const dragableName = 'content-header' // 允许拖拽的容器类名, 不含 . 号
const right = 'right' // 右侧拖放
const bottom = 'bottom' // 右侧拖放
const top = 'top' // 右侧拖放
const left = 'left' // 右侧拖放

const startX = ref(0)
const startY = ref(0)
const startMarginLeft = ref(0)
const startMarginTop = ref(0)
const startWidth = ref(0)
const startHeight = ref(0)

// 获取 el 元素的 style 里的属性值 的函数
const getStyle = (el, style) => parseInt(getComputedStyle(document.querySelector(el))[style], 10)

const useModal = () => {
    onMounted(() => {
        let style = document.querySelector(containerClassName).style
        // 初始时位置值
        startMarginLeft.value = localStorage.getItem('dialog_margin_left') || getStyle(containerClassName, 'marginLeft')
        startMarginTop.value = localStorage.getItem('dialog_margin_top') || getStyle(containerClassName, 'marginTop')
        startWidth.value = localStorage.getItem('dialog_width') || getStyle(containerClassName, 'width')
        startHeight.value = localStorage.getItem('dialog_height') || getStyle(containerClassName, 'height')


        style.marginLeft = startMarginLeft.value + 'px'
        style.marginTop = startMarginTop.value + 'px'
        style.width = startWidth.value + 'px'
        style.height = startHeight.value + 'px'
        // 页面加载后监听 鼠标按下事件, 开始事件
        document.documentElement.addEventListener('mousedown', onStart)
    })
    onUnmounted(() => {
        document.documentElement.removeEventListener('mousedown', onStart)
    })
}
const stopDrag = () => {
    // 把 数据保存到 localStorge, 要注意的是这里不是 startHeight.value等响应式数据, 因为这个值还没有得到最后一步更新
    localStorage.setItem('dialog_margin_left', getStyle(containerClassName, 'marginLeft'))
    localStorage.setItem('dialog_margin_top', getStyle(containerClassName, 'marginTop'))
    localStorage.setItem('dialog_width', getStyle(containerClassName, 'width'))
    localStorage.setItem('dialog_height', getStyle(containerClassName, 'height'))

    document.documentElement.removeEventListener('mousemove', onDrag)
    document.documentElement.removeEventListener('mousemove', onResizeTop)
    document.documentElement.removeEventListener('mousemove', onResizeBottom)
    document.documentElement.removeEventListener('mousemove', onResizeLeft)
    document.documentElement.removeEventListener('mousemove', onResizeRight)

    document.documentElement.removeEventListener('mouseup', stopDrag)
}


function onStart(e) {
    // 开始事件时初始化参数
    startX.value = e.clientX // 保存鼠标开始的位置
    startY.value = e.clientY
    // 获取最外层容器的左, 上边距
    startMarginLeft.value = getStyle(containerClassName, 'marginLeft')
    startMarginTop.value = getStyle(containerClassName, 'marginTop')
    // 获取最外层容器宽高
    startWidth.value = getStyle(containerClassName, 'width')
    startHeight.value = getStyle(containerClassName, 'height')

    let targetClass = e.target.className
    if ((typeof targetClass) !== 'string') {
        return // 只有字符串才有 includes 方法
    }

    if (targetClass.includes(dragableName)) { // 拖拽的时候
        document.documentElement.addEventListener('mousemove', onDrag)
    }
    if (targetClass.includes(right)) { // 右侧拖拽
        document.documentElement.addEventListener('mousemove', onResizeRight)
    }
    if (targetClass.includes(bottom)) { // 底侧拖拽
        document.documentElement.addEventListener('mousemove', onResizeBottom)
    }
    if (targetClass.includes(left)) { // 左侧拖拽
        document.documentElement.addEventListener('mousemove', onResizeLeft)
    }
    if (targetClass.includes(top)) { // 上侧拖拽
        document.documentElement.addEventListener('mousemove', onResizeTop)
    }

    document.documentElement.addEventListener('mouseup', stopDrag)
}

// 下面是移动的函数
function onDrag(e) {
    let style = document.querySelector(containerClassName).style
    let deltaX = e.clientX - startX.value
    let deltaY = e.clientY - startY.value
    style.marginLeft = startMarginLeft.value + deltaX + 'px'
    style.marginTop = startMarginTop.value + deltaY + 'px'
}

function onResizeRight(e) {
    let deltaX = e.clientX - startX.value
    let style = document.querySelector(containerClassName).style
    style.width = startWidth.value + deltaX + 'px'
}

function onResizeBottom(e) {
    let deltaY = e.clientY - startY.value
    let style = document.querySelector(containerClassName).style
    style.height = startHeight.value + deltaY + 'px'
}

function onResizeTop(e) {
    let deltaY = e.clientY - startY.value
    let style = document.querySelector(containerClassName).style
    style.height = startHeight.value - deltaY + 'px'
    style.marginTop = startMarginTop.value + deltaY + 'px'
}

function onResizeLeft(e) {
    let deltaX = e.clientX - startX.value
    let style = document.querySelector(containerClassName).style
    style.width = startWidth.value - deltaX + 'px'
    style.marginLeft = startMarginLeft.value + deltaX + 'px'
}
export { useModal }