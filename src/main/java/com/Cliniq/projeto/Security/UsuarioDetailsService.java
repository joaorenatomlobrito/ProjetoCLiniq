package com.Cliniq.projeto.Security;

import com.Cliniq.projeto.Model.Usuario;
import com.Cliniq.projeto.Repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioDetailsService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByEmail(username).orElseThrow(
                () -> new UsernameNotFoundException("Usuario nao encontrado: " + username));
        return new User(
                usuario.getEmail(),
                usuario.getSenha(),
                mapRoles(usuario.getTipoUsuario())
        );
    }

    private List<GrantedAuthority> mapRoles(String tipoUsuario) {
        String role = tipoUsuario == null ? "PACIENTE" : tipoUsuario.trim().toUpperCase();
        role = role.replace(" ", "_");
        return List.of(new SimpleGrantedAuthority("ROLE_" + role));
    }
}
