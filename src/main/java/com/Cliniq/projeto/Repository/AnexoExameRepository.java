package com.Cliniq.projeto.Repository;

import com.Cliniq.projeto.Model.AnexoExame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnexoExameRepository extends JpaRepository<AnexoExame, Long> {
    List<AnexoExame> findByExameIdExame(Long exameId);

    long countByExameIdExame(Long exameId);
}
