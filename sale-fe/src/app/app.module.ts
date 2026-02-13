import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule, routing} from './app-routing.module';
import {AppComponent} from './app.component';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {LoginModule} from "./login/login.module";
import {AccountModule} from "./account/account.module";
import {CartModule} from "./cart/cart.module";
import {CatalogModule} from "./catalog/catalog.module";
import {ProductDetailsModule} from "./product-details/productDetails.module";
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {ToastrModule} from 'ngx-toastr';
import {SharedModule} from "./shared/shared.module";
import {CommonModule} from "@angular/common";
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    NgbModule,
    ToastrModule.forRoot(),
    routing,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    FontAwesomeModule,
    LoginModule,
    AccountModule,
    CartModule,
    CatalogModule,
    ProductDetailsModule,
    SlickCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
