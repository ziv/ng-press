import {TestBed} from '@angular/core/testing';
import {Default404} from './default-404';

describe('Default404', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Default404],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(Default404);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render not found', async () => {
    const fixture = TestBed.createComponent(Default404);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('not found');
  });
});
