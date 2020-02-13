import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PetFormPage } from './pet-form.page';

describe('PetFormPage', () => {
  let component: PetFormPage;
  let fixture: ComponentFixture<PetFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PetFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
