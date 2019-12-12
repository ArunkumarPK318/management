import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UsermanagementappTestModule } from '../../../test.module';
import { AppTypeDetailComponent } from 'app/entities/app-type/app-type-detail.component';
import { AppType } from 'app/shared/model/app-type.model';

describe('Component Tests', () => {
  describe('AppType Management Detail Component', () => {
    let comp: AppTypeDetailComponent;
    let fixture: ComponentFixture<AppTypeDetailComponent>;
    const route = ({ data: of({ appType: new AppType(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UsermanagementappTestModule],
        declarations: [AppTypeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AppTypeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AppTypeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.appType).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
