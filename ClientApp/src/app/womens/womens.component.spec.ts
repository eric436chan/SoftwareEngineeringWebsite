import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WomensComponent } from './womens.component';

describe('WomensComponent', () => {
  let component: WomensComponent;
  let fixture: ComponentFixture<WomensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WomensComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WomensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
