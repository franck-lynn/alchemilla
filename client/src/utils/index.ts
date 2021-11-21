// 客户端的一些工具函数
// TResponse 的 T 表示 是 type 定义的类型
export declare type TResponse = Record<string, string> & Response

const postData = async (url: string, data: Record<string, string>): Promise<TResponse> => {
    const res = await fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, same-origin, *omit
        headers: {
            Accept: "application/json",
            "content-type": "application/json"
        },
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors" // no-cors, cors, *same-origin
        // redirect: 'follow', // manual, *follow, error
        // referrer: 'no-referrer', // *client, no-referrer
    })
    return res.json()
}

export {postData}
