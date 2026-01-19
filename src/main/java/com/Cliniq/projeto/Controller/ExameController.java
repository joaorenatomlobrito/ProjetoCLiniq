package com.Cliniq.projeto.Controller;

import com.Cliniq.projeto.Controller.dto.AnexoResponse;
import com.Cliniq.projeto.Controller.dto.ExameDetalheResponse;
import com.Cliniq.projeto.Controller.dto.ExameRequest;
import com.Cliniq.projeto.Controller.dto.ExameResponse;
import com.Cliniq.projeto.Controller.dto.ExameResumoResponse;
import com.Cliniq.projeto.Model.AnexoExame;
import com.Cliniq.projeto.Model.Exame;
import com.Cliniq.projeto.Repository.AnexoExameRepository;
import com.Cliniq.projeto.Service.AnexoExameService;
import com.Cliniq.projeto.Service.ExameService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/exames")
@RequiredArgsConstructor
public class ExameController {

    private final ExameService exameService;
    private final AnexoExameService anexoExameService;
    private final AnexoExameRepository anexoExameRepository;

    @PostMapping
    public ResponseEntity<ExameResponse> criar(@RequestBody ExameRequest request) {
        Exame exame = toEntity(request);
        Exame salvo = exameService.criar(exame, request.usuarioId());
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(salvo, 0));
    }

    @GetMapping
    public List<ExameResponse> listar(@RequestParam("usuarioId") Long usuarioId) {
        return exameService.listarPorUsuario(usuarioId).stream()
                .map(exame -> toResponse(exame, anexoExameRepository.countByExameIdExame(exame.getIdExame())))
                .toList();
    }

    @GetMapping("/resumo")
    public ExameResumoResponse resumo(@RequestParam("usuarioId") Long usuarioId) {
        Map<String, Long> resumo = exameService.resumoPorCategoria(usuarioId);
        return new ExameResumoResponse(
                resumo.getOrDefault("SANGUE", 0L),
                resumo.getOrDefault("URINA", 0L),
                resumo.getOrDefault("IMAGEM", 0L)
        );
    }

    @GetMapping("/{id}")
    public ExameDetalheResponse buscarPorId(@PathVariable Long id) {
        Exame exame = exameService.buscarPorId(id);
        List<AnexoResponse> anexos = anexoExameService.listar(id).stream()
                .map(this::toResponse)
                .toList();
        return new ExameDetalheResponse(
                exame.getIdExame(),
                exame.getTitulo(),
                exame.getCategoria(),
                exame.getTipoExame(),
                exame.getDataExame(),
                exame.getClinica(),
                exame.getMedico(),
                exame.getObservacoes(),
                exame.getStatus(),
                anexos
        );
    }

    @PutMapping("/{id}")
    public ExameResponse atualizar(@PathVariable Long id, @RequestBody ExameRequest request) {
        Exame atualizado = exameService.atualizar(id, toEntity(request));
        long anexos = anexoExameRepository.countByExameIdExame(atualizado.getIdExame());
        return toResponse(atualizado, anexos);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable Long id) {
        exameService.deletar(id);
    }

    private Exame toEntity(ExameRequest request) {
        Exame exame = new Exame();
        exame.setTitulo(request.titulo());
        exame.setCategoria(request.categoria());
        exame.setTipoExame(request.tipoExame());
        exame.setDataExame(request.dataExame());
        exame.setClinica(request.clinica());
        exame.setMedico(request.medico());
        exame.setObservacoes(request.observacoes());
        exame.setStatus(request.status());
        return exame;
    }

    private ExameResponse toResponse(Exame exame, long anexos) {
        return new ExameResponse(
                exame.getIdExame(),
                exame.getTitulo(),
                exame.getCategoria(),
                exame.getTipoExame(),
                exame.getDataExame(),
                exame.getClinica(),
                exame.getMedico(),
                exame.getStatus(),
                anexos
        );
    }

    private AnexoResponse toResponse(AnexoExame anexo) {
        return new AnexoResponse(
                anexo.getIdAnexoExame(),
                anexo.getNome(),
                anexo.getTipo(),
                anexo.getUrl()
        );
    }
}
