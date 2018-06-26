import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RoomTypeConfigComponent } from './room-type-config.component';
import { RoomTypeConfigDetailComponent } from './room-type-config-detail.component';
import { RoomTypeConfigPopupComponent } from './room-type-config-dialog.component';
import { RoomTypeConfigDeletePopupComponent } from './room-type-config-delete-dialog.component';

export const roomTypeRoute: Routes = [
    {
        path: 'room-type-config',
        component: RoomTypeConfigComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RoomTypes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'room-type-config/:id',
        component: RoomTypeConfigDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RoomTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const roomTypePopupRoute: Routes = [
    {
        path: 'room-type-config-new',
        component: RoomTypeConfigPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RoomTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'room-type-config/:id/edit',
        component: RoomTypeConfigPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RoomTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'room-type-config/:id/delete',
        component: RoomTypeConfigDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RoomTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
