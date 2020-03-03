//this is pre generated from visual studios

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { WebsiteNavComponent } from './website-nav/website-nav.component';
import { FAQComponent } from './faq/faq.component';
import { MenComponent } from './men/men.component';
import { WomenComponent } from './women/women.component';
import { MenProductsComponent } from './men/men-products/men-products.component';
import { WomenProductsComponent } from './women/women-products/women-products.component';
import { OrderComponent } from './order/order.component';
import { SearchComponent } from './search/search.component';
import { SearchingService } from './services/searching-service';
import { ProductService } from './services/product-service';
import { ShoppingCartService } from './services/shoppingCart-service';
import { ShoppingCartDialog } from './dialogs/shoppingCartDialog/shopping-cart-dialog.component';
import { ProductDialog } from './dialogs/productDialog/product-dialog.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MensComponent } from './mens/mens.component';
import { WomensComponent } from './womens/womens.component';




@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    WebsiteNavComponent,
    FAQComponent,
    MensComponent,
    WomensComponent,
    
    WomenComponent,
    MenComponent,
    MenProductsComponent,
    WomenProductsComponent,
    OrderComponent,
    SearchComponent,
    CheckoutComponent,
    ShoppingCartDialog,
    ProductDialog

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },

      { path: 'faq', component: FAQComponent },
      { path: 'order', component: OrderComponent },
      { path: 'mens', component: MenComponent },
      { path: 'womens', component: WomenComponent },
      { path: 'womens/prod', component: WomenProductsComponent },
      { path: 'mens/prod', component: MenProductsComponent },
      { path: 'search', component: SearchComponent },
      { path: 'checkout', component: CheckoutComponent }
    ]),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSidenavModule,
    MatRadioModule,
    MatCardModule,
    MatGridListModule,
    MatTooltipModule,
    MatSelectModule,
    MatSnackBarModule

  ],

  entryComponents: [ShoppingCartDialog, ProductDialog],
  providers: [SearchingService, ProductService, ShoppingCartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
