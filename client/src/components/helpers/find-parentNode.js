// 以点击事件获得的元素作为参数, 向上查找 指定类名的元素, 递归查找
const findParentNode = (el, targetClassName) => {
    if (!el || !el.className || (typeof el.className) === 'object') {
        return null
    }
    if(el.className.includes(targetClassName)){
        return el
    }else{
        return findParentNode(el.parentNode, targetClassName)
    }
}

export {findParentNode}