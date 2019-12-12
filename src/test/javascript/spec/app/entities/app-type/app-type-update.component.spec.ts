import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UsermanagementappTestModule } from '../../../test.module';
import { AppTypeUpdateComponent } from 'app/entities/app-type/app-type-update.component';
import { AppTypeService } from 'app/entities/app-type/app-type.service';
import { AppType } from 'app/shared/model/app-type.model';

describe('Component Tests', () => {
  describe('AppType Management Update Component', () => {
    let comp: AppTypeUpdateComponent;
    let fixture: ComponentFixture<AppTypeUpdateComponent>;
    let service: AppTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UsermanagementappTestModule],
        declarations: [AppTypeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AppTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AppTypeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AppTypeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AppType(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new AppType();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
