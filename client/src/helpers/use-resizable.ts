//! 仅供 c2-layout.vue 使用的函数
import { ref, onMounted, onUnmounted } from 'vue'
// 设置一些常量, 避免在函数中进行修改
const isNarrow = ref(false)
const breakPoint = 80 // 设置左侧边栏宽窄断点, 小于这个值时会告诉子组件是窄状态
const _leftClass = '.c2-resizeable-left' // 左侧边栏的类名
// const rightClass = '.c2-resizable-right' // 右侧边栏的类名

const resizable_width = 'scalable_width' // 保存在localStorge中的键名
const is_narrow = 'is_narrow' // 保存在localStorge中的键名
const minResizableWidth = 45 // 设置左侧边栏最小的宽度, 和css中设置保持一致


const useResizable = (): void => {
    const startX = ref(0) // 鼠标开始点击时的位置
    const startWidth = ref(0) // 记录鼠标按下那一刻 左边 .scalable 的宽度
    // 获取由 _leftClass 定义的类名的元素的宽度尺寸
    const leftClass: HTMLDivElement = document.querySelector(_leftClass)!
    
    const getWidth = (): number => parseInt(window.getComputedStyle(leftClass).width, 10)

    const onDrag = (e: MouseEvent) => {
        // 在鼠标移动时触发
        // 新的宽度 = 开始时的侧边宽度 + 鼠标当前位置 - 鼠标在分割线时的位置
        let newWidth = startWidth.value + e.clientX - startX.value
        newWidth = newWidth < minResizableWidth ? minResizableWidth : newWidth // 设置最小的拖到宽度

        // isNarrow 改为在移动时实时触发, 停止移动时把数据保存到 localStorge, 初始化时从 localStorge 中获取 isNarrow
        isNarrow.value = newWidth < breakPoint ? true : false

        leftClass.style.width = newWidth + 'px'
        // 右边区域距离左边=左边宽度让出来(2处)
        // document.querySelector(rightClass).style.marginLeft = newWidth + 'px'
    }
    const stopDrag = () => {
        // 把 数据保存到 localStorge
        localStorage.setItem(resizable_width, String(getWidth()))
        localStorage.setItem(is_narrow, String(isNarrow.value))
        document.documentElement.removeEventListener('mousemove', onDrag)
        document.documentElement.removeEventListener('mouseup', stopDrag)
    }
    const startDrag = (e: MouseEvent) => {
        const targetClass = (e.target as HTMLElement).className
        if ((typeof targetClass) !== 'string') {
            return // 只有字符串才有 includes 方法
        }

        //! 2, 鼠标点击时触发 e.clientX 鼠标的当前位置, 保存到开始点击时的位置变量 startX
        startX.value = e.clientX
        // 鼠标点击时的坐标, 获取原来的侧边宽度.
        startWidth.value = getWidth()
        //! 3, 鼠标移动时触发
        if (targetClass.includes('separator')) {
            document.documentElement.addEventListener('mousemove', onDrag)
        }

        //! 4, 鼠标松开时触发, 停止监听 mousemove, mouseup
        document.documentElement.addEventListener('mouseup', stopDrag)
    }


    onMounted(() => {
        // 加载之后获取侧边栏 .saclable 的宽度
        startWidth.value = Number(localStorage.getItem(resizable_width)) || getWidth()
        // 初始化时从 localStorge 中获取 isNarrow
        isNarrow.value = JSON.parse(+localStorage.getItem(is_narrow)) || false
        // 获取初始的宽度值
        leftClass.style.width = startWidth.value + 'px'
        // 右边区域距离左边=左边宽度让出来(2处)
        // document.querySelector(rightClass).style.marginLeft = startWidth.value + 'px'
        //! 1, 鼠标按下时触发
        leftClass.addEventListener('mousedown', startDrag)

        // 监听 resize 事件, 监听窗口大小, 实现响应式的布局
        const onresize = function() {
            const screenWidth = document.body.clientWidth

            if (screenWidth < 768) {
                // 当处于窄屏状态时
                leftClass.style.width = minResizableWidth + 'px'
                isNarrow.value = true
            } else {
                // 宽屏时, 取消 narrow类, 这个时候, 如果这个时候左侧边栏如果小于断点, 仍然会
                // 按照大屏的显示, 这是不合理的, 应该是如果左侧小于断点, 还是按照小屏显示
                leftClass.style.width = localStorage.getItem(resizable_width) + 'px'
                isNarrow.value = getWidth() < breakPoint ? true : false
            }
        }
        
        document.documentElement.addEventListener('resize', onresize)
    })


    onUnmounted(() => {
        document.documentElement.removeEventListener('mousedown', startDrag)
        document.documentElement.removeEventListener('mousemove', onDrag)
        document.documentElement.removeEventListener('mouseup', stopDrag)
        document.documentElement.removeEventListener('resize', onresize)
    })


}

export { useResizable, isNarrow, resizable_width }