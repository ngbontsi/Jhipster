import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CustomerModelComponent } from './customer-model.component';
import { CustomerModelDetailComponent } from './customer-model-detail.component';
import { CustomerModelPopupComponent } from './customer-model-dialog.component';
import { CustomerModelDeletePopupComponent } from './customer-model-delete-dialog.component';

export const customerRoute: Routes = [
    {
        path: 'customer-model',
        component: CustomerModelComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Customers'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'customer-model/:id',
        component: CustomerModelDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Customers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerPopupRoute: Routes = [
    {
        path: 'customer-model-new',
        component: CustomerModelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Customers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer-model/:id/edit',
        component: CustomerModelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Customers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'customer-model/:id/delete',
        component: CustomerModelDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Customers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
