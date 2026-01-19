package com.Cliniq.projeto;

import com.Cliniq.projeto.Model.Exame;
import com.Cliniq.projeto.Model.Usuario;
import com.Cliniq.projeto.Repository.AnexoExameRepository;
import com.Cliniq.projeto.Repository.ExameRepository;
import com.Cliniq.projeto.Repository.UsuarioRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.security.test.context.support.WithMockUser;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@WithMockUser(roles = "PACIENTE")
class ExameControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ExameRepository exameRepository;

    @Autowired
    private AnexoExameRepository anexoExameRepository;

    @BeforeEach
    void setup() {
        anexoExameRepository.deleteAll();
        exameRepository.deleteAll();
        usuarioRepository.deleteAll();
    }

    @Test
    void criaEListaExames() throws Exception {
        Usuario usuario = criarUsuario("teste@cliniq.com");

        Map<String, Object> payload = new HashMap<>();
        payload.put("usuarioId", usuario.getIdUsuario());
        payload.put("titulo", "Funcao Renal");
        payload.put("categoria", "SANGUE");
        payload.put("tipoExame", "Hemograma");
        payload.put("dataExame", "2025-12-04");
        payload.put("clinica", "Clinica X");
        payload.put("medico", "Dra. Yasmin");
        payload.put("observacoes", "Observacoes");
        payload.put("status", "Completo");

        mockMvc.perform(post("/exames")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(payload)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.titulo").value("Funcao Renal"));

        mockMvc.perform(get("/exames").param("usuarioId", usuario.getIdUsuario().toString()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)));
    }

    @Test
    void resumoPorCategoria() throws Exception {
        Usuario usuario = criarUsuario("resumo@cliniq.com");

        Exame exameSangue = new Exame();
        exameSangue.setUsuario(usuario);
        exameSangue.setTitulo("Exame 1");
        exameSangue.setCategoria("SANGUE");
        exameSangue.setDataExame(LocalDate.now());
        exameRepository.save(exameSangue);

        Exame exameImagem = new Exame();
        exameImagem.setUsuario(usuario);
        exameImagem.setTitulo("Exame 2");
        exameImagem.setCategoria("IMAGEM");
        exameImagem.setDataExame(LocalDate.now());
        exameRepository.save(exameImagem);

        mockMvc.perform(get("/exames/resumo").param("usuarioId", usuario.getIdUsuario().toString()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.sangue").value(1))
                .andExpect(jsonPath("$.imagem").value(1))
                .andExpect(jsonPath("$.urina").value(0));
    }

    @Test
    void criaEListaAnexos() throws Exception {
        Usuario usuario = criarUsuario("anexo@cliniq.com");
        Exame exame = new Exame();
        exame.setUsuario(usuario);
        exame.setTitulo("Exame com anexo");
        exame.setCategoria("SANGUE");
        exame.setDataExame(LocalDate.now());
        exame = exameRepository.save(exame);

        Map<String, Object> anexo = new HashMap<>();
        anexo.put("nome", "Documento 1");
        anexo.put("tipo", "PDF");
        anexo.put("url", "https://exemplo.com/doc.pdf");

        mockMvc.perform(post("/exames/{id}/anexos", exame.getIdExame())
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(anexo)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.nome").value("Documento 1"));

        mockMvc.perform(get("/exames/{id}/anexos", exame.getIdExame()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)));
    }

    private Usuario criarUsuario(String email) {
        Usuario usuario = new Usuario();
        usuario.setNome("Teste");
        usuario.setEmail(email);
        usuario.setSenha("123456");
        usuario.setIdade("30");
        usuario.setSexo("M");
        usuario.setTipoSanguineo("O+");
        usuario.setTipoUsuario("Paciente");
        usuario.setAlergias("nenhuma");
        return usuarioRepository.save(usuario);
    }
}
