import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucessoCadastroComponent } from './sucesso-cadastro.component';

describe('SucessoCadastroComponent', () => {
  let component: SucessoCadastroComponent;
  let fixture: ComponentFixture<SucessoCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucessoCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucessoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
