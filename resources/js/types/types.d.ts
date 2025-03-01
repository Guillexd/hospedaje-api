import type { AxiosError } from "axios"

interface PaginationLink {
  url: string | null
  label: string
  active: boolean
}

export interface PaginationMeta {
  current_page: number
  from: number
  last_page: number
  links: PaginationLink[]
  path: string
  per_page: number
  to: number
  total: number
}

export interface ApiResponse<T> {
  data: T,
  meta?: PaginationMeta
}

export interface ApiError {
  errors: Record<string, string>
}

export interface AuthState {
  email: string
  password: string
}

export interface AuthUserI extends Pick<AuthState, email> {
  id?: number,
  name: string,
  dni: number | string,
  phone: number | string,
  role: string,
  permissions: string[],
}

export interface UserI extends Omit<AuthUserI, id | permissions>, Pick<AuthState, password> {
  id: number,
  is_active: boolean,
  role: string,
}

export interface UserState extends Omit<UserI, id | is_active> {
  id?: number,
  password_confirmation?: string,
  role_id?: number,
}

export interface HousingI {
  id: number,
  name: string,
  direction: string,
  is_active: boolean,
}

export interface HousingState extends Omit<HousingI, id | is_active> {
  id?: number,
}

export interface IdentityDocumentI {
  id: number,
  abbreviation: string,
  description: string,
}

export interface IdentityDocumentState extends Omit<IdentityDocumentI, id> {
  id?: number,
}

export interface TenancyI {
  id: number,
  document_type?: string,
  document_number?: number,
  name: string,
  first_document_image_url?: string
  second_document_image_url?: string
  description: string,
  phone: string,
  created_at: string,
}

export interface TenancyState extends Pick<TenancyI, name | document_number | description> {
  id?: number,
  identity_document_id?: number,
  first_document_image_url?: File,
  second_document_image_url?: File,
  phone?: number,
}

export interface HousingRoomI {
  id: number,
  housing: string,
  room_number: string,
  is_active: boolean,
  is_available: boolean,
}

export interface HousingRoomState extends Pick<HousingRoomI, room_number | is_available> {
  id?: number,
  housing_id?: number
}

export interface HousingPaymentI {
  id: number,
  payment: number,
  rental_start_date: string,
  rental_end_date: string,
  payment_date: string,
  description: string,
  housing_room: string,
  housing: string,
  tenancy_name: string,
  tenancy_document_number: string,
  tenancy_phone: string,
  first_document_image_url: string,
  second_document_image_url: string,
  tenancy_identity_document: string,
}

export interface HousingPaymentState extends Pick<HousingPaymentI, payment | rental_start_date | rental_end_date | payment_date | description> {
  id?: number,
  tenancy_id?: number,
  housing_room_id?: number,
}

interface HousingDataI {
  housing: string,
  data: {
    name: string,
    total: number,
  }[],
}

interface IncomeDataI {
  month: string,
  income: string,
}

export interface DashboardI {
  expectedAmount: number,
  tenancies: number,
  housingState: HousingDataI[],
  incomeState: IncomeDataI[],
}

export interface PermissionsI {
  id: number,
  description: string,
}

export interface RoleI {
  id: number,
  description: string,
  permissions: PermissionsI[],
}

export interface RoleState extends Pick<RoleI, description>{
  id?: number,
  permissions: PermissionsI[] | number[],
}
