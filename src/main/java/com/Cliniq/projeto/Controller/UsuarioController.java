package com.Cliniq.projeto.Controller;

import com.Cliniq.projeto.Controller.dto.UsuarioRequest;
import com.Cliniq.projeto.Controller.dto.UsuarioResponse;
import com.Cliniq.projeto.Model.Usuario;
import com.Cliniq.projeto.Service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<UsuarioResponse> criar(@RequestBody UsuarioRequest request) {
        Usuario usuario = toEntity(request);
        Usuario salvo = usuarioService.salvaUsuario(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(salvo));
    }

    @GetMapping
    public UsuarioResponse buscarPorEmail(@RequestParam("email") String email) {
        return toResponse(usuarioService.buscarUsuarioPorEmail(email));
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletarPorEmail(@RequestParam("email") String email) {
        usuarioService.deletarUsuarioPorEmail(email);
    }

    private Usuario toEntity(UsuarioRequest request) {
        Usuario usuario = new Usuario();
        usuario.setNome(request.nome());
        usuario.setEmail(request.email());
        usuario.setSenha(request.senha());
        usuario.setIdade(request.idade());
        usuario.setSexo(request.sexo());
        usuario.setTipoSanguineo(request.tipoSanguineo());
        usuario.setAlergias(request.alergias());
        return usuario;
    }

    private UsuarioResponse toResponse(Usuario usuario) {
        return new UsuarioResponse(
                usuario.getIdUsuario(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getIdade(),
                usuario.getSexo(),
                usuario.getTipoSanguineo(),
                usuario.getAlergias()
        );
    }
}
