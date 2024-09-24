import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
// Do not declare RegistrationComponent here if it's standalone
import { AppRoutingModule } from './app-routing.module'; // Include your routing module

@NgModule({
  declarations: [
    AppComponent,
    // No RegistrationComponent here
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
