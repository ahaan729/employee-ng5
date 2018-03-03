import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AddService} from './add.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'emp-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  employeeForm: FormGroup;
  action = 'Add';
  addEmpObject: any;
  constructor(
    private formBuilder: FormBuilder,
    private addService: AddService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.addService.getEmployeeList().subscribe(
      employeeList => {
        this.addService.employeeDetails = employeeList;
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('A client-side or network error occurred while accessing addService', err.error.message);
        } else {
          // Response body may contain clues as to what went wrong
          console.log(`Backend returned an unsuccessful response code ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  // Creating Employee Form
  createForm() {
    this.employeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      emailAddress: ['', Validators.required],
      phoneNo: ['', Validators.required]
    });
  }

  // Add Employee
  addEmp() {
    this.addEmpObject = {
      'firstName': this.employeeForm.controls['firstName'].value,
      'lastName': this.employeeForm.controls['lastName'].value,
      'age': this.employeeForm.controls['age'].value,
      'emailAddress': this.employeeForm.controls['emailAddress'].value,
      'phoneNo': this.employeeForm.controls['phoneNo'].value
    };
    this.addService.employeeDetails.push(this.addEmpObject);
    // console.log(this.addService.employeeDetails);
    this.resetForm();
    this.router.navigate(['/view']);
  }

  // Reset Form
  resetForm = function() {
    this.employeeForm.controls['firstName'].setValue('');
    this.employeeForm.controls['lastName'].setValue('');
    this.employeeForm.controls['age'].setValue('');
    this.employeeForm.controls['emailAddress'].setValue('');
    this.employeeForm.controls['phoneNo'].setValue('');
  };
}
