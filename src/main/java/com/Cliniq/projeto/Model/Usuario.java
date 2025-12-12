package com.Cliniq.projeto.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "usuario_tb")
@Data
public class Usuario {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUsuario;
    @Column (name = "nome" , length = 100)
    private String nome;
    @Column(unique = true, name = "email", length = 100)
    private String email;
    @Column (name = "senha", length = 100)
    private String senha;
    @Column (name = "idade")
    private String idade;
    @Column (name = "sexo")
    private String sexo;
    @Column (name = "tipoSanguineo")
    private String tipoSanguineo;
    @Column (name = "alergias")
    private String alergias;

    private LocalDateTime localDateTime;
}
