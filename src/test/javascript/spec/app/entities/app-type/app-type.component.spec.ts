import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UsermanagementappTestModule } from '../../../test.module';
import { AppTypeComponent } from 'app/entities/app-type/app-type.component';
import { AppTypeService } from 'app/entities/app-type/app-type.service';
import { AppType } from 'app/shared/model/app-type.model';

describe('Component Tests', () => {
  describe('AppType Management Component', () => {
    let comp: AppTypeComponent;
    let fixture: ComponentFixture<AppTypeComponent>;
    let service: AppTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UsermanagementappTestModule],
        declarations: [AppTypeComponent],
        providers: []
      })
        .overrideTemplate(AppTypeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AppTypeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AppTypeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AppType(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.appTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
