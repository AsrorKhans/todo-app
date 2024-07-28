// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { TodoListComponent } from './todos/todo-list/todo-list.component';
import { TodoDetailComponent } from './todos/todo-detail/todo-detail.component';
import { TodoFormComponent } from './todos/todo-form/todo-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'todos', component: TodoListComponent, canActivate: [AuthGuard] },
  { path: 'todos/add', component: TodoFormComponent, canActivate: [AuthGuard] },
  { path: 'todos/edit/:id', component: TodoFormComponent, canActivate: [AuthGuard] },
  { path: 'todos/:id', component: TodoDetailComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
