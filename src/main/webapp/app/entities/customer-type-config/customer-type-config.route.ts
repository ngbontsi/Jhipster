import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CustomerTypeConfigComponent } from './customer-type-config.component';
import { CustomerTypeConfigDetailComponent } from './customer-type-config-detail.component';
import { CustomerTypeConfigPopupComponent } from './customer-type-config-dialog.component';
import { CustomerTypeConfigDeletePopupComponent } from './customer-type-config-delete-dialog.component';

export const customerTypeRoute: Routes = [
    {
        path: 'customer-type-config',
        component: CustomerTypeConfigComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CustomerTypes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'customer-type-config/:id',
        component: CustomerTypeConfigDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CustomerTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerTypePopupRoute: Routes = [
    {
        path: 'customer-type-config-new',
        component: CustomerTypeConfigPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CustomerTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer-type-config/:id/edit',
        component: CustomerTypeConfigPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CustomerTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer-type-config/:id/delete',
        component: CustomerTypeConfigDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CustomerTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
