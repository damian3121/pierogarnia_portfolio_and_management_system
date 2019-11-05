export function LoginChecker(sessionItemName: string) {
    if (sessionStorage.getItem(sessionItemName)) {
        return true;
    }
    return false;
}