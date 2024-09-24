function definirCookie(chave, token) {
    document.cookie = `${chave}=${token};path=/`;
};

function obterCookie(chave) {
    return document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith(`${chave}=`))
        ?.split("=")[1];
}

function removeCookie(chave) {
    document.cookie = `${chave}=; expires=thu, 01 Jan 1970 00:00:00 GMT`;
};

export { definirCookie, obterCookie, removeCookie };