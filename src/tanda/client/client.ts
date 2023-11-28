import { Config } from './config';
import { get, post, put, del } from './functions';
import type { GetRosterResponse, GetRosterThatContainsDateParams, GetSalesTargetResponse } from '../types/endpoints/roster-types';
import type { GetSchedulesResponse, GetSchedulesParams, GetSchedulesByUserParams, CreateScheduleBody, CreateVacantScheduleBody } from '../types/endpoints/schedules-types';
import type { GetCurrentTimesheetsResponse, GetCurrentTimesheetsParams, GetCurrentTimesheetsOnDateParams, GetCurrentTimesheetForUserParams, GetTimesheetParams, UpdateTimesheetStatusBody } from '../types/endpoints/timesheets-types';
import type { GetShiftsResponse, GetShiftLimitsResponse, GetShiftsParams, CreateShiftBody, CreateShiftWithBreaks, CreateApprovedShift, CreateShiftWithAllowances, GetShiftParams, UpdateShiftApproveShiftBody, UpdateShiftTimesBody, UpdateShiftTimesOnNewDateBody, UpdateShiftAllowancesBody, CreateShiftBreakWithTimes, CreateShiftBreakWithLength, CreateShiftBreakWithPaid, GetShiftBreaks, CreateShiftBreakWithTimesResponse, CreateShiftBreakResponse, GetShiftsApplicableAllowance, GetShiftVersions, GetActiveShifts } from '../types/endpoints/shifts-types';
import type { GetUsersListResponse, GetUsersParams, CreateUserBody, CreateUserWithMinimumFields, CreateUserResponse, CreateUserResponseWithRegularHours, UpdateUserBody, UpdateUserBodyDeactivateUser, UpdateUserBodyUpdateRegularHours, UpdateUserRemoveDepartmentsResponse, UpdateUserRegularHoursResponse, InviteAUserForOnboardingBody } from '../types/endpoints/staff-types';
import type { GetInactiveUsersResponse, GetUserParams, GetUserVersionsResponse, GetAlternateRatesByUserIdResponse, UpdateAlternateRatesByUserId } from '../types/endpoints/staff-types';
import type { GetUserPayFieldsResponse, GetVerifiedPayFieldsByUserIdResponse, UpdatePayFieldByPayFieldIdBody, CreatePayFieldOnUserBody, CreateAndUpdateMultiplePayFieldsOnUserBody } from '../types/endpoints/employeePayFields-types';
import type { LocationsResponse, GetLocationsParams, CreateLocationWithDetailsBody, CreateLocationBody, UpdateLocationBody, LocationVersionsResponse } from '../types/endpoints/location-types';
import type { TeamsResponseAsEmployee, TeamsResponseAsManager, CreateTeamWithDetails, CreateBasicTeam, CreateTeamResponse, UpdateTeamBody, GetTeamsParams } from '../types/endpoints/teams-types';
import type { ShiftDetailsResponse, CreateShiftDetailBody } from '../types/endpoints/shiftDetails-types';
import type { AccessAndRolesResponse } from '../types/endpoints/accessAndRoles-types';
import type { AwardTagsResponse } from '../types/endpoints/awardTags-types';
import type { GetDefaultLeaveHoursParams, LeaveRequestsResponse, GetLeaveRequestsParams, CreateLeaveRequestBody, LeaveRequestsForUserResponse, DefaultLeaveHoursResponse } from '../types/endpoints/leaveRequests-types';
import type { LeaveBalanceResponse, GetLeaveBalancesParams, CreateLeaveBalanceBody, CreateMultipleLeaveBalancesBody, CreateMultipleLeaveBalancesResponse, UpdateLeaveBalanceBody, UpdateLeaveBalanceByUserIdBody, PredictLeaveBalanceBody, PredictLeaveBalanceResponse } from '../types/endpoints/leaveBalances-types';
import type { GetVersionsResponse } from '../types/generic-types';
import type { CreateRepeatingUnavailability, CreateUnavailability, CreateUnavailabilityAllDay, GetUnavailabilityParams, RepeatingUnavailabilityResponse, UnavailabilityResponse } from '../types/endpoints/unavailability-types';
import type { CreateDatastream, DataStreamsResponse, UpdateDatastream } from '../types/endpoints/data-streams-types';
import type { CreateDataStream, CreateDataStreamJoinedToTeam, DataStreamJoinsResponse, UpdateDataStreamJoin } from '../types/endpoints/data-stream-joints-types';
import type { CreateMultipleStoreStats, CreateMultipleStoreStatsByDataStream, CreateStoreStats, CreateStoreStatsByDataStream, DeleteStoreStats, StoreStatsParams, StoreStatsResponse } from '../types/endpoints/storestats-types';
import type { CreateDevice, DeviceResponse } from '../types/endpoints/devices-types';
import { PerformClockInForUser, ClockInResponse, ClockIn } from '../types/endpoints/clockins-types';
import { CreateQualification, QualificationsResponse, UpdateQualification } from '../types/endpoints/qualifications-types';
import { SystemSettingsResponse } from '../types/endpoints/systemsettings-types';
import { AwardTemplatesResponse, EnableAwardTemplate, EnableAwardTemplateWithLeaveTypes } from '../types/endpoints/awardTemplates-types';
import { AccessToken, AccessTokenResponse, CreateOrganisation, OrganisationsResponse, UpdateOrganisation } from '../types/endpoints/organisation-types';

interface PasswordOptions {
  type: 'classic';
  token: string;
};
interface OAuthOptions {
  type: 'oauth';
  redirect_url: string;
  auth_code: string;
  client_id: string;
  client_secret: string;
  grant_type: string;
};

type TandaClientOptions = {
  headers?: {
    [key: string]: string; //optional headers.
  };
} & (PasswordOptions | OAuthOptions);

export default class TandaClient {
  protected token: string;
  protected headers: {
    [key: string]: string;
  };
  protected config: Config;
  protected url: string = 'https://my.tanda.co/api/v2';

  constructor(options: TandaClientOptions) {
    this.token = options.type === 'classic' ? options.token : ''; // oauth token not implemented yet.
    this.headers = options.headers || {};
    this.config = new Config();
    this.setConfig();
  };
  private async setConfig() {
    this.config.setToken(this.token);
    if (this.headers && Object.keys(this.headers).length > 0) {
      this.config.setHeaders(this.headers);
    }
  };

  get Roster() {
    return {
      getRosterById: (rosterId: number, params?: { show_costs: boolean}) => get<GetRosterResponse, { show_costs: boolean}>(`${this.url}/rosters/${rosterId}`, this.config, params),
      getCurrentRoster: (params?: { show_wages: boolean}) => get<GetRosterResponse, { show_wages: boolean}>(`${this.url}/rosters/current`, this.config, params),
      getRosterThatContainsDate: (date: string, params?: GetRosterThatContainsDateParams) => get<GetRosterResponse, GetRosterThatContainsDateParams>(`${this.url}/rosters/on/${date}`, this.config, params),
      getSalesTarget: (type: "day" | "week", date: string) => get<GetSalesTargetResponse, {}>(`rosters/sales_target/${type}/${date}`, this.config, {}),
      getSalesTargetByTeam: (type: "day" | "week", date: string, params?: { department_id: number}) => get<GetSalesTargetResponse, { department_id: number}>(`${this.url}/rosters/sales_target/${type}/${date}`, this.config, params),
      getSalesTargetForLocation: (type: "day" | "week", date: string, params?: { location_id: number}) => get<GetSalesTargetResponse, { location_id: number}>(`${this.url}/rosters/sales_target/${type}/${date}`, this.config, params),
    }
  };
  
  get Schedules() {
    return {
      getSchedules: (params: GetSchedulesParams) => get<GetSchedulesResponse[], GetSchedulesParams>('schedules', this.config, params),
      getSchedulesByUserId: (params: GetSchedulesByUserParams) => get<GetSchedulesResponse[], GetSchedulesByUserParams>('schedules', this.config, params),
      createSchedule: (body: CreateScheduleBody) => post<GetSchedulesResponse, {}, CreateScheduleBody>('schedules', this.config, body), //! response type here is a placeholder. 
      createVacantSchedule: (body: CreateVacantScheduleBody) => post<GetSchedulesResponse, {}, CreateVacantScheduleBody>('schedules', this.config, body), //! response type here is a placeholder.
    }
  };

  get Timesheets() {
    return {
      getCurrentTimesheets: (params?: GetCurrentTimesheetsParams) => get<GetCurrentTimesheetsResponse[], GetCurrentTimesheetsParams>(`${this.url}/timesheets/current`, this.config, params),
      getCurrentTimesheetsOnDate: (date: string, params?: GetCurrentTimesheetsOnDateParams) => get<GetCurrentTimesheetsResponse[], GetCurrentTimesheetsOnDateParams>(`${this.url}/timesheets/on/${date}`, this.config, params),
      getCurrentTimesheetsForUser: (user_id: string, params?: GetCurrentTimesheetForUserParams) => get<GetCurrentTimesheetsResponse, GetCurrentTimesheetForUserParams>(`${this.url}/timesheets/for/${user_id}/current`, this.config, params),
      getCurrentTimesheetForUserOnDate: (user_id: string, date: string, params?: GetCurrentTimesheetForUserParams) => get<GetCurrentTimesheetsResponse, GetCurrentTimesheetForUserParams>(`${this.url}/timesheets/for/${user_id}/on/${date}`, this.config, params),
      getTimesheet: (timesheet_id: string, params?: GetTimesheetParams) => get<GetCurrentTimesheetsResponse, GetTimesheetParams>(`${this.url}/timesheets/${timesheet_id}`, this.config, params),
      updateTimesheetById: (timesheet_id: string, body: UpdateTimesheetStatusBody) => put<GetCurrentTimesheetsResponse, {}, UpdateTimesheetStatusBody>(`${this.url}/timesheets/${timesheet_id}`, this.config, body, {})
    }
  };

  get Shifts() {
    return {
      getShifts: (params?: GetShiftsParams) => get<GetShiftsResponse[], GetShiftsParams>(`${this.url}/shifts`, this.config, params),
      createShift: (body: CreateShiftBody) => post<GetShiftsResponse, {}, CreateShiftBody>(`${this.url}/shifts`, this.config, body),
      createShiftWithBreaks: (body: CreateShiftWithBreaks) => post<GetShiftsResponse, {}, CreateShiftWithBreaks>(`${this.url}/shifts`, this.config, body),
      createApprovedShift: (body: CreateApprovedShift) => post<GetShiftsResponse, {}, CreateApprovedShift>(`${this.url}/shifts`, this.config, body),
      createShiftAllowances: (body: CreateShiftWithAllowances) => post<GetShiftsResponse, {}, CreateShiftWithAllowances>(`${this.url}/shifts`, this.config, body),
      getShift: (shift_id: number, params?: GetShiftParams) => get<GetShiftsResponse, GetShiftParams>(`${this.url}/shifts/${shift_id}`, this.config, params),
      updateShiftApproveShift: (shift_id: number, body: UpdateShiftApproveShiftBody) => put<GetShiftsResponse, {}, UpdateShiftApproveShiftBody>(`${this.url}/shifts/${shift_id}`, this.config, body, {}),
      updateShiftUpdateShiftTimes: (shift_id: number, body: UpdateShiftTimesBody) => put<GetShiftsResponse, {}, UpdateShiftTimesBody>(`${this.url}/shifts/${shift_id}`, this.config, body, {}),
      updateShiftUpdateShiftTimesOnNewDate: (shift_id: number, body: UpdateShiftTimesOnNewDateBody) => put<GetShiftsResponse, {}, UpdateShiftTimesOnNewDateBody>(`${this.url}/shifts/${shift_id}`, this.config, body, {}),
      updateShiftAllowance: (shift_id: number, body: UpdateShiftAllowancesBody) => put<GetShiftsResponse, {}, UpdateShiftAllowancesBody>(`${this.url}/shifts/${shift_id}`, this.config, body, {}),
      deleteShift: (shift_id: number) => del<{ success: boolean, message: string}, {}>(`${this.url}/shifts/${shift_id}`, this.config, {}),
      getActiveShifts: () => get<GetActiveShifts[], {}>('shifts/active', this.config, {}),
      getShiftsApplicableAllowance: (shift_id: number) => get<GetShiftsApplicableAllowance[], {}>(`${this.url}/shifts/${shift_id}/applicable_allowances`, this.config, {}),
      getShiftVersions: (shift_id: number) => get<GetShiftVersions[], {}>(`${this.url}/shifts/${shift_id}/versions`, this.config, {}),
      getShiftBreaks: (shift_id: number) => get<GetShiftBreaks[], {}>(`${this.url}/shifts/${shift_id}/breaks`, this.config, {}),
      createShiftBreakWithTimes: (shift_id: number, body: CreateShiftBreakWithTimes) => post<CreateShiftBreakWithTimesResponse, {}, CreateShiftBreakWithTimes>(`${this.url}/shifts/${shift_id}/breaks`, this.config, body),
      createShiftBreakWithLength: (shift_id: number, body: CreateShiftBreakWithLength) => post<CreateShiftBreakResponse, {}, CreateShiftBreakWithLength>(`${this.url}/shifts/${shift_id}/breaks`, this.config, body),
      createShiftBreakWithPaid: (shift_id: number, body: CreateShiftBreakWithPaid) => post<CreateShiftBreakResponse, {}, CreateShiftBreakWithPaid>(`${this.url}/shifts/${shift_id}/breaks`, this.config, body),
      getShiftBreak: (shift_id: number, break_id: number) => get<GetShiftBreaks, {}>(`${this.url}/shifts/${shift_id}/breaks/${break_id}`, this.config, {}),
      updateShiftBreak: (shift_id: number, break_id: number, body: CreateShiftBreakWithTimes | CreateShiftBreakWithLength | CreateShiftBreakWithPaid) => put<GetShiftBreaks, {}, CreateShiftBreakWithTimes | CreateShiftBreakWithLength | CreateShiftBreakWithPaid>(`${this.url}/shifts/${shift_id}/breaks/${break_id}`, this.config, body, {}), //! pure placeholder. No body - check API docs.
      getShiftBreakVersions: (shift_id: number, break_id: number, params?: { updated_after: number}) => get<GetShiftVersions[], { updated_after: number}>(`${this.url}/shifts/${shift_id}/breaks/${break_id}/versions`, this.config, params),
      getShiftLimits: (params: { user_ids: string[] }) => get<GetShiftLimitsResponse[], { user_ids: string[]}>(`${this.url}/shifts/limits`, this.config, params),
    }
  };

  get Staff() {
    return {
      getStaff: (params?: GetUsersParams) => get<GetUsersListResponse[], GetUsersParams>(`${this.url}/users`, this.config, params),
      createUser: (body: CreateUserBody, params?: { skip_validation: boolean}) => post<CreateUserResponse, { skip_validation: boolean}, CreateUserBody>(`${this.url}/users`, this.config, body, params),
      createUserWithMinimumFields: (body: CreateUserWithMinimumFields, params?: { skip_validation: boolean}) => post<CreateUserResponse, { skip_validation: boolean}, CreateUserWithMinimumFields>(`${this.url}/users`, this.config, body, params),
      createUserWithRegularHours: (body: CreateUserWithMinimumFields, params?: { skip_validation: boolean}) => post<CreateUserResponseWithRegularHours, { skip_validation: boolean}, CreateUserWithMinimumFields>(`${this.url}/users`, this.config, body, params), //! this needs to be checked.
      getInactiveUsers: (params?: { updated_after?: number, report_loccation_id?: number}) => get<GetInactiveUsersResponse, { updated_after?: number, report_loccation_id?: number}>(`${this.url}/users/inactive`, this.config, params),
      getUser: (user_id: number, params?: GetUserParams) => get<GetUsersListResponse, GetUserParams>(`${this.url}/users/${user_id}`, this.config, params),
      updateUser: (user_id: number, body: UpdateUserBody, params?: { skip_validation: boolean }) => put<GetUsersListResponse, {}, UpdateUserBody>(`${this.url}/users/${user_id}`, this.config, body, params),
      updateUserDeactiveUser: (user_id: number, body: UpdateUserBodyDeactivateUser, params?: { skip_validation: boolean }) => put<GetUsersListResponse, {}, UpdateUserBodyDeactivateUser>(`${this.url}/users/${user_id}`, this.config, body, params),
      updateUserRemoveDepartments: (user_id: number, body: UpdateUserBodyUpdateRegularHours, params?: { skip_validation: boolean }) => put<UpdateUserRemoveDepartmentsResponse, {}, UpdateUserBodyUpdateRegularHours>(`${this.url}/users/${user_id}`, this.config, body, params), //! this needs to be checked. Not sure on the body.
      updateUserRegularHours: (user_id: number, body: UpdateUserBodyUpdateRegularHours, params?: { skip_validation: boolean}) => put<UpdateUserRegularHoursResponse, {}, UpdateUserBodyUpdateRegularHours>(`${this.url}/users/${user_id}`, this.config, body, params),
      //inviteUserDONOTUSE: (user_id: number) => get<{ success: boolean, message: string }, {}>(`${this.url}/users/${user_id}/invite`, this.config, {}),
      inviteUserForOnboarding: (body: InviteAUserForOnboardingBody) => post<{ success: boolean, message: string }, {}, InviteAUserForOnboardingBody>(`${this.url}/users/invite`, this.config, body, {}),
      getUserVersions: (user_id: number, params?: { updated_after: number}) => get<GetUserVersionsResponse[], { updated_after: number}>(`${this.url}/users/${user_id}/versions`, this.config, params),
      getAlternateRatesByUserId: (user_id: number, params?: { employment_contact_id: number } ) => get<GetAlternateRatesByUserIdResponse, {}>(`${this.url}/users/${user_id}/alternate_rates`, this.config, params),
      updateAlternateRatesByUserId: (user_id: number, body: UpdateAlternateRatesByUserId, params?: { employment_contact_id: number }) => put<GetAlternateRatesByUserIdResponse, {}, UpdateAlternateRatesByUserId>(`${this.url}/users/${user_id}/alternate_rates`, this.config, body, params), //! unsure about this call - ref: https://my.tanda.co/api/v2/documentation#staff-&#40;users&#41;-alternate-rates-put
      deleteAllAlternateRatesByUserId: (user_id: number, params?: { employment_contact_id: number }) => del<{ success: boolean, message: string }, {}>(`${this.url}/users/${user_id}/alternate_rates`, this.config, params),
    }
  };

  get EmployeePayFields() {
    return {
      getUserPayFields: (params?: { page?: number, page_size?: number}) => get<GetUserPayFieldsResponse[], { page?: number, page_size?: number}>(`${this.url}/user_pay_fields`, this.config, params),
      getUserPayFiieldById: (payFieldId: number) => get<GetUserPayFieldsResponse, {}>(`${this.url}/user_pay_fields/${payFieldId}`, this.config, {}),
      getUserPayFieldsByUserId: (user_id: number) => get<GetUserPayFieldsResponse[], {}>(`${this.url}/user_pay_fields/user/${user_id}`, this.config, {}),
      getVerifiedPayFieldsByUserId: (user_id: number) => get<GetVerifiedPayFieldsByUserIdResponse[], {}>(`${this.url}/user_pay_fields/user/${user_id}/verify`, this.config, {}),
      updatePayFieldByPayFieldId: (payFieldId: number, body: UpdatePayFieldByPayFieldIdBody) => put<GetUserPayFieldsResponse, {}, UpdatePayFieldByPayFieldIdBody>(`${this.url}/user_pay_fields/${payFieldId}`, this.config, body, {}),
      createPayFieldOnUser: (body: CreatePayFieldOnUserBody) => post<GetUserPayFieldsResponse, {}, CreatePayFieldOnUserBody>(`${this.url}/user_pay_fields`, this.config, body, {}),
      createAndUpdateMultiplePayFieldsOnUser: (user_id: number, body: CreateAndUpdateMultiplePayFieldsOnUserBody) => post<GetUserPayFieldsResponse[], {}, CreateAndUpdateMultiplePayFieldsOnUserBody>(`${this.url}/user_pay_fields/user/${user_id}`, this.config, body, {}),
      deletePayFieldByPayFieldId: (payFieldId: number) => del<{ success: boolean, message: string }, {}>(`${this.url}/user_pay_fields/${payFieldId}`, this.config, {}),
    }
  };

  get Locations() {
    return {
      getLocations: (params?: GetLocationsParams) => get<LocationsResponse[], {}>(`${this.url}/locations`, this.config, params),
      createLocation: (body: CreateLocationWithDetailsBody | CreateLocationBody) => post<LocationsResponse, {}, CreateLocationWithDetailsBody | CreateLocationBody>(`${this.url}/locations`, this.config, body, {}),
      getLocationById: (location_id: number, params?: { platform: boolean} ) => get<LocationsResponse, { platform: boolean}>(`${this.url}/locations/${location_id}`, this.config, params),
      updateLocationById: (location_id: number, body: UpdateLocationBody) => put<LocationsResponse, {}, UpdateLocationBody>(`${this.url}/locations/${location_id}`, this.config, body, {}),
      deleteLocationById: (location_id: number) => del<{ success: boolean, message: string }, {}>(`${this.url}/locations/${location_id}`, this.config, {}),
      getLocationVersionsById: (location_id: number, params?: { updated_after: number}) => get<LocationVersionsResponse[], { updated_after: number}>(`${this.url}/locations/${location_id}/versions`, this.config, params)
    }
  };
  
  get Teams() {
    return {
      getTeamsAsManagerOrEmployee: (params?: GetTeamsParams) => get<TeamsResponseAsEmployee | TeamsResponseAsManager, GetTeamsParams>(`${this.url}/departments`, this.config, params),
      createTeam: (body: CreateTeamWithDetails | CreateBasicTeam) => post<CreateTeamResponse, {}, CreateTeamWithDetails | CreateBasicTeam>(`${this.url}/departments`, this.config, body, {}),
      getTeamById: (team_id: number, params?: { platform: boolean}) => get<TeamsResponseAsManager, { platform: boolean}>(`${this.url}/departments/${team_id}`, this.config, params),
      updateTeamById: (team_id: number, body: UpdateTeamBody) => put<TeamsResponseAsManager, {}, UpdateTeamBody>(`${this.url}/departments/${team_id}`, this.config, body, {}),
      deleteTeamById: (team_id: number) => del<{ success: boolean, message: string }, {}>(`${this.url}/departments/${team_id}`, this.config, {}),
      getTeamVersionsById: (team_id: number, params?: { updated_after: number}) => get<GetVersionsResponse[], { updated_after: number}>(`${this.url}/departments/${team_id}/versions`, this.config, params),
    }
  };

  get ShiftDetails() {
    return {
      getShiftDetails: () => get<ShiftDetailsResponse[], {}>(`${this.url}/shift_details`, this.config, {}),
      createShiftDetail: (body: CreateShiftDetailBody) => post<ShiftDetailsResponse, {}, CreateShiftDetailBody>(`${this.url}/shift_details`, this.config, body, {}),
      getShiftDetailById: (shift_detail_id: number) => get<ShiftDetailsResponse, {}>(`${this.url}/shift_details/${shift_detail_id}`, this.config, {}),
      updateShiftDetailById: (shift_detail_id: number) => put<ShiftDetailsResponse, {}, {}>(`${this.url}/shift_details/${shift_detail_id}`, this.config, {}, {}), //! no body here?
      deleteShiftDetailById: (shift_detail_id: number) => del<{ success: boolean, message: string }, {}>(`${this.url}/shift_details/${shift_detail_id}`, this.config, {}),
    }
  };

  get AccessAndRoles() {
    return {
      getPlatformRoles: () => get<AccessAndRolesResponse[], {}>(`${this.url}/platform/roles`, this.config, {}),
    }
  };

  get AwardTags() {
    return {
      getAwardTags: () => get<AwardTagsResponse[], {}>(`${this.url}/award_tags`, this.config, {}),
      getAwardTagsById: (award_tag_id: number) => get<AwardTagsResponse, {}>(`${this.url}/award_tags/${award_tag_id}`, this.config, {}),
    }
  };

  get LeaveRequests() {
    return {
      getLeaveRequests: (params?: GetLeaveRequestsParams) => get<LeaveRequestsResponse[], GetLeaveRequestsParams>(`${this.url}/leave`, this.config, params),
      createLeaveRequests: (body: CreateLeaveRequestBody) => post<LeaveRequestsResponse, {}, CreateLeaveRequestBody>(`${this.url}/leave`, this.config, body, {}),
      getLeaveRequestById: (request_id: number) => get<LeaveRequestsResponse, {}>(`${this.url}/leave/${request_id}`, this.config, {}),
      updateLeaveRequestById: (request_id: number, body: CreateLeaveRequestBody) => put<LeaveRequestsResponse, {}, CreateLeaveRequestBody>(`${this.url}/leave/${request_id}`, this.config, body, {}),
      getLeaveRequestsForUser: (user_id: number) => get<LeaveRequestsForUserResponse[], {}>(`${this.url}/leave/types_for/${user_id}`, this.config, {}),
      getLeaveRequestsForUserWithDetails: (user_id: number) => get<LeaveRequestsForUserResponse[], {}>(`${this.url}/leave/types_with_details_for/${user_id}`, this.config, {}),
      getLeaveVersionsById: (leave_id: number, params?: { updated_after: number}) => get<GetVersionsResponse[], { updated_after: number}>(`${this.url}/leave/${leave_id}/versions`, this.config, params),
      getDefaultLeaveHours: (params: GetDefaultLeaveHoursParams) => get<DefaultLeaveHoursResponse, GetDefaultLeaveHoursParams>(`${this.url}/leave/default_hours`, this.config, params),
    }
  };

  get LeaveBalances() {
    return {
      getLeaveBalances: (params?: GetLeaveBalancesParams) => get<LeaveBalanceResponse[], GetLeaveBalancesParams>(`${this.url}/leave_balances`, this.config, params),
      createLeaveBalance: (body: CreateLeaveBalanceBody | CreateMultipleLeaveBalancesBody) => post<LeaveBalanceResponse | CreateMultipleLeaveBalancesResponse[], {}, CreateLeaveBalanceBody | CreateMultipleLeaveBalancesBody>(`${this.url}/leave_balances`, this.config, body, {}),
      updateLeaveBalanceById: (leave_balance_id: number, body: UpdateLeaveBalanceBody) => put<LeaveBalanceResponse, {}, UpdateLeaveBalanceBody>(`${this.url}/leave_balances/${leave_balance_id}`, this.config, body, {}),
      updateLeaveBalanceByUserId: (user_id: number, body: UpdateLeaveBalanceByUserIdBody) => put<LeaveBalanceResponse, {}, UpdateLeaveBalanceByUserIdBody>(`${this.url}/leave_balances/user/${user_id}`, this.config, body, {}),
      predictLeaveBalance: (leave_balance_id: number, body: PredictLeaveBalanceBody) => post<PredictLeaveBalanceResponse, {}, PredictLeaveBalanceBody>(`${this.url}/leave_balances/${leave_balance_id}/predict`, this.config, body, {}),
    }
  };

  get Unavailability() {
    return {
      getUnavailability: (params?: GetUnavailabilityParams) => get<UnavailabilityResponse[], GetUnavailabilityParams>(`${this.url}/unavailability`, this.config, params),
      createUnavailability: (body: CreateUnavailability | CreateUnavailabilityAllDay | CreateRepeatingUnavailability) => post<UnavailabilityResponse, {}, CreateUnavailability | CreateUnavailabilityAllDay | CreateRepeatingUnavailability>(`${this.url}/unavailability`, this.config, body, {}), //! maybe split this into different methods.
      getRepeatingUnavailabilityById: (unavailability_id: number) => get<RepeatingUnavailabilityResponse[], {}>(`${this.url}/unavailability/repeating_for/${unavailability_id}`, this.config, {}),
      getUnavailabilityById: (unavailability_id: number) => get<UnavailabilityResponse | RepeatingUnavailabilityResponse, {}>(`${this.url}/unavailability/${unavailability_id}`, this.config, {}),
      updateUnavailabilityById: (unavailability_id: number, body: { title: string }) => put<UnavailabilityResponse | RepeatingUnavailabilityResponse, {}, { title: string }>(`${this.url}/unavailability/${unavailability_id}`, this.config, body, {}), //! need more examples / testing of this endpoint to determine what can go into the put.
      deleteUnavailabilityById: (unavailability_id: number) => del<{ success: boolean, message: string }, {}>(`${this.url}/unavailability/${unavailability_id}`, this.config, {}),
    }
  };

  get Datastreams() {
    return {
      getDataStreams: (params?: { updated_after: number }) => get<DataStreamsResponse[], { updated_after: number }>(`${this.url}/datastreams`, this.config, params),
      createDataStream: (body: CreateDatastream) => post<DataStreamsResponse, {}, CreateDatastream>(`${this.url}/datastreams`, this.config, body, {}),
      getDataStreamById: (datastream_id: number) => get<DataStreamsResponse, {}>(`${this.url}/datastreams/${datastream_id}`, this.config, {}),
      updateDataStreamById: (datastream_id: number, body: UpdateDatastream) => put<DataStreamsResponse, {}, UpdateDatastream>(`${this.url}/datastreams/${datastream_id}`, this.config, body, {}),
      deleteDataStreamById: (datastream_id: number) => del<{ success: boolean, message: string }, {}>(`${this.url}/datastreams/${datastream_id}`, this.config, {}),
      getDataStreamVersionsById: (datastream_id: number, params?: { updated_after: number }) => get<GetVersionsResponse[], { updated_after: number }>(`${this.url}/datastreams/${datastream_id}/versions`, this.config, params),
    }
  };

  get DatastreamJoins() {
    return {
      getDataStreamJoins: (params?: { updated_after: number }) => get<DataStreamJoinsResponse[], { updated_after: number }>(`${this.url}/datastreamjoins`, this.config, params),
      createDataSteamJoin: (body: CreateDataStream | CreateDataStreamJoinedToTeam) => post<DataStreamJoinsResponse, {}, CreateDataStream | CreateDataStreamJoinedToTeam>(`${this.url}/datastreamjoins`, this.config, body, {}),
      getDataStreamJoinById: (datastreamjoin_id: number) => get<DataStreamJoinsResponse, {}>(`${this.url}/datastreamjoins/${datastreamjoin_id}`, this.config, {}),
      updateDataStreamJoinById: (datastreamjoin_id: number, body: UpdateDataStreamJoin) => put<DataStreamJoinsResponse, {}, UpdateDataStreamJoin>(`${this.url}/datastreamjoins/${datastreamjoin_id}`, this.config, body, {}), //! need to test this endpoint to find out the proper types.
      deleteDataStreamJoinById: (datastreamjoin_id: number) => del<{ success: boolean, message: string }, {}>(`${this.url}/datastreamjoins/${datastreamjoin_id}`, this.config, {}),
    }
  };

  get StoreStats() {
    return {
      getStoreStats: (dataStreamId: number, params: StoreStatsParams) => get<StoreStatsResponse[], StoreStatsParams>(`${this.url}/storestats/for_datastream/${dataStreamId}/`, this.config, params),
      createStoreStats: (dataStreamId: number, body: CreateStoreStats | CreateMultipleStoreStats) => post<StoreStatsResponse | StoreStatsResponse[], {}, CreateStoreStats | CreateMultipleStoreStats>(`${this.url}/storestats/for_datastream/${dataStreamId}/`, this.config, body, {}),
      deleteStoreStats: (body: DeleteStoreStats) => post<{ success: boolean, message: string }, {}, DeleteStoreStats>(`${this.url}/storestats/for_datastream`, this.config, body, {}),
      createMultipleStoreStatsByDataStream: (body: CreateStoreStatsByDataStream | CreateMultipleStoreStatsByDataStream) => post<StoreStatsResponse | StoreStatsResponse[], {}, CreateStoreStatsByDataStream | CreateMultipleStoreStatsByDataStream>(`${this.url}/storestats/for_datastream`, this.config, body, {})
    }
  };

  get Devices() {
    return {
      getDevices: (params?: { updated_after: number }) => get<DeviceResponse[], { updated_after: number }>(`${this.url}/devices`, this.config, params),
      createDevice: (body: CreateDevice) => post<DeviceResponse, {}, CreateDevice>(`${this.url}/devices`, this.config, body, {}),
      getReturnedDeviceList: (params?: { updated_after: number}) => get<DeviceResponse[], { updated_after: number}>(`${this.url}/devices/returned`, this.config, params),
      getDeviceById: (device_id: number) => get<DeviceResponse, {}>(`${this.url}/devices/${device_id}`, this.config, {}),
      updateDeviceById: (device_id: number, body: CreateDevice) => put<DeviceResponse, {}, CreateDevice>(`${this.url}/devices/${device_id}`, this.config, body, {}), //! type here is not neccessarily correct. 
      returnDeviceById: (device_id: number) => put<DeviceResponse, {}, {}>(`${this.url}/devices/${device_id}/return`, this.config, {}, {}), //! type here is not neccessarily correct. Needs to be tested.
      getDeviceVersionsById: (device_id: number, params?: { updated_after: number }) => get<GetVersionsResponse[], { updated_after: number }>(`${this.url}/devices/${device_id}/versions`, this.config, params),
      resetDeviceAccessCode: (body: { access_code: string }) => post<{ success: boolean, message: string }, {}, { access_code: string }>(`${this.url}/devices/reset_access_code`, this.config, body, {}), //! need to test this. No response profile in the docs.
    }
  };

  get ClockIns() {
    return {
      performClockInForUser: (body: PerformClockInForUser) => post<ClockInResponse, {}, PerformClockInForUser>(`${this.url}/clockins`, this.config, body, {}),
      getClockIns: (params: ClockIn) => get<ClockInResponse[], ClockIn>(`${this.url}/clockins`, this.config, params), //! method for User, Device or both. not typed correctly.
      getClockInById: (clockin_id: number) => get<ClockInResponse, {}>(`${this.url}/clockins/${clockin_id}`, this.config, {}),
    }
  };

  get Qualifications() {
    return {
      getQualifications: () => get<QualificationsResponse[], {}>(`${this.url}/qualifications`, this.config, {}),
      createQualification: (body: CreateQualification) => post<QualificationsResponse, {}, CreateQualification>(`${this.url}/qualifications`, this.config, body, {}),
      getQualificationById: (qualification_id: number) => get<QualificationsResponse, {}>(`${this.url}/qualifications/${qualification_id}`, this.config, {}),
      updateQualificationById: (qualification_id: number, body: UpdateQualification) => put<QualificationsResponse, {}, UpdateQualification>(`${this.url}/qualifications/${qualification_id}`, this.config, body, {}),
      deleteQualificationById: (qualification_id: number) => del<{ success: boolean, message: string }, {}>(`${this.url}/qualifications/${qualification_id}`, this.config, {}),
    }
  };

  get SystemSettings() {
    return {
      getSystemSettings: () => get<SystemSettingsResponse, {}>(`${this.url}/settings`, this.config, {}),
      getSystemSettingsVersions: (params?: { updated_after: number }) => get<GetVersionsResponse[], { updated_after: number }>(`${this.url}/settings/versions`, this.config, params),
    }
  };

  get AwardTemplates() {
    return {
      getEnabledAwardTemplates: (params?: { updated_after?: number, include_custom_awards?: boolean }) => get<AwardTemplatesResponse[], { updated_after?: number, include_custom_awards?: boolean }>(`${this.url}/award_templates`, this.config, params),
      enableAwardTemplates: (body: EnableAwardTemplate | EnableAwardTemplateWithLeaveTypes) => post<AwardTemplatesResponse, {}, EnableAwardTemplate | EnableAwardTemplateWithLeaveTypes>(`${this.url}/award_templates`, this.config, body, {}),
      getAwardTemplatesInTanda: () => get<AwardTemplatesResponse[], {}>(`${this.url}/award_templates/available`, this.config, {}),
    }
  };

  get Organisations() {
    return {
      getOrganisations: (params?: { updated_after: number }) => get<OrganisationsResponse[], { updated_after: number }>(`${this.url}/organisations`, this.config, params),
      createOrganisation: (body: CreateOrganisation) => post<OrganisationsResponse, {}, CreateOrganisation>(`${this.url}/organisations`, this.config, body, {}), //! response type could be wrong due to nulls etc.
      getOrganisationById: (organisation_id: number) => get<OrganisationsResponse, {}>(`${this.url}/organisations/${organisation_id}`, this.config, {}), //! best guess. Tanda docs don't show.
      updateOrganisationById: (organisation_id: number, body: UpdateOrganisation) => put<OrganisationsResponse, {}, UpdateOrganisation>(`${this.url}/organisations/${organisation_id}`, this.config, body, {}), 
      createAccessToken: (body: AccessToken) => post<AccessTokenResponse, {}, AccessToken>(`${this.url}/organisations/access_tokens`, this.config, body, {}),
    }
  }
}