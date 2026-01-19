package com.Cliniq.projeto.Controller.dto;

public record AnexoResponse(
        Long idAnexoExame,
        String nome,
        String tipo,
        String url
) {
}
