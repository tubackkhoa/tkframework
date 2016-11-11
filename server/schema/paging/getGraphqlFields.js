'use strict'

const getSelections = (ast) => {
    if (ast &&
        ast.selectionSet &&
        ast.selectionSet.selections &&
        ast.selectionSet.selections.length) {
        return ast.selectionSet.selections
    }

    return []
}

const isFragment = (ast) =>
    ast.kind === 'InlineFragment' || ast.kind === 'FragmentSpread'

const getAST = (ast, info) => {
    if (ast.kind === 'FragmentSpread') {
        const fragmentName = ast.name.value
        return info.fragments[fragmentName]
    }
    return ast
}


const flattenAST = (ast, info, obj = {}) => {    
    return getSelections(ast).reduce((flattened, a) => {
        if (isFragment(a)) {
            flattened = flattenAST(getAST(a, info), info, flattened)
        } else {
            const name = a.name.value
            if (flattened[name]) {
                Object.assign(flattened[name], flattenAST(a, info, flattened[name]))
            } else {
                flattened[name] = flattenAST(a, info)
            }
        }
        return flattened
    }, obj)
}

const getGraphqlFields = (info, obj={}) =>    
    info.fieldASTs.reduce((o, ast) => flattenAST(ast, info, o), obj) || {}

export default getGraphqlFields
