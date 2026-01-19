package com.Cliniq.projeto.Controller.dto;

import java.time.LocalDate;
import java.util.List;

public record ExameDetalheResponse(
        Long idExame,
        String titulo,
        String categoria,
        String tipoExame,
        LocalDate dataExame,
        String clinica,
        String medico,
        String observacoes,
        String status,
        List<AnexoResponse> anexos
) {
}
