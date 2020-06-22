import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFirmComponent } from './create-firm.component';

describe('CreateFirmComponent', () => {
  let component: CreateFirmComponent;
  let fixture: ComponentFixture<CreateFirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
