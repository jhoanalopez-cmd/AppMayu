package com.example.demo;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:8081") // Cambia esto si el frontend está en otro puerto
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Método de prueba para verificar la base de datos
    @GetMapping("/test")
    public String testDatabase() {
        User user = new User("Test", "User", "Ciudad de Prueba", "CC", "12345678", "123456789", "555-1234", "test@example.com", "password");
        userRepository.save(user); // Guardar el usuario en la base de datos
        return "Usuario guardado con ID: " + user.getId();
    }

    // Obtener todos los usuarios
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Crear un nuevo usuario
    @PostMapping("/create")
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // Obtener un usuario por ID
    @GetMapping("/get/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        return userRepository.findById(id);
    }

    // Actualizar un usuario existente
    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setNombre(userDetails.getNombre());
                    user.setApellido(userDetails.getApellido());
                    user.setCiudad(userDetails.getCiudad());
                    user.setTipoDocumentoIdentidad(userDetails.getTipoDocumentoIdentidad());
                    user.setDocumentoIdentidad(userDetails.getDocumentoIdentidad());
                    user.setNit(userDetails.getNit());
                    user.setTelefono(userDetails.getTelefono());
                    user.setCorreo(userDetails.getCorreo());
                    user.setContrasena(userDetails.getContrasena());
                    User updatedUser = userRepository.save(user);
                    return ResponseEntity.ok(updatedUser);
                })
                .orElseGet(() -> {
                    userDetails.setId(id);
                    User createdUser = userRepository.save(userDetails);
                    return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
                });
    }



    // Eliminar un usuario
    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
}
