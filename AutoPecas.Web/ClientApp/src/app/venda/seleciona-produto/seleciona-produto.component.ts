import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Produto } from 'src/app/model/produto/produto.model';
import { Marca } from 'src/app/model/produto/marca.model';
import { Categoria } from 'src/app/model/produto/categoria.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProdutoVenda } from 'src/app/model/venda/produto-venda.model';

@Component({
  selector: 'app-seleciona-produto',
  templateUrl: './seleciona-produto.component.html',
  styleUrls: ['./seleciona-produto.component.css']
})
export class SelecionaProdutoComponent implements OnInit {
  produtoVendaForm = new FormGroup(
    {
      quantidade: new FormControl(1, [Validators.required]),
      desconto: new FormControl(0.00, [Validators.required, Validators.min(0), Validators.max(100)]),
    });

  produto: Produto;
  produtoVenda: ProdutoVenda;

  valido = true;

  @Input() editarProduto?: any;

  constructor(
    private modal: NzModalRef,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (this.editarProduto) {
      this.produto = this.editarProduto.produto;
      this.produtoVendaForm.get('quantidade').setValue(this.editarProduto.quantidade);
      this.produtoVendaForm.get('desconto').setValue(this.editarProduto.desconto);
      this.changeDetectorRef.markForCheck();
    }
  }

  fechar(): void {
    this.produtoVenda = {
      idProduto: this.produto.id,
      quantidade: Number(this.produtoVendaForm.get('quantidade').value),
      desconto: this.produtoVendaForm.get('desconto').value,
      valorFinal: (this.produto.valorVenda * this.produtoVendaForm.get('quantidade').value) - (this.produtoVendaForm.get('desconto').value * (this.produto.valorVenda * this.produtoVendaForm.get('quantidade').value)) / 100,
      produto: this.produto
    } as ProdutoVenda;

    this.modal.destroy(this.produto.id ? this.produtoVenda : null);
  }

  destroy() {
    this.modal.destroy();
  }

  selecionaProduto(produto: Produto) {
    console.log(produto);
    this.produto = produto;
    produto.quantidade <= 0 ? this.valido = false : this.valido = true;
    this.produtoVendaForm.get('quantidade').setValidators(Validators.max(produto.quantidade));
  }
}
