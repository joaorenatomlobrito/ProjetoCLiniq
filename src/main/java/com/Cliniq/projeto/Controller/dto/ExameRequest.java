package com.Cliniq.projeto.Controller.dto;

import java.time.LocalDate;

public record ExameRequest(
        Long usuarioId,
        String titulo,
        String categoria,
        String tipoExame,
        LocalDate dataExame,
        String clinica,
        String medico,
        String observacoes,
        String status
) {
}
