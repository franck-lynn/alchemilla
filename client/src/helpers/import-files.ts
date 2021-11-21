// 导入 components 目录下所有的 .vue 文件
import {FileType } from '../types'
const files: Record<string, FileType> = import.meta.globEager("../components/**/*.vue")
export { files }