import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrytoComponent } from './cryto.component';

describe('CrytoComponent', () => {
  let component: CrytoComponent;
  let fixture: ComponentFixture<CrytoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrytoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrytoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
