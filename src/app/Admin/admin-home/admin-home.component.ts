import { Component, OnInit, inject } from '@angular/core';
import { NavigationComponent } from "../../User/navigation/navigation.component";
import { AdminNavComponent } from "../admin-nav/admin-nav.component";

import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AdminService } from '../../_service/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [NavigationComponent, AdminNavComponent, RouterOutlet, RouterLink],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit {
  adminService = inject(AdminService)

  ngOnInit(): void {
    this.LoadAdminData()
    console.log(this.adminService.Admin())
  }

  LoadAdminData() {
    const admin = localStorage.getItem('Admin');
    if (!admin) return;
    const adminToken = JSON.parse(admin);
    this.adminService.Admin.set(adminToken);

  }
}