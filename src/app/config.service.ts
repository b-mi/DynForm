import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  http = inject(HttpClient);
  formWriteServiceEndpoint!: string;

  constructor() { 
    this.getConfig();
  }
  async getConfig() {
    const cfg = await lastValueFrom( this.http.get('/assets/config.json') );
    this.formWriteServiceEndpoint = (<any>cfg).formWriteServiceEndpoint;
    console.log('cf', cfg);
    
  }

  

}
