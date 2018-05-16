import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RoomServiceModelComponent } from './room-service-model.component';
import { RoomServiceModelDetailComponent } from './room-service-model-detail.component';
import { RoomServiceModelPopupComponent } from './room-service-model-dialog.component';
import { RoomServiceModelDeletePopupComponent } from './room-service-model-delete-dialog.component';

export const roomServiceRoute: Routes = [
    {
        path: 'room-service-model',
        component: RoomServiceModelComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RoomServices'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'room-service-model/:id',
        component: RoomServiceModelDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RoomServices'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const roomServicePopupRoute: Routes = [
    {
        path: 'room-service-model-new',
        component: RoomServiceModelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RoomServices'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'room-service-model/:id/edit',
        component: RoomServiceModelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RoomServices'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'room-service-model/:id/delete',
        component: RoomServiceModelDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RoomServices'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
