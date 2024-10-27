import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranzilaService {
  private apiUrl = 'https://secure5.tranzila.com/cgi-bin/tranzila71u.cgi';

  constructor(private http: HttpClient) { }

  chargeTransaction(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = { headers: headers };

    return this.http.post<any>(this.apiUrl, this.serialize(data), options);
  }

  private serialize(obj: any): string {
    const str = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    }
    return str.join('&');
  }
}
