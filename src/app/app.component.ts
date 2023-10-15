import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { TodoService } from './todo.service';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todos: Todo[] = []
  form:FormGroup = new FormGroup({
   description:new FormControl('', [Validators.required, Validators.minLength(4)])})
constructor(private service:TodoService){

}

ngOnInit(){
  this.service.listar().subscribe(todoList=>this.todos= todoList);
    
}
listarTodos(){
  this.service.listar().subscribe(todoList=>this.todos= todoList);
}


  submit(){
    const todo:Todo = { ...this.form.value}
    this.service.salvar(todo)
    .subscribe(savedTodo =>{
      this.todos.push(savedTodo)
      this.form.reset()
    })
  } 

  delete(todo:Todo){
    this.service.deletar(todo.id).subscribe({
      next:(response)=>this.listarTodos()
    })

  }
  done(todo:Todo){
    this.service.marcarComoConcluido({ id: todo.id }).subscribe({
      next:(todoUpdated)=>{
        todo.done = todoUpdated.done
        todo.doneDate = todoUpdated.doneDate
      }
    })
  }
}
