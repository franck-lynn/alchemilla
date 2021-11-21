import { apolloClient } from '../../apollo-client'
import { gql } from '@apollo/client/core'

const query = gql `{queryLoginedUser{
        name
        avatar
    }
}`

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const queryLoginedUser = async () => {
    const user = await apolloClient.query({ query })
    return user.data.queryLoginedUser
}
export { queryLoginedUser }

// 查询的语句
// const query = gql `{ # 注意有个 {}, {} 前面省略了 query, 
// query 后面省略了 操作名称如 QueryLoginedUser
//     queryLoginedUser(id: "600fffc5bc8bab18488419f5"){ name }
// }`
//! 注意 $id 的类型是 String
// const query = gql `query ($id: String!){
//         queryLoginedUser(id: $id){
//             name
//             avatar
//         }
//     }`