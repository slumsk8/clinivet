import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TutorFormPage } from './tutor-form.page';

describe('TutorFormPage', () => {
  let component: TutorFormPage;
  let fixture: ComponentFixture<TutorFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TutorFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
