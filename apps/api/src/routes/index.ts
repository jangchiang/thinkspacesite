import { Elysia } from 'elysia'
import { leadsRoutes } from './leads'
import { contactRoutes } from './contact'
import { newsletterRoutes } from './newsletter'
import { searchRoutes } from './search'

export const routes = new Elysia()
  .use(leadsRoutes)
  .use(contactRoutes)
  .use(newsletterRoutes)
  .use(searchRoutes)
