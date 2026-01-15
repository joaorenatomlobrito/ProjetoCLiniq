package com.Cliniq.projeto.Controller.dto;

public record UsuarioResponse(
        Long idUsuario,
        String nome,
        String email,
        String idade,
        String sexo,
        String tipoSanguineo,
        String alergias
) {
}
