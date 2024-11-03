package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class DatabaseCheckController {
	   @Autowired
	    private JdbcTemplate jdbcTemplate;

	    @GetMapping("/check")
	    public String checkDatabase() {
	        try {
	            // Intenta ejecutar una consulta simple
	            jdbcTemplate.queryForObject("SELECT 1", Integer.class);
	            return "Database connection is successful!";
	        } catch (Exception e) {
	            return "Database connection failed: " + e.getMessage();
	        }
	    }
}
