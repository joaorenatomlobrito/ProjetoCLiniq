package com.Cliniq.projeto.Controller.dto;

public record UsuarioRequest(
        String nome,
        String email,
        String senha,
        String idade,
        String sexo,
        String tipoSanguineo,
        String alergias
) {
}
