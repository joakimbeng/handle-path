import * as pathToRegexp from 'path-to-regexp'
import * as isPlainObject from 'is-plain-object'

export interface Routes {
 [pathPattern: string]: Routes | any
}

export interface Match {
 path: string | null
 pattern: string | null
 value: any | null
 params: string[] | null
}

let handlePath = (path: string, routes: Routes, parentPattern: string = ''): Match => {
  const patterns = Object.keys(routes)

  for (let pattern of patterns) {
    const matchPattern = parentPattern + slashify(pattern)
    const re = pathToRegexp(matchPattern)
    const params = re.exec(path)
    const value = routes[pattern]

    if (params !== null) {
      if (typeof value === 'function') {
        return {
          path: path,
          pattern: matchPattern,
          value: value.apply(null, params.slice(1)),
          params: params.slice(1)
        }
      } else if (isPlainObject(value)) {
        return handlePath(path, value, matchPattern)
      }
      return {
        path: path,
        pattern: matchPattern,
        value: value,
        params: params.slice(1)
      }
    } else if (isPlainObject(value)) {
      const child = handlePath(path, value, matchPattern)
      if (child.pattern !== null) {
        return child
      }
    }
  }

  return {
    path: null,
    pattern: null,
    value: null,
    params: null
  }
}

export default handlePath

let slashify = (val: string) => {
  if (val[0] !== '/') {
    return '/' + val
  }
  return val
}
