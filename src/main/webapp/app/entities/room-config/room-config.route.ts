import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RoomConfigComponent } from './room-config.component';
import { RoomConfigDetailComponent } from './room-config-detail.component';
import { RoomConfigPopupComponent } from './room-config-dialog.component';
import { RoomConfigDeletePopupComponent } from './room-config-delete-dialog.component';

export const roomRoute: Routes = [
    {
        path: 'room-config',
        component: RoomConfigComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rooms'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'room-config/:id',
        component: RoomConfigDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rooms'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const roomPopupRoute: Routes = [
    {
        path: 'room-config-new',
        component: RoomConfigPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rooms'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'room-config/:id/edit',
        component: RoomConfigPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rooms'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'room-config/:id/delete',
        component: RoomConfigDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rooms'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
