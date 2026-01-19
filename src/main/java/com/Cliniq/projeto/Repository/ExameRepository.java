package com.Cliniq.projeto.Repository;

import com.Cliniq.projeto.Model.Exame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExameRepository extends JpaRepository<Exame, Long> {

    List<Exame> findByUsuarioIdUsuarioOrderByDataExameDesc(Long usuarioId);

    @Query("select e.categoria as categoria, count(e) as total " +
            "from Exame e where e.usuario.idUsuario = :usuarioId group by e.categoria")
    List<CategoriaResumo> countByCategoria(@Param("usuarioId") Long usuarioId);

    interface CategoriaResumo {
        String getCategoria();
        long getTotal();
    }
}
