package com.example.demo.controller;

import com.example.demo.model.OrderEntity;
import com.example.demo.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @PostMapping("/create")
    public ResponseEntity<String> createOrder(@RequestBody OrderEntity order) {
        // Guardar el pedido en la base de datos
        orderRepository.save(order);
        
        // Respuesta de éxito
        return ResponseEntity.status(HttpStatus.CREATED).body("Pedido creado y guardado correctamente.");
    }
}

