import {
    fromGlobalId,
} from "graphql-relay"
import checkPagingSanity from "./checkPagingSanity"

/**
 * Create a 'paging parameters' object with 'limit' and 'offset' fields based on the incoming
 * cursor-paging arguments.
 *
 * TODO: Handle the case when a user uses 'last' alone.
 */
export default function getPagingParameters(args) {
    const {isForwardPaging, isBackwardPaging} = checkPagingSanity(args)
    const {first, last, after, before} = args

    const getId = cursor => parseInt(fromGlobalId(cursor).id, 10)
    const nextId = (cursor) => getId(cursor) + 1

    if (isForwardPaging) {
        return {
            limit: first,
            offset: after ? nextId(after) : 0
        }
    } else if (isBackwardPaging) {
        let limit = last
        let offset = getId(before) - last

        // Check to see if our before-page is underflowing past the 0th item
        if (offset < 0) {
            // Adjust the limit with the underflow value
            limit = Math.max(last + offset, 0)
            offset = 0
        }

        return { offset, limit }
    } else {
      return {}
    }
}