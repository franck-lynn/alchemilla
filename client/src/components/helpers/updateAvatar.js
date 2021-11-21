import { apolloClient } from '../../apollo-client'
import { gql } from '@apollo/client/core'

const mutation = gql `
    mutation ($avatarUrl: String!) {
        updateAvatar(avatarUrl: $avatarUrl)
    }
`
// 变量以参数的形式传入
const updateAvatar = async (variables) => {
    const msg = await apolloClient.mutate({ mutation, variables })
    return msg
}

export { updateAvatar }