//this is pre generated from visual studios

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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





@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    WebsiteNavComponent,
    FAQComponent,
    WomenComponent,
    MenComponent,
    MenProductsComponent,
    WomenProductsComponent,
    OrderComponent,
    SearchComponent
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
      { path: 'search', component: SearchComponent }
    ]),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [SearchingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
