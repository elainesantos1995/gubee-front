import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Produto } from '../model/model';
import { ProdutoService } from '../service/produto-service';
import { FormsModule, FormGroup, NgForm} from '@angular/forms';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {

  id: number;
  produto: Produto;
  produtos: Produto[];
  tecnologias: [];
  tecnologiasSelecionadas = [];

  constructor(
    private produtoService: ProdutoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];  

    if(this.id){
      this.produtoService.buscarPorId(this.id)
      .subscribe(response => {
        this.produto = response;
        console.log(response);
      },
        erroResponse => new Produto());
      } 
  }

  onSubmit(): void{

    if(this.id){      
      this.produtoService.editar(this.id, this.produto).subscribe(resposta => {
        this.navegate(['/cadastro/']);
      });
    }    
    
    else{ 
      this.produtoService.salvar(this.produto).subscribe(resposta => {       
        this.navegate(['/programas/']);
      });
      }    
  }

  navegate(url: string[]): any{
    this.router.navigate(url);
  }
}
 