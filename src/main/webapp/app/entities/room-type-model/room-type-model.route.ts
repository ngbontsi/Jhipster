import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RoomTypeModelComponent } from './room-type-model.component';
import { RoomTypeModelDetailComponent } from './room-type-model-detail.component';
import { RoomTypeModelPopupComponent } from './room-type-model-dialog.component';
import { RoomTypeModelDeletePopupComponent } from './room-type-model-delete-dialog.component';

export const roomTypeRoute: Routes = [
    {
        path: 'room-type-model',
        component: RoomTypeModelComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RoomTypes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'room-type-model/:id',
        component: RoomTypeModelDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RoomTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const roomTypePopupRoute: Routes = [
    {
        path: 'room-type-model-new',
        component: RoomTypeModelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RoomTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'room-type-model/:id/edit',
        component: RoomTypeModelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RoomTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'room-type-model/:id/delete',
        component: RoomTypeModelDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RoomTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
