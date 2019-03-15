import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarGenresComponent } from './navbar-genres.component';

describe('NavbarGenresComponent', () => {
  let component: NavbarGenresComponent;
  let fixture: ComponentFixture<NavbarGenresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarGenresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
