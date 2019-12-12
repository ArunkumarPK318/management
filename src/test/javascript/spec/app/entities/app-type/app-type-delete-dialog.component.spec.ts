import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { UsermanagementappTestModule } from '../../../test.module';
import { AppTypeDeleteDialogComponent } from 'app/entities/app-type/app-type-delete-dialog.component';
import { AppTypeService } from 'app/entities/app-type/app-type.service';

describe('Component Tests', () => {
  describe('AppType Management Delete Component', () => {
    let comp: AppTypeDeleteDialogComponent;
    let fixture: ComponentFixture<AppTypeDeleteDialogComponent>;
    let service: AppTypeService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UsermanagementappTestModule],
        declarations: [AppTypeDeleteDialogComponent]
      })
        .overrideTemplate(AppTypeDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AppTypeDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AppTypeService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
