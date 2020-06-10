import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ContatoService } from "src/app/service/contato.service";
import { Contato } from "src/app/model/contato/contato.model";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import { min } from "rxjs/operators";
import { Router } from "@angular/router";
import { SucessoCadastroComponent } from "../sucesso-cadastro/sucesso-cadastro.component";

@Component({
  selector: "app-cadastro-contato",
  templateUrl: "./cadastro-contato.component.html",
  styleUrls: ["./cadastro-contato.component.css"],
})
export class CadastroContatoComponent implements OnInit {
  contatoForm = new FormGroup({
    idContato: new FormControl(null),
    nome: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    apelido: new FormControl(null),
    cpf: new FormControl(null, [Validators.min(11)]),
    cnpj: new FormControl(null, [Validators.min(14)]),
    rg: new FormControl(null, [Validators.min(9)]),
    inscricaoEstadual: new FormControl(null, [Validators.min(12)]),
    tipo: new FormControl("C", [Validators.required]),
    profissao: new FormControl(null),
    dataNascimento: new FormControl(null),
    sexo: new FormControl(null),
    observacao: new FormControl(null),
  });

  @Input() editarContato?: Contato;

  @Input() venda: boolean = false;

  constructor(
    private contatoService: ContatoService,
    private modal: NzModalRef,
    private modalResult: NzModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.editarContato) {
      this.contatoForm.patchValue({
        nome: this.editarContato.nome,
        apelido: this.editarContato.apelido,
        cpf: this.editarContato.cpf,
        rg: this.editarContato.rg,
        tipo: this.editarContato.tipo,
        profissao: this.editarContato.profissao,
        dataNascimento: this.editarContato.dataNascimento,
        sexo: this.editarContato.sexo,
        observacao: this.editarContato.observacao,
      });
    }
  }

  fechar() {
    this.modal.destroy();
  }

  cadastrar() {
    let contato = {
      id: this.editarContato ? this.editarContato.id : 0,
      nome: this.contatoForm.get("nome").value,
      apelido: this.contatoForm.get("apelido").value,
      cpf: this.contatoForm.get("cpf").value,
      rg: this.contatoForm.get("rg").value,
      tipo: this.contatoForm.get("tipo").value,
      profissao: this.contatoForm.get("profissao").value,
      dataNascimento: this.contatoForm.get("dataNascimento").value,
      sexo: this.contatoForm.get("sexo").value,
      observacao: this.contatoForm.get("observacao").value,
    } as Contato;

    if (this.editarContato) {
      this.contatoService.editar(contato).subscribe(() => {
        const modalResult = this.modalResult.create({
          nzTitle: null,
          nzContent: SucessoCadastroComponent,
          nzComponentParams: {
            acao: "editado",
          },
          nzWidth: "80%",
          nzFooter: null,
          nzClosable: false,
          nzMaskClosable: false,
        });

        modalResult.afterClose.subscribe(next => { this.modal.destroy() });
      });
    } else {
      this.contatoService.incluir(contato).subscribe((next) => {
        if (this.venda) {
          this.modal.destroy(next);
        } else {
          const modalResult = this.modalResult.create({
            nzTitle: null,
            nzContent: SucessoCadastroComponent,
            nzComponentParams: {
              acao: "cadastrado",
            },
            nzWidth: "80%",
            nzFooter: null,
            nzClosable: false,
            nzMaskClosable: false,
          });

          modalResult.afterClose.subscribe(next => { this.modal.destroy() });
        }
      });
    }
  }
}
