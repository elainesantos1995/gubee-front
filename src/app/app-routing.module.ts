import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { ProdutosComponent } from './produtos/produtos.component';

const routes: Routes = [
  { path: "produtos", component: ProdutosComponent},
  { path: "cadastro", component: CadastroProdutoComponent},
  { path: "cadastro/:id", component: CadastroProdutoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
