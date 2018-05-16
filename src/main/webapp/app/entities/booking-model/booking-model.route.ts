import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BookingModelComponent } from './booking-model.component';
import { BookingModelDetailComponent } from './booking-model-detail.component';
import { BookingModelPopupComponent } from './booking-model-dialog.component';
import { BookingModelDeletePopupComponent } from './booking-model-delete-dialog.component';

export const bookingRoute: Routes = [
    {
        path: 'booking-model',
        component: BookingModelComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bookings'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'booking-model/:id',
        component: BookingModelDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bookings'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bookingPopupRoute: Routes = [
    {
        path: 'booking-model-new',
        component: BookingModelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bookings'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'booking-model/:id/edit',
        component: BookingModelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bookings'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'booking-model/:id/delete',
        component: BookingModelDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bookings'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
