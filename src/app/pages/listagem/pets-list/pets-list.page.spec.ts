import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PetsListPage } from './pets-list.page';

describe('PetsListPage', () => {
  let component: PetsListPage;
  let fixture: ComponentFixture<PetsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetsListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PetsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
