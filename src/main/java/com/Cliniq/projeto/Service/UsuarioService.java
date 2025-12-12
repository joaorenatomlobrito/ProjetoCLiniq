package com.Cliniq.projeto.Service;

import com.Cliniq.projeto.Model.Usuario;
import com.Cliniq.projeto.Model.exception.ConflictException;
import com.Cliniq.projeto.Model.exception.ResourceNotFoundException;
import com.Cliniq.projeto.Repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;


    public Usuario salvaUsuario(Usuario usuario) {
        try {
            emailExiste(usuario.getEmail());
            usuario.setSenha(passwordEncoder.encode(usuario.getSenha())); // Criptografia da senha
            return usuarioRepository.save(usuario);
        } catch (ConflictException e) {
            throw new ConflictException("Email já cadastrado", e.getCause());
        }
    }

    public void emailExiste(String email) {
        try {
            boolean existe = verificaEmailexistente(email);
            if (existe) {
                throw new ConflictException("O email já cadastrado");
            }
        } catch (ConflictException e) {
            throw new RuntimeException("Emai já cadastrado " + e.getMessage());
        }
    }

    public boolean verificaEmailexistente(String email) {
        return usuarioRepository.existsByEmail(email);
    }
    public  Usuario buscarUsuarioPorEmail(String email){
        return usuarioRepository.findByEmail(email).orElseThrow(
                ()-> new ResourceNotFoundException("Email não encontrado "+ email));

    }
    public void deletarUsuarioPorEmail(String email){
        usuarioRepository.deleteByEmail(email);
    }
}
