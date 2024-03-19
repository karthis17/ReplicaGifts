import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProductComponent } from './admin/product/product.component';
import { CategoryComponent } from './admin/category/category.component';
import { AuthGuard } from './auth.guard';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { UserAuthGuard } from './user-auth.guard';

export const routes: Routes = [
    {
        path: 'admin', component: AdminComponent, children: [

            { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
            { path: 'product-manipulate', component: ProductComponent, canActivate: [AuthGuard] },
            { path: 'product-view', component: ProductComponent, canActivate: [AuthGuard] },
            { path: 'category', component: CategoryComponent, canActivate: [AuthGuard] },
        ]

    },
    { path: "admin-login", component: AdminLoginComponent },
    { path: '', component: ProductListComponent },
    { path: 'product', component: ProductDetailsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [UserAuthGuard] },
    { path: 'cart', component: ShoppingCartComponent, canActivate: [UserAuthGuard] },
    { path: 'wish', component: WishListComponent, canActivate: [UserAuthGuard] },
];
