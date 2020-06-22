import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateFirmComponent } from './create-firm/create-firm.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "login", component: LoginComponent },
  { path: "createFirm", component: CreateFirmComponent },
  { path: "createEmployee", component: CreateEmployeeComponent },
  { path: "createTask", component: CreateTaskComponent },
  { path: "dashboard", component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
