import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DeckComponent } from './deck/deck.component';
import { DeckListComponent } from './deck/deck-list/deck-list.component';
import { DeckEditComponent } from './deck/deck-edit/deck-edit.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    {
        path: 'decks', component: DeckComponent, children: [
            { path: 'list', component: DeckListComponent },
            { path: 'new', component: DeckEditComponent }
        ]
    },
    {
        path: 'user', component: UserComponent, children: [
            { path: 'detail', component: UserDetailComponent },
            { path: 'edit', component: UserEditComponent }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}