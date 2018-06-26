import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CustomerConfigComponent } from './customer-config.component';
import { CustomerConfigDetailComponent } from './customer-config-detail.component';
import { CustomerConfigPopupComponent } from './customer-config-dialog.component';
import { CustomerConfigDeletePopupComponent } from './customer-config-delete-dialog.component';

export const customerRoute: Routes = [
    {
        path: 'customer-config',
        component: CustomerConfigComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Customers'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'customer-config/:id',
        component: CustomerConfigDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Customers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerPopupRoute: Routes = [
    {
        path: 'customer-config-new',
        component: CustomerConfigPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Customers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer-config/:id/edit',
        component: CustomerConfigPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Customers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer-config/:id/delete',
        component: CustomerConfigDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Customers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
