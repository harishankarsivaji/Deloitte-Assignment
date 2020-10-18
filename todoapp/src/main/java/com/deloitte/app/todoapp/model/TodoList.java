package com.deloitte.app.todoapp.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

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
    private LocalDate lastUpdateTime;

    public TodoList(String title, boolean status, LocalDate lastUpdateTime) {
        super();
        this.title = title;
        this.status = status;
        this.lastUpdateTime = lastUpdateTime;
    }

    @PreUpdate
    @PrePersist
    public void preUpdate() {
        lastUpdateTime = LocalDate.now();
    }

}
