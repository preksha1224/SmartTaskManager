import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';

import { TaskService } from '../core/services/task';
import { Task, TaskCategory, TaskCreate, TaskUpdate } from '../shared/models';

@Component({
  selector: 'app-task-dialog',
  standalone: false,
  templateUrl: './task-dialog.html',
  styleUrl: './task-dialog.css',
})
export class TaskDialog implements OnInit {

  taskForm!: FormGroup;

  loading = false;
  isEditMode = false;

  priorities = ['Low', 'Medium', 'High'] as const;
  statuses = ['Pending', 'Completed'] as const;
  categories = Object.values(TaskCategory);

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<TaskDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { task?: Task }
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data?.task;
    this.buildForm();

    if (this.isEditMode && this.data.task) {
      this.taskForm.patchValue(this.mapTaskToForm(this.data.task));
    }
  }

  // =========================
  // FORM CREATION
  // =========================
  private buildForm(): void {
    this.taskForm = this.fb.group({
      title: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(255)],
      ],
      description: [''],
      priority: ['Medium', Validators.required],
      status: ['Pending'],
      category: [TaskCategory.OTHER, Validators.required],
      due_date: [null],
    });
  }

  // =========================
  // MAPPING (clean separation)
  // =========================
  private mapTaskToForm(task: Task) {
    return {
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      category: task.category,
      due_date: task.due_date ? new Date(task.due_date) : null,
    };
  }

  // =========================
  // MAIN SAVE LOGIC (clean + unified)
  // =========================
  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const payload = this.taskForm.getRawValue();

    const request$ = this.isEditMode
      ? this.taskService.updateTask(
          this.data.task!.id,
          payload as TaskUpdate
        )
      : this.taskService.createTask(payload as TaskCreate);

    request$
      .pipe(
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: (task) => this.dialogRef.close(task),
        error: (err) => {
          console.error('Task save failed:', err);
          // replace alert with snackbar/toast in real apps
        },
      });
  }

  // =========================
  // CLOSE
  // =========================
  onCancel(): void {
    this.dialogRef.close();
  }
}
