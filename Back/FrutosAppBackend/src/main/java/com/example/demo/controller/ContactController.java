package com.example.demo.controller;

import com.example.demo.model.ContactMessageEntity;
import com.example.demo.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:8081") // Cambia esto si el frontend está en otro puerto
public class ContactController {

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    // Enviar y guardar un mensaje de contacto
    @PostMapping("/send")
    public ResponseEntity<String> sendMessage(@RequestBody ContactMessageEntity contactMessage) {
        contactMessageRepository.save(contactMessage);
        return ResponseEntity.status(HttpStatus.CREATED).body("Mensaje enviado y guardado correctamente.");
    }

    // Obtener todos los mensajes de contacto
    @GetMapping("/all")
    public List<ContactMessageEntity> getAllMessages() {
        return contactMessageRepository.findAll();
    }

    // Obtener un mensaje de contacto por ID
    @GetMapping("/get/{id}")
    public ResponseEntity<ContactMessageEntity> getMessageById(@PathVariable("id") Long id) {
        Optional<ContactMessageEntity> contactMessage = contactMessageRepository.findById(id);
        return contactMessage.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Actualizar un mensaje de contacto existente
    @PutMapping("/update/{id}")
    public ResponseEntity<ContactMessageEntity> updateMessage(@PathVariable("id") Long id, @RequestBody ContactMessageEntity messageDetails) {
        return contactMessageRepository.findById(id)
                .map(message -> {
                    message.setName(messageDetails.getName());
                    message.setEmail(messageDetails.getEmail());
                    message.setMessage(messageDetails.getMessage());
                    ContactMessageEntity updatedMessage = contactMessageRepository.save(message);
                    return ResponseEntity.ok(updatedMessage);
                })
                .orElseGet(() -> {
                    messageDetails.setId(id);
                    ContactMessageEntity createdMessage = contactMessageRepository.save(messageDetails);
                    return ResponseEntity.status(HttpStatus.CREATED).body(createdMessage);
                });
    }

    // Eliminar un mensaje de contacto
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable("id") Long id) {
        if (contactMessageRepository.existsById(id)) {
            contactMessageRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
