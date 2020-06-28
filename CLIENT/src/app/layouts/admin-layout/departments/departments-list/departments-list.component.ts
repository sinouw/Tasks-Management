import { Router } from '@angular/router';
import { AccountService } from './../../../../services/account.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentsService } from 'app/services/departments.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css']
})
export class DepartmentsListComponent {
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['position', 'title', 'description','status', 'createdAt', 'action'];

  constructor(private departmentSerivce : DepartmentsService,
    private accountService : AccountService,
    private router : Router ) { 
    let token =this.accountService.getDecodedToken();
    let currentRoles = token.roles;
    let currentUserId = token.sub;
    let isAdmin = currentRoles.some(role => currentRoles.includes("admin"));
    if(isAdmin) this.getAllForAdmin()
    else this.getAllForAdmin()

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllForAdmin() {
    this.departmentSerivce.getAll()
    .subscribe((response : any)=>{
     console.log("departments : ",response)
    //  response.map(res=>{
    //    if (res.description.length>100) {
    //     res.description = res.description.substring(0,120)
    //     res.description = res.description+"..." 
    //    }
    //  }) 
     this.dataSource = new MatTableDataSource(response);
    this.dataSource.paginator = this.paginator;
    })
  }

  editById(body){
    // this.sendSubcription(body)
    this.departmentSerivce.fillFormModel(body)
    this.router.navigateByUrl('/departments/edit')
  }

  deleteById(id,index){
    this.departmentSerivce.deleteById(id)
    .subscribe(
      (res: any) => {
        console.log(res);
        this.dataSource.data.splice(index, 1);
        this.dataSource = new MatTableDataSource(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
        // this.toastr.info('House Suppression !', 'House deleted successfully.');
      },
      err => {
        console.log(err);
      },
    );
  }

  sendSubcription(body): void {    
    this.departmentSerivce.sendSubcription(body)
  }
 

}
