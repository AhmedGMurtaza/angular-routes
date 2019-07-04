import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// components
import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { HomeComponent } from './home/home.component';
import {LoginComponent} from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path:'', redirectTo:'home',pathMatch:'full'},
      {path:'home',component:HomeComponent},
      {path:'books',component:BookListComponent},
      {path:'login',component:LoginComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
