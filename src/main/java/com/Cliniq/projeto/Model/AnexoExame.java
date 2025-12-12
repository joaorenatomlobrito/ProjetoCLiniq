package com.Cliniq.projeto.Model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "AnexoExame_tb")
@Data
public class AnexoExame {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long  idAnexoExame;

    @ManyToOne
    @JoinColumn(name = "exame_tb")
    private Exame exame;
    @Column (name = "nome")
    private String nome;
    @Column (name = "ExameTipo")
    private String tipo;
    
}
