import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Produto } from 'src/app/model/produto/produto.model';
import Entrada from 'src/app/model/notas/entrada.model';
import { Contato } from 'src/app/model/contato/contato.model';
import { ProdutoNota } from 'src/app/model/notas/produto-nota.model';
import { NotaService } from 'src/app/service/nota.service';

@Component({
  selector: 'app-cadastro-entrada',
  templateUrl: './cadastro-entrada.component.html',
  styleUrls: ['./cadastro-entrada.component.css']
})
export class CadastroEntradaComponent implements OnInit {

  entradaForm = new FormGroup({
    chaveAcesso: new FormControl(null, [Validators.required]),
    fornecedor: new FormControl(null, [Validators.required]),
    observacao: new FormControl(null, [Validators.required]),
    quantidadeProduto: new FormControl(null, [Validators.required]),
    produto: new FormControl(null, [Validators.required])
  });

  entrada: Entrada;
  produtos: Array<ProdutoNota> = [];

  editId: string | null = null;

  constructor(
    private service: NotaService
  ) { }

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

    this.produtos = [
      ...this.produtos,
      {
        idProduto: this.entradaForm.get('produto').value.id,
        produto: this.entradaForm.get('produto').value,
        quantidade: this.entradaForm.get('quantidadeProduto').value
      }
    ];
    this.entradaForm.get('quantidadeProduto').setValue(0);
  }

  selecionaProduto = (produto: Produto) => this.entradaForm.get('produto').setValue(produto);

  selecionaFornecedor = (fornecedor: Contato) => this.entradaForm.get('fornecedor').setValue(fornecedor);

  submit = () => {

    if (this.produtos.length <= 0) {
      return;
    }
    this.entrada = {
      chaveAcesso: this.entradaForm.get('chaveAcesso').value,
      idContatoOrigem: this.entradaForm.get('fornecedor').value.id,
      observacao: this.entradaForm.get('observacao').value
    };
    console.log(this.entrada);
    this.service.finalizar(this.entrada).subscribe();
  }
}
