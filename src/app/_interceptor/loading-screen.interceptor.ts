import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BusyService } from '../_service/busy.service';
import { delay, finalize } from 'rxjs';

export const loadingScreenInterceptor: HttpInterceptorFn = (req, next) => {
 const busyService = inject(BusyService)
 busyService.busy();
 return next(req).pipe(
   delay(1000),
   finalize(()=>{
     busyService.idle()
   })
 )
};
