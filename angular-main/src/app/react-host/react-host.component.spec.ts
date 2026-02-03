import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactHostComponent } from './react-host.component';

describe('ReactHostComponent', () => {
  let component: ReactHostComponent;
  let fixture: ComponentFixture<ReactHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactHostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
