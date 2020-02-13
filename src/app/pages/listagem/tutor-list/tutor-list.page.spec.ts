import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TutorListPage } from './tutor-list.page';

describe('TutorListPage', () => {
  let component: TutorListPage;
  let fixture: ComponentFixture<TutorListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TutorListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
