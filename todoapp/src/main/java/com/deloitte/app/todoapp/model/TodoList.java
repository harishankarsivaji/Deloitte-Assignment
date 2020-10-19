package com.deloitte.app.todoapp.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TodoList {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @NotBlank
    private String title;
    private boolean status;
    @NotBlank
    private String description;
    private String lastUpdateTime;

    public TodoList(String title, boolean status, String lastUpdateTime, String description) {
        super();
        this.title = title;
        this.status = status;
        this.description = description;
        this.lastUpdateTime = lastUpdateTime;
    }

    @PreUpdate
    @PrePersist
    public void preUpdate() {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        lastUpdateTime = dtf.format(now);
    }

}
