package com.Cliniq.projeto.Controller;

import com.Cliniq.projeto.Controller.dto.LoginRequest;
import com.Cliniq.projeto.Controller.dto.LoginResponse;
import com.Cliniq.projeto.Model.Usuario;
import com.Cliniq.projeto.Security.JwtService;
import com.Cliniq.projeto.Service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UsuarioService usuarioService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.senha())
        );
        Usuario usuario = usuarioService.buscarUsuarioPorEmail(request.email());
        String role = usuario.getTipoUsuario() == null ? "PACIENTE" : usuario.getTipoUsuario().trim().toUpperCase();
        role = role.replace(" ", "_");
        String token = jwtService.gerarToken(usuario.getEmail(), List.of("ROLE_" + role));
        return new LoginResponse(usuario.getIdUsuario(), usuario.getEmail(), usuario.getNome(), "Login ok", token);
    }
}
