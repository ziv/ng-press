// import {TestBed} from '@angular/core/testing';
// import {DefaultPage} from './default-page';
// import {ActivatedNgPress} from 'ng-press-core';
// import {Component, TemplateRef, viewChild} from '@angular/core';
//
// describe('DefaultPage', () => {
//   @Component({
//     selector: 'np-test-component',
//     template: '<ng-template #testTemplate>test content</ng-template>',
//   })
//   class TestComponent {
//     testTemplate = viewChild.required<TemplateRef<unknown>>('testTemplate')
//   }
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [DefaultPage, TestComponent],
//     }).compileComponents();
//   });
//
//   it('should create the component', () => {
//     const fixture = TestBed.createComponent(DefaultPage);
//     const app = fixture.componentInstance;
//     expect(app).toBeTruthy();
//   });
//
//   it('should render nothing (no component provided)', async () => {
//     const fixture = TestBed.createComponent(DefaultPage);
//     await fixture.whenStable();
//     const compiled = fixture.nativeElement as HTMLElement;
//     expect(compiled.innerHTML).toBe('<ngp-content><!--container--></ngp-content>');
//   });
//
//   it('should render content when provided', async () => {
//
//     // the test component is only to get a TemplateRef instance
//     const test = TestBed.createComponent(TestComponent);
//
//     // get the activated service
//     const activated = TestBed.inject(ActivatedNgPress);
//
//     await test.whenStable();
//
//     // update the activated state to provide content
//     activated.state.set({
//       ...activated.state(),
//       template: test.componentInstance.testTemplate(),
//     });
//
//     const fixture = TestBed.createComponent(DefaultPage);
//     await fixture.whenStable();
//     const compiled = fixture.nativeElement as HTMLElement;
//     expect(compiled.innerHTML).toBe('<ngp-content>test content<!--container--></ngp-content>');
//   });
// });
