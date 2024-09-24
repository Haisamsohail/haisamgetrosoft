import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RegistrationService } from '../../services/registration.service';
import { CountryResponse } from '../../interfaces/country-response.interface';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule]
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  countries: any[] = [];
  usernameTaken = false; 
  errorMessage = '';

  constructor(private fb: FormBuilder, private registrationService: RegistrationService) {
    this.registrationForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.pattern('^[a-z0-9]+$'),
        Validators.maxLength(20)
      ]],
      country: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCountries(); 
    this.setupUsernameValidation(); 
  }

  loadCountries(): void {
    this.registrationService.getCountries().subscribe(
      (response: CountryResponse) => this.countries = response.data,
      (error) => this.errorMessage = 'Failed to load countries.'
    );
  }
  

  setupUsernameValidation(): void {
    this.registrationForm.get('username')?.valueChanges
      .pipe(
        debounceTime(500),
        switchMap(username => this.registrationService.checkUsernameAvailability(username))
      )
      .subscribe(
        isAvailable => {
          this.usernameTaken = !isAvailable; // Update taken status
          this.errorMessage = this.usernameTaken ? 'Username is not available.' : ''; // Show error if taken
        },
        error => this.errorMessage = 'Failed to check username availability.'
      );
  }

  onSubmit(): void {
    if (this.registrationForm.valid && !this.usernameTaken) {
      const formData = {
        username: this.registrationForm.value.username,
        country: this.registrationForm.value.country
      };
      console.log('Form Submitted', formData);

      this.registrationService.submitRegistration(formData).subscribe(
        (response) => {
          console.log('Registration successful', response);
          alert('Registration Successful!');
          this.registrationForm.reset();
          this.usernameTaken = false; // Reset taken status
        },
        (error) => {
          this.errorMessage = 'Failed to submit registration. Please try again.';
          console.error('Submission error:', error);
        }
      );
    } else {
      alert('Please correct the errors in the form.');
    }
  }
}
