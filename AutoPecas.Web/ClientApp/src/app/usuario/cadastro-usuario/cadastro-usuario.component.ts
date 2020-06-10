import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';

import Usuario from 'src/app/model/usuario/usuario.model';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { SucessoCadastroComponent } from 'src/app/usuario/sucesso-cadastro/sucesso-cadastro.component';
import { getPerfil } from 'src/app/shared/sessao';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  usuarioForm = new FormGroup({
    nome: new FormControl(null, [Validators.required]),
    usuario: new FormControl(null, [Validators.required]),
    senha: new FormControl(null, [Validators.required]),
    permissao: new FormControl(null, [Validators.required]),
    ativo: new FormControl(null)
  });

  valuesRadioButtonStatus = [{ name: "Ativo", value: true }, { name: "Inátivo", value: false }];
  valuesRadioButtonPermissao = [{ name: "Administrador", value: true }, { name: "Padrão", value: false }];

  constructor(
    private _service: UsuarioService,
    private modal: NzModalRef,
    private modalService: NzModalService
  ) { }

  @Input() usuario?: Usuario;

  btnName: string;


  ngOnInit(): void {
    this.obter();
  }

  obter() {

    if (this.usuario !== undefined) {

      this._service.obter(this.usuario.id).subscribe(next => {

        this.usuario = next;

        this.usuarioForm = new FormGroup({
          nome: new FormControl(this.usuario.nome, [Validators.required]),
          usuario: new FormControl(this.usuario.usuario, [Validators.required]),
          senha: new FormControl(this.usuario.senha, [Validators.required]),
          ativo: new FormControl(this.usuario.ativo, [Validators.required]),
          permissao: new FormControl(this.usuario.permissao, [Validators.required]),
        });

        if (this.usuario !== undefined) {
          this.btnName = `Editar`;
        }
      });

    } else {

      this.btnName = `Cadastrar`;

    }
  }

  submitForm() {

    if (this.btnName == 'Cadastrar') {

      this.usuario = {
        nome: this.usuarioForm.get('nome').value,
        usuario: this.usuarioForm.get('usuario').value,
        senha: this.usuarioForm.get('senha').value,
        ativo: true,
        permissao: this.usuarioForm.get('permissao').value,
      } as Usuario;

      this._service.incluir(this.usuario).subscribe(() => {

        const modalResult = this.modalService.create({
          nzTitle: null,
          nzContent: SucessoCadastroComponent,
          nzComponentParams: {
            acao: 'cadastrado'
          },
          nzWidth: "80%",
          nzFooter: null,
          nzClosable: false,
          nzMaskClosable: false
        });

        this.modal.close();
      });

    } else {

      this.usuario = {
        id: this.usuario.id,
        nome: this.usuarioForm.get('nome').value,
        usuario: this.usuarioForm.get('usuario').value,
        senha: this.usuarioForm.get('senha').value,
        ativo: this.usuarioForm.get('ativo').value,
        permissao: this.usuarioForm.get('permissao').value,
      } as Usuario;

        this._service.editar(this.usuario).subscribe(() => {

          if (getPerfil().permissao) {
          const modalResult = this.modalService.create({
            nzTitle: null,
            nzContent: SucessoCadastroComponent,
            nzComponentParams: {
              acao: 'editado'
            },
            nzWidth: "80%",
            nzFooter: null,
            nzClosable: false,
            nzMaskClosable: false
          });

          this.modal.close();
        } else {
          this.modal.close();
        }
        });
    }

  }

  fechar() {
    this.modal.destroy();
  }
}
