package com.Cliniq.projeto.Controller;

import com.Cliniq.projeto.Controller.dto.AnexoRequest;
import com.Cliniq.projeto.Controller.dto.AnexoResponse;
import com.Cliniq.projeto.Model.AnexoExame;
import com.Cliniq.projeto.Service.AnexoExameService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AnexoExameController {

    private final AnexoExameService anexoExameService;

    @PostMapping("/exames/{id}/anexos")
    public ResponseEntity<AnexoResponse> adicionar(@PathVariable Long id, @RequestBody AnexoRequest request) {
        AnexoExame anexo = new AnexoExame();
        anexo.setNome(request.nome());
        anexo.setTipo(request.tipo());
        anexo.setUrl(request.url());
        AnexoExame salvo = anexoExameService.adicionar(id, anexo);
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(salvo));
    }

    @PostMapping("/exames/{id}/anexos/upload")
    public ResponseEntity<AnexoResponse> upload(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        AnexoExame salvo = anexoExameService.adicionarArquivo(id, file);
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(salvo));
    }

    @GetMapping("/exames/{id}/anexos")
    public List<AnexoResponse> listar(@PathVariable Long id) {
        return anexoExameService.listar(id).stream()
                .map(this::toResponse)
                .toList();
    }

    @DeleteMapping("/anexos/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable Long id) {
        anexoExameService.deletar(id);
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
