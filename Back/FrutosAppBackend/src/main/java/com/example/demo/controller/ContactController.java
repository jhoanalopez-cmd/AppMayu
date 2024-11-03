package com.example.demo.controller;

import com.example.demo.model.ContactMessageEntity;
import com.example.demo.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    @PostMapping("/send")
    public ResponseEntity<String> sendMessage(@RequestBody ContactMessageEntity contactMessage) {
        // Guardar el mensaje en la base de datos
        contactMessageRepository.save(contactMessage);
        
        // Respuesta de éxito
        return ResponseEntity.status(HttpStatus.OK).body("Mensaje enviado y guardado correctamente.");
    }
}
