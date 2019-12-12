import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UsermanagementappTestModule } from '../../../test.module';
import { AppComponent } from 'app/entities/app/app.component';
import { AppService } from 'app/entities/app/app.service';
import { App } from 'app/shared/model/app.model';

describe('Component Tests', () => {
  describe('App Management Component', () => {
    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let service: AppService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UsermanagementappTestModule],
        declarations: [AppComponent],
        providers: []
      })
        .overrideTemplate(AppComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AppComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AppService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new App(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.apps[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
