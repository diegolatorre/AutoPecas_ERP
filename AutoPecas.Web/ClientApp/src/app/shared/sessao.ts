import Usuario from "../model/usuario/usuario.model";

export function getPerfil() {
    return JSON.parse(localStorage.getItem("perfil")) as Usuario;
}

export function setPerfil(perfil: Usuario) {
    return localStorage.setItem("perfil", JSON.stringify(perfil));
}

export function clear() {
    return localStorage.removeItem("perfil");
}