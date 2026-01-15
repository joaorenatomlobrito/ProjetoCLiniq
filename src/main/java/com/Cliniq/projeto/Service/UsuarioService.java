package com.Cliniq.projeto.Service;

import com.Cliniq.projeto.Model.Usuario;
import com.Cliniq.projeto.Model.exception.ConflictException;
import com.Cliniq.projeto.Model.exception.ResourceNotFoundException;
import com.Cliniq.projeto.Model.exception.UnauthorizedException;
import com.Cliniq.projeto.Repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public Usuario salvaUsuario(Usuario usuario) {
        emailExiste(usuario.getEmail());
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        return usuarioRepository.save(usuario);
    }

    public void emailExiste(String email) {
        boolean existe = verificaEmailExistente(email);
        if (existe) {
            throw new ConflictException("Email ja cadastrado");
        }
    }

    public boolean verificaEmailExistente(String email) {
        return usuarioRepository.existsByEmail(email);
    }

    public Usuario autenticar(String email, String senha) {
        Usuario usuario = buscarUsuarioPorEmail(email);
        if (!passwordEncoder.matches(senha, usuario.getSenha())) {
            throw new UnauthorizedException("Credenciais invalidas");
        }
        return usuario;
    }

    public Usuario buscarUsuarioPorEmail(String email) {
        return usuarioRepository.findByEmail(email).orElseThrow(
                () -> new ResourceNotFoundException("Email nao encontrado: " + email));
    }

    public void deletarUsuarioPorEmail(String email) {
        usuarioRepository.deleteByEmail(email);
    }
}
