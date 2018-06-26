import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RoomServiceConfigComponent } from './room-service-config.component';
import { RoomServiceConfigDetailComponent } from './room-service-config-detail.component';
import { RoomServiceConfigPopupComponent } from './room-service-config-dialog.component';
import { RoomServiceConfigDeletePopupComponent } from './room-service-config-delete-dialog.component';

export const roomServiceRoute: Routes = [
    {
        path: 'room-service-config',
        component: RoomServiceConfigComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RoomServices'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'room-service-config/:id',
        component: RoomServiceConfigDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RoomServices'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const roomServicePopupRoute: Routes = [
    {
        path: 'room-service-config-new',
        component: RoomServiceConfigPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RoomServices'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'room-service-config/:id/edit',
        component: RoomServiceConfigPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RoomServices'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'room-service-config/:id/delete',
        component: RoomServiceConfigDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RoomServices'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
