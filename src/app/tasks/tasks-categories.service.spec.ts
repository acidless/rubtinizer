import { TestBed } from '@angular/core/testing';

import { TasksCategoriesService } from './tasks-categories.service';

describe('TasksCategoriesService', () => {
  let service: TasksCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
