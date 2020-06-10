import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import Usuario from '../model/usuario/usuario.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { setPerfil, getPerfil } from '../shared/sessao';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuarioForm = new FormGroup({
    usuario: new FormControl(null, [Validators.required]),
    senha: new FormControl(null, [Validators.required])
  });

  usuario: Usuario;
  mensagemErro: string;

  constructor(
    private _service: UsuarioService,
    private router: Router
  ) { }

  ngOnInit() {
    if (getPerfil())
      this.router.navigateByUrl('/produto');
  }

  submitForm() {

    this.usuario = {
      usuario: this.usuarioForm.get('usuario').value,
      senha: this.usuarioForm.get('senha').value
    } as Usuario;

    this._service.login(this.usuario).subscribe(next => {
      if (next != null) {
        console.log(next);
        setPerfil(next);
        location.reload()
      } else {
        this.mensagemErro = "Usúario e/ou Senha inválidos!";
      }

    });

  }
}
