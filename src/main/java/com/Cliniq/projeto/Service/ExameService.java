package com.Cliniq.projeto.Service;

import com.Cliniq.projeto.Model.Exame;
import com.Cliniq.projeto.Model.Usuario;
import com.Cliniq.projeto.Model.exception.ResourceNotFoundException;
import com.Cliniq.projeto.Repository.ExameRepository;
import com.Cliniq.projeto.Repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ExameService {

    private final ExameRepository exameRepository;
    private final UsuarioRepository usuarioRepository;

    public Exame criar(Exame exame, Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow(
                () -> new ResourceNotFoundException("Usuario nao encontrado: " + usuarioId));
        exame.setUsuario(usuario);
        return exameRepository.save(exame);
    }

    public Exame atualizar(Long id, Exame atualizado) {
        Exame existente = buscarPorId(id);
        existente.setTitulo(atualizado.getTitulo());
        existente.setCategoria(atualizado.getCategoria());
        existente.setTipoExame(atualizado.getTipoExame());
        existente.setDataExame(atualizado.getDataExame());
        existente.setClinica(atualizado.getClinica());
        existente.setMedico(atualizado.getMedico());
        existente.setObservacoes(atualizado.getObservacoes());
        existente.setStatus(atualizado.getStatus());
        return exameRepository.save(existente);
    }

    public Exame buscarPorId(Long id) {
        return exameRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Exame nao encontrado: " + id));
    }

    public List<Exame> listarPorUsuario(Long usuarioId) {
        validarUsuario(usuarioId);
        return exameRepository.findByUsuarioIdUsuarioOrderByDataExameDesc(usuarioId);
    }

    public void deletar(Long id) {
        Exame existente = buscarPorId(id);
        exameRepository.delete(existente);
    }

    public Map<String, Long> resumoPorCategoria(Long usuarioId) {
        validarUsuario(usuarioId);
        Map<String, Long> resumo = new HashMap<>();
        resumo.put("SANGUE", 0L);
        resumo.put("URINA", 0L);
        resumo.put("IMAGEM", 0L);
        for (ExameRepository.CategoriaResumo item : exameRepository.countByCategoria(usuarioId)) {
            String categoria = item.getCategoria();
            if (categoria != null) {
                resumo.put(categoria.toUpperCase(), item.getTotal());
            }
        }
        return resumo;
    }

    private void validarUsuario(Long usuarioId) {
        if (!usuarioRepository.existsById(usuarioId)) {
            throw new ResourceNotFoundException("Usuario nao encontrado: " + usuarioId);
        }
    }
}
