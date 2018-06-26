import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BookingConfigComponent } from './booking-config.component';
import { BookingConfigDetailComponent } from './booking-config-detail.component';
import { BookingConfigPopupComponent } from './booking-config-dialog.component';
import { BookingConfigDeletePopupComponent } from './booking-config-delete-dialog.component';

export const bookingRoute: Routes = [
    {
        path: 'booking-config',
        component: BookingConfigComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bookings'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'booking-config/:id',
        component: BookingConfigDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bookings'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bookingPopupRoute: Routes = [
    {
        path: 'booking-config-new',
        component: BookingConfigPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bookings'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'booking-config/:id/edit',
        component: BookingConfigPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bookings'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'booking-config/:id/delete',
        component: BookingConfigDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bookings'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
