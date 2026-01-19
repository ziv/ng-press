import {toSignal} from '@angular/core/rxjs-interop';
import {inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs';

export function routePath() {
  return toSignal(
    inject(ActivatedRoute).url.pipe(
      map(url => url.map(u => u.path).join('/'))
    )
  );
}
