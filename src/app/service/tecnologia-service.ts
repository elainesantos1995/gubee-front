import { Injectable} from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Tecnologia } from '../model/model';

@Injectable({
    providedIn: 'root'
})
export class TecnologiaService{
    
    
    url = 'http://localhost:8090/gubee/tecnologias';
    
    constructor(private http: HttpClient){ }
    
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    salvar(tecnologia: Tecnologia): Observable <Tecnologia> {      
      return this.http.post<Tecnologia>(this.url, JSON.stringify(tecnologia), this.httpOptions)
          .pipe(
              retry(2),
              catchError(this.handleError)
      )     
    }

  editar(id: number, tecnologia): Observable<any> {
      return this.http.put(this.url + `/${id}`, tecnologia);
  }

  buscarPorId(id: number): Observable<Tecnologia>{
    return this.http.get<Tecnologia>(this.url+`${id}`);
  }

  buscarTodos(): Observable<Tecnologia[]>{
    return this.http.get<any>(this.url)
    .pipe(
      retry(2),
      catchError(this.handleError))    
  }

  deletar(id : number): Observable<any>{
    return this.http.delete<any>(this.url+`/${id}`);
  }

    handleError(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // Erro ocorreu no lado do cliente
          errorMessage = error.error.message;
        } else {
          // Erro ocorreu no lado do servidor
          errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
      };
    

}




