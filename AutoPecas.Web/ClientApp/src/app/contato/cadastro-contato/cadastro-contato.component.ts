import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContatoService } from 'src/app/service/contato.service';
import { Contato } from 'src/app/model/contato/contato.model';
import { NzModalRef } from 'ng-zorro-antd/modal';

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

  @Input() editarContato?: Contato;

  constructor(
    private contatoService: ContatoService,
    private modal: NzModalRef
  ) { }

  ngOnInit(): void {
    if(this.editarContato) {
      this.contatoForm.patchValue({
        nome: this.editarContato.nome,
        apelido: this.editarContato.apelido,
        cpf: this.editarContato.cpf,
        rg: this.editarContato.rg,
        tipo: this.editarContato.tipo,
        profissao: this.editarContato.profissao,
        dataNascimento: this.editarContato.dataNascimento,
        sexo: this.editarContato.sexo,
        observacao: this.editarContato.observacao
      });
    }
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
      id: this.editarContato ? this.editarContato.id : 0,
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

    if (this.editarContato) {
      this.contatoService.editar(contato).subscribe();
    } else {
      this.contatoService.incluir(contato).subscribe(next => {
        this.modal.destroy(next);
      });
    }

  }
}
