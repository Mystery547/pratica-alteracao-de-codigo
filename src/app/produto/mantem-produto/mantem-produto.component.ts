import { Component } from '@angular/core';
import { Produto } from 'src/app/shared/modelo/produto';
import { PRODUTOS } from 'src/app/shared/modelo/PRODUTOS';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mantem-produto',
  templateUrl: './mantem-produto.component.html',
  styleUrls: ['./mantem-produto.component.css']
})
export class MantemProdutoComponent {
  produtoDeManutencao: Produto;
  estaCadastrando = true;
  nomeBotaoDeManutencao = 'Cadastrar'

  produtos = PRODUTOS;
  constructor(private rotaAtual: ActivatedRoute, private roteador: Router) {
    this.produtoDeManutencao = new Produto(0, '', 0);
    const idParaEdicao = this.rotaAtual.snapshot.paramMap.get('id');
    if (idParaEdicao) {
      const produtoEncontrado = this.produtos.find(produto => produto.id.toString() === idParaEdicao);
      if (produtoEncontrado) {
        this.estaCadastrando = false;
        this.nomeBotaoDeManutencao = 'Salvar';
        this.produtoDeManutencao = produtoEncontrado;
      } else {
        this.nomeBotaoDeManutencao = 'Cadastrar'
      }
    }
  }
   manter(): void {
    if (this.estaCadastrando && this.produtoDeManutencao) {
      this.produtos.push(this.produtoDeManutencao);
    }
    this.produtoDeManutencao =  new Produto(0, '', 0);
    this.nomeBotaoDeManutencao = 'Cadastrar';
    this.roteador.navigate(['listagemprodutos'])
   }
}
