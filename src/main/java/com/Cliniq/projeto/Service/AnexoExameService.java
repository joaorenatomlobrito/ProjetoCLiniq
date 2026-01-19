package com.Cliniq.projeto.Service;

import com.Cliniq.projeto.Model.AnexoExame;
import com.Cliniq.projeto.Model.Exame;
import com.Cliniq.projeto.Model.exception.ConflictException;
import com.Cliniq.projeto.Model.exception.ResourceNotFoundException;
import com.Cliniq.projeto.Repository.AnexoExameRepository;
import com.Cliniq.projeto.Repository.ExameRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class AnexoExameService {

    private final AnexoExameRepository anexoExameRepository;
    private final ExameRepository exameRepository;
    private final Path uploadPath;

    public AnexoExameService(
            AnexoExameRepository anexoExameRepository,
            ExameRepository exameRepository,
            @Value("${app.upload.dir:uploads}") String uploadDir
    ) {
        this.anexoExameRepository = anexoExameRepository;
        this.exameRepository = exameRepository;
        this.uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.uploadPath);
        } catch (IOException ex) {
            throw new IllegalStateException("Nao foi possivel criar o diretorio de upload.", ex);
        }
    }

    public AnexoExame adicionar(Long exameId, AnexoExame anexo) {
        Exame exame = exameRepository.findById(exameId).orElseThrow(
                () -> new ResourceNotFoundException("Exame nao encontrado: " + exameId));
        anexo.setExame(exame);
        return anexoExameRepository.save(anexo);
    }

    public List<AnexoExame> listar(Long exameId) {
        if (!exameRepository.existsById(exameId)) {
            throw new ResourceNotFoundException("Exame nao encontrado: " + exameId);
        }
        return anexoExameRepository.findByExameIdExame(exameId);
    }

    public void deletar(Long id) {
        AnexoExame existente = anexoExameRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Anexo nao encontrado: " + id));
        anexoExameRepository.delete(existente);
    }

    public AnexoExame adicionarArquivo(Long exameId, MultipartFile arquivo) {
        if (arquivo == null || arquivo.isEmpty()) {
            throw new ConflictException("Arquivo invalido.");
        }
        Exame exame = exameRepository.findById(exameId).orElseThrow(
                () -> new ResourceNotFoundException("Exame nao encontrado: " + exameId));

        String original = StringUtils.cleanPath(arquivo.getOriginalFilename() == null ? "" : arquivo.getOriginalFilename());
        if (original.isBlank()) {
            original = "anexo";
        }
        String storedName = UUID.randomUUID() + "_" + original;
        Path target = uploadPath.resolve(storedName);
        try {
            Files.copy(arquivo.getInputStream(), target);
        } catch (IOException ex) {
            throw new IllegalStateException("Falha ao salvar arquivo.", ex);
        }

        AnexoExame anexo = new AnexoExame();
        anexo.setExame(exame);
        anexo.setNome(original);
        anexo.setTipo(arquivo.getContentType());
        anexo.setUrl("/uploads/" + storedName);
        return anexoExameRepository.save(anexo);
    }
}
