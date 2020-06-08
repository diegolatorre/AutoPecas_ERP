import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaEntradaComponent } from './tabela-entrada.component';

describe('TabelaEntradaComponent', () => {
  let component: TabelaEntradaComponent;
  let fixture: ComponentFixture<TabelaEntradaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaEntradaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
