package com.Cliniq.projeto.Repository;

import com.Cliniq.projeto.Model.Usuario;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class UsuarioRepository extends JpaRepository<Usuario,Long> {

    boolean existByEmail(String email);

    Optional<Usuario> findByEmail(String email);

    @Transactional
    void deleteByEmail(String email);
}
