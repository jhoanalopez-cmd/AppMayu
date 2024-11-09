package com.example.demo.controller;

import com.example.demo.model.OrderEntity;
import com.example.demo.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:8081") // Cambia esto si el frontend está en otro puerto
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    // Crear un nuevo pedido
    @PostMapping("/create")
    public ResponseEntity<OrderEntity> createOrder(@RequestBody OrderEntity order) {
        OrderEntity savedOrder = orderRepository.save(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedOrder);
    }

    // Obtener todos los pedidos
    @GetMapping("/all")
    public List<OrderEntity> getAllOrders() {
        return orderRepository.findAll();
    }

    // Obtener un pedido por ID
    @GetMapping("/get/{id}")
    public ResponseEntity<OrderEntity> getOrderById(@PathVariable("id") Long id) {
        Optional<OrderEntity> order = orderRepository.findById(id);
        return order.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Actualizar un pedido existente
    @PutMapping("/update/{id}")
    public ResponseEntity<OrderEntity> updateOrder(@PathVariable("id") Long id, @RequestBody OrderEntity orderDetails) {
        return orderRepository.findById(id)
                .map(order -> {
                    order.setProductName(orderDetails.getProductName());
                    order.setQuantity(orderDetails.getQuantity());
                    order.setEmail(orderDetails.getEmail());
                    order.setDeliveryAddress(orderDetails.getDeliveryAddress());
                    OrderEntity updatedOrder = orderRepository.save(order);
                    return ResponseEntity.ok(updatedOrder);
                })
                .orElseGet(() -> {
                    orderDetails.setId(id);
                    OrderEntity createdOrder = orderRepository.save(orderDetails);
                    return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
                });
    }

    // Eliminar un pedido
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable("id") Long id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
