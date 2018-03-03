import { Component, OnInit } from '@angular/core';
import {AddService} from '../add/add.service';

@Component({
  selector: 'emp-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  employeeDetails = [];
  constructor(
    private service: AddService
  ) { }

  ngOnInit() {
    this.employeeDetails = this.service.employeeDetails;
  }

}
