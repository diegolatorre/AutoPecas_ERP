import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Produto } from 'src/app/model/produto/produto.model';
import Entrada, { ProdutoEntrada } from 'src/app/model/notas/entrada.model';
import { Contato } from 'src/app/model/contato/contato.model';

@Component({
  selector: 'app-cadastro-entrada',
  templateUrl: './cadastro-entrada.component.html',
  styleUrls: ['./cadastro-entrada.component.css']
})
export class CadastroEntradaComponent implements OnInit {

  entradaForm = new FormGroup({
    codigo: new FormControl(null, [Validators.required]),
    fornecedor: new FormControl(null, [Validators.required]),
    observacao: new FormControl(null, [Validators.required]),
    quantidadeProduto: new FormControl(null, [Validators.required]),
    produto: new FormControl(null, [Validators.required])
  });

  entrada: Entrada;
  produtos: Array<ProdutoEntrada> = [];

  editId: string | null = null;

  constructor() { }

  @Output()
  readonly quandoSelecionado = new EventEmitter<Produto>();

  ngOnInit(): void { }

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit = (): void => this.editId = null;

  deleteRow(id: number): void {
    this.produtos = this.produtos.filter(d => d.produto.id !== id);
  }

  addRow = () => {
    if (this.entradaForm.get('quantidadeProduto').value <= 0) {
      return;
    }

    const aux = this.produtos.filter(d => d.produto.id === this.entradaForm.get('produto').value.id);

    if (aux.length > 0) {
      return;
    }

    this.produtos = [
      ...this.produtos,
      {
        produto: this.entradaForm.get('produto').value,
        quantidade: this.entradaForm.get('quantidadeProduto').value
      }
    ];
    this.entradaForm.get('quantidadeProduto').setValue(0);
  }

  selecionaProduto = (produto: Produto) => this.entradaForm.get('produto').setValue(produto);

  selecionaFornecedor = (fornecedor: Contato) => this.entradaForm.get('fornecedor').setValue(fornecedor);

  submit = () => {
    if (this.entrada.produtos.length <= 0) {
      return;
    }
    this.entrada = {
      codigo: this.entradaForm.get('codigo').value,
      produtos: this.produtos,
      fornecedor: this.entradaForm.get('fornecedor').value,
      observacao: this.entradaForm.get('observacao').value
    };
    console.log(this.entrada);
  }
}
