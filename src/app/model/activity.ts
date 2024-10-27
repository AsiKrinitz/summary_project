export class Activity {
  ActivityId: any
  ActivityTypeId: any
  ActivityType: string
  ActivityDays: string
  ActivityHours: string
  ActivityFrequencyId: any
  ActivityFrequency: string
  ActivityDesc: string
  ActivityLocation: string
  ActivityCityId: any
  CityName: string
  ActivityHost: string
  ActivityFile: string
  ActivityStartDate: Date
  ActivityEndDate: Date
  ActivityPublishStartDate: Date
  ActivityPublishEndDate: Date
  ActivityMinParticipants: number
  ActivityMaxParticipants: number
  PricePerParticipant?: number
  CouponNum: string
  CouponDiscount?: number
  CreateUser: string
  ActivityCreator: string
  CreateDate: Date
  UpdateUser: string
  ActivityUpdater: string
  UpdateDate?: Date
  ApproveUser: string
  ActivityApprover: string
  ApproveDate?: Date
  Active: boolean
  OrganizationUnitId: any
  ApproveOrganizationUnitId: any
  BudgetOrganizationUnitId: any
  StatusId: number
  StatusName: string
  ActivityFileName: string
  BudgetFileName: string
  ParticipantsRegistered: number
  ContactPhone: string
  ContactMail: string

  isAllowedToEditActivityBaseData: boolean;
  isAllowedToEditActivityCosts: boolean;
  isAllowedToEditBudget: boolean;
  isAllowedToConfirmActivity: boolean;
  isAllowedToConfirmBudget: boolean;
  isAllowedToCloseActivity: boolean;
  isAllowedToReopenActivity: boolean;

  // For FrontEnd Module ONLY
  isAllowedToRegister: boolean;
  BudgetOrganizationUnitDesc: string;
  ParticipantsReminder: number;
  //IsHistadrutMember: boolean;
  IdentityNumberForCheckHistradrutMemebr: string;
  GenderForCheckHistradrutMemebr?: number;
  DicountAmount?: number;
  DicountTypeId?: number;
  DicountType: string;
  AmountToPayTotal?: number;
  ConfirmationCode?: string;


  showDetails: boolean;
  showNewCouponTextBox: boolean;
  OnlyCreditCardPayment: boolean;
  LpUrl: string;

};

