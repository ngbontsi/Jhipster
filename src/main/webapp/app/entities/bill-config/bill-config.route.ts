import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BillConfigComponent } from './bill-config.component';
import { BillConfigDetailComponent } from './bill-config-detail.component';
import { BillConfigPopupComponent } from './bill-config-dialog.component';
import { BillConfigDeletePopupComponent } from './bill-config-delete-dialog.component';

export const billRoute: Routes = [
    {
        path: 'bill-config',
        component: BillConfigComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bills'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bill-config/:id',
        component: BillConfigDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bills'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const billPopupRoute: Routes = [
    {
        path: 'bill-config-new',
        component: BillConfigPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bills'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bill-config/:id/edit',
        component: BillConfigPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bills'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bill-config/:id/delete',
        component: BillConfigDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bills'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
