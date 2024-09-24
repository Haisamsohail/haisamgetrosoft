import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsernameResponse } from '../interfaces/user.interface';
import { CountryResponse } from '../interfaces/country-response.interface'; // Import the new interface

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private mockUsernamesUrl = 'assets/mock-usernames.json';
  private mockCountriesUrl = 'assets/mock-countries.json';
  private submitApiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<CountryResponse> {
    return this.http.get<CountryResponse>(this.mockCountriesUrl);
  }

  checkUsernameAvailability(username: string): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        const takenUsernames = ['john', 'doe', 'admin'];
        observer.next(!takenUsernames.includes(username)); // Simulate async availability check
        observer.complete();
      }, 500); // Simulate network delay
    });
  }

  submitRegistration(data: { username: string; country: string }): Observable<any> {
    return this.http.post(this.submitApiUrl, data);
  }
}
