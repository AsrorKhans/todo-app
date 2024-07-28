// src/app/todos/todo-form/todo-form.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  todo: any = { title: '', description: '' };
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.todoService.getTodo(id).subscribe(todo => this.todo = todo);
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.todoService.updateTodo(this.todo.id, this.todo).subscribe(() => {
        this.router.navigate(['/todos']);
      });
    } else {
      this.todoService.createTodo(this.todo).subscribe(() => {
        this.router.navigate(['/todos']);
      });
    }
  }
}
