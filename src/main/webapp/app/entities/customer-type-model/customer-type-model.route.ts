import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CustomerTypeModelComponent } from './customer-type-model.component';
import { CustomerTypeModelDetailComponent } from './customer-type-model-detail.component';
import { CustomerTypeModelPopupComponent } from './customer-type-model-dialog.component';
import { CustomerTypeModelDeletePopupComponent } from './customer-type-model-delete-dialog.component';

export const customerTypeRoute: Routes = [
    {
        path: 'customer-type-model',
        component: CustomerTypeModelComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CustomerTypes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'customer-type-model/:id',
        component: CustomerTypeModelDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CustomerTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerTypePopupRoute: Routes = [
    {
        path: 'customer-type-model-new',
        component: CustomerTypeModelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CustomerTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer-type-model/:id/edit',
        component: CustomerTypeModelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CustomerTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer-type-model/:id/delete',
        component: CustomerTypeModelDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CustomerTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
