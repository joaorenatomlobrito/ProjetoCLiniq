package com.Cliniq.projeto.Controller.dto;

public record LoginResponse(Long idUsuario, String email, String nome, String mensagem, String token) {
}
