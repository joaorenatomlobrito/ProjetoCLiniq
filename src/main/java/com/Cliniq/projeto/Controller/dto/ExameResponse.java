package com.Cliniq.projeto.Controller.dto;

import java.time.LocalDate;

public record ExameResponse(
        Long idExame,
        String titulo,
        String categoria,
        String tipoExame,
        LocalDate dataExame,
        String clinica,
        String medico,
        String status,
        long anexos
) {
}
