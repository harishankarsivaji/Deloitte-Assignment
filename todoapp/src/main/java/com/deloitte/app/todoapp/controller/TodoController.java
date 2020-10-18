package com.deloitte.app.todoapp.controller;

import com.deloitte.app.todoapp.model.TodoList;
import com.deloitte.app.todoapp.repository.TodoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/todo")
public class TodoController {

    @Autowired
    private TodoRepo todoRepo;

//    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping()
    public List<TodoList> getAllTask() {
        return todoRepo.findAll();
    }

//    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/create")
    public TodoList createTask(@Valid @NotNull @RequestBody TodoList todoList) {
        return todoRepo.save(todoList);
    }

//    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/update/{id}")
    public List<TodoList> update(@PathVariable (value = "id") int id) {
        TodoList todo = todoRepo.findById(id).get();
        todo.setStatus(!todo.isStatus());
        todo.setLastUpdateTime(todo.getLastUpdateTime());
        todoRepo.save(todo);
        return todoRepo.findAll();
    }

//    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/delete/{id}")
    public List<TodoList> delete(@PathVariable (value = "id") int id) {
        todoRepo.deleteById(id);
        return todoRepo.findAll();
    }

//    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/delete")
    public List<TodoList> deleteAllTask() {
        todoRepo.deleteAll();
        return todoRepo.findAll();
    }
}
