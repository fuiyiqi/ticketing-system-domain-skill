import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TicketDetailComponent } from './components/ticket-detail/ticket-detail.component';
import { CreateTicketComponent } from './components/create-ticket/create-ticket.component';

// Feature 11: Route configuration with path mappings to components
// Feature 12: Routes with parameters (ticket detail)
export const routes: Routes = [
  // Feature 11: Default route - redirects to login page
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },

  // Feature 11: Login route - maps /login URL to LoginComponent
  {
    path: 'login',
    component: LoginComponent,
  },

  // Feature 11: Dashboard route - maps /dashboard URL to DashboardComponent
  // Note: DashboardComponent contains TicketList > TicketCard hierarchy as children
  {
    path: 'dashboard',
    component: DashboardComponent,
  },

  // Feature 11 & 12: Ticket detail route with route parameter
  // :id is a route parameter that captures the ticket ID from URL
  // Example: /ticket/5 will load ticket with id=5
  {
    path: 'ticket/:id',
    component: TicketDetailComponent,
  },

  // Create ticket route - dedicated page for creating new tickets
  {
    path: 'create-ticket',
    component: CreateTicketComponent
  },

  // Feature 11: Wildcard route - handles all undefined routes (404)
  // Must be last in the array
  {
    path: '**',
    redirectTo: '/login',
  },
];

// ============================================
// ROUTE STRUCTURE EXPLANATION
// ============================================

/*
COMPONENT HIERARCHY:
App (Root)
├── LoginComponent (standalone route: /login)
├── DashboardComponent (standalone route: /dashboard)
│   └── TicketListComponent (child component, not a route)
│       └── TicketCardComponent (grandchild component, not a route)
└── TicketDetailComponent (standalone route: /ticket/:id)
    └── CommentSectionComponent (child component, not a route)

ROUTE STRUCTURE:
/ → Redirects to /login
/login → LoginComponent
/dashboard → DashboardComponent (contains TicketList & TicketCard)
/ticket/1 → TicketDetailComponent for ticket ID 1
/ticket/5 → TicketDetailComponent for ticket ID 5
/anything-else → Redirects to /login

NOTE: 
- TicketListComponent is NOT a route, it's included in DashboardComponent's template
- TicketCardComponent is NOT a route, it's rendered by TicketListComponent using @for
- CommentSectionComponent is NOT a route, it's included in TicketDetailComponent's template
*/

// ============================================
// NAVIGATION EXAMPLES
// ============================================

/*
1. TEMPLATE NAVIGATION (using routerLink):
   <a routerLink="/dashboard">Go to Dashboard</a>
   <a routerLink="/ticket/{{ ticketId }}">View Ticket</a>

2. PROGRAMMATIC NAVIGATION (in TypeScript):
   this.router.navigate(['/dashboard']);
   this.router.navigate(['/ticket', ticketId]);
   this.router.navigate(['/login']);

3. ACCESSING ROUTE PARAMETERS (in component):
   this.route.params.subscribe(params => {
     const id = +params['id']; // Convert string to number
   });

4. QUERY PARAMETERS (optional - not required but useful):
   // Navigate with query params
   this.router.navigate(['/dashboard'], { 
     queryParams: { status: 'OPEN', priority: 'HIGH' } 
   });
   
   // URL result: /dashboard?status=OPEN&priority=HIGH
   
   // Access query params
   this.route.queryParams.subscribe(params => {
     const status = params['status'];
     const priority = params['priority'];
   });
*/
