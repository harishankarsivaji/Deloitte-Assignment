package com.deloitte.app.todoapp.repository;

import com.deloitte.app.todoapp.model.TodoList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TodoRepo extends JpaRepository<TodoList, Integer> {
}
