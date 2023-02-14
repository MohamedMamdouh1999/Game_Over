import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/guard/auth.guard';
import { DetailsComponent } from './details/details.component';
import { GamesComponent } from './games/games.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:"", redirectTo:"home", pathMatch:"full"},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"home", canActivate:[AuthGuard], component:HomeComponent},
  {path:"details/:id", canActivate:[AuthGuard], component:DetailsComponent},
  {path:"games/:gamesBy", canActivate:[AuthGuard], component:GamesComponent},
  {path:"games/:gamesBy/:selected", canActivate:[AuthGuard], component:GamesComponent},
  {path:"**", component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
