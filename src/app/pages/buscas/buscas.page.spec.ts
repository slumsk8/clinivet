import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuscasPage } from './buscas.page';

describe('BuscasPage', () => {
  let component: BuscasPage;
  let fixture: ComponentFixture<BuscasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuscasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
