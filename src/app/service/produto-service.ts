import { Injectable} from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Produto } from '../model/model';

@Injectable({
    providedIn: 'root'
})
export class ProdutoService{    
    
    url = 'http://localhost:8080/gubee/produtos';
    
    constructor(private http: HttpClient){ }
    
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    salvar(produto: Produto): Observable <Produto> {      
      return this.http.post<Produto>(this.url, JSON.stringify(produto), this.httpOptions)
          .pipe(
              retry(2),
              catchError(this.handleError)
      )     
    }

  editar(id: number, produto): Observable<any> {
      return this.http.put(this.url + `/${id}`, produto);
  }

  buscarPorId(id: number): Observable<Produto>{
    return this.http.get<Produto>(this.url+`/${id}`);
  }

  buscarTodos(): Observable<Produto[]>{
    return this.http.get<any>(this.url)
    .pipe(
      retry(2),
      catchError(this.handleError))    
  }

  deletar(id : number): Observable<any>{
    return this.http.delete<any>(this.url+`/${id}`);
  }

  filtrar(tecnologias: string, mercadoAlvo: string): Observable<Produto[]>{
    return this.http.get<Produto[]>(this.url+`/filter/${tecnologias}`+`/${mercadoAlvo}`)
    .pipe(
      retry(2),
      catchError(this.handleError))
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




