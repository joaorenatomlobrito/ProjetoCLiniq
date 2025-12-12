package com.Cliniq.projeto.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "exame_tb")
@Data
public class Exame {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idExame;
    @ManyToOne
    @JoinColumn(name = "usuario_tb")
    private Usuario usuario;
    @Column (name = "tipoExame")
    private String tipoExame;
    @Column (name = "categoria")
    private String categoria;
    @Column (name = "DataExame")
    private LocalDate dataExame;
    @Column(name = "clinica")
    private String clinica;
    @Column (name = "medico")
    private String medico;
    @Column (name = "observacao")
    private String observacoes;

    private LocalDateTime localDateTime;
}
