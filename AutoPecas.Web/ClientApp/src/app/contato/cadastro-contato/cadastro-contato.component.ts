import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContatoService } from 'src/app/service/contato.service';
import { Contato } from 'src/app/model/contato/contato.model';

@Component({
  selector: 'app-cadastro-contato',
  templateUrl: './cadastro-contato.component.html',
  styleUrls: ['./cadastro-contato.component.css']
})
export class CadastroContatoComponent implements OnInit {
  contatoForm = new FormGroup(
    {
      idContato: new FormControl(null),
      nome: new FormControl(null, [Validators.required]),
      apelido: new FormControl(null, [Validators.required]),
      cpf: new FormControl(null, [Validators.required]),
      rg: new FormControl(null, [Validators.required]),
      tipo: new FormControl(null, [Validators.required]),
      profissao: new FormControl(null, [Validators.required]),
      dataNascimento: new FormControl(null, [Validators.required]),
      sexo: new FormControl(null, [Validators.required]),
      observacao: new FormControl(null, [Validators.required]),
    });

  constructor(
    private contatoService: ContatoService
  ) { }

  ngOnInit(): void {
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
    console.log(this.contatoForm.get('dataNascimento').value);
  }

  limpar() {
    this.contatoForm.reset();
  }

  cadastrar() {
    let contato = {
      nome: this.contatoForm.get('nome').value,
      apelido: this.contatoForm.get('apelido').value,
      cpf: this.contatoForm.get('cpf').value,
      rg: this.contatoForm.get('rg').value,
      tipo: this.contatoForm.get('tipo').value,
      profissao: this.contatoForm.get('profissao').value,
      dataNascimento: this.contatoForm.get('dataNascimento').value,
      sexo: this.contatoForm.get('sexo').value,
      observacao: this.contatoForm.get('observacao').value
    } as Contato;

    this.contatoService.incluir(contato).subscribe();
  }
}
