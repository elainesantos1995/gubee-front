import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from '../model/model';
import { ProdutoService } from '../service/produto-service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  id: number;
  produto: Produto;
  produtos: Produto[];
  tecnologias: String[];
  tecnologiasSelecionadas: String[];
  nome: string;

  constructor(
    private produtoService: ProdutoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buscarTodos();    
  }  

  navegate(url: string[]): any{
    this.router.navigate(url);
  }

  buscarTodos(){
    this.produtoService.buscarTodos().subscribe((produtos: Produto[]) => {
     this.produtos = produtos;
     console.log(produtos)
   });
  }

  deletar(id: number){
    this.produtoService.deletar(id)
      .subscribe(response => {  
        location.reload();
        return false;      
      });
  }
  
}

