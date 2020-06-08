import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEntradaComponent } from './cadastro-entrada.component';

describe('CadastroEntradaComponent', () => {
  let component: CadastroEntradaComponent;
  let fixture: ComponentFixture<CadastroEntradaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroEntradaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
