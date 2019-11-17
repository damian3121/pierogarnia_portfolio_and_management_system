export function setSessionStorageItem(sessionItemName: string, sessionIteValue: string) {
	return sessionStorage.setItem(sessionItemName, sessionIteValue);
}