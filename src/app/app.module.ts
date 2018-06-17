import { PSAPService } from './services/psap.service';
import { PipesModule } from './pipes/pipes.module';
import { AstroforcelogoutService } from './services/astroforcelogout.service';
import { AstroconsolidatedService } from './services/astroconsolidated.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { UserDayWiseService } from './services/userdaywise.service';
import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthGuard } from './shared/guards/auth.guard';
import { AuthenticationService } from './services/authentication.service';
/* import { AppLogListener } from './services/logging/app-log.listener'; */
import { UserService } from './services/user.service';

/* import { LogModule, ConsoleListener, ExtensionListener, LOG_LISTENER, ConsoleListenerConfig, LogService } from 'ng2-log-service'; */

// Import containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

const APP_CONTAINERS = [
  FullLayoutComponent,
  SimpleLayoutComponent
]

// Import components
import {

  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV,
} from './components';

const APP_COMPONENTS = [
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV
]

// Import directives
import {
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
} from './directives';

const APP_DIRECTIVES = [
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
]

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';




@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    PipesModule.forRoot(),
    ChartsModule,
    HttpModule,
    /* LogModule */

  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ...APP_COMPONENTS,
    ...APP_DIRECTIVES,
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
  },
    UserDayWiseService,
    DatePipe,
    AstroconsolidatedService,
    AstroforcelogoutService,
    AuthGuard,
    /* LogService, 
    ConsoleListenerConfig, */
    AuthenticationService,
    UserService,
    PSAPService,
    /*{ provide: LOG_LISTENER, useClass: ExtensionListener, multi: true },
     { provide: LOG_LISTENER, useClass: AppLogListener, multi: true } */
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
