
export default function checkPagingSanity(args) {
    const {first, last, after, before} = args
    const isForwardPaging = !!first || !!after
    const isBackwardPaging = !!last || !!before
        
    if (isForwardPaging && isBackwardPaging) {
        throw new Error("cursor-based pagination cannot be forwards AND backwards");
    }
    if (isForwardPaging && before || isBackwardPaging && after) {
        throw new Error("paging must use either first/after or last/before")
    }
    if (isForwardPaging && first < 0 || isBackwardPaging && last < 0) {
        throw new Error("paging limit must be positive")
    }
    // This is a weird corner case. We'd have to invert the ordering of query to get the last few items then re-invert it when emitting the results.
    // We'll just ignore it for now.
    if (last && !before) {
        throw new Error("when paging backwards, a 'before' argument is required");
    }
    return { isForwardPaging, isBackwardPaging }
}