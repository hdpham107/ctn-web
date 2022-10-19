var role = localStorage.auth && JSON.parse(localStorage.auth).role
export function authTeacherUI () {
    if (role === 2) return true
    return false
}