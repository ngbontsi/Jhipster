import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BillModelComponent } from './bill-model.component';
import { BillModelDetailComponent } from './bill-model-detail.component';
import { BillModelPopupComponent } from './bill-model-dialog.component';
import { BillModelDeletePopupComponent } from './bill-model-delete-dialog.component';

export const billRoute: Routes = [
    {
        path: 'bill-model',
        component: BillModelComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bills'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bill-model/:id',
        component: BillModelDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bills'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const billPopupRoute: Routes = [
    {
        path: 'bill-model-new',
        component: BillModelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bills'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bill-model/:id/edit',
        component: BillModelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bills'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bill-model/:id/delete',
        component: BillModelDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bills'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
