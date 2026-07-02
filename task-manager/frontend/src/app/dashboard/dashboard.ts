import { Component, OnInit, inject } from '@angular/core';
import { TaskService } from '../core/services/task';
import { AuthService } from '../core/services/auth-service';
import { Task } from '../shared/models';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialog } from '../task-dialog/task-dialog';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private taskService = inject(TaskService);
  public authService = inject(AuthService);
  private dialog = inject(MatDialog);

  tasks: Task[] = [];
  errorMessage = '';

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load tasks';
      },
    });
  }

   openTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskDialog, {

  maxHeight: '90vh',
  panelClass: 'task-dialog-container',
  autoFocus: false
});
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadTasks();
      }
    });
  }

  logout() {
    this.authService.logout();
    window.location.reload(); // Simple way to trigger guard
  }
}
