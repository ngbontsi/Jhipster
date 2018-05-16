import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RoomModelComponent } from './room-model.component';
import { RoomModelDetailComponent } from './room-model-detail.component';
import { RoomModelPopupComponent } from './room-model-dialog.component';
import { RoomModelDeletePopupComponent } from './room-model-delete-dialog.component';

export const roomRoute: Routes = [
    {
        path: 'room-model',
        component: RoomModelComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rooms'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'room-model/:id',
        component: RoomModelDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rooms'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const roomPopupRoute: Routes = [
    {
        path: 'room-model-new',
        component: RoomModelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rooms'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'room-model/:id/edit',
        component: RoomModelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rooms'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'room-model/:id/delete',
        component: RoomModelDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rooms'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
