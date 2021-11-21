import path from 'path'
// prefix 是路由的前缀, 在子路由中可以加上这个前缀
// Insert path into directory tree structure:
function insert(children = [], [head, ...tail], prefix) {
    //! 1-1. children = [], path = [head, ...tail] = ['布局', 'r3-layout.vue'], 
    let child = children.find(child => child.title === head);
    //! 1-2. 没有child, head = '布局'
    if (!child) {
        if (tail.length > 0) {
            children.push(child = { title: head, children: [] })
        } else {
            head = path.basename(head, path.extname(head))
            children.push(child = { title: head, href: prefix ? `/${prefix}/${head}` : `/${head}` })
        }

    }
    //! 1-3. tail = ['r3-layout.vue'], 上面已经添加了一个children=[]
    if (tail.length > 0) insert(child.children, tail, prefix);
    return children;
}

let objectArray = (paths, prefix) => paths
    // 分割后为: [ ['布局', 'r3-layout.vue'], ['布局', '单行布局', 'r1-layout.vue'] ]
    .map(path => path.split('/').slice(1))
    // children = [], path = ['布局', 'r3-layout.vue']
    .reduce((children, path) => insert(children, path, prefix), []);



export default objectArray