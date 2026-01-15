package com.Cliniq.projeto.Controller;

import com.Cliniq.projeto.Controller.dto.LoginRequest;
import com.Cliniq.projeto.Controller.dto.LoginResponse;
import com.Cliniq.projeto.Model.Usuario;
import com.Cliniq.projeto.Service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UsuarioService usuarioService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        Usuario usuario = usuarioService.autenticar(request.email(), request.senha());
        return new LoginResponse(usuario.getIdUsuario(), usuario.getEmail(), usuario.getNome(), "Login ok");
    }
}
