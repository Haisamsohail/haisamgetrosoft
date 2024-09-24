export interface User {
    username: string;
    country: string;
  }
  
  export interface Country {
    name: string;
    code: string;
  }

  export interface UsernameResponse {
    takenUsernames: string[];
  }
  